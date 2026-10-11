// 深度パララックス（視差・光の粒子・呼吸）。ギャラリー（gallery/）も、作中（場所ページ・コース画面）も、このファイルを読む。
// シェーダーはここにだけある。手本: 深度パララックス・ギャラリー（parallax_gallery.html）。
//
// 守っていること（古い端末で落ちないため）
//  - WebGL は同時に1つだけ。画面を切り替えるときは、同じ GL（同じ canvas）を、別の host に付け替えて使い回す
//  - テクスチャは直近4枚まで。古いものは deleteTexture で捨てる
//  - 次の絵は、表示の700ms後に先読み。切替は フェードアウト（約380ms）→ 読み込み → フェードイン
//  - スマホは DPR_CAP=1.25、約45fps上限（MIN_FRAME_MS=22）、powerPreference: 'low-power'
//  - document.hidden のときはループを止める / 画面外（IntersectionObserver）のときは描かない
//  - prefers-reduced-motion のときは、動かさず静止画で描く
//  - 失敗しても止めない。WebGL が使えない・画像が読めないときは、false を返す（呼び出し側が通常表示のままにする）
//  - 傾きセンサー（ジャイロ）は使わない
//
// 使いかた
//   Parallax.mount(host, { anchor: {x, y}, ignore, motion, before })   host に canvas を付ける（成功なら true）
//   Parallax.show(art, { first, next })                               art = { key, src, depth, focus, zoom, parallax }
//   Parallax.hide() / Parallax.unmount(host)
//   Parallax.rect()   いま絵が host の中のどこにあるか { ox, oy, dw, dh }（px）。波紋の範囲を合わせるのに使う
(() => {
  "use strict";
  if (window.Parallax) return;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const clamp1 = (v) => clamp(v, -1, 1);
  const coarse = matchMedia("(pointer:coarse)").matches;
  const reducedMQ = matchMedia("(prefers-reduced-motion: reduce)");
  const DPR_CAP = coarse ? 1.25 : 1.75;
  const MIN_FRAME_MS = coarse ? 22 : 0;
  const NP = coarse ? 42 : 70;
  const FADE_MS = 380;
  const PRELOAD_MS = 700;
  const MAX_TEX = 4;

  // 設定値。絵ごとに、データの parallax: {...} で上書きできる
  const DEFAULTS = {
    strength: 0.5, // 奥行きの強さ 0〜1（×0.07）
    light: 0.08, // カーソル光源（×1.6）
    bump: 0.5, // 凹凸の強調
    particles: 0.13, // 光の粒子の量
    focus: 0.96, // 奥行きの基準面（これより手前は寄り、奥は離れる）
    hues: [[198, 225], [38, 52]], // 粒子の色（青白／暖色）
  };

  const R = {
    gl: null,
    glc: null,
    fx: null,
    fxc: null,
    prog: null,
    U: {},
    tried: false,
    broken: false,
    host: null,
    opts: null,
    cache: {},
    pending: {},
    order: [],
    cur: null,
    last: null,
    shown: false,
    token: 0,
    raf: 0,
    lastT: 0,
    lastFrame: 0,
    dpr: 1,
    visible: true,
    view: null,
    down: false,
    preloadT: 0,
    ro: null,
    io: null,
    listeners: false,
    S: { mx: 0, my: 0, lx: 0.5, ly: 0.55, tx: 0, ty: 0, tlx: 0.5, tly: 0.55, lastInput: -1e9 },
  };
  let parts = [];
  const sprites = {};

  // ---------------- シェーダー ----------------
  const VS = "attribute vec2 p; varying vec2 vUv; void main(){ vUv = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }";
  const FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImg, uDep;
uniform vec2 uRes, uImgSize, uMouse, uLight, uPan;
uniform float uStrength, uLightAmt, uBump, uFocus, uFocusV, uZoom;

float D(vec2 p){ return texture2D(uDep, p).r; }

vec2 cover(vec2 uv){
  float sa = uRes.x/uRes.y, ia = uImgSize.x/uImgSize.y;
  vec2 s = sa > ia ? vec2(1.0, ia/sa) : vec2(sa/ia, 1.0);
  uv = (uv - 0.5) / uZoom + 0.5;
  float cx = 0.5 + uPan.x * (1.0 - s.x) * 0.5;
  float cy = clamp(uFocusV + uPan.y * (1.0 - s.y) * 0.5, s.y*0.5, 1.0 - s.y*0.5);
  return vec2((uv.x - 0.5) * s.x + cx, (uv.y - 0.5) * s.y + cy);
}

void main(){
  vec2 uv = cover(vUv);
  vec2 dir = uMouse * uStrength;
  vec2 p = uv;
  for(int i = 0; i < 5; i++){ p = uv + dir * (D(p) - uFocus); }
  p = clamp(p, 0.001, 0.999);

  float ca = length(uMouse) * 0.0014;
  vec2 cd = normalize(vUv - 0.5 + 1e-4) * ca;
  vec3 col = vec3(texture2D(uImg, p + cd).r, texture2D(uImg, p).g, texture2D(uImg, p - cd).b);

  vec2 sl = texture2D(uDep, p).gb * 2.0 - 1.0;
  vec3 n = normalize(vec3(-sl * (0.3 + uBump * 1.0), 1.0));

  vec2 d = (uLight - vUv) * vec2(uRes.x/uRes.y, 1.0);
  vec3 L = normalize(vec3(d, 0.32));
  float att = exp(-dot(d,d) * 2.6);
  float diff = max(dot(n, L), 0.0);
  float base = L.z;
  vec3 H = normalize(L + vec3(0.,0.,1.));
  float spec = pow(max(dot(n, H), 0.0), 36.0);
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float hiMask = 0.35 + 0.65 * smoothstep(0.35, 0.95, lum);

  vec3 lightCol = vec3(1.0, 0.93, 0.84);
  col *= clamp(1.0 + uLightAmt * att * (diff - base) * 1.2, 0.62, 1.55);
  col += lightCol * uLightAmt * att * 0.16 * (0.4 + diff);
  col += lightCol * uLightAmt * spec * att * 0.55 * hiMask;

  float far = 1.0 - D(p);
  col = mix(col, col + vec3(0.02, 0.05, 0.09), far * 0.35);

  float v = smoothstep(1.15, 0.35, length((vUv - 0.5) * vec2(1.0, 1.1)));
  col *= mix(0.93, 1.0, v);
  gl_FragColor = vec4(col, 1.0);
}`;

  // ---------------- canvas と GL ----------------
  function makeCanvas(cls) {
    const c = document.createElement("canvas");
    c.className = cls;
    c.setAttribute("aria-hidden", "true");
    c.style.cssText = `position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity ${FADE_MS}ms ease;`;
    return c;
  }

  function initGL() {
    if (!R.glc) {
      R.glc = makeCanvas("px-gl");
      R.fx = makeCanvas("px-fx");
      R.fxc = R.fx.getContext("2d");
    }
    const gl = R.glc.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power", preserveDrawingBuffer: false });
    if (!gl) throw new Error("no webgl");
    R.gl = gl;
    const sh = (t, src) => {
      const o = gl.createShader(t);
      gl.shaderSource(o, src);
      gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o));
      return o;
    };
    R.prog = gl.createProgram();
    gl.attachShader(R.prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(R.prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(R.prog);
    if (!gl.getProgramParameter(R.prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(R.prog));
    gl.useProgram(R.prog);
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(R.prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    R.U = {};
    ["uImg", "uDep", "uRes", "uImgSize", "uMouse", "uLight", "uPan", "uStrength", "uLightAmt", "uBump", "uFocus", "uFocusV", "uZoom"].forEach((n) => (R.U[n] = gl.getUniformLocation(R.prog, n)));
    gl.uniform1i(R.U.uImg, 0);
    gl.uniform1i(R.U.uDep, 1);
    if (!R.listenersGL) {
      R.listenersGL = true;
      R.glc.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        cancelAnimationFrame(R.raf);
        R.raf = 0;
        R.shown = false;
        R.glc.style.opacity = R.fx.style.opacity = "0";
      });
      R.glc.addEventListener("webglcontextrestored", () => {
        try {
          R.cache = {};
          R.order = [];
          R.cur = null;
          initGL();
          resize();
          startLoop();
          if (R.last) show(R.last.art, { first: true });
        } catch (err) {
          R.broken = true;
        }
      });
    }
  }

  function supported() {
    if (R.broken) return false;
    if (!R.tried) {
      R.tried = true;
      try {
        initGL();
      } catch (e) {
        R.broken = true;
        if (window.console) console.warn("[parallax] WebGL を使えません。通常表示にします:", e.message || e);
      }
    }
    return !R.broken;
  }

  function texParams(gl) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  function makeTex(img, unit) {
    const gl = R.gl;
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    texParams(gl);
    return t;
  }
  function makeTexData(m, unit) {
    const gl = R.gl;
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, m.w, m.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, m.data);
    texParams(gl);
    return t;
  }

  // ---------------- 深度マップの加工（白＝手前、黒＝奥） ----------------
  function blur(src, W, H, sigma) {
    const r = Math.max(1, Math.ceil(sigma * 3));
    const k = new Float32Array(r * 2 + 1);
    let s = 0;
    for (let i = -r; i <= r; i++) {
      k[i + r] = Math.exp(-(i * i) / (2 * sigma * sigma));
      s += k[i + r];
    }
    for (let i = 0; i < k.length; i++) k[i] /= s;
    const tmp = new Float32Array(W * H);
    const out = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let a = 0;
      for (let i = -r; i <= r; i++) a += src[y * W + clamp(x + i, 0, W - 1)] * k[i + r];
      tmp[y * W + x] = a;
    }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let a = 0;
      for (let i = -r; i <= r; i++) a += tmp[clamp(y + i, 0, H - 1) * W + x] * k[i + r];
      out[y * W + x] = a;
    }
    return out;
  }
  function buildMaps(depthImg) {
    const W = 384;
    const H = Math.max(2, Math.round((W * depthImg.naturalHeight) / depthImg.naturalWidth));
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(depthImg, 0, 0, W, H);
    const px = g.getImageData(0, 0, W, H).data;
    const d = new Float32Array(W * H);
    for (let i = 0; i < d.length; i++) d[i] = px[i * 4] / 255;
    const soft = blur(d, W, H, 1.4);
    const big = blur(d, W, H, 4.5);
    const out = new Uint8Array(W * H * 4);
    const K = 40;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const xl = Math.max(0, x - 1), xr = Math.min(W - 1, x + 1), yu = Math.max(0, y - 1), yd = Math.min(H - 1, y + 1);
      const gx = (big[y * W + xr] - big[y * W + xl]) * 0.5;
      const gy = (big[yd * W + x] - big[yu * W + x]) * 0.5;
      const o = i * 4;
      out[o] = Math.round(soft[i] * 255);
      out[o + 1] = Math.round((clamp1(gx * K) * 0.5 + 0.5) * 255);
      out[o + 2] = Math.round((clamp1(-gy * K) * 0.5 + 0.5) * 255);
      out[o + 3] = 255;
    }
    return { data: out, w: W, h: H };
  }
  // 深度マップが無い絵のための、平らな深度（視差は出ないが、光と粒子は出る）
  function flatMaps(focus) {
    const w = 4, h = 4, data = new Uint8Array(w * h * 4);
    for (let i = 0; i < w * h; i++) data.set([Math.round(focus * 255), 128, 128, 255], i * 4);
    return { data, w, h };
  }

  // ---------------- テクスチャ管理（直近4枚まで） ----------------
  function loadImage(src) {
    return new Promise((res, rej) => {
      const i = new Image();
      i.decoding = "async";
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("load failed: " + src));
      i.src = src;
    });
  }
  function touch(key) {
    const i = R.order.indexOf(key);
    if (i >= 0) R.order.splice(i, 1);
    R.order.push(key);
    while (R.order.length > MAX_TEX) {
      const old = R.order.shift();
      if (R.cur && R.cur.key === old) {
        R.order.push(old);
        break;
      }
      const t = R.cache[old];
      if (t && R.gl) {
        R.gl.deleteTexture(t.tImg);
        R.gl.deleteTexture(t.tDep);
      }
      delete R.cache[old];
    }
  }
  function ensure(art) {
    const key = art.key;
    if (R.cache[key]) {
      touch(key);
      return Promise.resolve(R.cache[key]);
    }
    if (R.pending[key]) return R.pending[key];
    R.pending[key] = (async () => {
      const [im, dp] = await Promise.all([loadImage(art.src), art.depth ? loadImage(art.depth).catch(() => null) : null]);
      if (!R.gl) initGL();
      const cfg = { ...DEFAULTS, ...(art.parallax || {}) };
      const maps = dp ? buildMaps(dp) : flatMaps(cfg.focus);
      R.cache[key] = { key, art, cfg, tImg: makeTex(im, 0), tDep: makeTexData(maps, 1), w: im.naturalWidth, h: im.naturalHeight };
      touch(key);
      return R.cache[key];
    })().finally(() => {
      delete R.pending[key];
    });
    return R.pending[key];
  }

  // ---------------- 光の粒子（2D） ----------------
  function sprite(h) {
    const key = Math.round(h / 6);
    if (sprites[key]) return sprites[key];
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `hsla(${h},90%,92%,1)`);
    gr.addColorStop(0.25, `hsla(${h},90%,75%,.55)`);
    gr.addColorStop(1, `hsla(${h},90%,60%,0)`);
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    return (sprites[key] = c);
  }
  function seedParticles(cfg) {
    parts = [];
    for (let i = 0; i < NP; i++) {
      const hr = cfg.hues[Math.random() < 0.72 ? 0 : 1 % cfg.hues.length];
      parts.push({ x: Math.random(), y: Math.random(), z: Math.random(), r: 2 + Math.random() * 6, v: 0.004 + Math.random() * 0.012, ph: Math.random() * 6.28, sw: 0.2 + Math.random() * 0.6, h: hr[0] + Math.random() * (hr[1] - hr[0]) });
    }
  }
  function drawParticles(t, f, cfg) {
    const S = R.S, w = R.fx.width, h = R.fx.height, fxc = R.fxc;
    fxc.clearRect(0, 0, w, h);
    fxc.globalCompositeOperation = "lighter";
    const amt = clamp(cfg.particles * 4.2, 0, 1);
    for (const p of parts) {
      p.y -= p.v * f * 0.01;
      if (p.y < -0.05) {
        p.y = 1.05;
        p.x = Math.random();
      }
      const tw = 0.5 + 0.5 * Math.sin(t * (0.8 + p.sw) + p.ph);
      const x = (p.x + Math.sin(t * p.sw + p.ph) * 0.012 - S.mx * (p.z - 0.4) * 0.05) * w;
      const y = (p.y + S.my * (p.z - 0.4) * 0.03) * h;
      const r = p.r * (0.6 + p.z * 0.9) * R.dpr * 2.2;
      fxc.globalAlpha = amt * (0.25 + 0.75 * tw) * (0.5 + 0.5 * p.z);
      fxc.drawImage(sprite(p.h), x - r, y - r, r * 2, r * 2);
    }
    fxc.globalAlpha = 1;
    fxc.globalCompositeOperation = "source-over";
  }

  // ---------------- サイズ ----------------
  function resize() {
    if (!R.host || !R.glc) return;
    R.dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const w = Math.max(2, Math.round(R.host.clientWidth * R.dpr));
    const h = Math.max(2, Math.round(R.host.clientHeight * R.dpr));
    if (R.glc.width !== w || R.glc.height !== h) {
      R.glc.width = w;
      R.glc.height = h;
    }
    if (R.fx.width !== w || R.fx.height !== h) {
      R.fx.width = w;
      R.fx.height = h;
    }
    if (R.gl) R.gl.viewport(0, 0, w, h);
    if (reducedMQ.matches && R.cur && R.shown) render(performance.now());
  }

  // ---------------- 描画 ----------------
  function render(now) {
    const cur = R.cur, gl = R.gl;
    if (!cur || !gl || !R.host || R.gl.isContextLost()) return;
    const S = R.S, o = R.opts;
    const t = now / 1000;
    const dt = Math.min(0.05, Math.max(0, t - R.lastT));
    R.lastT = t;
    const cfg = cur.cfg, art = cur.art;
    const reduced = reducedMQ.matches;
    const idle = now - S.lastInput > 2500;
    let tx = S.tx, ty = S.ty, tlx = S.tlx, tly = S.tly;
    if (idle && !reduced) {
      const ph = t * 0.58; // 呼吸（触っていないとき、ゆっくり視点と光が動く）
      tx = Math.cos(ph) * 0.26;
      ty = Math.sin(ph) * 0.2;
      tlx = 0.5 + Math.cos(ph - 0.9) * 0.22;
      tly = 0.55 + Math.sin(ph - 0.9) * 0.16;
    }
    if (reduced && idle) {
      tx = ty = 0;
      tlx = 0.5;
      tly = 0.55;
    }
    const k = 1 - Math.pow(0.0008, dt || 0.016);
    S.mx += (tx - S.mx) * k;
    S.my += (ty - S.my) * k;
    S.lx += (tlx - S.lx) * k;
    S.ly += (tly - S.ly) * k;

    // 見せ所（focus）を、host の anchor の位置（文字の窓に隠れない高さ）へ寄せる
    const W = R.glc.width, H = R.glc.height;
    const sa = W / H, ia = cur.w / cur.h;
    const sx = sa > ia ? 1 : sa / ia, sy = sa > ia ? ia / sa : 1;
    const Z = 1.08 * (art.zoom || 1);
    const f = art.focus || { x: 50, y: 35 };
    const a = o.anchor;
    const cxT = f.x / 100 - ((a.x - 0.5) / Z) * sx;
    const focusV = 1 - f.y / 100 - ((1 - a.y - 0.5) / Z) * sy;
    const panBias = sx < 1 ? clamp1((cxT - 0.5) / ((1 - sx) * 0.5)) : 0;
    const panX = clamp1(panBias + 0.9 * S.mx * o.motion);
    const panY = clamp1(0.8 * S.my * o.motion);
    R.view = {
      cx: 0.5 + panX * (1 - sx) * 0.5,
      cy: clamp(focusV + panY * (1 - sy) * 0.5, sy * 0.5, 1 - sy * 0.5),
      sx, sy, Z,
    };

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cur.tImg);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, cur.tDep);
    const U = R.U;
    gl.uniform2f(U.uRes, W, H);
    gl.uniform2f(U.uImgSize, cur.w, cur.h);
    gl.uniform2f(U.uMouse, S.mx * o.motion, S.my * o.motion);
    gl.uniform2f(U.uLight, S.lx, S.ly);
    gl.uniform2f(U.uPan, panX, panY);
    gl.uniform1f(U.uStrength, cfg.strength * 0.07);
    gl.uniform1f(U.uLightAmt, cfg.light * 1.6);
    gl.uniform1f(U.uBump, cfg.bump);
    gl.uniform1f(U.uFocus, cfg.focus);
    gl.uniform1f(U.uFocusV, focusV);
    gl.uniform1f(U.uZoom, Z);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (reduced) R.fxc.clearRect(0, 0, R.fx.width, R.fx.height);
    else drawParticles(t, dt * 60, cfg);
  }
  function loop(now) {
    R.raf = requestAnimationFrame(loop);
    if (document.hidden || !R.shown || !R.visible) return;
    if (MIN_FRAME_MS && now - R.lastFrame < MIN_FRAME_MS) return;
    R.lastFrame = now;
    if (!reducedMQ.matches) render(now);
  }
  function startLoop() {
    cancelAnimationFrame(R.raf);
    R.lastT = performance.now() / 1000;
    R.raf = requestAnimationFrame(loop);
  }
  document.addEventListener("visibilitychange", () => {
    if (!R.host) return;
    if (document.hidden) {
      cancelAnimationFrame(R.raf);
      R.raf = 0;
    } else startLoop();
  });

  // ---------------- 入力（host の中の位置で、視点と光を動かす） ----------------
  function pointerMove(e) {
    if (!R.host) return;
    const r = R.host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const S = R.S;
    const nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
    S.tx = clamp1(nx * 2 - 1);
    S.ty = clamp1(1 - ny * 2);
    S.tlx = clamp(nx, 0, 1);
    S.tly = clamp(1 - ny, 0, 1);
    S.lastInput = performance.now();
  }
  function addListeners() {
    if (R.listeners) return;
    R.listeners = true;
    addEventListener("pointermove", (e) => {
      if (R.host && (e.pointerType === "mouse" || R.down)) pointerMove(e);
    });
    addEventListener("pointerdown", (e) => {
      if (!R.host) return;
      if (R.opts.ignore && e.target.closest && e.target.closest(R.opts.ignore)) return;
      R.down = true;
      pointerMove(e);
    });
    addEventListener("pointerup", () => (R.down = false));
    addEventListener("pointercancel", () => (R.down = false));
    addEventListener("resize", resize);
    reducedMQ.addEventListener && reducedMQ.addEventListener("change", () => {
      if (R.shown) reducedMQ.matches ? render(performance.now()) : startLoop();
    });
  }

  // ---------------- 公開 ----------------
  function setOpacity(v) {
    if (R.glc) R.glc.style.opacity = R.fx.style.opacity = String(v);
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function mount(host, opts) {
    if (!host || !supported()) return false;
    try {
      if (R.ro) R.ro.disconnect();
      if (R.io) R.io.disconnect();
      R.host = host;
      R.opts = { anchor: { x: 0.5, y: 0.4 }, ignore: "", motion: 1, before: null, ...(opts || {}) };
      const ref = R.opts.before && R.opts.before.parentNode === host ? R.opts.before : null;
      host.insertBefore(R.glc, ref);
      host.insertBefore(R.fx, ref);
      R.visible = true;
      if ("IntersectionObserver" in window) {
        R.io = new IntersectionObserver((es) => (R.visible = es[es.length - 1].isIntersecting), { threshold: 0 });
        R.io.observe(host);
      }
      if ("ResizeObserver" in window) {
        R.ro = new ResizeObserver(resize);
        R.ro.observe(host);
      }
      addListeners();
      R.shown = false;
      setOpacity(0);
      resize();
      startLoop();
      return true;
    } catch (e) {
      R.broken = true;
      return false;
    }
  }
  function unmount(host) {
    if (host && R.host !== host) return;
    ++R.token;
    clearTimeout(R.preloadT);
    cancelAnimationFrame(R.raf);
    R.raf = 0;
    if (R.ro) R.ro.disconnect();
    if (R.io) R.io.disconnect();
    R.shown = false;
    R.cur = null;
    R.view = null;
    R.host = null;
    if (R.glc && R.glc.parentNode) R.glc.parentNode.removeChild(R.glc);
    if (R.fx && R.fx.parentNode) R.fx.parentNode.removeChild(R.fx);
    setOpacity(0);
  }
  function hide() {
    ++R.token;
    clearTimeout(R.preloadT);
    R.shown = false;
    setOpacity(0);
  }

  // art = { key, src, depth, focus, zoom, parallax }。成功したら true。失敗・WebGL なしは false（通常表示のままにする）
  async function show(art, o) {
    o = o || {};
    if (!R.host || R.broken) return false;
    const token = ++R.token;
    clearTimeout(R.preloadT);
    R.last = { art };
    try {
      if (R.shown && !o.first) {
        R.shown = false;
        setOpacity(0); // フェードアウト（約380ms）
        await sleep(FADE_MS);
        if (token !== R.token) return false;
      }
      const tex = await ensure(art);
      if (token !== R.token || !R.host) return false;
      R.cur = tex;
      seedParticles(tex.cfg);
      touch(art.key);
      resize();
      R.shown = true;
      R.lastT = performance.now() / 1000;
      render(performance.now());
      setOpacity(1); // フェードイン
      if (o.next && o.next.key) {
        const nx = o.next;
        R.preloadT = setTimeout(() => ensure(nx).catch(() => {}), PRELOAD_MS); // 次の絵は700ms後に先読み
      }
      return true;
    } catch (e) {
      if (window.console) console.warn("[parallax]", e.message || e);
      if (token === R.token) {
        R.shown = false;
        setOpacity(0);
      }
      return false;
    }
  }
  function preload(art, delay) {
    clearTimeout(R.preloadT);
    if (supported()) R.preloadT = setTimeout(() => ensure(art).catch(() => {}), delay == null ? PRELOAD_MS : delay);
  }
  function rect() {
    const v = R.view;
    if (!v || !R.shown || !R.host) return null;
    const cw = R.host.clientWidth, ch = R.host.clientHeight;
    return {
      ox: (((0 - v.cx) / v.sx) * v.Z + 0.5) * cw,
      oy: (1 - (((1 - v.cy) / v.sy) * v.Z + 0.5)) * ch,
      dw: (v.Z / v.sx) * cw,
      dh: (v.Z / v.sy) * ch,
    };
  }

  window.Parallax = {
    supported,
    mount,
    unmount,
    show,
    hide,
    preload,
    rect,
    DEFAULTS,
    active: (key) => !!(R.shown && R.cur && (!key || R.cur.key === key)),
    // 動作確認用
    debug: {
      get textures() { return R.order.slice(); },
      get host() { return R.host; },
      get cur() { return R.cur && R.cur.key; },
      get broken() { return R.broken; },
    },
  };
})();

// コース画面（ステージ）。1画面・固定・ページ送り。
// 画面のどこをタップしても次へ。左端のタップでひとつ前へ。操作する場所は動かさない。
(() => {
  "use strict";

  const G = window.GuideMap;
  if (!G) return;
  const { W, byId, esc } = G;

  const courses = new Map((W.courses || []).map((c) => [c.id, c]));
  const chars = new Map((W.characters || []).map((c) => [c.id, c]));

  const MAP_SRC = "assets/img/shinjuku-map.webp";
  const MAP_W = 1055;
  const MAP_H = 1125;
  const FONT_PX = { s: 15, m: 17, l: 19 };
  const AUTO_MS = { slow: [2800, 140], normal: [2000, 100], fast: [1300, 65] };
  const SHEET_CYCLE = ["half", "full", "name"];
  const SHEET_LABEL = { half: "文字の箱: ふつう", full: "文字の箱: ひろげる（ここまでの流れ）", name: "文字の箱: たたむ（絵だけ見る）" };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ---- 設定（ブラウザ内にだけ保存。保存できなくても動く）----
  const SETTINGS_KEY = "shinjuku.settings";
  const HINT_KEY = "shinjuku.hint-seen";
  const DEFAULTS = { font: "m", auto: "normal", wake: true, sheet: "half" };
  const settings = (() => {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch (e) {
      return { ...DEFAULTS };
    }
  })();
  const saveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      /* 保存できなくても続ける */
    }
  };

  const S = {
    course: null,
    char: null,
    step: 0,
    mode: "main", // main | detour
    main: [],
    det: [],
    beats: [],
    i: 0,
    mainI: 0,
    tookDetour: false,
    ended: false,
    auto: false,
    over: null, // map | settings | null
    place: null,
    scene: null, // { kind: "art"|"window", art, layout }
    timer: 0,
    lastTap: 0,
    wake: null,
  };

  let root = null;
  let ui = {};
  let layerCur = 0;
  let toastTimer = 0;

  const clamp = (v, a, b) => Math.min(Math.max(v, Math.min(a, b)), Math.max(a, b));
  const step = () => S.course.steps[S.step];
  const point = (id) => byId.get(id).map;

  // ============================================================
  // DOM
  // ============================================================
  const ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };
  const sheetIcon = (state) => {
    const h = { half: 7, full: 13, name: 2.5 }[state];
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="3"/><rect x="4" y="${21 - h}" width="16" height="${h}" rx="1.5" fill="currentColor" stroke="none"/></svg>`;
  };

  function build() {
    root = document.createElement("div");
    root.className = "stage";
    root.id = "stage";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.innerHTML =
      `<div class="stage__backdrop"></div>` +
      `<div class="stage__column" tabindex="-1">` +
      `<div class="stage__art">` +
      `<img class="stage__img" alt="" decoding="async"><img class="stage__img" alt="" decoding="async">` +
      `<div class="stage__window" hidden><img class="stage__avatar" alt=""></div>` +
      `<canvas class="stage__ripple"></canvas><div class="stage__shade"></div></div>` +
      `<div class="stage__top">` +
      `<button type="button" class="sbtn" data-act="exit" aria-label="コースをやめて地図へ">${ICON.back}</button>` +
      `<button type="button" class="stage__strip" data-act="map" aria-label="地図をひらく"></button>` +
      `<button type="button" class="sbtn" data-act="sheet"></button>` +
      `<button type="button" class="sbtn" data-act="auto" aria-pressed="false" aria-label="オート送り">${ICON.play}</button>` +
      `<button type="button" class="sbtn" data-act="settings" aria-label="設定">Aa</button>` +
      `</div>` +
      `<div class="stage__chip"></div>` +
      `<div class="stage__toast" role="status"></div>` +
      `<section class="sheet" aria-label="本文">` +
      `<div class="sheet__head"><img class="sheet__avatar" alt=""><span class="sheet__name"></span><span class="sheet__tag" hidden></span>` +
      `<span class="sheet__count"></span><span class="sheet__rest">ここをタップで本文へ</span></div>` +
      `<div class="sheet__text"><p class="sheet__line" aria-live="polite"></p></div>` +
      `<div class="sheet__log" aria-hidden="true"></div>` +
      `<div class="sheet__foot"></div>` +
      `<div class="sheet__end"></div>` +
      `</section>` +
      `<div class="ov ovmap" hidden></div>` +
      `<div class="ov ovset" hidden></div>` +
      `</div>`;
    document.body.appendChild(root);

    const q = (s) => root.querySelector(s);
    ui = {
      backdrop: q(".stage__backdrop"),
      column: q(".stage__column"),
      art: q(".stage__art"),
      imgs: [...root.querySelectorAll(".stage__img")],
      win: q(".stage__window"),
      avatar: q(".stage__avatar"),
      canvas: q(".stage__ripple"),
      strip: q(".stage__strip"),
      sheetBtn: q('[data-act="sheet"]'),
      autoBtn: q('[data-act="auto"]'),
      chip: q(".stage__chip"),
      toast: q(".stage__toast"),
      sheet: q(".sheet"),
      sAvatar: q(".sheet__avatar"),
      sName: q(".sheet__name"),
      sTag: q(".sheet__tag"),
      sCount: q(".sheet__count"),
      text: q(".sheet__text"),
      line: q(".sheet__line"),
      log: q(".sheet__log"),
      foot: q(".sheet__foot"),
      end: q(".sheet__end"),
      ovmap: q(".ovmap"),
      ovset: q(".ovset"),
    };
    ui.ctx = ui.canvas.getContext("2d");

    ui.column.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && isOpen()) lockScreen();
    });
  }

  const isOpen = () => !!root && !root.hidden;

  // ============================================================
  // 開く・閉じる
  // ============================================================
  function open(id, stepIndex) {
    const c = courses.get(id);
    if (!c) return;
    if (!root) build();
    S.course = c;
    S.char = chars.get(c.character);
    S.auto = false;
    S.over = null;
    root.style.setProperty("--guide", S.char.color || "#7fb8f0");
    root.setAttribute("aria-label", c.title);
    ui.sAvatar.src = S.char.icon;
    ui.avatar.src = S.char.icon;
    root.hidden = false;
    document.body.classList.add("stage-open");
    document.querySelectorAll(".site-header, .toolbar, main.layout").forEach((n) => (n.inert = true));
    applySettings();
    updateAutoBtn();
    buildStrip();
    lockScreen();
    const n = Number.isFinite(stepIndex) ? stepIndex : 0;
    enterStep(clamp(n, 0, c.steps.length - 1));
    ui.column.focus({ preventScroll: true });
    showHintOnce();
  }

  function close() {
    if (!isOpen()) return;
    clearTimeout(S.timer);
    clearTimeout(toastTimer);
    stopRipples();
    unlockScreen();
    root.hidden = true;
    S.course = null;
    S.over = null;
    document.body.classList.remove("stage-open");
    document.querySelectorAll(".site-header, .toolbar, main.layout").forEach((n) => (n.inert = false));
  }

  function applySettings() {
    root.style.setProperty("--fs", FONT_PX[settings.font] + "px");
    root.dataset.sheet = settings.sheet;
    ui.sheetBtn.innerHTML = sheetIcon(settings.sheet);
    ui.sheetBtn.setAttribute("aria-label", SHEET_LABEL[settings.sheet] + "（押すと切り替え）");
    ui.sheetBtn.title = SHEET_LABEL[settings.sheet];
  }

  function showHintOnce() {
    let seen = false;
    try {
      seen = !!localStorage.getItem(HINT_KEY);
      localStorage.setItem(HINT_KEY, "1");
    } catch (e) {
      /* 保存できなければ、毎回出す */
    }
    if (seen) return;
    toast("タップで次へ　／　左はしで前へ", 4200);
  }

  function toast(text, ms) {
    ui.toast.textContent = text;
    ui.toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => ui.toast.classList.remove("is-on"), ms || 2200);
  }

  // ============================================================
  // 画面を暗くしない（Wake Lock）
  // ============================================================
  async function lockScreen() {
    if (!settings.wake || S.wake || !("wakeLock" in navigator)) return;
    try {
      S.wake = await navigator.wakeLock.request("screen");
      S.wake.addEventListener("release", () => (S.wake = null));
    } catch (e) {
      S.wake = null;
    }
  }
  function unlockScreen() {
    if (S.wake) {
      S.wake.release().catch(() => {});
      S.wake = null;
    }
  }

  // ============================================================
  // ステップと台詞
  // ============================================================
  const toBeat = (ln, extra) => ({
    who: ln.who === "narration" ? "narration" : "char",
    expr: ln.expr || "normal",
    text: ln.text,
    ...extra,
  });

  function buildMain(st) {
    const done = G.loadCompleted();
    const beats = st.lines.map((l) => toBeat(l));
    (st.echoes || []).forEach((e) => {
      if (!done.has(e.after)) return;
      e.lines.forEach((l) => beats.push(toBeat(l, { label: e.label })));
    });
    return beats;
  }

  function enterStep(n, opts) {
    S.step = n;
    S.mode = "main";
    S.tookDetour = false;
    S.ended = false;
    root.classList.remove("is-ended");
    const st = step();
    S.main = buildMain(st);
    S.det = [];
    S.beats = S.main;
    S.i = opts && opts.atEnd ? S.beats.length - 1 : 0;
    history.replaceState(null, "", `#course/${S.course.id}/${S.step + 1}`);
    applyScene();
    showBeat();
  }

  function enterDetour() {
    const st = step();
    const d = st.detour;
    const pl = byId.get(d.place);
    S.mainI = S.i;
    S.mode = "detour";
    S.tookDetour = true;
    S.det = d.lines.map((l) => toBeat(l, { label: `寄り道 ─ ${pl.name}`, detour: true }));
    S.beats = S.det;
    S.i = 0;
    applyScene();
    showBeat();
  }

  function backToMain() {
    S.mode = "main";
    S.beats = S.main;
    S.i = S.mainI;
    applyScene();
    showBeat();
  }

  function next() {
    if (S.ended) return;
    if (S.i < S.beats.length - 1) {
      S.i++;
      showBeat();
      return;
    }
    primary();
  }

  function prev() {
    if (S.ended) return;
    if (S.i > 0) {
      S.i--;
      showBeat();
      return;
    }
    if (S.mode === "detour") {
      backToMain();
      return;
    }
    if (S.step > 0) enterStep(S.step - 1, { atEnd: true });
  }

  function primary() {
    if (S.mode === "detour") backToMain();
    else if (S.step < S.course.steps.length - 1) enterStep(S.step + 1);
    else finish();
  }

  // ============================================================
  // 本文の表示
  // ============================================================
  function showBeat() {
    const b = S.beats[S.i];
    const last = S.i === S.beats.length - 1;
    const narr = b.who === "narration";

    if (narr) {
      ui.sAvatar.hidden = true;
      ui.sName.textContent = S.place.name;
    } else {
      ui.sAvatar.hidden = false;
      ui.sAvatar.src = S.char.expressions[b.expr] || S.char.icon;
      ui.sName.textContent = S.char.short;
    }
    if (b.label) {
      ui.sTag.hidden = false;
      ui.sTag.textContent = b.label;
      ui.sTag.classList.toggle("is-detour", !!b.detour);
    } else {
      ui.sTag.hidden = true;
    }
    ui.sCount.textContent = `${S.i + 1} / ${S.beats.length}`;

    ui.line.className = "sheet__line " + (narr ? "is-narration" : "is-char");
    ui.line.textContent = b.text;
    ui.line.style.animation = "none";
    void ui.line.offsetWidth;
    ui.line.style.animation = "";
    fitText();
    renderLog();
    renderFoot(last);
    scheduleAuto();
  }

  function fitText() {
    if (!ui.text.clientHeight) return;
    let px = FONT_PX[settings.font];
    ui.line.style.fontSize = px + "px";
    let guard = 0;
    while (ui.line.scrollHeight > ui.text.clientHeight + 1 && px > 12.5 && guard++ < 24) {
      px -= 0.5;
      ui.line.style.fontSize = px + "px";
    }
  }

  function renderLog() {
    ui.log.innerHTML = S.beats
      .slice(0, S.i + 1)
      .slice(-8)
      .map((b, k, arr) => {
        const cur = k === arr.length - 1 ? " is-cur" : "";
        return b.who === "narration"
          ? `<p class="is-narration${cur}">${esc(b.text)}</p>`
          : `<p class="${cur.trim()}"><b>${esc(S.char.short)}</b>${esc(b.text)}</p>`;
      })
      .join("");
  }

  function renderFoot(last) {
    if (!last) {
      ui.foot.innerHTML = '<span class="hint" aria-hidden="true"></span>';
      return;
    }
    const st = step();
    let html = "";
    if (S.mode === "detour") {
      html = `<button type="button" class="choice choice--primary" data-act="primary"><small>つづき</small><b>本線にもどる</b></button>`;
    } else {
      if (st.detour && !S.tookDetour) {
        html += `<button type="button" class="choice choice--detour" data-act="detour" aria-label="${esc(st.detour.label)}"><small>寄り道</small><b>${esc(byId.get(st.detour.place).name)}</b></button>`;
      }
      const lastStep = S.step === S.course.steps.length - 1;
      html += lastStep
        ? `<button type="button" class="choice choice--primary" data-act="primary"><small>おしまい</small><b>コースを終える</b></button>`
        : `<button type="button" class="choice choice--primary" data-act="primary"><small>次の場所へ</small><b>${esc(byId.get(S.course.steps[S.step + 1].place).name)}</b></button>`;
    }
    ui.foot.innerHTML = `<div class="choices">${html}</div>`;
  }

  // ============================================================
  // 絵と、地図の窓
  // ============================================================
  function applyScene() {
    const st = step();
    const place = byId.get(S.mode === "detour" ? st.detour.place : st.place);
    S.place = place;
    const art = G.artFor(place, G.timeKeyOf(st.time));
    if (art) showArt(art);
    else showWindow(place);
    updateChip();
    updateStrip();
    document.title = `${S.course.title}｜${place.name}`;
  }

  function colSize() {
    return { w: ui.art.clientWidth, h: ui.art.clientHeight };
  }

  function artLayout(art, w, h, nat) {
    const iw = art.w || nat.w;
    const ih = art.h || nat.h;
    const s = Math.max(w / iw, h / ih) * (art.zoom || 1);
    const dw = iw * s;
    const dh = ih * s;
    const f = art.focus || { x: 50, y: 35 };
    // 見せ所（focus）を、画面の横の中央・縦の約1/3（文字の箱より上）へ寄せる。
    return { dw, dh, ox: clamp(0.5 * w - (f.x / 100) * dw, w - dw, 0), oy: clamp(0.32 * h - (f.y / 100) * dh, h - dh, 0) };
  }

  function placeImg(img, lay) {
    img.style.width = lay.dw + "px";
    img.style.height = lay.dh + "px";
    img.style.left = lay.ox + "px";
    img.style.top = lay.oy + "px";
  }

  function pickSrc(art, dw) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    return art.sm && art.smw && dw * dpr <= art.smw * 1.05 ? art.sm : art.src;
  }

  function showArt(art) {
    const { w, h } = colSize();
    const guess = artLayout(art, w, h, { w: 1000, h: 1500 });
    const url = pickSrc(art, guess.dw);
    const next = ui.imgs[1 - layerCur];
    const cur = ui.imgs[layerCur];
    ui.win.hidden = true;
    ui.backdrop.style.backgroundImage = `url("${art.src}")`;
    S.scene = { kind: "art", art, layout: guess };
    stopRipples();

    const done = (el) => {
      const lay = artLayout(art, w, h, { w: el.naturalWidth, h: el.naturalHeight });
      S.scene = { kind: "art", art, layout: lay };
      placeImg(el, lay);
      el.classList.add("is-on");
      if (el !== cur) {
        cur.classList.remove("is-on");
        layerCur = 1 - layerCur;
      }
    };
    if (cur.getAttribute("src") === url && cur.complete && cur.naturalWidth) {
      done(cur);
      return;
    }
    next.onload = () => done(next);
    next.onerror = () => showWindow(S.place);
    next.removeAttribute("src");
    next.src = url;
  }

  function showWindow(place) {
    const { w, h } = colSize();
    const s = Math.max(w / MAP_W, h / MAP_H) * 1.5;
    const dw = MAP_W * s;
    const dh = MAP_H * s;
    const p = place.map || { x: 50, y: 50 };
    const ox = clamp(0.5 * w - (p.x / 100) * dw, w - dw, 0);
    const oy = clamp(0.32 * h - (p.y / 100) * dh, h - dh, 0);
    ui.imgs.forEach((i) => i.classList.remove("is-on"));
    ui.win.hidden = false;
    ui.win.style.backgroundImage = `url("${MAP_SRC}")`;
    ui.win.style.backgroundSize = `${dw}px ${dh}px`;
    ui.win.style.backgroundPosition = `${ox}px ${oy}px`;
    ui.avatar.style.left = ox + (p.x / 100) * dw + "px";
    ui.avatar.style.top = oy + (p.y / 100) * dh + "px";
    ui.backdrop.style.backgroundImage = `url("${MAP_SRC}")`;
    S.scene = { kind: "window", art: null, layout: null };
    stopRipples();
  }

  function onResize() {
    if (!isOpen() || !S.place) return;
    if (S.scene && S.scene.kind === "art") {
      const cur = ui.imgs[layerCur];
      const { w, h } = colSize();
      S.scene.layout = artLayout(S.scene.art, w, h, { w: cur.naturalWidth, h: cur.naturalHeight });
      placeImg(cur, S.scene.layout);
    } else {
      showWindow(S.place);
    }
    sizeCanvas();
    fitText();
  }

  function updateChip() {
    const st = step();
    const detour = S.mode === "detour" ? "（寄り道）" : "";
    ui.chip.innerHTML = `${S.step + 1}/${S.course.steps.length}　${esc(S.place.name)}${detour}<em>${esc(st.time || "")}</em>`;
  }

  function buildStrip() {
    const n = S.course.steps.length;
    let html = "";
    for (let k = 0; k < n; k++) html += (k ? "<b></b>" : "") + "<i></i>";
    ui.strip.innerHTML = html;
    ui.strip.setAttribute("aria-label", `地図をひらく（${n}か所）`);
  }
  function updateStrip() {
    const dots = ui.strip.querySelectorAll("i");
    const bars = ui.strip.querySelectorAll("b");
    dots.forEach((d, k) => {
      d.className = k < S.step ? "is-done" : k === S.step ? "is-cur" : "";
    });
    bars.forEach((b, k) => {
      b.className = k < S.step ? "is-done" : "";
    });
  }

  // ============================================================
  // 波紋（水面・床の領域に、タップで輪が広がる）
  // ============================================================
  const rip = { rings: [], raf: 0, w: 0, h: 0 };

  function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { w, h } = colSize();
    ui.canvas.width = Math.round(w * dpr);
    ui.canvas.height = Math.round(h * dpr);
    ui.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rip.w = w;
    rip.h = h;
  }

  function rippleRects() {
    const sc = S.scene;
    if (!sc || sc.kind !== "art" || !sc.art.ripple || !sc.layout) return [];
    const L = sc.layout;
    return sc.art.ripple.map((r) => ({
      x0: L.ox + (r.x[0] / 100) * L.dw,
      x1: L.ox + (r.x[1] / 100) * L.dw,
      y0: L.oy + (r.y[0] / 100) * L.dh,
      y1: L.oy + (r.y[1] / 100) * L.dh,
      power: r.power == null ? 1 : r.power,
    }));
  }

  function spawnRipple(x, y, quiet) {
    if (reduceMotion.matches) return;
    const rects = rippleRects();
    if (!rects.length) return;
    // 波紋の範囲の外をタップしたら、いちばん近い範囲の縁に出す
    let best = null;
    let bestD = Infinity;
    for (const r of rects) {
      const cx = clamp(x, r.x0, r.x1);
      const cy = clamp(y, r.y0, r.y1);
      const d = (cx - x) ** 2 + (cy - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = { x: cx, y: cy, power: r.power };
      }
    }
    if (quiet && best) best.power *= 0.7;
    if (!rip.w) sizeCanvas();
    rip.rings.push({ ...best, t0: performance.now() });
    if (!rip.raf) rip.raf = requestAnimationFrame(drawRipples);
  }

  function randomRipple() {
    const rects = rippleRects();
    if (!rects.length) return;
    const r = rects[Math.floor(Math.random() * rects.length)];
    spawnRipple(r.x0 + Math.random() * (r.x1 - r.x0), r.y0 + Math.random() * (r.y1 - r.y0), true);
  }

  function drawRipples(now) {
    const ctx = ui.ctx;
    ctx.clearRect(0, 0, rip.w, rip.h);
    const rects = rippleRects();
    ctx.save();
    ctx.beginPath();
    rects.forEach((r) => ctx.rect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0));
    ctx.clip();
    rip.rings = rip.rings.filter((g) => now - g.t0 < 2100);
    for (const g of rip.rings) {
      const t = (now - g.t0) / 1800;
      for (let k = 0; k < 3; k++) {
        const tk = t - k * 0.13;
        if (tk <= 0 || tk >= 1) continue;
        const r = (8 + tk * 120) * (0.7 + 0.3 * g.power);
        const a = Math.pow(1 - tk, 1.7) * 0.7 * g.power;
        ctx.lineWidth = 6 * (1 - tk) + 1;
        ctx.strokeStyle = `rgba(150, 215, 255, ${a * 0.22})`;
        ctx.beginPath();
        ctx.ellipse(g.x, g.y, r, r * 0.36, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1.6 * (1 - tk) + 0.5;
        ctx.strokeStyle = `rgba(240, 250, 255, ${a})`;
        ctx.beginPath();
        ctx.ellipse(g.x, g.y, r, r * 0.36, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();
    rip.raf = rip.rings.length ? requestAnimationFrame(drawRipples) : 0;
    if (!rip.rings.length) ctx.clearRect(0, 0, rip.w, rip.h);
  }

  function stopRipples() {
    if (rip.raf) cancelAnimationFrame(rip.raf);
    rip.raf = 0;
    rip.rings = [];
    if (ui.ctx && rip.w) ui.ctx.clearRect(0, 0, rip.w, rip.h);
    sizeCanvas();
  }

  // ============================================================
  // オート送り
  // ============================================================
  function scheduleAuto() {
    clearTimeout(S.timer);
    if (!S.auto || S.over || S.ended || settings.sheet === "name") return;
    if (S.i >= S.beats.length - 1) return; // 選択肢のところで止まる
    const [base, per] = AUTO_MS[settings.auto];
    const ms = Math.min(12000, base + per * S.beats[S.i].text.length);
    S.timer = setTimeout(() => {
      randomRipple();
      next();
    }, ms);
  }

  function toggleAuto() {
    S.auto = !S.auto;
    updateAutoBtn();
    toast(S.auto ? "オート送り: ひらく" : "オート送り: とめる", 1400);
    scheduleAuto();
  }
  function updateAutoBtn() {
    ui.autoBtn.setAttribute("aria-pressed", String(S.auto));
    ui.autoBtn.innerHTML = S.auto ? ICON.pause : ICON.play;
  }

  // ============================================================
  // 終わり
  // ============================================================
  function finish() {
    G.markCompleted(S.course.id);
    S.ended = true;
    clearTimeout(S.timer);
    root.classList.add("is-ended");
    const done = G.loadCompleted();
    const others = (W.courses || []).filter((c) => c.id !== S.course.id);
    const next = others.length
      ? `<div class="others"><small>ほかのコース</small>` +
        others
          .map((c) => {
            const ch = chars.get(c.character);
            return `<button type="button" class="endbtn endbtn--small" data-course="${esc(c.id)}">${ch ? esc(ch.short) + "と歩く：" : ""}${esc(c.title)}${done.has(c.id) ? "（歩いた）" : ""}</button>`;
          })
          .join("") +
        `</div>`
      : "";
    ui.end.innerHTML =
      `<img src="${esc(S.char.icon)}" alt="">` +
      `<h3>${esc(S.course.title)}　おわり</h3>` +
      `<p>${esc(S.course.summary || "")}</p>` +
      `<div class="endbtns"><button type="button" class="endbtn" data-act="replay">もう一度歩く</button>` +
      `<button type="button" class="endbtn endbtn--primary" data-act="exit">地図にもどる</button></div>` +
      next;
    const b = ui.end.querySelector(".endbtn--primary");
    if (b) b.focus({ preventScroll: true });
  }

  // ============================================================
  // 地図（重ねて開く）と設定
  // ============================================================
  function curve(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return `M ${a.x} ${a.y} Q ${mx - dy * 0.14} ${my + dx * 0.14} ${b.x} ${b.y}`;
  }

  function openMap() {
    const steps = S.course.steps;
    let paths = "";
    for (let n = 0; n < steps.length - 1; n++) {
      paths += `<path class="${n < S.step ? "is-done" : "is-todo"}" d="${curve(point(steps[n].place), point(steps[n + 1].place))}"/>`;
    }
    if (S.mode === "detour") paths += `<path class="is-detour" d="${curve(point(step().place), point(step().detour.place))}"/>`;
    let stops = steps
      .map((st, n) => {
        const p = point(st.place);
        return `<span class="ovmap__stop ${n < S.step ? "is-done" : n === S.step ? "is-cur" : ""}" style="--x:${p.x}%;--y:${p.y}%">${n + 1}</span>`;
      })
      .join("");
    if (S.mode === "detour") {
      const p = point(step().detour.place);
      stops += `<span class="ovmap__stop is-detour" style="--x:${p.x}%;--y:${p.y}%">＋</span>`;
    }
    const me = S.place.map;
    ui.ovmap.innerHTML =
      `<button type="button" class="sbtn ov__close" data-act="close-ov" aria-label="とじる">${ICON.close}</button>` +
      `<div><div class="ovmap__box"><img class="ovmap__img" src="${MAP_SRC}" alt="ロケーションマップ">` +
      `<svg class="ovmap__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>${stops}` +
      `<img class="ovmap__me${me.y < 14 ? " is-below" : ""}" src="${esc(S.char.icon)}" alt="" style="--x:${me.x}%;--y:${me.y}%"></div>` +
      `<p class="ovmap__cap">${S.step + 1} / ${steps.length}　${esc(S.place.name)}</p></div>`;
    ui.ovmap.hidden = false;
    S.over = "map";
    clearTimeout(S.timer);
    ui.ovmap.querySelector(".ov__close").focus({ preventScroll: true });
  }

  function openSettings() {
    const seg = (key, items) =>
      `<div class="seg" role="group">` +
      items.map(([v, label]) => `<button type="button" data-set="${key}:${v}" aria-pressed="${String(settings[key]) === String(v)}">${label}</button>`).join("") +
      `</div>`;
    const wakeOk = "wakeLock" in navigator;
    ui.ovset.innerHTML =
      `<button type="button" class="sbtn ov__close" data-act="close-ov" aria-label="とじる">${ICON.close}</button>` +
      `<div class="settings"><h2>読みかた</h2>` +
      `<div class="row"><span>文字の大きさ</span>${seg("font", [["s", "小"], ["m", "中"], ["l", "大"]])}</div>` +
      `<div class="row"><span>オート送りの速さ</span>${seg("auto", [["slow", "ゆっくり"], ["normal", "ふつう"], ["fast", "はやく"]])}</div>` +
      `<div class="row"><span>画面を暗くしない</span>${seg("wake", [["true", "オン"], ["false", "オフ"]])}` +
      (wakeOk ? "" : `<div class="note">この端末・ブラウザでは使えません</div>`) + `</div>` +
      `<p class="tips">画面のどこをタップしても、次へ進みます。左はしをタップすると、ひとつ前に戻ります。<br>キー: → / Space で次へ、← で前へ、M で地図、A でオート送り。</p></div>`;
    ui.ovset.hidden = false;
    S.over = "settings";
    clearTimeout(S.timer);
    ui.ovset.querySelector(".ov__close").focus({ preventScroll: true });
  }

  function closeOverlay() {
    ui.ovmap.hidden = true;
    ui.ovset.hidden = true;
    S.over = null;
    ui.column.focus({ preventScroll: true });
    scheduleAuto();
  }

  function setSheet(state) {
    settings.sheet = state;
    saveSettings();
    applySettings();
    setTimeout(fitText, 320);
    scheduleAuto();
  }

  // ============================================================
  // 入力
  // ============================================================
  function onClick(e) {
    const t = e.target;
    const actEl = t.closest("[data-act]");
    const courseEl = t.closest("[data-course]");
    const setEl = t.closest("[data-set]");

    if (setEl) {
      const [key, val] = setEl.dataset.set.split(":");
      settings[key] = key === "wake" ? val === "true" : val;
      saveSettings();
      if (key === "wake") (settings.wake ? lockScreen() : unlockScreen());
      applySettings();
      openSettings();
      fitText();
      return;
    }
    if (courseEl && ui.end.contains(courseEl)) {
      G.openCourse(courseEl.dataset.course);
      return;
    }
    if (actEl) {
      const a = actEl.dataset.act;
      if (a === "exit") G.go(G.ROOT_ID);
      else if (a === "map") openMap();
      else if (a === "settings") openSettings();
      else if (a === "close-ov") closeOverlay();
      else if (a === "auto") toggleAuto();
      else if (a === "sheet") setSheet(SHEET_CYCLE[(SHEET_CYCLE.indexOf(settings.sheet) + 1) % SHEET_CYCLE.length]);
      else if (a === "primary") {
        spawnRippleAt(e);
        primary();
      } else if (a === "detour") enterDetour();
      else if (a === "replay") enterStep(0);
      if (a !== "exit") ui.column.focus({ preventScroll: true });
      return;
    }
    if (S.over) {
      if (t.classList.contains("ov")) closeOverlay(); // 重ねた画面の外側をタップ → とじる
      return;
    }
    if (t.closest(".stage__top, .sheet__end, button, a")) return;

    // ---- 画面のどこかをタップ ----
    const now = performance.now();
    if (now - S.lastTap < 200) return;
    S.lastTap = now;
    if (S.ended) return;
    if (settings.sheet === "name") {
      if (t.closest(".sheet")) setSheet("half");
      else spawnRippleAt(e);
      return;
    }
    const r = ui.column.getBoundingClientRect();
    if (e.clientX - r.left < r.width * 0.2) {
      prev();
      return;
    }
    spawnRippleAt(e);
    next();
  }

  function spawnRippleAt(e) {
    const r = ui.column.getBoundingClientRect();
    spawnRipple(e.clientX - r.left, e.clientY - r.top);
  }

  function onKey(e) {
    if (!isOpen()) return;
    const t = e.target;
    if (t && t.closest && t.closest("input, select, textarea")) return;
    const k = e.key;
    if (k === "Escape") {
      e.preventDefault();
      if (S.over) closeOverlay();
      else G.go(G.ROOT_ID);
      return;
    }
    if (S.over) return;
    const onBtn = t && t.closest && t.closest("button");
    if (k === "ArrowRight" || k === "PageDown" || ((k === " " || k === "Enter") && !onBtn)) {
      e.preventDefault();
      if (settings.sheet === "name") setSheet("half");
      else next();
    } else if (k === "ArrowLeft" || k === "PageUp" || k === "Backspace") {
      e.preventDefault();
      prev();
    } else if (k === "m" || k === "M") openMap();
    else if (k === "a" || k === "A") toggleAuto();
  }

  window.GuideCourse = { open, close };

  // map.js より後に読み込まれるので、コースのURLで開かれた場合は、ここで開き直す
  if (/^#course\//.test(location.hash)) G.route();
})();

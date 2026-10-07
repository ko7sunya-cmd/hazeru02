(() => {
  "use strict";

  const G = window.GuideMap;
  if (!G) return;
  const { W, byId, esc, $pins, $panel } = G;

  const courses = new Map((W.courses || []).map((c) => [c.id, c]));
  const chars = new Map((W.characters || []).map((c) => [c.id, c]));

  const $layer = document.getElementById("course-layer");
  const $svg = $layer.querySelector("svg");
  const $stops = $layer.querySelector(".course-stops");
  const $marker = document.getElementById("course-marker");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const S = { course: null, char: null, step: 0, mode: "main", i: 0, j: 0, tookDetour: false, queue: [] };
  let $log = null;
  let $actions = null;

  const place = (id) => byId.get(id);
  const point = (id) => place(id).map;
  const curStep = () => S.course.steps[S.step];

  // ---- map overlay ----
  function curve(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const bend = 0.14;
    return `M ${a.x} ${a.y} Q ${mx - dy * bend} ${my + dx * bend} ${b.x} ${b.y}`;
  }

  function drawRoute() {
    const steps = S.course.steps;
    const color = S.char ? S.char.color : "#7fb8f0";
    $layer.style.setProperty("--route", color);

    let paths = "";
    for (let n = 0; n < steps.length - 1; n++) {
      const cls = n < S.step ? "is-done" : "is-todo";
      paths += `<path class="${cls}" d="${curve(point(steps[n].place), point(steps[n + 1].place))}"/>`;
    }
    if (S.mode === "detour") {
      paths += `<path class="is-detour" d="${curve(point(curStep().place), point(curStep().detour.place))}"/>`;
    }
    $svg.innerHTML = paths;

    let stops = steps
      .map((st, n) => {
        const p = point(st.place);
        const cls = n < S.step ? "is-done" : n === S.step ? "is-current" : "is-todo";
        return `<span class="course-stop ${cls}" style="--x:${p.x}%;--y:${p.y}%">${n + 1}</span>`;
      })
      .join("");
    if (S.mode === "detour") {
      const p = point(curStep().detour.place);
      stops += `<span class="course-stop is-detour" style="--x:${p.x}%;--y:${p.y}%">＋</span>`;
    }
    $stops.innerHTML = stops;
  }

  function moveMarker(placeId) {
    const p = point(placeId);
    $marker.style.setProperty("--x", p.x + "%");
    $marker.style.setProperty("--y", p.y + "%");
  }

  // ---- panel ----
  function renderShell() {
    const c = S.course;
    $panel.setAttribute("aria-live", "off");
    $panel.innerHTML =
      `<div class="course">` +
      `<button type="button" class="course__exit" data-act="exit">‹ コースをやめて地図へ</button>` +
      `<p class="course__eyebrow">${esc(S.char.short)}と歩く</p>` +
      `<h2 class="course__title">${esc(c.title)}</h2>` +
      `<p class="course__sub">${esc(c.subtitle || "")}${c.duration ? `<span>${esc(c.duration)}</span>` : ""}</p>` +
      `<div id="course-stage"></div></div>`;
  }

  function progress() {
    const dots = S.course.steps
      .map((st, n) => {
        const cls = n < S.step ? "is-done" : n === S.step ? "is-current" : "";
        return `<li class="${cls}" title="${esc(place(st.place).name)}"></li>`;
      })
      .join("");
    return `<ol class="course-progress" aria-hidden="true">${dots}</ol>`;
  }

  function peek(p) {
    const body = p.body.map((t) => `<p>${esc(t)}</p>`).join("");
    const rumor = p.rumor ? `<p class="peek__rumor">${esc(p.rumor)}</p>` : "";
    return (
      `<details class="peek"><summary>この場所について</summary>` +
      `<p class="peek__summary">${esc(p.summary)}</p>${body}${rumor}</details>`
    );
  }

  // この場所を、別のコースでも歩く場合のリンク
  function alsoHere(placeId) {
    const others = (G.visits.get(placeId) || []).filter((v) => v.course.id !== S.course.id);
    if (!others.length) return "";
    const links = others
      .map((v) => {
        const ch = G.charById.get(v.course.character);
        return `<button type="button" class="course-also__link" data-course="${esc(v.course.id)}" data-step="${v.step}">${ch ? esc(ch.short) + "と歩く：" : ""}${esc(v.course.title)}（${v.step}か所目${v.detour ? "の寄り道" : ""}）</button>`;
      })
      .join("");
    return `<p class="course-also"><span>この場所は、別のコースでも通ります</span>${links}</p>`;
  }

  // 別のコースを歩き終えた人にだけ出る「呼応」の数行を、本線のセリフの後ろにつなぐ
  function buildQueue(st) {
    const done = G.loadCompleted();
    const queue = [...st.lines];
    (st.echoes || []).forEach((e) => {
      if (!done.has(e.after)) return;
      queue.push({ divider: e.label, echo: true });
      queue.push(...e.lines);
    });
    return queue;
  }

  function enterStep(n) {
    S.step = Math.max(0, Math.min(n, S.course.steps.length - 1));
    S.mode = "main";
    S.i = 0;
    S.j = 0;
    S.tookDetour = false;
    S.queue = buildQueue(curStep());
    history.replaceState(null, "", `#course/${S.course.id}/${S.step + 1}`);

    const st = curStep();
    const p = place(st.place);
    const stage = document.getElementById("course-stage");
    stage.innerHTML =
      progress() +
      `<div class="course-place">` +
      `<span class="course-place__time">${esc(st.time || "")}</span>` +
      `<span class="course-place__no">${S.step + 1} / ${S.course.steps.length}</span>` +
      `<h3 class="course-place__name">${esc(p.name)}</h3>` +
      `<span class="course-place__sub">${esc(p.en)}</span>` +
      `</div>` +
      peek(p) +
      alsoHere(st.place) +
      `<div class="log" id="course-log" aria-live="polite"></div>` +
      `<div class="actions" id="course-actions"></div>`;
    $log = document.getElementById("course-log");
    $actions = document.getElementById("course-actions");

    document.title = `${S.course.title}｜${p.name}`;
    drawRoute();
    moveMarker(st.place);
    next({ focus: false });
    $panel.scrollTop = 0;
  }

  // ---- dialogue ----
  function appendLine(ln) {
    let el;
    if (ln.who === "narration") {
      el = document.createElement("p");
      el.className = "msg msg--narration";
      el.textContent = ln.text;
    } else {
      const expr = ln.expr && S.char.expressions[ln.expr] ? ln.expr : "normal";
      el = document.createElement("div");
      el.className = "msg msg--char";
      el.innerHTML =
        `<img class="msg__icon" src="${esc(S.char.expressions[expr])}" alt="" width="44" height="44">` +
        `<div class="msg__body"><span class="msg__name">${esc(S.char.short)}</span><p></p></div>`;
      el.querySelector("p").textContent = ln.text;
    }
    $log.appendChild(el);
  }

  function appendDivider(text, echo) {
    const el = document.createElement("p");
    el.className = "msg-divider" + (echo ? " msg-divider--echo" : "");
    el.textContent = text;
    $log.appendChild(el);
  }

  const lines = () => (S.mode === "main" ? S.queue : curStep().detour.lines);
  const pointer = () => (S.mode === "main" ? S.i : S.j);
  const advancePointer = () => {
    if (S.mode === "main") S.i++;
    else S.j++;
  };

  function next({ focus = true } = {}) {
    const ls = lines();
    // 見出し（呼応の区切り）は、次のセリフと一緒に出す
    while (pointer() < ls.length && ls[pointer()].divider) {
      appendDivider(ls[pointer()].divider, ls[pointer()].echo);
      advancePointer();
    }
    if (pointer() < ls.length) {
      appendLine(ls[pointer()]);
      advancePointer();
    }
    renderActions(focus);
    if (focus) {
      ($log.lastElementChild || $log).scrollIntoView({ block: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
  }

  function renderActions(focus) {
    const st = curStep();
    const more = pointer() < lines().length;
    const last = S.step === S.course.steps.length - 1;
    let html = "";
    if (more) {
      html = `<button type="button" class="act act--primary" data-act="next">つづき ▾</button>`;
    } else if (S.mode === "detour") {
      html = `<button type="button" class="act act--primary" data-act="back">本線にもどる</button>`;
    } else {
      if (st.detour && !S.tookDetour) {
        html += `<button type="button" class="act act--detour" data-act="detour">寄り道：${esc(st.detour.label)}</button>`;
      }
      html += last
        ? `<button type="button" class="act act--primary" data-act="finish">コースを終える</button>`
        : `<button type="button" class="act act--primary" data-act="advance">次へ：${esc(place(S.course.steps[S.step + 1].place).name)} →</button>`;
    }
    $actions.innerHTML = html;
    if (focus) {
      const primary = $actions.querySelector(".act--primary");
      if (primary) primary.focus({ preventScroll: true });
    }
  }

  function showEnd() {
    G.markCompleted(S.course.id);
    const done = G.loadCompleted();
    const others = (W.courses || []).filter((c) => c.id !== S.course.id);
    const next = others.length
      ? `<div class="course-end__next"><p>ほかのコース</p>` +
        others
          .map((c) => {
            const ch = G.charById.get(c.character);
            return `<button type="button" class="course-end__course" data-course="${esc(c.id)}">${ch ? esc(ch.short) + "と歩く：" : ""}${esc(c.title)}${done.has(c.id) ? "（歩いた）" : ""}</button>`;
          })
          .join("") +
        `</div>`
      : "";
    $actions.innerHTML =
      `<div class="course-end">` +
      `<img class="course-end__icon" src="${esc(S.char.icon)}" alt="" width="64" height="64">` +
      `<p class="course-end__title">${esc(S.course.title)}　おわり</p>` +
      `<p class="course-end__text">${esc(S.course.summary || "")}</p>` +
      `<div class="course-end__buttons">` +
      `<button type="button" class="act" data-act="replay">もう一度歩く</button>` +
      `<button type="button" class="act act--primary" data-act="exit">地図にもどる</button>` +
      `</div>${next}</div>`;
    $actions.querySelector(".act--primary").focus({ preventScroll: true });
    $actions.scrollIntoView({ block: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
  }

  const handlers = {
    next: () => next(),
    detour() {
      const d = curStep().detour;
      S.mode = "detour";
      S.tookDetour = true;
      S.j = 0;
      appendDivider(`寄り道 ─ ${place(d.place).name}`);
      drawRoute();
      moveMarker(d.place);
      next();
    },
    back() {
      S.mode = "main";
      appendDivider("本線にもどる");
      drawRoute();
      moveMarker(curStep().place);
      renderActions(true);
    },
    advance: () => enterStep(S.step + 1),
    finish: showEnd,
    replay: () => enterStep(0),
    exit: () => G.go(G.ROOT_ID),
  };

  $panel.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (b && S.course && handlers[b.dataset.act]) handlers[b.dataset.act]();
  });

  // ---- open / close ----
  function open(id, stepIndex) {
    const c = courses.get(id);
    if (!c) return;
    const sameCourse = S.course && S.course.id === id;
    S.course = c;
    S.char = chars.get(c.character);
    document.body.classList.add("is-course");
    $pins.inert = true;
    $layer.hidden = false;
    $marker.querySelector("img").src = S.char.icon;
    if (!sameCourse || !document.getElementById("course-stage")) renderShell();
    enterStep(Number.isFinite(stepIndex) ? stepIndex : 0);
  }

  function close() {
    if (!S.course) return;
    S.course = null;
    document.body.classList.remove("is-course");
    $pins.inert = false;
    $layer.hidden = true;
    $svg.innerHTML = "";
    $stops.innerHTML = "";
    $panel.setAttribute("aria-live", "polite");
  }

  window.GuideCourse = { open, close };

  // course.js は map.js より後に読み込まれるので、コースのURLで開かれた場合はここで開き直す
  if (/^#course\//.test(location.hash)) G.route();
})();

(() => {
  "use strict";

  const W = window.WORLD;
  if (!W) return;

  const byId = new Map(W.places.map((p) => [p.id, p]));
  const ROOT_ID = "shinjuku";
  const layers = W.places.filter((p) => p.type === "layer");
  const LAYER_SHORT = { "up-city": "上層", "bd-market": "境界", "lo-old": "下層" };

  const state = {
    layer: "all",
    categories: new Set(Object.keys(W.categories)),
    selected: ROOT_ID,
  };

  const $pins = document.getElementById("pins");
  const $panel = document.getElementById("panel");
  const $tabs = document.getElementById("layer-tabs");
  const $chips = document.getElementById("category-chips");
  const mobile = window.matchMedia("(max-width: 900px)");

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // 歩き終えたコースの記録。ブラウザ内にだけ保存し、使えない環境では「記録なし」として動く。
  const STORE_KEY = "shinjuku.completed";
  const loadCompleted = () => {
    try {
      const v = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      return new Set(Array.isArray(v) ? v : []);
    } catch (e) {
      return new Set();
    }
  };
  const markCompleted = (id) => {
    try {
      const done = loadCompleted();
      done.add(id);
      localStorage.setItem(STORE_KEY, JSON.stringify([...done]));
    } catch (e) {
      /* 保存できなくても、コースは遊べる */
    }
  };

  // 場所ID -> その場所を通るコースの一覧（step は1始まり。寄り道で通る場合は detour: true）
  const charById = new Map((W.characters || []).map((c) => [c.id, c]));
  const visits = new Map();
  (W.courses || []).forEach((c) =>
    c.steps.forEach((st, i) => {
      const add = (pid, detour) => {
        if (!visits.has(pid)) visits.set(pid, []);
        visits.get(pid).push({ course: c, step: i + 1, detour });
      };
      add(st.place, false);
      if (st.detour) add(st.detour.place, true);
    })
  );

  const catColor = (p) => (p.category ? W.categories[p.category].color : "var(--accent)");

  // ---- toolbar ----
  function renderToolbar() {
    const tabs = [{ id: "all", label: "すべて" }, ...layers.map((l) => ({ id: l.id, label: LAYER_SHORT[l.id] || l.name }))];
    $tabs.innerHTML = tabs
      .map((t) => `<button type="button" class="tab" data-layer="${t.id}" aria-pressed="${state.layer === t.id}">${esc(t.label)}</button>`)
      .join("");
    $chips.innerHTML = Object.entries(W.categories)
      .map(
        ([id, c]) =>
          `<button type="button" class="chip" data-cat="${id}" aria-pressed="${state.categories.has(id)}" title="${esc(c.description)}" style="--c:${c.color}">` +
          `<span class="chip__dot" aria-hidden="true"></span>${esc(c.label)}</button>`
      )
      .join("");
  }

  $tabs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-layer]");
    if (!b) return;
    state.layer = b.dataset.layer;
    renderToolbar();
    updatePins();
    if (state.layer !== "all") go(state.layer);
  });

  $chips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    const id = b.dataset.cat;
    if (state.categories.has(id) && state.categories.size === 1) {
      // 最後のひとつを外そうとしたら、全部に戻す
      Object.keys(W.categories).forEach((c) => state.categories.add(c));
    } else if (state.categories.has(id)) {
      state.categories.delete(id);
    } else {
      state.categories.add(id);
    }
    renderToolbar();
    updatePins();
  });

  // ---- pins ----
  function renderPins() {
    $pins.innerHTML = W.places
      .filter((p) => p.map)
      .map((p) => {
        const cls = ["pin", p.type === "layer" ? "pin--layer" : ""];
        if (p.map.x > 78) cls.push("is-edge-right");
        if (p.map.x < 14) cls.push("is-edge-left");
        if (p.map.y < 8) cls.push("is-edge-top");
        return (
          `<button type="button" class="${cls.join(" ")}" data-id="${p.id}" ` +
          `style="--x:${p.map.x}%;--y:${p.map.y}%;--c:${catColor(p)}" aria-label="${esc(p.name)}">` +
          `<span class="pin__label" aria-hidden="true">${esc(p.name)}</span></button>`
        );
      })
      .join("");
  }

  function isVisible(p) {
    if (p.id === state.selected) return true;
    if (state.layer !== "all" && p.layer !== state.layer) return false;
    if (p.category && !state.categories.has(p.category)) return false;
    return true;
  }

  function descendants(id) {
    const out = new Set();
    const walk = (pid) => byId.get(pid).children.forEach((c) => { out.add(c); walk(c); });
    walk(id);
    return out;
  }

  function updatePins() {
    const sel = byId.get(state.selected);
    const related = sel && sel.type !== "world" ? descendants(sel.id) : new Set();
    if (sel && sel.type !== "world") sel.adjacent.forEach((a) => byId.get(a.to).type !== "layer" && related.add(a.to));
    $pins.querySelectorAll(".pin").forEach((el) => {
      const p = byId.get(el.dataset.id);
      el.hidden = !isVisible(p);
      el.classList.toggle("is-active", p.id === state.selected);
      el.classList.toggle("is-related", related.has(p.id));
      el.setAttribute("aria-pressed", String(p.id === state.selected));
    });
  }

  $pins.addEventListener("click", (e) => {
    const b = e.target.closest("[data-id]");
    if (b) go(b.dataset.id, { scroll: true });
  });

  // ---- panel ----
  function ancestors(p) {
    const out = [];
    let cur = byId.get(p.parent);
    while (cur) {
      out.unshift(cur);
      cur = byId.get(cur.parent);
    }
    return out;
  }

  function placeLink(p, { group = false, desc = false } = {}) {
    const dot = p.category ? `<span class="chip__dot" style="--c:${catColor(p)}" aria-hidden="true"></span>` : "";
    const sub = p.alias ? `<span class="place-link__sub">${esc(p.alias)}</span>` : p.category ? `<span class="place-link__sub">${esc(W.categories[p.category].label)}</span>` : "";
    return (
      `<button type="button" class="place-link${group ? " place-link--group" : ""}" data-go="${p.id}">${dot}` +
      `<span><span class="place-link__name">${esc(p.name)}</span> ${sub}` +
      (desc ? `<span class="place-link__desc">${esc(p.summary)}</span>` : "") +
      `</span></button>`
    );
  }

  function childList(p) {
    const kids = p.children.map((id) => byId.get(id));
    if (!kids.length) return "";
    if (p.type === "world") {
      return `<h3 class="section-title">三つの層</h3><ul class="place-list">${kids.map((k) => `<li>${placeLink(k, { group: true, desc: true })}</li>`).join("")}</ul>`;
    }
    const items = kids
      .map((k) => {
        const grand = k.children.map((id) => byId.get(id));
        const sub = grand.length ? `<ul class="place-list">${grand.map((g) => `<li>${placeLink(g)}</li>`).join("")}</ul>` : "";
        return `<li>${placeLink(k, { group: k.type === "district" })}${sub}</li>`;
      })
      .join("");
    const title = p.type === "layer" ? "街区とスポット" : "この街区の場所";
    return `<h3 class="section-title">${title}</h3><ul class="place-list">${items}</ul>`;
  }

  function prose(p) {
    if (p.essay) {
      const lead = p.essay.lead.map((t) => `<p>${esc(t)}</p>`).join("");
      const secs = p.essay.sections.map((s) => `<h3>${esc(s.heading)}</h3>${s.paras.map((t) => `<p>${esc(t)}</p>`).join("")}`).join("");
      return `<div class="prose">${lead}${secs}</div>`;
    }
    return p.body.length ? `<div class="prose">${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>` : "";
  }

  function coursesSection() {
    const done = loadCompleted();
    const list = (W.courses || [])
      .map((c) => {
        const ch = charById.get(c.character);
        const icon = ch ? `<img class="course-card__icon" src="${esc(ch.icon)}" alt="" width="56" height="56">` : "";
        const badge = done.has(c.id) ? `<span class="course-card__done">歩いた</span>` : "";
        return (
          `<li><button type="button" class="course-card" data-course="${esc(c.id)}">${icon}` +
          `<span class="course-card__text"><span class="course-card__label">${ch ? esc(ch.short) + "と歩く" : "コース"}${badge}</span>` +
          `<span class="course-card__title">${esc(c.title)}</span>` +
          `<span class="course-card__sub">${esc(c.subtitle || c.summary)}${c.duration ? `（${esc(c.duration)}）` : ""}</span></span></button></li>`
        );
      })
      .join("");
    return list ? `<h3 class="section-title">ガイドと歩く</h3><ul class="place-list course-list">${list}</ul>` : "";
  }

  // この場所を通るコース。押すと、そのコースを該当の場所から開く。
  function visitsSection(p) {
    const list = visits.get(p.id);
    if (!list) return "";
    const items = list
      .map((v) => {
        const ch = charById.get(v.course.character);
        const icon = ch ? `<img class="course-card__icon" src="${esc(ch.icon)}" alt="" width="40" height="40">` : "";
        return (
          `<li><button type="button" class="course-card course-card--small" data-course="${esc(v.course.id)}" data-step="${v.step}">${icon}` +
          `<span class="course-card__text"><span class="course-card__label">${ch ? esc(ch.short) + "と歩く" : "コース"}</span>` +
          `<span class="course-card__title">${esc(v.course.title)}</span>` +
          `<span class="course-card__sub">${v.step}か所目${v.detour ? "の寄り道" : ""}から開く</span></span></button></li>`
        );
      })
      .join("");
    return `<h3 class="section-title">ここを訪れるコース</h3><ul class="place-list course-list">${items}</ul>`;
  }

  function legend() {
    return (
      `<h3 class="section-title">楽しみ方の分類</h3><ul class="legend">` +
      Object.values(W.categories)
        .map((c) => `<li><span class="chip__dot" style="--c:${c.color}" aria-hidden="true"></span><strong>${esc(c.label)}</strong><span>${esc(c.description)}</span></li>`)
        .join("") +
      `</ul>`
    );
  }

  function renderPanel(p) {
    const crumbs = ancestors(p);
    const crumbHtml = crumbs.length
      ? `<ol class="crumbs">${crumbs.map((a) => `<li><a href="#${a.id}">${esc(a.name)}</a></li>`).join("")}</ol>`
      : "";

    const badges = [`<span class="badge">${esc(W.types[p.type])}</span>`];
    if (p.layer && p.type !== "layer") badges.push(`<span class="badge">${esc(LAYER_SHORT[p.layer])}</span>`);
    if (p.category) {
      badges.push(`<span class="badge badge--cat" style="--c:${catColor(p)}"><span class="chip__dot" aria-hidden="true"></span>${esc(W.categories[p.category].label)}</span>`);
    }

    const access =
      `<span class="access--${p.access}">${esc(W.access[p.access])}</span>` +
      (p.access_note ? `<span class="note">${esc(p.access_note)}</span>` : "");

    const adjacent = p.adjacent.length
      ? `<h3 class="section-title">ここからつながる場所</h3><ul class="place-list">` +
        p.adjacent
          .map((a) => {
            const t = byId.get(a.to);
            const via = a.via ? `<span class="place-link__desc">${esc(a.via)}${a.note ? `（${esc(a.note)}）` : ""}</span>` : "";
            return `<li>${placeLink(t).replace("</span></button>", `${via}</span></button>`)}</li>`;
          })
          .join("") +
        `</ul>`
      : "";

    $panel.innerHTML =
      crumbHtml +
      `<div class="eyebrow">${badges.join("")}</div>` +
      `<h2 class="place-name${p.name.length > 10 ? " place-name--long" : ""}">${esc(p.name)}</h2>` +
      `<p class="place-reading">${esc(p.reading)}</p>` +
      `<p class="place-en">${esc(p.en)}</p>` +
      (p.alias ? `<p class="place-alias">住人の呼び名 <strong>${esc(p.alias)}</strong></p>` : "") +
      `<p class="place-summary">${esc(p.summary)}</p>` +
      (p.type === "world" ? coursesSection() : "") +
      `<dl class="meta"><dt>立ち入り</dt><dd>${access}</dd>` +
      `<dt>おすすめ</dt><dd>${esc(p.best_time || "—")}</dd>` +
      `<dt>雰囲気</dt><dd><span class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span></dd></dl>` +
      prose(p) +
      (p.rumor ? `<section class="note-box note-box--rumor"><h3>住人の噂</h3><p>${esc(p.rumor)}</p></section>` : "") +
      visitsSection(p) +
      `<section class="note-box"><h3>名前の由来</h3><p>${esc(p.name_origin)}</p></section>` +
      (p.type === "world" ? legend() : "") +
      childList(p) +
      adjacent +
      `<button type="button" class="back-to-map" data-back>地図に戻る</button>`;
    $panel.scrollTop = 0;
  }

  $panel.addEventListener("click", (e) => {
    const c = e.target.closest("[data-course]");
    if (c) {
      openCourse(c.dataset.course, c.dataset.step ? Number(c.dataset.step) : undefined);
      return;
    }
    const g = e.target.closest("[data-go]");
    if (g) {
      go(g.dataset.go, { scroll: true });
      return;
    }
    if (e.target.closest("[data-back]")) {
      const pin = $pins.querySelector(`[data-id="${state.selected}"]`);
      document.getElementById("map").scrollIntoView({ block: "start" });
      if (pin && !pin.hidden) pin.focus({ preventScroll: true });
    }
  });

  // ---- routing ----
  function go(id, { scroll = false } = {}) {
    if (!byId.has(id)) id = ROOT_ID;
    const target = id === ROOT_ID ? location.pathname + location.search : "#" + id;
    if (("#" + id) !== location.hash && !(id === ROOT_ID && !location.hash)) {
      history.pushState(null, "", target);
    }
    select(id, scroll);
  }

  function select(id, scroll) {
    if (window.GuideCourse) window.GuideCourse.close();
    const p = byId.get(id) || byId.get(ROOT_ID);
    state.selected = p.id;
    renderPanel(p);
    updatePins();
    document.title = p.id === ROOT_ID ? "新宿・水上都市 ロケーションガイド" : `${p.name}｜新宿・水上都市`;
    if (scroll && mobile.matches) $panel.scrollIntoView({ block: "start" });
  }

  // #course/<コースID>[/<何番目の場所か>] ならコースを開く。それ以外は場所の表示。
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const m = h.match(/^course\/([^/]+)(?:\/(\d+))?$/);
    if (m && window.GuideCourse && (W.courses || []).some((c) => c.id === m[1])) {
      window.GuideCourse.open(m[1], m[2] ? Number(m[2]) - 1 : 0);
      return;
    }
    select(m ? ROOT_ID : h || ROOT_ID, false);
  }

  function openCourse(id, step) {
    const h = "#course/" + id + (step ? "/" + step : "");
    if (location.hash !== h) history.pushState(null, "", h);
    route();
    if (mobile.matches) window.scrollTo({ top: 0 });
  }

  window.addEventListener("popstate", route);
  window.addEventListener("hashchange", route);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || document.body.classList.contains("is-course")) return;
    const p = byId.get(state.selected);
    if (p && p.parent) go(p.parent);
  });

  // コース画面（course.js）が使う口
  window.GuideMap = { W, byId, esc, ROOT_ID, $pins, $panel, mobile, go, route, openCourse, charById, visits, loadCompleted, markCompleted };

  renderToolbar();
  renderPins();
  route();
})();

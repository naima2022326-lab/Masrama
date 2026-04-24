/* =========================
   CLOCK (PERFECT SYNC)
========================= */
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2, "0");
  h = h % 12 || 12;

  document.getElementById("time").textContent = `${h}:${m}`;
  document.getElementById("date").textContent =
    now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
}

function startClock() {
  updateClock();
  const delay = 60000 - (Date.now() % 60000);

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 60000);
  }, delay);
}
startClock();


/* =========================
   TAB SYSTEM (ADVANCED)
========================= */
let tabs = [
  { title: "New Tab", url: "https://www.google.com" }
];

let current = 0;
let draggedIndex = null;

function renderTabs() {
  const el = document.getElementById("tabs");
  if (!el) return;

  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === current ? " active" : "");
    tab.draggable = true;

    tab.innerHTML = `
      <span class="tabTitle">${t.title}</span>
      <span class="tabClose">×</span>
    `;

    /* SWITCH */
    tab.onclick = (e) => {
      if (e.target.classList.contains("tabClose")) return;
      current = i;
      renderTabs();
    };

    /* CLOSE */
    tab.querySelector(".tabClose").onclick = (e) => {
      e.stopPropagation();
      tabs.splice(i, 1);

      if (current >= tabs.length) current = tabs.length - 1;
      if (tabs.length === 0) {
        tabs.push({ title: "New Tab", url: "https://google.com" });
        current = 0;
      }

      renderTabs();
    };

    /* DRAG START */
    tab.ondragstart = () => {
      draggedIndex = i;
    };

    /* DRAG OVER */
    tab.ondragover = (e) => {
      e.preventDefault();
    };

    /* DROP */
    tab.ondrop = () => {
      const dragged = tabs[draggedIndex];
      tabs.splice(draggedIndex, 1);
      tabs.splice(i, 0, dragged);

      current = i;
      renderTabs();
    };

    /* HOVER PREVIEW */
    tab.onmouseenter = (e) => showPreview(e, t.url);
    tab.onmouseleave = hidePreview;

    el.appendChild(tab);
  });

  /* ADD TAB */
  const add = document.createElement("div");
  add.className = "tab add";
  add.textContent = "+";

  add.onclick = () => {
    tabs.push({ title: "New Tab", url: "https://www.google.com" });
    current = tabs.length - 1;
    renderTabs();
  };

  el.appendChild(add);
}

renderTabs();


/* =========================
   REAL PREVIEW (IFRAME)
========================= */
let preview;

function showPreview(e, url) {
  hidePreview();

  preview = document.createElement("div");
  preview.className = "tabPreview";

  preview.innerHTML = `
    <iframe src="${url}" frameborder="0"></iframe>
  `;

  document.body.appendChild(preview);

  const rect = e.target.getBoundingClientRect();

  preview.style.left = rect.left + "px";
  preview.style.top = rect.bottom + 10 + "px";

  requestAnimationFrame(() => {
    preview.style.opacity = "1";
    preview.style.transform = "translateY(0px)";
  });
}

function hidePreview() {
  if (preview) {
    preview.remove();
    preview = null;
  }
}


/* =========================
   SEARCH + NAVIGATION
========================= */
let history = [];

function go() {
  const input = document.getElementById("search");
  let val = input.value.trim();
  if (!val) return;

  let url;

  if (val.startsWith("http")) {
    url = val;
  } else if (val.includes(".")) {
    url = "https://" + val;
  } else {
    url = "https://www.google.com/search?q=" + encodeURIComponent(val);
  }

  tabs[current].url = url;
  tabs[current].title = val;

  history.unshift(url);

  renderTabs();
  window.open(url, "_blank");
}

/* ENTER KEY */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") go();
    });
  }
});


/* =========================
   HISTORY DROPDOWN
========================= */
function toggleHistory() {
  let existing = document.getElementById("historyMenu");

  if (existing) {
    existing.remove();
    return;
  }

  const menu = document.createElement("div");
  menu.id = "historyMenu";

  history.slice(0, 6).forEach(url => {
    const item = document.createElement("div");
    item.className = "historyItem";
    item.textContent = url;

    item.onclick = () => {
      tabs[current].url = url;
      tabs[current].title = url;
      renderTabs();
      menu.remove();
      window.open(url, "_blank");
    };

    menu.appendChild(item);
  });

  document.body.appendChild(menu);

  menu.style.top = "60px";
  menu.style.left = "20px";
}

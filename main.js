/* =========================
   CLOCK (PERFECT GX SYNC)
========================= */
function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2, "0");

  h = h % 12 || 12;

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  if (timeEl) timeEl.textContent = `${h}:${m}`;
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }
}

/* sync EXACTLY to minute */
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
   GX TABS (ANIMATED + PREVIEW)
========================= */
let tabs = [
  { title: "New Tab", icon: "🌐" }
];

let current = 0;

function renderTabs() {
  const el = document.getElementById("tabs");
  if (!el) return;

  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === current ? " active" : "");

    tab.innerHTML = `
      <span class="tabIcon">${t.icon}</span>
      <span class="tabTitle">${t.title}</span>
      <div class="tabGlow"></div>
    `;

    /* CLICK */
    tab.onclick = () => {
      current = i;
      renderTabs();
    };

    /* 🔥 HOVER PREVIEW */
    tab.onmouseenter = (e) => showPreview(e, t);
    tab.onmouseleave = hidePreview;

    el.appendChild(tab);
  });

  /* ADD BUTTON */
  const add = document.createElement("div");
  add.className = "tab add";
  add.textContent = "+";

  add.onclick = () => {
    tabs.push({ title: "New Tab", icon: "🌐" });
    current = tabs.length - 1;
    renderTabs();
  };

  el.appendChild(add);
}

renderTabs();


/* =========================
   TAB PREVIEW (GX STYLE)
========================= */
let preview;

function showPreview(e, tabData) {
  hidePreview();

  preview = document.createElement("div");
  preview.className = "tabPreview";

  preview.innerHTML = `
    <div class="previewContent">
      <div class="previewTitle">${tabData.title}</div>
      <div class="previewBox">Preview</div>
    </div>
  `;

  document.body.appendChild(preview);

  const rect = e.target.getBoundingClientRect();

  preview.style.left = rect.left + "px";
  preview.style.top = rect.bottom + 8 + "px";

  /* smooth fade in */
  requestAnimationFrame(() => {
    preview.style.opacity = "1";
    preview.style.transform = "translateY(0px) scale(1)";
  });
}

function hidePreview() {
  if (preview) {
    preview.remove();
    preview = null;
  }
}


/* =========================
   SEARCH (SMART + ENTER)
========================= */
function go() {
  const input = document.getElementById("search");
  if (!input) return;

  let val = input.value.trim();
  if (!val) return;

  let url;

  if (val.startsWith("http://") || val.startsWith("https://")) {
    url = val;
  } else if (val.includes(".")) {
    url = "https://" + val;
  } else {
    url = "https://www.google.com/search?q=" + encodeURIComponent(val);
  }

  window.open(url, "_blank");
}

/* ENTER KEY */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        go();
      }
    });
  }
});

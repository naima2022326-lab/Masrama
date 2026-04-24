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

/* sync EXACTLY to next minute */
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
   TABS (SMOOTH + CLEAN)
========================= */
let tabs = [{ title: "New Tab", icon: "🌐" }];
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
    `;

    tab.onclick = () => {
      current = i;
      renderTabs();
    };

    el.appendChild(tab);
  });

  /* ADD TAB BUTTON */
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
   SEARCH (SMART + ENTER KEY)
========================= */
function go() {
  const input = document.getElementById("search");
  if (!input) return;

  let val = input.value.trim();
  if (!val) return;

  let url;

  /* detect real URL */
  if (val.startsWith("http://") || val.startsWith("https://")) {
    url = val;
  } else if (val.includes(".")) {
    url = "https://" + val;
  } else {
    url = "https://www.google.com/search?q=" + encodeURIComponent(val);
  }

  window.open(url, "_blank");
}

/* ENTER KEY SUPPORT */
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

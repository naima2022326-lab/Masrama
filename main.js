/* =========================
   CLOCK (GX STYLE + AM/PM)
========================= */
function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2, "0");

  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;

  const timeEl = document.getElementById("time");
  const ampmEl = document.getElementById("ampm");
  const dateEl = document.getElementById("date");

  if (timeEl) timeEl.textContent = `${h}:${m}`;
  if (ampmEl) ampmEl.textContent = ampm;

  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }
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
   TABS (UNCHANGED CORE)
========================= */
let tabs = [{ title: "New Tab", url: "https://google.com" }];
let current = 0;

function renderTabs() {
  const el = document.getElementById("tabs");
  if (!el) return;

  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === current ? " active" : "");

    tab.innerHTML = `
      <span class="tabTitle">${t.title}</span>
      <span class="tabClose">×</span>
    `;

    tab.onclick = (e) => {
      if (e.target.classList.contains("tabClose")) return;
      current = i;
      renderTabs();
    };

    tab.querySelector(".tabClose").onclick = (e) => {
      e.stopPropagation();
      tabs.splice(i, 1);

      if (tabs.length === 0) {
        tabs.push({ title: "New Tab", url: "https://google.com" });
      }

      current = Math.max(0, current - 1);
      renderTabs();
    };

    el.appendChild(tab);
  });

  const add = document.createElement("div");
  add.className = "tab add";
  add.textContent = "+";

  add.onclick = () => {
    tabs.push({ title: "New Tab", url: "https://google.com" });
    current = tabs.length - 1;
    renderTabs();
  };

  el.appendChild(add);
}

renderTabs();


/* =========================
   SEARCH
========================= */
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

  window.open(url, "_blank");
}


/* =========================
   MASRAMA MENU (CLEAN)
========================= */
function toggleHistory() {
  let existing = document.getElementById("masramaMenu");

  if (existing) {
    existing.remove();
    return;
  }

  const menu = document.createElement("div");
  menu.id = "masramaMenu";

  menu.innerHTML = `
    <div class="menuItem">History</div>
    <div class="menuItem">Bookmarks</div>
    <div class="menuItem">Appearance</div>
    <div class="menuItem">Settings</div>
    <div class="menuItem login">🔐 Login</div>
  `;

  document.body.appendChild(menu);

  menu.style.top = "55px";
  menu.style.left = "20px";
}

/* =========================
   CLOCK (GX STYLE + AM/PM)
========================= */
function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2, "0");

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  document.getElementById("time").textContent = `${h}:${m}`;
  document.getElementById("ampm").textContent = ampm;

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
   TABS (CLEAN + STABLE)
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
      <span>${t.title}</span>
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
  if (!input) return;

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
   MASRAMA MENU (REAL SYSTEM)
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
    <div class="menuItem" onclick="openPanel('history')">History</div>
    <div class="menuItem" onclick="openPanel('bookmarks')">Bookmarks</div>
    <div class="menuItem" onclick="openPanel('appearance')">Appearance</div>
    <div class="menuItem" onclick="openPanel('settings')">Settings</div>

    <div class="menuItem loginRow" onclick="openPanel('login')">
      <img src="assets/user.png" class="loginIcon">
      Login
    </div>
  `;

  document.body.appendChild(menu);

  menu.style.top = "55px";
  menu.style.left = "20px";
}


/* =========================
   PANEL SYSTEM (NEW)
========================= */
function openPanel(type) {
  removePanel();

  const panel = document.createElement("div");
  panel.id = "panel";

  let content = "";

  if (type === "history") {
    content = `
      <h3>History</h3>
      <p>No history yet...</p>
    `;
  }

  if (type === "bookmarks") {
    content = `
      <h3>Bookmarks</h3>
      <p>No bookmarks saved.</p>
    `;
  }

  if (type === "appearance") {
    content = `
      <h3>Appearance</h3>
      <p>Theme: GX Dark</p>
    `;
  }

  if (type === "settings") {
    content = `
      <h3>Settings</h3>
      <p>More controls coming soon.</p>
    `;
  }

  if (type === "login") {
    content = `
      <h3>Login</h3>
      <p>Connect your account.</p>
    `;
  }

  panel.innerHTML = `
    <div class="panelHeader">
      <span>${type.toUpperCase()}</span>
      <span onclick="removePanel()" style="cursor:pointer">×</span>
    </div>
    <div class="panelContent">${content}</div>
  `;

  document.body.appendChild(panel);
}


/* REMOVE PANEL */
function removePanel() {
  const existing = document.getElementById("panel");
  if (existing) existing.remove();
}


/* CLICK OUTSIDE CLOSE */
document.addEventListener("click", (e) => {
  const menu = document.getElementById("masramaMenu");

  if (menu && !menu.contains(e.target) && !e.target.classList.contains("logo")) {
    menu.remove();
  }
});

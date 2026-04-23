let tabs = [{ title: "New Tab", url: "home", icon: "🎧" }];
let currentTab = 0;

/* ---------------- APP ---------------- */

function renderBrowser() {
  const dash = document.getElementById("dashboard");

  dash.innerHTML = `
    <div class="app">

      <!-- TOP BAR -->
      <div class="topbar">

        <div class="brand" onclick="toggleMenu()">
          <span class="mas">MAS</span><span class="rama">RAMA</span>
        </div>

        <div class="nav">
          <button>←</button>
          <button>→</button>

          <input id="url" placeholder="Search Google or enter URL">

          <button onclick="go()">Go</button>
        </div>

      </div>

      <!-- TABS BAR (UNDER SEARCH) -->
      <div class="tabs" id="tabs"></div>

      <!-- CLOCK -->
      <div class="hero">
        <div class="clock">
          <span id="time"></span><small id="ampm"></small>
        </div>
        <div class="date" id="date"></div>
      </div>

      <!-- VIEW -->
      <div id="view"></div>

      <!-- MENU -->
      <div id="menu" class="menu hidden">
        <div onclick="alert('History')">📜 History</div>
        <div onclick="alert('Settings')">⚙️ Settings</div>
      </div>

    </div>
  `;

  renderTabs();
  startClock();
  loadPage();
}

/* ---------------- BRAND MENU ---------------- */

function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

/* ---------------- TABS ---------------- */

function renderTabs() {
  const el = document.getElementById("tabs");
  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === currentTab ? " active" : "");

    tab.innerHTML = `${t.icon} ${t.title}`;

    tab.onclick = () => {
      currentTab = i;
      renderTabs();
      loadPage();
    };

    el.appendChild(tab);
  });
}

/* ---------------- NAV ---------------- */

function go() {
  let val = document.getElementById("url").value;

  let url = val.includes(".")
    ? "https://" + val
    : "https://duckduckgo.com/?q=" + encodeURIComponent(val);

  tabs[currentTab].url = url;
  tabs[currentTab].title = val;

  renderTabs();
  loadPage();
}

/* ---------------- RENDER ---------------- */

function loadPage() {
  const view = document.getElementById("view");
  const tab = tabs[currentTab];

  if (tab.url === "home") {
    view.innerHTML = "";
    return;
  }

  view.innerHTML = `<iframe src="${tab.url}" class="frame"></iframe>`;
}

/* ---------------- CLOCK ---------------- */

function startClock() {
  function update() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    document.getElementById("time").innerText =
      `${hours}:${minutes}`;

    document.getElementById("ampm").innerText = ampm;

    document.getElementById("date").innerText =
      now.toDateString();
  }

  update();
  setInterval(update, 1000);
}

/* ---------------- INIT ---------------- */

renderBrowser();

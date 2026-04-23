let tabs = [
  { title: "New Tab", url: "home" }
];

let currentTab = 0;

/* ---------------- UI BUILD ---------------- */

function renderBrowser() {
  const dash = document.getElementById("dashboard");

  dash.innerHTML = `
    <div class="topbar">

      <div class="tabs" id="tabs"></div>

      <div class="nav">
        <button onclick="back()">←</button>
        <button onclick="forward()">→</button>

        <input id="url" placeholder="Search or enter URL">

        <button onclick="go()">Go</button>
      </div>

    </div>

    <div id="view"></div>
  `;

  renderTabs();
  loadPage();
}

/* ---------------- TABS ---------------- */

function renderTabs() {
  const el = document.getElementById("tabs");
  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === currentTab ? " active" : "");
    tab.innerText = t.title;

    tab.onclick = () => {
      currentTab = i;
      renderTabs();
      loadPage();
    };

    el.appendChild(tab);
  });

  // ➕ PLUS BUTTON
  const add = document.createElement("div");
  add.className = "tab add";
  add.innerText = "+";
  add.onclick = newTab;

  el.appendChild(add);
}

function newTab() {
  tabs.push({ title: "New Tab", url: "home" });
  currentTab = tabs.length - 1;
  renderTabs();
  loadPage();
}

/* ---------------- NAVIGATION ---------------- */

function format(input) {
  if (input.startsWith("http")) return input;
  if (input.includes(".")) return "https://" + input;
  return "https://duckduckgo.com/?q=" + encodeURIComponent(input);
}

function go() {
  let input = document.getElementById("url").value;
  let url = format(input);

  tabs[currentTab].url = url;
  tabs[currentTab].title = input;

  renderTabs();
  loadPage();
}

function back() {
  alert("Back (history system next step)");
}

function forward() {
  alert("Forward (history system next step)");
}

/* ---------------- RENDER ENGINE ---------------- */

function loadPage() {
  const view = document.getElementById("view");
  const tab = tabs[currentTab];

  // 🏠 HOME DASHBOARD
  if (tab.url === "home") {
    view.innerHTML = `
      <div class="home">

        <div class="clock" id="clock"></div>

        <div class="greeting">
          Good Morning, <span>Explorer</span>
        </div>

        <div class="date" id="date"></div>

        <div class="divider"></div>

        <div class="searchBox">
          <input placeholder="Search Google or enter URL"
          onkeydown="if(event.key==='Enter'){goFromHome(this.value)}">
        </div>

      </div>
    `;

    if (typeof startPerfectClock === "function") {
      startPerfectClock();
    }

    return;
  }

  // 🌐 TRY LOAD SITE
  view.innerHTML = `
    <iframe src="${tab.url}" class="frame"></iframe>
  `;

  // ⚠️ fallback after 2s if blocked
  setTimeout(() => {
    try {
      const iframe = document.querySelector(".frame");

      // if still blank or blocked
      if (!iframe || iframe.contentWindow.length === 0) {
        throw "blocked";
      }
    } catch {
      view.innerHTML = `
        <div class="blocked">
          <h2>Site blocked inside browser</h2>
          <p>${tab.url}</p>
          <button onclick="window.open('${tab.url}')">
            Open in new tab
          </button>
        </div>
      `;
    }
  }, 2000);
}

function goFromHome(val) {
  document.getElementById("url").value = val;
  go();
}

/* ---------------- INIT ---------------- */

renderBrowser();

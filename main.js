let tabs = [{ title: "New Tab", url: "home" }];
let currentTab = 0;

/* ---------------- UI ---------------- */

function renderBrowser() {
  const dash = document.getElementById("dashboard");

  dash.innerHTML = `
    <div class="browser">

      <!-- SIDEBAR -->
      <div class="sidebar">
        <div class="logo">M</div>
        <div class="sideIcon" onclick="openQuick('youtube')">▶</div>
        <div class="sideIcon" onclick="openQuick('github')">🐙</div>
        <div class="sideIcon" onclick="openQuick('reddit')">🔥</div>
      </div>

      <div class="main">

        <!-- TOP -->
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

      </div>

    </div>
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
      animateSwitch();
      loadPage();
    };

    // 👀 HOVER PREVIEW
    tab.onmouseenter = (e) => showPreview(e, t);
    tab.onmouseleave = hidePreview;

    el.appendChild(tab);
  });

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

/* ---------------- NAV ---------------- */

function format(input) {
  if (input.startsWith("http")) return input;
  if (input.includes(".")) return "https://" + input;
  return "https://duckduckgo.com/?q=" + encodeURIComponent(input);
}

function go() {
  let val = document.getElementById("url").value;
  let url = format(val);

  tabs[currentTab] = { title: val, url };
  renderTabs();
  loadPage();
}

/* ---------------- RENDER ---------------- */

function loadPage() {
  const view = document.getElementById("view");
  const tab = tabs[currentTab];

  view.classList.remove("fadeIn");
  void view.offsetWidth;
  view.classList.add("fadeIn");

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
          <input placeholder="Search..."
          onkeydown="if(event.key==='Enter'){goFromHome(this.value)}">
        </div>
      </div>
    `;

    startPerfectClock();
    return;
  }

  view.innerHTML = `
    <iframe src="${tab.url}" class="frame"></iframe>
  `;
}

/* ---------------- SIDEBAR QUICK ---------------- */

function openQuick(site) {
  let urls = {
    youtube: "https://youtube.com",
    github: "https://github.com",
    reddit: "https://reddit.com"
  };

  tabs[currentTab] = {
    title: site,
    url: urls[site]
  };

  renderTabs();
  loadPage();
}

/* ---------------- ANIMATION ---------------- */

function animateSwitch() {
  document.getElementById("view").style.opacity = 0.5;
  setTimeout(() => {
    document.getElementById("view").style.opacity = 1;
  }, 150);
}

/* ---------------- PREVIEW ---------------- */

function showPreview(e, tab) {
  let preview = document.createElement("div");
  preview.id = "preview";
  preview.innerText = tab.url;

  preview.style.top = (e.clientY + 10) + "px";
  preview.style.left = (e.clientX + 10) + "px";

  document.body.appendChild(preview);
}

function hidePreview() {
  let p = document.getElementById("preview");
  if (p) p.remove();
}

/* ---------------- INIT ---------------- */

renderBrowser();

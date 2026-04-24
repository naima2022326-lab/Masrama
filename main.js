/* ================= CLOCK (GX PERFECT) ================= */
function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2, "0");

  let ampm = h >= 12 ? "PM" : "AM";
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

/* sync EXACT to minute */
function startClock() {
  updateClock();
  const delay = 60000 - (Date.now() % 60000);

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 60000);
  }, delay);
}
startClock();


/* ================= MASRAMA MENU ================= */
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}


/* ================= TABS (DRAG + CLOSE + ANIMATION) ================= */
let tabs = [{ title: "New Tab", url: "" }];
let current = 0;

const frame = document.getElementById("frame");
const home = document.getElementById("home");

function renderTabs() {
  const el = document.getElementById("tabs");
  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === current ? " active" : "");

    tab.draggable = true;

    tab.innerHTML = `
      <span>${t.title}</span>
      <span class="close">✕</span>
    `;

    /* CLICK SWITCH */
    tab.onclick = () => {
      current = i;
      loadTab();
      renderTabs();
    };

    /* CLOSE */
    tab.querySelector(".close").onclick = (e) => {
      e.stopPropagation();
      tabs.splice(i, 1);
      current = Math.max(0, current - 1);
      renderTabs();
      loadTab();
    };

    /* DRAG */
    tab.ondragstart = (e) => {
      e.dataTransfer.setData("index", i);
    };

    tab.ondrop = (e) => {
      const from = e.dataTransfer.getData("index");
      const temp = tabs[from];
      tabs[from] = tabs[i];
      tabs[i] = temp;
      renderTabs();
    };

    tab.ondragover = (e) => e.preventDefault();

    el.appendChild(tab);
  });

  /* ADD TAB */
  const add = document.createElement("div");
  add.className = "tab add";
  add.textContent = "+";

  add.onclick = () => {
    tabs.push({ title: "New Tab", url: "" });
    current = tabs.length - 1;
    renderTabs();
    loadTab();
  };

  el.appendChild(add);
}

renderTabs();


/* ================= LOAD TAB ================= */
function loadTab() {
  const tab = tabs[current];

  if (!tab.url) {
    frame.style.display = "none";
    home.style.display = "block";
  } else {
    frame.style.display = "block";
    home.style.display = "none";

    frame.style.opacity = 0;
    setTimeout(() => {
      frame.src = tab.url;
      frame.style.opacity = 1;
    }, 150);
  }
}


/* ================= SEARCH ================= */
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

  tabs[current] = { title: val, url };
  renderTabs();
  loadTab();
}

/* ENTER KEY */
document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") go();
});


/* ================= BLUR ON SCROLL ================= */
window.addEventListener("scroll", () => {
  const bar = document.getElementById("topbar");
  if (window.scrollY > 10) {
    bar.style.backdropFilter = "blur(20px)";
  } else {
    bar.style.backdropFilter = "blur(10px)";
  }
});

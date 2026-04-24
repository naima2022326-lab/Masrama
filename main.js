/* CLOCK (REAL TIME, MINUTE PERFECT) */
function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2, "0");

  h = h % 12 || 12;

  document.getElementById("time").innerText = `${h}:${m}`;
  document.getElementById("date").innerText = now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();

/* TABS */
let tabs = [{ title: "New Tab", icon: "🌐" }];
let current = 0;

function renderTabs() {
  const el = document.getElementById("tabs");
  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === current ? " active" : "");
    tab.innerHTML = `${t.icon} ${t.title}`;
    el.appendChild(tab);
  });
}

renderTabs();

/* SEARCH */
function go() {
  let val = document.getElementById("search").value;

  let url = val.includes(".")
    ? "https://" + val
    : "https://duckduckgo.com/?q=" + encodeURIComponent(val);

  window.open(url, "_blank");
}

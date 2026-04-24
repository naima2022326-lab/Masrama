/* CLOCK (SMOOTH + EXACT) */
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

    tab.onclick = () => {
      current = i;
      renderTabs();
    };

    el.appendChild(tab);
  });

  /* ADD + BUTTON */
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

/* SEARCH */
function go() {
  let val = document.getElementById("search").value;

  let url = val.includes(".")
    ? "https://" + val
    : "https://duckduckgo.com/?q=" + encodeURIComponent(val);

  window.open(url, "_blank");
}

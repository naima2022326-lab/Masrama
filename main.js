/* ================= CLOCK ================= */
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

setInterval(updateClock, 1000);
updateClock();


/* ================= TABS ================= */
let tabs = [{ title: "New Tab" }];
let current = 0;

function renderTabs() {
  const el = document.getElementById("tabs");
  el.innerHTML = "";

  tabs.forEach((t, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === current ? " active" : "");
    tab.textContent = t.title;

    tab.onclick = () => {
      current = i;
      renderTabs();
    };

    el.appendChild(tab);
  });
}

renderTabs();


/* ================= MENU ================= */
const logo = document.getElementById("logoBtn");
const menu = document.getElementById("menu");

logo.onclick = () => {
  menu.style.display =
    menu.style.display === "flex" ? "none" : "flex";
};


/* ================= BLUR ON SCROLL ================= */
window.addEventListener("scroll", () => {
  document.getElementById("topbar")
    .classList.toggle("scrolled", window.scrollY > 10);
});

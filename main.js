// CLOCK
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    document.getElementById("time").textContent = `${h}:${m}`;
    document.getElementById("ampm").textContent = ampm;
    document.getElementById("date").textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}
setInterval(updateClock, 1000);
updateClock();

// SEARCH LOGIC
function go(inputId) {
    const input = document.getElementById(inputId);
    let val = input.value.trim();
    if (!val) return;

    let url;
    if (val.startsWith("http")) {
        url = val;
    } else if (val.includes(".")) {
        url = "https://" + val;
    } else {
        // Bing is used as the engine because Google blocks itself in iframes
        url = "https://www.bing.com/search?q=" + encodeURIComponent(val);
    }
    loadSite(url);
}

function loadSite(url) {
    const dashboard = document.getElementById("mainDashboard");
    const browserView = document.getElementById("browserView");
    const iframe = document.getElementById("webFrame");
    const topInput = document.getElementById("search");

    dashboard.style.display = "none";
    browserView.style.display = "block";
    iframe.src = url;
    topInput.value = url;
}

// HOME BUTTON (Logo)
function goHome() {
    document.getElementById("mainDashboard").style.display = "block";
    document.getElementById("browserView").style.display = "none";
    document.getElementById("webFrame").src = "";
    document.getElementById("search").value = "";
}

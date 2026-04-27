// 1. CLOCK LOGIC
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const timeEl = document.getElementById("time");
    if(timeEl) {
        timeEl.textContent = `${h}:${m}`;
        document.getElementById("ampm").textContent = ampm;
        document.getElementById("date").textContent = now.toLocaleDateString(undefined, {
            weekday: "long", month: "long", day: "numeric"
        });
    }
}
setInterval(updateClock, 1000);
updateClock();

// 2. SEARCH & NAVIGATION LOGIC
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
        // Bing works best for staying inside the window
        url = "https://www.bing.com/search?q=" + encodeURIComponent(val);
    }
    loadSite(url);
}

function loadSite(url) {
    const dashboard = document.getElementById("dashboard");
    const browserView = document.getElementById("browserView");
    const webFrame = document.getElementById("webFrame");
    const topSearch = document.getElementById("search");

    if(dashboard && browserView) {
        dashboard.style.display = "none";
        browserView.style.display = "block";
        webFrame.src = url;
        topSearch.value = url;
    }
}

// 3. HOME BUTTON (Logo Click)
function goHome() {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("browserView").style.display = "none";
    document.getElementById("webFrame").src = "";
    document.getElementById("search").value = "";
    document.getElementById("centerSearch").value = "";
}

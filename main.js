// 1. CLOCK LOGIC
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

// 2. SEARCH & BROWSER LOGIC
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
        // Using Bing because Google blocks iframes. This makes your site "work" like a browser.
        url = "https://www.bing.com/search?q=" + encodeURIComponent(val);
    }

    loadUrl(url);
}

function loadUrl(url) {
    const dashboard = document.getElementById("dashboard");
    const browserView = document.getElementById("browserView");
    const iframe = document.getElementById("webFrame");
    const topSearch = document.getElementById("search");

    // Show the browser, hide the dashboard
    dashboard.style.display = "none";
    browserView.style.display = "block";
    iframe.src = url;
    topSearch.value = url; // Update top bar to show the URL
}

// 3. NAV FUNCTIONS
function reloadFrame() {
    document.getElementById("webFrame").src += "";
}

function goBack() {
    // Note: This only works if the site in the iframe allows history access
    window.history.back();
}

// 4. RETURN TO DASHBOARD (Click Logo)
function toggleHistory() {
    const dashboard = document.getElementById("dashboard");
    const browserView = document.getElementById("browserView");
    dashboard.style.display = "block";
    browserView.style.display = "none";
}

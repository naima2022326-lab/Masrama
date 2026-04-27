// Function to update the clock
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    if(document.getElementById("time")) {
        document.getElementById("time").textContent = `${h}:${m}`;
        document.getElementById("ampm").textContent = ampm;
        document.getElementById("date").textContent = now.toLocaleDateString(undefined, {
            weekday: "long", month: "long", day: "numeric"
        });
    }
}
setInterval(updateClock, 1000);
updateClock();

// The Master Search Function
function go(inputId) {
    const inputField = document.getElementById(inputId);
    const val = inputField.value.trim();
    
    if (val !== "") {
        let finalUrl;
        if (val.startsWith("http://") || val.startsWith("https://")) {
            finalUrl = val;
        } else if (val.includes(".") && !val.includes(" ")) {
            finalUrl = "https://" + val;
        } else {
            // DuckDuckGo allows iframes!
            finalUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(val);
        }
        loadSite(finalUrl);
    }
}

// The function that swaps the view
function loadSite(url) {
    const dash = document.getElementById("dashboard");
    const browser = document.getElementById("browserView");
    const frame = document.getElementById("webFrame");
    
    if (dash && browser && frame) {
        dash.style.display = "none";
        browser.style.display = "block";
        frame.src = url;
        // Keep the top search bar updated with the URL
        document.getElementById("search").value = url;
    }
}

// Function to go back to the Dashboard
function goHome() {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("browserView").style.display = "none";
    document.getElementById("webFrame").src = "";
}

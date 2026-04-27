/* =========================
   CLOCK (CLEAN + AM/PM)
========================= */
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


/* =========================
   TABS (REAL BEHAVIOR)
========================= */
let tabs = [{ title: "New Tab", url: "" }];
let current = 0;

function renderTabs() {
    const el = document.getElementById("tabs");
    el.innerHTML = "";

    tabs.forEach((t, i) => {
        const tab = document.createElement("div");
        tab.className = "tab" + (i === current ? " active" : "");

        tab.innerHTML = `
            <span>${t.title}</span>
            <span class="tabClose">×</span>
        `;

        tab.onclick = (e) => {
            if (e.target.classList.contains("tabClose")) return;
            current = i;
            loadSite(tabs[i].url);
            renderTabs();
        };

        tab.querySelector(".tabClose").onclick = (e) => {
            e.stopPropagation();
            tabs.splice(i, 1);

            if (tabs.length === 0) {
                tabs.push({ title: "New Tab", url: "" });
            }

            current = Math.max(0, current - 1);
            loadSite(tabs[current].url);
            renderTabs();
        };

        el.appendChild(tab);
    });

    const add = document.createElement("div");
    add.className = "tab add";
    add.textContent = "+";

    add.onclick = () => {
        tabs.push({ title: "New Tab", url: "" });
        current = tabs.length - 1;
        goHome();
        renderTabs();
    };

    el.appendChild(add);
}

renderTabs();


/* =========================
   SEARCH (FORCED EMBED)
========================= */
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
        // 🔥 Use Bing (works best inside iframe)
        url = "https://www.bing.com/search?q=" + encodeURIComponent(val);
    }

    openInTab(url, val);
}


/* =========================
   LOAD SITE (LOCKED MODE)
========================= */
function loadSite(url) {
    const dashboard = document.getElementById("dashboard");
    const browserView = document.getElementById("browserView");
    const webFrame = document.getElementById("webFrame");

    dashboard.style.display = "none";
    browserView.style.display = "block";

    webFrame.src = url;

    // 🔥 FORCE LINKS TO STAY INSIDE
    webFrame.onload = () => {
        try {
            const doc = webFrame.contentDocument || webFrame.contentWindow.document;

            const links = doc.querySelectorAll("a");

            links.forEach(link => {
                link.setAttribute("target", "_self");

                link.onclick = (e) => {
                    e.preventDefault();
                    let href = link.href;
                    if (href) loadSite(href);
                };
            });

        } catch (err) {
            // 🔒 Some sites block access (normal)
        }
    };
}


/* =========================
   OPEN IN TAB
========================= */
function openInTab(url, title) {
    tabs[current] = {
        title: title || "New Tab",
        url: url
    };

    loadSite(url);
    renderTabs();
}


/* =========================
   HOME
========================= */
function goHome() {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("browserView").style.display = "none";
    document.getElementById("webFrame").src = "";

    tabs[current] = { title: "New Tab", url: "" };
    renderTabs();
}

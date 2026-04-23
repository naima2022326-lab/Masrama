const dash = document.getElementById("dashboard");

if (!dash) {
  console.error("Dashboard not found");
} else {

  dash.innerHTML = `
    <div class="clock" id="clock"></div>

    <div class="greeting">
      Good Morning, <span>Explorer</span>
    </div>

    <div class="date" id="date"></div>

    <div class="divider"></div>

    <div class="searchBox">
      <input placeholder="Search Google or enter URL"
      onkeydown="if(event.key==='Enter'){window.open('https://duckduckgo.com/?q='+this.value)}">
    </div>

    <div class="apps">
      <div class="app"><div class="icon">🎮</div><div>Opera GX</div></div>
      <div class="app"><div class="icon">▶</div><div>YouTube</div></div>
      <div class="app"><div class="icon">🐙</div><div>GitHub</div></div>
      <div class="app"><div class="icon">🔥</div><div>Reddit</div></div>
    </div>
  `;

  if (typeof startPerfectClock === "function") {
    startPerfectClock();
  }
}

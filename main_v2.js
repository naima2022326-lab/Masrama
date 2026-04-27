/* =========================
   SMART SEARCH ENGINE
========================= */

function go() {
  const input = document.getElementById("search");
  let query = input.value.trim();

  if (!query) return;

  // URL detection
  if (query.startsWith("http") || query.includes(".")) {
    openSite(query.startsWith("http") ? query : "https://" + query);
  } else {
    openSearch(query);
  }
}


/* =========================
   FAKE GOOGLE (MASRAMA UI)
========================= */

function openSearch(query) {
  const dash = document.querySelector(".dashboard");

  dash.innerHTML = `
    <div class="searchPage">

      <div class="searchHeader">
        <input id="search2" value="${query}">
      </div>

      <div class="results">
        ${makeResult("Search on Google", "https://www.google.com/search?q=" + query)}
        ${makeResult("Search on Bing", "https://www.bing.com/search?q=" + query)}
        ${makeResult("Wikipedia", "https://en.wikipedia.org/wiki/" + query)}
        ${makeResult("Archive.org", "https://archive.org/search.php?query=" + query)}
        ${makeResult("Example Site", "https://example.com")}
      </div>

      <div class="viewerWrap">
        <iframe id="viewer"></iframe>
      </div>

    </div>
  `;

  document.getElementById("search2").addEventListener("keydown", e => {
    if (e.key === "Enter") openSearch(e.target.value);
  });
}


/* =========================
   RESULT ITEM
========================= */

function makeResult(title, url) {
  return `
    <div class="result" onclick="openSite('${url}')">
      <div class="rTitle">${title}</div>
      <div class="rUrl">${url}</div>
    </div>
  `;
}


/* =========================
   OPEN SITE (SMART LOAD)
========================= */

function openSite(url) {
  const viewer = document.getElementById("viewer");

  if (!viewer) {
    window.open(url, "_blank");
    return;
  }

  viewer.src = url;

  // 🔥 fallback if blocked
  setTimeout(() => {
    try {
      let test = viewer.contentWindow.location.href;
    } catch {
      // blocked → open real tab
      window.open(url, "_blank");
    }
  }, 1500);
}

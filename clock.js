function startPerfectClock() {

  function update() {
    let now = new Date();

    let time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    let ampm = now.getHours() >= 12 ? "PM" : "AM";

    document.getElementById("clock").innerHTML =
      time + "<span>" + ampm + "</span>";

    document.getElementById("date").innerText =
      now.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
  }

  update();

  let delay = 60000 - (Date.now() % 60000);

  setTimeout(() => {
    update();
    setInterval(update, 60000);
  }, delay);
}

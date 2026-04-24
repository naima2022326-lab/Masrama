/* CLOCK (FIXED + AM/PM) */
function updateClock(){
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes().toString().padStart(2,"0");

  let ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  document.getElementById("time").textContent = `${h}:${m}`;
  document.getElementById("ampm").textContent = ampm;

  document.getElementById("date").textContent =
    now.toDateString();
}

setInterval(updateClock,1000);
updateClock();

/* MENU */
function toggleMenu(){
  const m = document.getElementById("menu");
  m.style.display = m.style.display === "block" ? "none" : "block";
}

/* TABS */
let tabs = [{title:"New Tab"}];
let current = 0;

function renderTabs(){
  const el = document.getElementById("tabs");
  el.innerHTML="";

  tabs.forEach((t,i)=>{
    const d=document.createElement("div");
    d.className="tab"+(i===current?" active":"");
    d.textContent=t.title;
    d.onclick=()=>{current=i;renderTabs();}
    el.appendChild(d);
  });
}

renderTabs();

/* NAV */
function go(){
  const val=document.getElementById("search").value;

  let url = val.includes(".")
    ? "https://"+val
    : "https://www.google.com/search?q="+encodeURIComponent(val);

  document.getElementById("frame").src=url;
}

function back(){history.back();}
function forward(){history.forward();}
function reload(){location.reload();}

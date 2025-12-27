/* ================= CORE LOGIC ================= */

const rope = document.getElementById("rope");
const bulb = document.getElementById("bulb");
const lamp = document.getElementById("lamp");
const bg = document.getElementById("bg");
const particlesBox = document.getElementById("particles");
const hum = document.getElementById("hum");

const quoteBox = document.getElementById("quoteBox");
const quoteText = document.getElementById("quoteText");

const devBtn = document.getElementById("devBtn");
const devPanel = document.getElementById("devPanel");
const closeDev = document.getElementById("closeDev");

let on = false;

/* Time-based emotion */
const hour = new Date().getHours();
const dayQuotes = [
  "Every light begins with hope.",
  "Build softly. Shine honestly."
];
const nightQuotes = [
  "Some thoughts only appear in the dark.",
  "Silence is where ideas glow."
];
const quotes = hour >= 6 && hour < 18 ? dayQuotes : nightQuotes;

/* Particles */
function spawnParticles(x, y) {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--x", `${(Math.random()-0.5)*120}px`);
    p.style.setProperty("--y", `${-Math.random()*120}px`);
    p.style.animationDuration = 1.5 + Math.random() + "s";
    particlesBox.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

/* Mouse-follow particles */
document.addEventListener("mousemove", e => {
  if (on) spawnParticles(e.clientX, e.clientY);
});

/* Rope interaction */
rope.onclick = () => {
  on = !on;

  rope.animate([
    { transform: "translateY(0)" },
    { transform: "translateY(12px)" },
    { transform: "translateY(-4px)" },
    { transform: "translateY(0)" }
  ], { duration: 500, easing: "ease-out" });

  if (on) {
    bg.className = "fixed inset-0 light-bg";
    bulb.classList.add("lamp-on");
    bulb.classList.remove("opacity-30");
    lamp.classList.add("bg-yellow-900");

    quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.classList.remove("opacity-0", "translate-y-6");

    hum.volume = 0.3;
    hum.play();
  } else {
    bg.className = "fixed inset-0 opacity-0";
    bulb.classList.remove("lamp-on");
    bulb.classList.add("opacity-30");
    lamp.classList.remove("bg-yellow-900");

    quoteBox.classList.add("opacity-0", "translate-y-6");
    hum.pause();
  }
};

/* Developer panel */
devBtn.onclick = () => devPanel.classList.remove("translate-y-full");
closeDev.onclick = () => devPanel.classList.add("translate-y-full");
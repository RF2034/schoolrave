const BURSTS = 30;
const SKY = "#070b0c";
const HUES = [48, 168, 312, 198, 18, 52, 278, 128];

type Point = { x: number; y: number };

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  hue: number;
  rainbow: boolean;
  trail: Point[];
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  width: number;
  trail: Point[];
};

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let rockets: Rocket[] = [];
let sparks: Spark[] = [];
let left = 0;
let lastSpawn = 0;
let stopTimer = 0;
let looping = false;

function skySize() {
  return { w: window.innerWidth, h: window.innerHeight };
}

function fit() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { w, h } = skySize();
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function remember(trail: Point[], x: number, y: number) {
  trail.push({ x, y });
  if (trail.length > 18) trail.shift();
}

function spawnRocket() {
  const { w, h } = skySize();
  const x = w * (0.08 + Math.random() * 0.84);
  const targetY = h * (0.08 + Math.random() * 0.4);
  const y = h + 6;
  const frames = 28 + Math.random() * 18;
  rockets.push({
    x,
    y,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -(y - targetY) / frames,
    targetY,
    hue: HUES[Math.floor(Math.random() * HUES.length)] ?? 48,
    rainbow: Math.random() < 0.25,
    trail: [{ x, y }],
  });
}

function burst(rocket: Rocket) {
  const count = 70 + Math.floor(Math.random() * 30);
  const speed = 3.2 + Math.random() * 2.4;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const kick = speed * (0.78 + Math.random() * 0.4);
    sparks.push({
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * kick,
      vy: Math.sin(angle) * kick,
      life: 1,
      decay: 0.01 + Math.random() * 0.004,
      color: rocket.rainbow
        ? `hsl(${(i / count) * 360} 100% 62%)`
        : `hsl(${rocket.hue} 100% 62%)`,
      width: 2.4,
      trail: [{ x: rocket.x, y: rocket.y }],
    });
  }
}

function drawTrail(
  context: CanvasRenderingContext2D,
  trail: Point[],
  color: string,
  width: number,
) {
  const n = trail.length;
  for (let i = 1; i < n; i++) {
    const from = trail[i - 1];
    const to = trail[i];
    if (!from || !to) continue;
    const t = i / n;
    context.strokeStyle = color;
    context.globalAlpha = t;
    context.lineWidth = width * (0.4 + t);
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  }
}

function frame(now: number) {
  if (!canvas || !ctx) {
    looping = false;
    return;
  }
  const { w, h } = skySize();
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.fillStyle = SKY;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";

  if (left > 0 && now - lastSpawn > 100) {
    spawnRocket();
    left -= 1;
    lastSpawn = now;
  }

  for (let i = rockets.length - 1; i >= 0; i--) {
    const rocket = rockets[i];
    if (!rocket) continue;
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;
    remember(rocket.trail, rocket.x, rocket.y);
    drawTrail(ctx, rocket.trail, `hsl(${rocket.hue} 100% 72%)`, 2.6);
    if (rocket.y <= rocket.targetY) {
      burst(rocket);
      rockets.splice(i, 1);
    }
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    if (!spark) continue;
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.vy += 0.02;
    spark.vx *= 0.988;
    spark.vy *= 0.988;
    spark.life -= spark.decay;
    if (spark.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }
    remember(spark.trail, spark.x, spark.y);
    drawTrail(ctx, spark.trail, spark.color, spark.width);
  }
  ctx.globalAlpha = 1;

  if (left > 0 || rockets.length > 0 || sparks.length > 0) {
    requestAnimationFrame(frame);
    return;
  }
  looping = false;
  canvas.style.transition = "opacity 0.7s ease";
  canvas.style.opacity = "0";
  stopTimer = window.setTimeout(clearShow, 750);
}

function clearShow() {
  window.removeEventListener("resize", fit);
  canvas?.remove();
  canvas = null;
  ctx = null;
  rockets = [];
  sparks = [];
  left = 0;
  looping = false;
}

export function launchFireworks(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  left += BURSTS;
  if (canvas) {
    window.clearTimeout(stopTimer);
    canvas.style.transition = "none";
    canvas.style.opacity = "1";
    if (!looping) {
      looping = true;
      requestAnimationFrame(frame);
    }
    return;
  }
  canvas = document.createElement("canvas");
  canvas.className = "portal__fireworks";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.background = SKY;
  canvas.style.opacity = "1";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    canvas = null;
    left = 0;
    return;
  }
  fit();
  window.addEventListener("resize", fit);
  lastSpawn = 0;
  looping = true;
  requestAnimationFrame(frame);
}

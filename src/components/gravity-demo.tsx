import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Orb = {
  x: number; y: number; vx: number; vy: number; radius: number; color: string; glow: string;
};

const GRAVITY = 0.3;
const DAMPING = 0.7;
const MAX_ORBS = 50;
const ATTRACTION_STRENGTH = 0.08;

const colors = [
  { fill: "#a855f7", glow: "rgba(168,85,247,0.4)" },
  { fill: "#ec4899", glow: "rgba(236,72,153,0.4)" },
  { fill: "#3b82f6", glow: "rgba(59,130,246,0.4)" },
  { fill: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { fill: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  { fill: "#06b6d4", glow: "rgba(6,182,212,0.4)" },
  { fill: "#ef4444", glow: "rgba(239,68,68,0.4)" },
];

export function GravityDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const rafRef = useRef<number>(0);
  const [orbCount, setOrbCount] = useState(0);

  const spawnOrb = useCallback((x: number, y: number) => {
    if (orbsRef.current.length >= MAX_ORBS) return;
    const c = colors[Math.floor(Math.random() * colors.length)];
    orbsRef.current.push({
      x, y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 2 - 2,
      radius: 8 + Math.random() * 14,
      color: c.fill, glow: c.glow,
    });
    setOrbCount(orbsRef.current.length);
  }, []);

  const reset = useCallback(() => {
    orbsRef.current = [];
    setOrbCount(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      spawnOrb(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => { mouseRef.current.down = true; };
    const handleMouseUp = () => { mouseRef.current.down = false; };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    const animate = () => {
      const { width, height } = canvas;

      // Semi-transparent clear for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      for (const orb of orbsRef.current) {
        orb.vy += GRAVITY;

        if (mouseRef.current.down) {
          const dx = mouseRef.current.x - orb.x;
          const dy = mouseRef.current.y - orb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1) {
            orb.vx += (dx / dist) * ATTRACTION_STRENGTH * Math.min(100, 5000 / dist);
            orb.vy += (dy / dist) * ATTRACTION_STRENGTH * Math.min(100, 5000 / dist);
          }
        }

        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x - orb.radius < 0) { orb.x = orb.radius; orb.vx *= -DAMPING; }
        if (orb.x + orb.radius > width) { orb.x = width - orb.radius; orb.vx *= -DAMPING; }
        if (orb.y - orb.radius < 0) { orb.y = orb.radius; orb.vy *= -DAMPING; }
        if (orb.y + orb.radius > height) { orb.y = height - orb.radius; orb.vy *= -DAMPING; }

        ctx.shadowBlur = 20;
        ctx.shadowColor = orb.glow;

        const gradient = ctx.createRadialGradient(
          orb.x - orb.radius * 0.3, orb.y - orb.radius * 0.3, 0,
          orb.x, orb.y, orb.radius,
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.3)");
        gradient.addColorStop(0.5, orb.color);
        gradient.addColorStop(1, orb.color + "88");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [spawnOrb]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />

      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <motion.button type="button" onClick={reset}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-white/80 text-xs backdrop-blur-sm transition-colors hover:bg-white/20"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <RotateCcw className="h-3 w-3" />Reset
        </motion.button>
        <span className="rounded-lg bg-white/10 px-3 py-1.5 text-white/60 text-xs backdrop-blur-sm">
          {orbCount} / {MAX_ORBS}
        </span>
      </div>

      <motion.div className="absolute right-4 bottom-4 z-10 text-right"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <p className="text-white/50 text-xs">Click to spawn orbs</p>
        <p className="text-white/50 text-xs">Hold mouse to attract</p>
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 1 }} animate={{ opacity: orbCount > 0 ? 0 : 1 }} transition={{ duration: 0.3 }}>
        <h2 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold text-3xl text-transparent">
          Gravity
        </h2>
        <p className="text-white/40 text-sm">Click anywhere to begin</p>
      </motion.div>
    </div>
  );
}

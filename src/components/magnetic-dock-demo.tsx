import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Calendar, Camera, Globe, Mail, Music, Palette, Settings, Terminal,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useRef } from "react";

const dockItems: { icon: LucideIcon; label: string; color: string }[] = [
  { icon: Music, label: "Music", color: "from-pink-500 to-rose-500" },
  { icon: Camera, label: "Photos", color: "from-purple-500 to-indigo-500" },
  { icon: Mail, label: "Mail", color: "from-blue-500 to-cyan-500" },
  { icon: Calendar, label: "Calendar", color: "from-red-500 to-orange-500" },
  { icon: Globe, label: "Safari", color: "from-cyan-500 to-blue-500" },
  { icon: Settings, label: "Settings", color: "from-gray-500 to-zinc-600" },
  { icon: Terminal, label: "Terminal", color: "from-green-500 to-emerald-600" },
  { icon: Palette, label: "Design", color: "from-amber-500 to-yellow-500" },
];

function DockIcon({
  icon: Icon, label, color, mouseX,
}: {
  icon: LucideIcon; label: string; color: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const size = useTransform(distance, [0, 100, 200], [72, 56, 48]);
  const springSize = useSpring(size, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center"
      style={{ width: springSize, height: springSize }}
    >
      <div className="pointer-events-none absolute -top-10 rounded-md bg-default-900/90 px-2.5 py-1 text-default-50 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-default-900/90" />
      </div>
      <motion.div
        className={`flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
        style={{ width: springSize, height: springSize }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon className="h-1/2 w-1/2 text-white" />
      </motion.div>
      <div className="mt-1 h-1 w-1 rounded-full bg-default-400/60" />
    </motion.div>
  );
}

export function MagneticDockDemo() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8"
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text font-bold text-2xl text-transparent">
          Magnetic Dock
        </h2>
        <p className="text-default-500 text-sm">Move your cursor across the dock</p>
      </motion.div>

      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        className="flex items-end gap-2 rounded-2xl border border-default-200/60 bg-default-100/50 px-4 pb-2 pt-2 shadow-xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {dockItems.map((item) => (
          <DockIcon key={item.label} icon={item.icon} label={item.label} color={item.color} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}

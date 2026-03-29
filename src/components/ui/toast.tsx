import { AnimatePresence, type PanInfo, motion } from "framer-motion";
import {
  AlertTriangle, CheckCircle2, Info, type LucideIcon, X, XCircle,
} from "lucide-react";
import {
  type ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState,
} from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

type Toast = {
  id: string; title: string; description?: string; variant: ToastVariant; duration?: number;
};

type ToastContextValue = { addToast: (toast: Omit<Toast, "id">) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantConfig: Record<
  ToastVariant,
  { icon: LucideIcon; iconColor: string; progressColor: string; bg: string }
> = {
  success: { icon: CheckCircle2, iconColor: "text-emerald-500", progressColor: "bg-emerald-500", bg: "border-emerald-500/20" },
  error: { icon: XCircle, iconColor: "text-red-500", progressColor: "bg-red-500", bg: "border-red-500/20" },
  warning: { icon: AlertTriangle, iconColor: "text-amber-500", progressColor: "bg-amber-500", bg: "border-amber-500/20" },
  info: { icon: Info, iconColor: "text-blue-500", progressColor: "bg-blue-500", bg: "border-blue-500/20" },
};

const MAX_VISIBLE = 4;

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;
  const duration = toast.duration ?? 4000;
  const [progress, setProgress] = useState(100);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) { onRemove(toast.id); return; }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, toast.id, onRemove]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) onRemove(toast.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
      onDragEnd={handleDragEnd}
      className={`relative w-80 overflow-hidden rounded-xl border bg-background shadow-lg ${config.bg}`}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-default-900 text-sm">{toast.title}</p>
          {toast.description && <p className="mt-0.5 text-default-500 text-xs">{toast.description}</p>}
        </div>
        <button type="button" onClick={() => onRemove(toast.id)} className="text-default-400 hover:text-default-600">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="h-0.5 w-full bg-default-100">
        <motion.div className={`h-full ${config.progressColor}`} style={{ width: `${progress}%` }} transition={{ duration: 0 }} />
      </div>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => {
      const next = [...prev, { ...toast, id }];
      return next.slice(-MAX_VISIBLE);
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="pointer-events-none absolute right-4 bottom-4 z-50 flex flex-col-reverse gap-2">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

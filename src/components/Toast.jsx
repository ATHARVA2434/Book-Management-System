import { useState, useEffect, useCallback } from "react";

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useToast = () => {
  const [toast, setToast] = useState(null);

  const show = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  return { toast, show };
};

// ── Component ─────────────────────────────────────────────────────────────────
const Toast = ({ toast }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className={`toast toast--${toast.type} ${visible ? "toast--show" : ""}`}>
      {toast.type === "success" ? "✓" : "✕"} {toast.message}
    </div>
  );
};

export default Toast;

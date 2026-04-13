import { useEffect } from "react";

interface Props {
  msg: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ msg, type, onClose }: Props) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [msg, onClose]);

  if (!msg) return null;

  const bg = type === "error" ? "#ef4444" : "#22c55e";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 8,
        fontWeight: 600,
        zIndex: 999,
        boxShadow: "0 4px 20px rgba(0,0,0,.3)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {msg}
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        ✕
      </button>
    </div>
  );
}

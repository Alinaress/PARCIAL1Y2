import { type ReactNode } from "react";

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, onClose, children }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "#1e1e2e",
          borderRadius: 12,
          padding: 32,
          minWidth: 380,
          boxShadow: "0 8px 40px rgba(0,0,0,.5)",
          position: "relative",
        }}
      >
        <h3 style={{ margin: "0 0 20px", color: "#e2e8f0", fontSize: 18 }}>
          {title}
        </h3>

        {children}

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "#94a3b8",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

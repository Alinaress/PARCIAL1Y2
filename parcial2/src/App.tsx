import { useState } from "react";
import Toast from "./components/Toast";
import Marcas from "./pages/marcas";
import Proveedores from "./pages/Proveedores";
import Productos from "./pages/Productos";

const TABS = ["Marcas", "Proveedores", "Productos"];

interface ToastState {
  msg: string;
  type: "success" | "error";
}

export default function App() {
  const [tab, setTab]     = useState(0);
  const [toast, setToast] = useState<ToastState>({ msg: "", type: "success" });

  const showToast  = (msg: string, type: "success" | "error" = "success") => setToast({ msg, type });
  const clearToast = () => setToast({ msg: "", type: "success" });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#3b82f6",
        padding: "14px 32px",
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
          Gestión de Inventario
        </span>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 0, borderBottom: "2px solid #ddd" }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                padding: "8px 20px",
                border: "1px solid #ddd",
                borderBottom: tab === i ? "2px solid #fff" : "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                background: tab === i ? "#fff" : "#f1f5f9",
                color:      tab === i ? "#3b82f6" : "#555",
                marginBottom: tab === i ? -2 : 0,
                borderRadius: "4px 4px 0 0",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{
          background: "#fff",
          padding: 24,
          border: "1px solid #ddd",
          borderTop: "none",
        }}>
          {tab === 0 && <Marcas      toast={showToast} />}
          {tab === 1 && <Proveedores toast={showToast} />}
          {tab === 2 && <Productos   toast={showToast} />}
        </div>

      </div>

      <Toast msg={toast.msg} type={toast.type} onClose={clearToast} />
    </div>
  );
}

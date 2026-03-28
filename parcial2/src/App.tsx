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
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#1e1e2e",
        borderBottom: "1px solid #1e293b",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px" }}>
          🗄️ Gestión de Inventario
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "20px 32px 0" }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: "10px 24px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              background:   tab === i ? "#1e1e2e" : "transparent",
              color:        tab === i ? "#6366f1" : "#64748b",
              borderBottom: tab === i ? "2px solid #6366f1" : "2px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div style={{
        margin: "0 32px",
        background: "#1e1e2e",
        borderRadius: "0 8px 8px 8px",
        padding: 28,
        border: "1px solid #1e293b",
      }}>
        {tab === 0 && <Marcas      toast={showToast} />}
        {tab === 1 && <Proveedores toast={showToast} />}
        {tab === 2 && <Productos   toast={showToast} />}
      </div>

      <Toast msg={toast.msg} type={toast.type} onClose={clearToast} />
    </div>
  );
}

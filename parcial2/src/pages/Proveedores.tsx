import { useState, useEffect, useCallback } from "react";
import api from "../api";
import S, { badge } from "../styles";
import Modal from "../components/Modal";

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string | null;
  estado: boolean;
}

interface Form {
  nombre: string;
  telefono: string;
  estado: boolean;
}

interface Props {
  toast: (msg: string, type?: "success" | "error") => void;
}

export default function Proveedores({ toast }: Props) {
  const [items, setItems]     = useState<Proveedor[]>([]);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm]       = useState<Form>({ nombre: "", telefono: "", estado: true });

  const load = useCallback(() =>
    api.get("/proveedores").then((d) => setItems(Array.isArray(d) ? d : d.data ?? [])),
  []);

useEffect(() => { load(); }, [load]);

  const openNew = () => {
    setForm({ nombre: "", telefono: "", estado: true });
    setEditing(null);
    setModal(true);
  };

  const openEdit = (item: Proveedor) => {
    setForm({ nombre: item.nombre, telefono: item.telefono ?? "", estado: !!item.estado });
    setEditing(item.id);
    setModal(true);
  };

  const save = async () => {
    if (!form.nombre.trim()) return toast("El nombre es obligatorio", "error");
    try {
      if (editing) await api.put(`/proveedores/${editing}`, form);
      else         await api.post("/proveedores", form);
      toast(editing ? "Proveedor actualizado" : "Proveedor creado");
      setModal(false);
      load();
    } catch {
      toast("Error al guardar", "error");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar este proveedor?")) return;
    await api.delete(`/proveedores/${id}`);
    toast("Proveedor eliminado");
    load();
  };

  return (
    <div>
      <button style={S.btnAdd as React.CSSProperties} onClick={openNew}>
        + Nuevo Proveedor
      </button>

      <table style={S.table as React.CSSProperties}>
        <thead>
          <tr>
            <th style={S.th as React.CSSProperties}>#</th>
            <th style={S.th as React.CSSProperties}>Nombre</th>
            <th style={S.th as React.CSSProperties}>Teléfono</th>
            <th style={S.th as React.CSSProperties}>Estado</th>
            <th style={S.th as React.CSSProperties}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ ...(S.td as React.CSSProperties), textAlign: "center", color: "#475569" }}>
                Sin registros
              </td>
            </tr>
          )}
          {items.map((p) => (
            <tr key={p.id}>
              <td style={S.td as React.CSSProperties}>{p.id}</td>
              <td style={S.td as React.CSSProperties}>{p.nombre}</td>
              <td style={S.td as React.CSSProperties}>{p.telefono ?? "—"}</td>
              <td style={S.td as React.CSSProperties}>
                <span style={badge(p.estado)}>{p.estado ? "Activo" : "Inactivo"}</span>
              </td>
              <td style={S.td as React.CSSProperties}>
                <button style={S.btnEdit as React.CSSProperties} onClick={() => openEdit(p)}>Editar</button>
                <button style={S.btnDanger as React.CSSProperties} onClick={() => remove(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <Modal title={editing ? "Editar Proveedor" : "Nuevo Proveedor"} onClose={() => setModal(false)}>
          <input
            style={S.input as React.CSSProperties}
            placeholder="Nombre *"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            style={S.input as React.CSSProperties}
            placeholder="Teléfono (opcional)"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />
          <label style={{ color: "#94a3b8", fontSize: 14, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <input
              type="checkbox"
              checked={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.checked })}
            />
            Activo
          </label>
          <button style={S.btnPrimary as React.CSSProperties} onClick={save}>
            Guardar
          </button>
        </Modal>
      )}
    </div>
  );
}

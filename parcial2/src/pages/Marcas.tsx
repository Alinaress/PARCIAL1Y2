import { useState, useEffect, useCallback } from "react";
import api from "../api";
import S, { badge } from "../styles";
import Modal from "../components/Modal";

interface Marca {
  id: number;
  nombre: string;
  estado: boolean;
}

interface Form {
  nombre: string;
  estado: boolean;
}

interface Props {
  toast: (msg: string, type?: "success" | "error") => void;
}

export default function Marcas({ toast }: Props) {
  const [items, setItems]     = useState<Marca[]>([]);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm]       = useState<Form>({ nombre: "", estado: true });

  const load = useCallback(() =>
    api.get("/marcas").then((d) => setItems(Array.isArray(d) ? d : d.data ?? [])),
  []);

useEffect(() => { load(); }, [load]);
  const openNew = () => {
    setForm({ nombre: "", estado: true });
    setEditing(null);
    setModal(true);
  };

  const openEdit = (item: Marca) => {
    setForm({ nombre: item.nombre, estado: !!item.estado });
    setEditing(item.id);
    setModal(true);
  };

  const save = async () => {
    if (!form.nombre.trim()) return toast("El nombre es obligatorio", "error");
    try {
      if (editing) await api.put(`/marcas/${editing}`, form);
      else         await api.post("/marcas", form);
      toast(editing ? "Marca actualizada" : "Marca creada");
      setModal(false);
      load();
    } catch {
      toast("Error al guardar", "error");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar esta marca?")) return;
    await api.delete(`/marcas/${id}`);
    toast("Marca eliminada");
    load();
  };

  return (
    <div>
      <button style={S.btnAdd as React.CSSProperties} onClick={openNew}>
        + Nueva Marca
      </button>

      <table style={S.table as React.CSSProperties}>
        <thead>
          <tr>
            <th style={S.th as React.CSSProperties}>#</th>
            <th style={S.th as React.CSSProperties}>Nombre</th>
            <th style={S.th as React.CSSProperties}>Estado</th>
            <th style={S.th as React.CSSProperties}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={4} style={{ ...(S.td as React.CSSProperties), textAlign: "center", color: "#475569" }}>
                Sin registros
              </td>
            </tr>
          )}
          {items.map((m) => (
            <tr key={m.id}>
              <td style={S.td as React.CSSProperties}>{m.id}</td>
              <td style={S.td as React.CSSProperties}>{m.nombre}</td>
              <td style={S.td as React.CSSProperties}>
                <span style={badge(m.estado)}>{m.estado ? "Activo" : "Inactivo"}</span>
              </td>
              <td style={S.td as React.CSSProperties}>
                <button style={S.btnEdit as React.CSSProperties} onClick={() => openEdit(m)}>Editar</button>
                <button style={S.btnDanger as React.CSSProperties} onClick={() => remove(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <Modal title={editing ? "Editar Marca" : "Nueva Marca"} onClose={() => setModal(false)}>
          <input
            style={S.input as React.CSSProperties}
            placeholder="Agrega un nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <button style={S.btnPrimary as React.CSSProperties} onClick={save}>
            Guardar
          </button>
        </Modal>
      )}
    </div>
  );
}

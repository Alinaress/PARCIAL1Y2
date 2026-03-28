import { useState, useEffect, useCallback } from "react";
import api from "../api";
import S from "../styles";
import Modal from "../components/Modal";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria_id: number;
  marca_id: number;
  proveedor_id: number;
}

interface Marca {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Proveedor {
  id: number;
  nombre: string;
}

interface Form {
  nombre: string;
  descripcion: string;
  precio: string;
  categoria_id: string;
  marca_id: string;
  proveedor_id: string;
}

interface Props {
  toast: (msg: string, type?: "success" | "error") => void;
}

const BLANK: Form = {
  nombre: "",
  descripcion: "",
  precio: "",
  categoria_id: "",
  marca_id: "",
  proveedor_id: "",
};

export default function Productos({ toast }: Props) {
  const [items, setItems]     = useState<Producto[]>([]);
  const [marcas, setMarcas]   = useState<Marca[]>([]);
  const [cats, setCats]       = useState<Categoria[]>([]);
  const [provs, setProvs]     = useState<Proveedor[]>([]);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm]       = useState<Form>(BLANK);

  const load = useCallback(() => {
    const fetchData = async () => {
      const [p, m, c, pv] = await Promise.all([
        api.get("/productos"),
        api.get("/marcas"),
        api.get("/categorias"),
        api.get("/proveedores"),
      ]);
      setItems(Array.isArray(p)  ? p  : p.data  ?? []);
      setMarcas(Array.isArray(m) ? m  : m.data  ?? []);
      setCats(Array.isArray(c)   ? c  : c.data  ?? []);
      setProvs(Array.isArray(pv) ? pv : pv.data ?? []);
    };
    fetchData();
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => {
    setForm(BLANK);
    setEditing(null);
    setModal(true);
  };

  const openEdit = (item: Producto) => {
    setForm({
      nombre:       item.nombre,
      descripcion:  item.descripcion ?? "",
      precio:       String(item.precio),
      categoria_id: String(item.categoria_id),
      marca_id:     String(item.marca_id),
      proveedor_id: String(item.proveedor_id),
    });
    setEditing(item.id);
    setModal(true);
  };

  const save = async () => {
    if (!form.nombre.trim() || !form.precio || !form.categoria_id || !form.marca_id || !form.proveedor_id)
      return toast("Completa todos los campos obligatorios", "error");
    try {
      if (editing) await api.put(`/productos/${editing}`, form);
      else         await api.post("/productos", form);
      toast(editing ? "Producto actualizado" : "Producto creado");
      setModal(false);
      load();
    } catch {
      toast("Error al guardar", "error");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await api.delete(`/productos/${id}`);
    toast("Producto eliminado");
    load();
  };

  const getName = (list: { id: number; nombre: string }[], id: string | number) =>
    list.find((x) => x.id == id)?.nombre ?? "—";

  const f = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div>
      <button style={S.btnAdd as React.CSSProperties} onClick={openNew}>
        + Nuevo Producto
      </button>

      <table style={S.table as React.CSSProperties}>
        <thead>
          <tr>
            <th style={S.th as React.CSSProperties}>#</th>
            <th style={S.th as React.CSSProperties}>Nombre</th>
            <th style={S.th as React.CSSProperties}>Precio</th>
            <th style={S.th as React.CSSProperties}>Categoría</th>
            <th style={S.th as React.CSSProperties}>Marca</th>
            <th style={S.th as React.CSSProperties}>Proveedor</th>
            <th style={S.th as React.CSSProperties}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={7} style={{ ...(S.td as React.CSSProperties), textAlign: "center", color: "#475569" }}>
                Sin registros
              </td>
            </tr>
          )}
          {items.map((p) => (
            <tr key={p.id}>
              <td style={S.td as React.CSSProperties}>{p.id}</td>
              <td style={S.td as React.CSSProperties}>{p.nombre}</td>
              <td style={S.td as React.CSSProperties}>${Number(p.precio).toFixed(2)}</td>
              <td style={S.td as React.CSSProperties}>{getName(cats,  p.categoria_id)}</td>
              <td style={S.td as React.CSSProperties}>{getName(marcas, p.marca_id)}</td>
              <td style={S.td as React.CSSProperties}>{getName(provs,  p.proveedor_id)}</td>
              <td style={S.td as React.CSSProperties}>
                <button style={S.btnEdit as React.CSSProperties} onClick={() => openEdit(p)}>Editar</button>
                <button style={S.btnDanger as React.CSSProperties} onClick={() => remove(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <Modal title={editing ? "Editar Producto" : "Nuevo Producto"} onClose={() => setModal(false)}>
          <input style={S.input as React.CSSProperties} placeholder="Nombre"     value={form.nombre}      onChange={f("nombre")} />
          <input style={S.input as React.CSSProperties} placeholder="Descripción"  value={form.descripcion} onChange={f("descripcion")} />
          <input style={S.input as React.CSSProperties} placeholder="Precio unitario" type="number" step="0.01" value={form.precio} onChange={f("precio")} />

          <select style={S.input as React.CSSProperties} value={form.categoria_id} onChange={f("categoria_id")}>
            <option value="">Elige una categoria</option>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>

          <select style={S.input as React.CSSProperties} value={form.marca_id} onChange={f("marca_id")}>
            <option value="">elige una marca</option>
            {marcas.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>

          <select style={S.input as React.CSSProperties} value={form.proveedor_id} onChange={f("proveedor_id")}>
            <option value="">Elige un proveedor</option>
            {provs.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>

          <button style={S.btnPrimary as React.CSSProperties} onClick={save}>
            Guardar
          </button>
        </Modal>
      )}
    </div>
  );
}

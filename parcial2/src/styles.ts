import { CSSProperties } from "react";

const S: Record<string, CSSProperties | ((active: boolean) => CSSProperties)> = {
  input: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 7,
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#e2e8f0",
    fontSize: 14,
    boxSizing: "border-box",
    marginBottom: 12,
  },
  btnPrimary: {
    padding: "9px 20px",
    borderRadius: 7,
    border: "none",
    background: "#6366f1",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  },
  btnDanger: {
    padding: "6px 14px",
    borderRadius: 6,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13,
  },
  btnEdit: {
    padding: "6px 14px",
    borderRadius: 6,
    border: "none",
    background: "#f59e0b",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13,
    marginRight: 6,
  },
  btnAdd: {
    padding: "9px 18px",
    borderRadius: 7,
    border: "none",
    background: "#6366f1",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
    marginBottom: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "10px 14px",
    background: "#0f172a",
    color: "#94a3b8",
    fontWeight: 600,
    fontSize: 13,
    borderBottom: "1px solid #1e293b",
  },
  td: {
    padding: "10px 14px",
    color: "#e2e8f0",
    fontSize: 14,
    borderBottom: "1px solid #1e293b",
  },
};

export const badge = (active: boolean): CSSProperties => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 99,
  background: active ? "#166534" : "#7f1d1d",
  color: active ? "#bbf7d0" : "#fecaca",
  fontSize: 12,
  fontWeight: 600,
});

export default S;

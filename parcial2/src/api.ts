const API_BASE = "http://localhost:8000/api/auth";

const api = {
  get: (url: string) =>
    fetch(`${API_BASE}${url}`).then((r) => r.json()),

  post: (url: string, body: object) =>
    fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  put: (url: string, body: object) =>
    fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  delete: (url: string) =>
    fetch(`${API_BASE}${url}`, { method: "DELETE" }).then((r) => r.json()),
};

export default api;

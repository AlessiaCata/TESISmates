const API = import.meta.env.VITE_API_URL;

export function setToken(token) {
  localStorage.setItem('token', token);
}
export function getToken() {
  return localStorage.getItem('token');
}
export function clearToken() {
  localStorage.removeItem('token');
}

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    let msg = 'Error API';
    try { const j = await res.json(); msg = j.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

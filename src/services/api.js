// Use path relativo para funcionar com proxy local (Vite) e rewrites no Vercel/Render
export const BASE_URL = '';

async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  let data = null;
  try {
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = text ? { message: text } : null;
    }
  } catch (_) {
    // ignore parse errors
  }
  if (!res.ok) {
    const errMsg = (data && (data.error || data.message || data.mensagem)) || `Erro ${res.status}`;
    throw new Error(errMsg);
  }
  return data;
}

export async function postJSON(path, body, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(body),
    credentials: 'omit',
  });
  return handleResponse(res);
}

export async function postForm(path, formData, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', ...(options.headers || {}) },
    body: formData,
    credentials: 'omit',
    ...(options || {}),
  });
  return handleResponse(res);
}
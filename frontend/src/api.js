const TOKEN_KEY = 'flipside_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401 && !path.startsWith('/auth/')) {
    setToken(null);
    window.dispatchEvent(new Event('flipside:unauthorized'));
  }

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  register: (email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getDecisions: () => request('/decisions'),

  createDecision: (optionA, optionB, result) =>
    request('/decisions', {
      method: 'POST',
      body: JSON.stringify({ optionA, optionB, result }),
    }),

  deleteDecision: (id) => request(`/decisions/${id}`, { method: 'DELETE' }),
};
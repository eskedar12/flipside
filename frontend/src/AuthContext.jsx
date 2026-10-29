import { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken } from './api.js';

const AuthContext = createContext(null);

const USER_KEY = 'flipside_user';

function loadUser() {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved && getToken() ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  function saveSession(data) {
    setToken(data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
  }

  async function login(email, password) {
    const data = await api.login(email, password);
    saveSession(data);
  }

  async function register(email, password) {
    await api.register(email, password);
    await login(email, password);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  useEffect(() => {
    function handleUnauthorized() {
      logout();
    }

    window.addEventListener('flipside:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('flipside:unauthorized', handleUnauthorized);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
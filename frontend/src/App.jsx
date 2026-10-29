import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function Home() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Link to="/login">Go to login</Link>;
  }

  return (
    <div>
      <h1>Flipside</h1>
      <p>Logged in as {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
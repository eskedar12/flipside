import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/">Flip</Link>
      <Link to="/history">History</Link>
      <span className="nav-user">{user.email}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
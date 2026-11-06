import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <span className="brand-dot" />
        Flipside
      </Link>
      <NavLink to="/" end>
        Flip
      </NavLink>
      <NavLink to="/history">History</NavLink>
      <span className="nav-user">{user.email}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
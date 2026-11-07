import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import { api } from '../api.js';

export default function History() {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getDecisions();
        setDecisions(data.decisions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this decision?')) return;

    setError('');

    try {
      await api.deleteDecision(id);
      setDecisions(decisions.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Nav />

      <h1>History{decisions.length > 0 && ` (${decisions.length})`}</h1>

      {error && <p className="error">{error}</p>}

      {loading && <p className="empty">Loading...</p>}

      {!loading && decisions.length === 0 && !error && (
        <p className="empty">
          No decisions yet. <Link to="/">Go flip a coin!</Link>
        </p>
      )}

      <ul className="history-list">
        {decisions.map((d) => (
          <li key={d.id}>
            <div className="history-options">
              <span className={d.result === d.option_a ? 'chip chip-win' : 'chip'}>
                {d.option_a}
              </span>
              <span className="history-vs">vs</span>
              <span className={d.result === d.option_b ? 'chip chip-win' : 'chip'}>
                {d.option_b}
              </span>
            </div>
            <div className="history-footer">
              <small>
                {new Date(d.created_at).toLocaleString([], {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </small>
              <button onClick={() => handleDelete(d.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
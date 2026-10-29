import { useEffect, useState } from 'react';
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

      <h1>History</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Loading...</p>}

      {!loading && decisions.length === 0 && !error && (
        <p>No decisions yet. Go flip a coin!</p>
      )}

      <ul className="history-list">
        {decisions.map((d) => (
          <li key={d.id}>
            <div>
              {d.option_a} vs {d.option_b}
            </div>
            <strong>{d.result}</strong>
            <small>{new Date(d.created_at).toLocaleString()}</small>
            <button onClick={() => handleDelete(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
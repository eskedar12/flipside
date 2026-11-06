import { useState } from 'react';
import Coin from '../components/Coin.jsx';
import Nav from '../components/Nav.jsx';
import { api } from '../api.js';

export default function Flip() {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [rotation, setRotation] = useState(0);
  const [pending, setPending] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const flipping = pending !== null;

  function handleFlip(e) {
    e.preventDefault();
    setError('');
    setResult('');

    const a = optionA.trim();
    const b = optionB.trim();

    if (!a || !b) {
      setError('Please type both options');
      return;
    }

    if (a.toLowerCase() === b.toLowerCase()) {
      setError('The two options must be different');
      return;
    }

    const landsOnA = Math.random() < 0.5;
    const target = landsOnA ? 0 : 180;
    const delta = (target - (rotation % 360) + 360) % 360;

    setPending({ a, b, text: landsOnA ? a : b });
    setRotation(rotation + 1800 + delta);
  }

  async function handleTransitionEnd() {
    if (!pending) return;

    const decision = pending;
    setPending(null);
    setResult(decision.text);

    try {
      await api.createDecision(decision.a, decision.b, decision.text);
    } catch (err) {
      setError(`Could not save this decision: ${err.message}`);
    }
  }

  return (
    <div>
      <Nav />

      <h1>Flip a coin</h1>

      <form onSubmit={handleFlip}>
        <label>
          Option A
          <input
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            placeholder="e.g. Pizza"
            maxLength={200}
            disabled={flipping}
          />
        </label>

        <label>
          Option B
          <input
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            placeholder="e.g. Burger"
            maxLength={200}
            disabled={flipping}
          />
        </label>

        <button type="submit" disabled={flipping}>
          {flipping ? 'Flipping...' : 'Flip'}
        </button>
      </form>

      <Coin rotation={rotation} onTransitionEnd={handleTransitionEnd} />

      <p className="legend">
        <span className="legend-badge">A</span> {optionA.trim() || 'Option A'}
        <span className="legend-sep">·</span>
        <span className="legend-badge">B</span> {optionB.trim() || 'Option B'}
      </p>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <small>The coin chose</small>
          <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
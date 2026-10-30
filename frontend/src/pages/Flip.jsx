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

      <h1>Flipside</h1>

      <form onSubmit={handleFlip}>
        <label>
          Option 1
          <input
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            maxLength={200}
            disabled={flipping}
          />
        </label>

        <label>
          Option 2
          <input
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            maxLength={200}
            disabled={flipping}
          />
        </label>

        <button type="submit" disabled={flipping}>
          {flipping ? 'Flipping...' : 'Flip'}
        </button>
      </form>

      <Coin rotation={rotation} onTransitionEnd={handleTransitionEnd} />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <h2>The coin chose: {result}</h2>}
    </div>
  );
}
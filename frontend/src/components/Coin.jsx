function StarIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Coin({ rotation, onTransitionEnd }) {
  return (
    <div className="coin-scene">
      <div
        className="coin"
        style={{ transform: `rotateY(${rotation}deg)` }}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="coin-face coin-front">
          <StarIcon />
        </div>
        <div className="coin-face coin-back">
          <MoonIcon />
        </div>
      </div>
    </div>
  );
}
export default function Coin({ rotation, onTransitionEnd }) {
  return (
    <div className="coin-scene">
      <div
        className="coin"
        style={{ transform: `rotateY(${rotation}deg)` }}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="coin-face coin-front">A</div>
        <div className="coin-face coin-back">B</div>
      </div>
    </div>
  );
}
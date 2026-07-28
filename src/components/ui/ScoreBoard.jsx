export default function ScoreBoard({ score, multiplier }) {
  return (
    <div className="score-board">
      <span className="score-board__score">{score} pts</span>
      <span className="score-board__multiplier">x{multiplier.toFixed(1)}</span>
    </div>
  )
}

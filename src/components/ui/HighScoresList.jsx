function formatDate(isoString) {
  const d = new Date(isoString)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

function formatTime(totalSeconds) {
  if (typeof totalSeconds !== 'number') return '--:--'
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function HighScoresList({ title, entries }) {
  return (
    <div className="high-scores">
      <h3 className="high-scores__title">{title}</h3>
      {entries.length === 0 ? (
        <p className="high-scores__empty">Sem recordes ainda</p>
      ) : (
        <ol className="high-scores__list">
          {entries.map((entry, i) => (
            <li key={`${entry.date}-${i}`}>
              <span>{entry.score} pts</span>
              <span className="high-scores__time">{formatTime(entry.elapsedSeconds)}</span>
              <span className="high-scores__date">{formatDate(entry.date)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) return '--/--'
  const d = timestamp.toDate()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

function formatTime(totalSeconds) {
  if (typeof totalSeconds !== 'number') return '--:--'
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function HighScoresList({ title, entries, loading }) {
  return (
    <div className="high-scores">
      <h3 className="high-scores__title">{title}</h3>
      {loading ? (
        <p className="high-scores__empty">Carregando...</p>
      ) : entries.length === 0 ? (
        <p className="high-scores__empty">Sem recordes ainda</p>
      ) : (
        <ol className="high-scores__list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <span className="high-scores__player">{entry.playerName}</span>
              <span className="high-scores__meta">
                <span>{entry.score} pts</span>
                <span className="high-scores__time">{formatTime(entry.elapsedSeconds)}</span>
                <span className="high-scores__date">{formatDate(entry.createdAt)}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

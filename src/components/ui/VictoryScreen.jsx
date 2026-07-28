import { NARRATIVE_TEXT } from '../../content/narrativeText'
import HighScoresList from './HighScoresList'
import SoundToggle from './SoundToggle'
import CharacterPortrait from '../onboarding/CharacterPortrait'

export default function VictoryScreen({
  score,
  timeBonus,
  finalScore,
  elapsedSeconds,
  isNewRecord,
  highScoreEntries,
  onRestart,
  muted,
  toggleMuted,
  characterId,
}) {
  const { title, lines } = NARRATIVE_TEXT.victory

  return (
    <div className="end-screen end-screen--won">
      <div className="screen-top-bar">
        <SoundToggle muted={muted} onToggle={toggleMuted} />
      </div>

      <div className="end-screen__card">
        <CharacterPortrait characterId={characterId} pose="comemorando" size={120} />
        <h2>{title}</h2>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>Tempo: {elapsedSeconds}s</p>
        <p>Pontuação: {score} pts</p>
        <p>Bônus de tempo: +{timeBonus} pts</p>
        <p className="end-screen__final-score">Total: {finalScore} pts</p>
        {isNewRecord && <p className="end-screen__new-record">Novo recorde!</p>}
        <HighScoresList title="Recordes" entries={highScoreEntries} />
        <button type="button" onClick={onRestart}>
          Jogar novamente
        </button>
      </div>
    </div>
  )
}

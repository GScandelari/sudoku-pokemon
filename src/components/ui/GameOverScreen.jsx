import { NARRATIVE_TEXT } from '../../content/narrativeText'
import SoundToggle from './SoundToggle'
import CharacterPortrait from '../onboarding/CharacterPortrait'

export default function GameOverScreen({ score, onRestart, muted, toggleMuted, characterId }) {
  const { title, lines } = NARRATIVE_TEXT.gameOver

  return (
    <div className="end-screen end-screen--lost">
      <div className="screen-top-bar">
        <SoundToggle muted={muted} onToggle={toggleMuted} />
      </div>

      <div className="end-screen__card">
        <CharacterPortrait characterId={characterId} pose="derrotado" size={120} />
        <h2>{title}</h2>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="end-screen__final-score">Pontuação final: {score} pts</p>
        <button type="button" onClick={onRestart}>
          Tentar novamente
        </button>
      </div>
    </div>
  )
}

import CharacterPortrait from './CharacterPortrait'
import SoundToggle from '../ui/SoundToggle'
import { CHARACTERS } from '../../data/character'

export default function CharacterSelect({ onSelect, muted, toggleMuted }) {
  return (
    <div className="character-select">
      <div className="screen-top-bar">
        <SoundToggle muted={muted} onToggle={toggleMuted} />
      </div>

      <h2>Quem é você?</h2>
      <p>Escolha seu personagem para começar a jornada:</p>
      <div className="character-select__options">
        {CHARACTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="character-select__option"
            onClick={() => onSelect(c.id)}
          >
            <CharacterPortrait characterId={c.id} size={96} />
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

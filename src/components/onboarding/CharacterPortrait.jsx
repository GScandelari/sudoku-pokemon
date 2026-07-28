import { getCharacterById } from '../../data/character'

export default function CharacterPortrait({ characterId, pose = 'idle', size = 96 }) {
  const character = getCharacterById(characterId)
  if (!character) return null

  const imageSrc = character.poses[pose]

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={character.label}
        title={character.label}
        style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
      />
    )
  }

  // Placeholder: círculo colorido com a inicial, usado enquanto a pose real
  // não existe para este personagem (ex: Menina, ainda pendente).
  return (
    <div
      className="character-portrait-placeholder"
      title={character.label}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: character.placeholderColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {character.placeholderInitial}
    </div>
  )
}

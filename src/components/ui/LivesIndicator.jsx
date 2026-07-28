import { MAX_LIVES } from '../../game-logic/scoring'

export default function LivesIndicator({ lives }) {
  return (
    <div className="lives-indicator">
      {Array.from({ length: MAX_LIVES }, (_, i) => (
        <span
          key={i}
          className={`lives-indicator__pip ${i < lives ? 'lives-indicator__pip--full' : 'lives-indicator__pip--empty'}`}
        />
      ))}
    </div>
  )
}

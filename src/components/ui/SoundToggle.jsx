export default function SoundToggle({ muted, onToggle }) {
  return (
    <button type="button" className="icon-toggle" onClick={onToggle}>
      {muted ? 'Som: Mudo' : 'Som: Ligado'}
    </button>
  )
}

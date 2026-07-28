import SoundToggle from './SoundToggle'

export default function PauseScreen({ onResume, onExit, muted, toggleMuted }) {
  return (
    <div className="end-screen">
      <div className="screen-top-bar">
        <SoundToggle muted={muted} onToggle={toggleMuted} />
      </div>

      <div className="end-screen__card">
        <h2>PAUSADO</h2>
        <button type="button" onClick={onResume}>
          Continuar
        </button>
        <button type="button" onClick={onExit}>
          Sair para o menu
        </button>
      </div>
    </div>
  )
}

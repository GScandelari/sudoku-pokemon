export default function LoginScreen({ onSignInGoogle, onSignInGuest, authError }) {
  return (
    <div className="difficulty-select-layout" style={{ justifyContent: 'center' }}>
      <div className="difficulty-select">
        <h1>Pokémon Pixel Sudoku</h1>
        <p>
          O placar de pontuação é público — todo mundo que joga aparece nele. Entre com sua conta
          Google para aparecer com seu nome, ou continue como convidado (aparece como um número
          anônimo).
        </p>

        <div className="main-menu__options">
          <button type="button" onClick={onSignInGoogle}>
            Entrar com Google
          </button>
          <button type="button" onClick={onSignInGuest}>
            Continuar anônimo
          </button>
        </div>

        {authError && <p style={{ color: 'var(--color-danger)' }}>{authError}</p>}
      </div>
    </div>
  )
}

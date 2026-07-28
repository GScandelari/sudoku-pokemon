import { useState } from 'react'
import './styles/index.css'
import SudokuGrid from './components/board/SudokuGrid'
import PokemonPicker from './components/ui/PokemonPicker'
import ScoreBoard from './components/ui/ScoreBoard'
import LivesIndicator from './components/ui/LivesIndicator'
import Timer from './components/ui/Timer'
import GameOverScreen from './components/ui/GameOverScreen'
import VictoryScreen from './components/ui/VictoryScreen'
import PauseScreen from './components/ui/PauseScreen'
import HighScoresList from './components/ui/HighScoresList'
import ThemeToggle from './components/ui/ThemeToggle'
import SoundToggle from './components/ui/SoundToggle'
import CharacterSelect from './components/onboarding/CharacterSelect'
import OnboardingGuide from './components/onboarding/OnboardingGuide'
import CharacterPortrait from './components/onboarding/CharacterPortrait'
import LoginScreen from './components/auth/LoginScreen'
import { useGameState } from './hooks/useGameState'
import { useTheme } from './hooks/useTheme'
import { useSound } from './hooks/useSound'
import { useOnboarding } from './hooks/useOnboarding'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import { useGameMusic } from './hooks/useGameMusic'
import { useAuth } from './hooks/useAuth'
import { useHighScores } from './hooks/useHighScores'
import { loadSavedGame, hasSavedGame } from './game-logic/savedGame'
import { DIFFICULTY } from './game-logic/sudokuGenerator'
import { NARRATIVE_TEXT } from './content/narrativeText'

const DIFFICULTY_LABELS = {
  [DIFFICULTY.FACIL]: 'Fácil',
  [DIFFICULTY.MEDIO]: 'Médio',
  [DIFFICULTY.DIFICIL]: 'Difícil',
}

function MenuLayout({ characterId, muted, toggleMuted, children }) {
  return (
    <div className="difficulty-select-layout">
      <div className="screen-top-bar">
        <SoundToggle muted={muted} onToggle={toggleMuted} />
      </div>

      <div className="difficulty-select-layout__character">
        <CharacterPortrait characterId={characterId} pose="idle" size={220} />
      </div>

      <div className="difficulty-select">{children}</div>
    </div>
  )
}

function MainMenu({ onNewGame, onContinue, onScores, onSettings, canContinue, characterId, muted, toggleMuted }) {
  return (
    <MenuLayout characterId={characterId} muted={muted} toggleMuted={toggleMuted}>
      <h1>{NARRATIVE_TEXT.welcome.title}</h1>
      <p>{NARRATIVE_TEXT.welcome.subtitle}</p>

      <div className="main-menu__options">
        <button type="button" onClick={onNewGame}>
          Novo Jogo
        </button>
        {canContinue && (
          <button type="button" onClick={onContinue}>
            Continuar
          </button>
        )}
        <button type="button" onClick={onScores}>
          Pontuação
        </button>
        <button type="button" onClick={onSettings}>
          Configurações
        </button>
      </div>
    </MenuLayout>
  )
}

function DifficultyScreen({ onChoose, onBack, characterId, muted, toggleMuted }) {
  return (
    <MenuLayout characterId={characterId} muted={muted} toggleMuted={toggleMuted}>
      <h2>Escolha a dificuldade</h2>
      <div className="difficulty-select__options">
        {Object.values(DIFFICULTY).map((d) => (
          <button key={d} type="button" onClick={() => onChoose(d)}>
            {DIFFICULTY_LABELS[d]}
          </button>
        ))}
      </div>
      <button type="button" className="icon-toggle" onClick={onBack}>
        Voltar
      </button>
    </MenuLayout>
  )
}

// Um componente por dificuldade para poder chamar useHighScores (hook) uma
// vez por lista, sem violar as regras de hooks dentro de um .map().
function DifficultyScores({ difficulty, label }) {
  const { entries, loading } = useHighScores(difficulty)
  return <HighScoresList title={label} entries={entries} loading={loading} />
}

function ScoresScreen({ onBack, characterId, muted, toggleMuted }) {
  return (
    <MenuLayout characterId={characterId} muted={muted} toggleMuted={toggleMuted}>
      <h2>Pontuação</h2>
      <p>Placar público — todos os jogadores aparecem aqui.</p>
      <div className="difficulty-select__scores">
        {Object.values(DIFFICULTY).map((d) => (
          <DifficultyScores key={d} difficulty={d} label={DIFFICULTY_LABELS[d]} />
        ))}
      </div>
      <button type="button" className="icon-toggle" onClick={onBack}>
        Voltar
      </button>
    </MenuLayout>
  )
}

function SettingsScreen({
  onBack,
  theme,
  toggleTheme,
  characterId,
  muted,
  toggleMuted,
  onReplayGuide,
  onChangeCharacter,
  displayName,
  isAnonymous,
  onSignInGoogle,
  onSignOut,
}) {
  return (
    <MenuLayout characterId={characterId} muted={muted} toggleMuted={toggleMuted}>
      <h2>Configurações</h2>
      <p>Jogando como: <strong>{displayName}</strong></p>
      <div className="main-menu__options">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <button type="button" className="character-badge" onClick={onChangeCharacter}>
          <CharacterPortrait characterId={characterId} size={40} />
          <span>Trocar personagem</span>
        </button>
        <button type="button" className="icon-toggle" onClick={onReplayGuide}>
          Como jogar?
        </button>
        {isAnonymous && (
          <button type="button" onClick={onSignInGoogle}>
            Entrar com Google
          </button>
        )}
        <button type="button" className="icon-toggle" onClick={onSignOut}>
          Sair da conta
        </button>
      </div>
      <button type="button" className="icon-toggle" onClick={onBack}>
        Voltar
      </button>
    </MenuLayout>
  )
}

function Game({ difficulty, savedGame, onExit, sound, characterId, player }) {
  const game = useGameState(difficulty, sound, savedGame, player)
  useGameMusic(!sound.muted)

  function handleExit() {
    if (window.confirm('Sair da partida atual e voltar ao menu? Seu progresso fica salvo para continuar depois.')) {
      onExit()
    }
  }

  if (!game.isReady) {
    return (
      <div className="game-screen">
        <p className="loading-message">Gerando desafio...</p>
      </div>
    )
  }

  return (
    <div className="game-screen">
      <div className="game-screen__hud">
        <ScoreBoard score={game.score} multiplier={game.multiplier} />
        <Timer elapsedSeconds={game.elapsedSeconds} />
        <LivesIndicator lives={game.lives} />
        <div className="game-screen__controls">
          <button type="button" className="icon-toggle" onClick={game.togglePause}>
            Pausar
          </button>
          <button type="button" className="icon-toggle" onClick={handleExit}>
            Sair
          </button>
          <SoundToggle muted={sound.muted} onToggle={sound.toggleMuted} />
        </div>
      </div>

      <SudokuGrid
        board={game.board}
        givensMask={game.givensMask}
        lockedMask={game.lockedMask}
        wrongMask={game.wrongMask}
        selectedCell={game.selectedCell}
        onSelectCell={game.selectCell}
      />

      <PokemonPicker
        disabled={!game.selectedCell}
        completedValues={game.completedValues}
        onSelect={game.chooseValue}
        onClear={game.clearSelectedCell}
      />

      {game.paused && (
        <PauseScreen
          onResume={game.togglePause}
          onExit={handleExit}
          muted={sound.muted}
          toggleMuted={sound.toggleMuted}
        />
      )}

      {game.status === 'lost' && (
        <GameOverScreen
          score={game.score}
          onRestart={onExit}
          muted={sound.muted}
          toggleMuted={sound.toggleMuted}
          characterId={characterId}
        />
      )}
      {game.status === 'won' && (
        <VictoryScreen
          score={game.score}
          timeBonus={game.timeBonus}
          finalScore={game.finalScore}
          elapsedSeconds={game.elapsedSeconds}
          isNewRecord={game.isNewRecord}
          highScoreEntries={game.highScoreEntries}
          onRestart={onExit}
          muted={sound.muted}
          toggleMuted={sound.toggleMuted}
          characterId={characterId}
        />
      )}
    </div>
  )
}

export default function App() {
  const [menuScreen, setMenuScreen] = useState('main') // 'main' | 'difficulty' | 'scores' | 'settings'
  const [difficulty, setDifficulty] = useState(null)
  const [activeSavedGame, setActiveSavedGame] = useState(null)
  const [gameKey, setGameKey] = useState(0)
  const [showGuideReplay, setShowGuideReplay] = useState(false)
  const [showCharacterChange, setShowCharacterChange] = useState(false)
  const [canContinue, setCanContinue] = useState(() => hasSavedGame())
  const { theme, toggleTheme } = useTheme()
  const sound = useSound()
  const onboarding = useOnboarding()
  const authState = useAuth()

  useBackgroundMusic(!difficulty && !sound.muted)

  function startNewGame(newDifficulty) {
    setActiveSavedGame(null)
    setDifficulty(newDifficulty)
    setGameKey((k) => k + 1)
  }

  function continueGame() {
    const saved = loadSavedGame()
    if (!saved) return
    setActiveSavedGame(saved)
    setDifficulty(saved.difficulty)
    setGameKey((k) => k + 1)
  }

  function exitToMenu() {
    setDifficulty(null)
    setActiveSavedGame(null)
    setMenuScreen('main')
    setCanContinue(hasSavedGame())
  }

  // Entrada obrigatória (Google ou convidado) antes de qualquer outra tela —
  // o placar público precisa de uma identidade para gravar a pontuação.
  if (authState.authLoading) {
    return (
      <div className="game-screen">
        <p className="loading-message">Carregando...</p>
      </div>
    )
  }

  if (!authState.isSignedIn) {
    return (
      <LoginScreen
        onSignInGoogle={authState.signInGoogle}
        onSignInGuest={authState.signInGuest}
        authError={authState.authError}
      />
    )
  }

  const player = { uid: authState.user.uid, displayName: authState.displayName }

  // Primeira visita: escolher personagem, depois ver a introdução guiada.
  if (!onboarding.hasSeenOnboarding) {
    if (!onboarding.characterId) {
      return <CharacterSelect onSelect={onboarding.chooseCharacter} muted={sound.muted} toggleMuted={sound.toggleMuted} />
    }
    return (
      <OnboardingGuide
        characterId={onboarding.characterId}
        onFinish={onboarding.completeOnboarding}
        muted={sound.muted}
        toggleMuted={sound.toggleMuted}
      />
    )
  }

  if (showCharacterChange) {
    return (
      <CharacterSelect
        onSelect={(id) => {
          onboarding.chooseCharacter(id)
          setShowCharacterChange(false)
        }}
        muted={sound.muted}
        toggleMuted={sound.toggleMuted}
      />
    )
  }

  if (showGuideReplay) {
    return (
      <OnboardingGuide
        characterId={onboarding.characterId}
        onFinish={() => setShowGuideReplay(false)}
        muted={sound.muted}
        toggleMuted={sound.toggleMuted}
      />
    )
  }

  if (difficulty) {
    return (
      <Game
        key={gameKey}
        difficulty={difficulty}
        savedGame={activeSavedGame}
        onExit={exitToMenu}
        sound={sound}
        characterId={onboarding.characterId}
        player={player}
      />
    )
  }

  if (menuScreen === 'difficulty') {
    return (
      <DifficultyScreen
        onChoose={startNewGame}
        onBack={() => setMenuScreen('main')}
        characterId={onboarding.characterId}
        muted={sound.muted}
        toggleMuted={sound.toggleMuted}
      />
    )
  }

  if (menuScreen === 'scores') {
    return (
      <ScoresScreen
        onBack={() => setMenuScreen('main')}
        characterId={onboarding.characterId}
        muted={sound.muted}
        toggleMuted={sound.toggleMuted}
      />
    )
  }

  if (menuScreen === 'settings') {
    return (
      <SettingsScreen
        onBack={() => setMenuScreen('main')}
        theme={theme}
        toggleTheme={toggleTheme}
        characterId={onboarding.characterId}
        muted={sound.muted}
        toggleMuted={sound.toggleMuted}
        onReplayGuide={() => setShowGuideReplay(true)}
        onChangeCharacter={() => setShowCharacterChange(true)}
        displayName={authState.displayName}
        isAnonymous={authState.user.isAnonymous}
        onSignInGoogle={authState.signInGoogle}
        onSignOut={authState.logOut}
      />
    )
  }

  return (
    <MainMenu
      onNewGame={() => setMenuScreen('difficulty')}
      onContinue={continueGame}
      onScores={() => setMenuScreen('scores')}
      onSettings={() => setMenuScreen('settings')}
      canContinue={canContinue}
      characterId={onboarding.characterId}
      muted={sound.muted}
      toggleMuted={sound.toggleMuted}
    />
  )
}

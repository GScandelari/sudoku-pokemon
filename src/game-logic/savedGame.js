// Persistência de uma partida em andamento (localStorage), para a opção
// "Continuar" do menu. Apenas um slot — salva continuamente enquanto o
// jogador joga, e é limpo quando a partida termina (vitória ou derrota).

const STORAGE_KEY = 'pokemon-sudoku-saved-game-v1'

export function saveGame(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function loadSavedGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearSavedGame() {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasSavedGame() {
  return loadSavedGame() !== null
}

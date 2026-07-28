// Placar de recordes local (localStorage): top 5 por dificuldade, apenas vitórias.
// Ordenado por maior pontuação; em caso de empate exato, o tempo mais rápido vence.

const STORAGE_KEY = 'pokemon-sudoku-highscores-v1'
const MAX_ENTRIES = 5

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function compareEntries(a, b) {
  return b.score - a.score || a.elapsedSeconds - b.elapsedSeconds
}

export function getHighScores(difficulty) {
  const all = loadAll()
  return all[difficulty] ?? []
}

// Insere a pontuação (se estiver entre as top 5) e retorna a lista atualizada
// junto com um sinalizador indicando se entrou no ranking.
export function submitHighScore(difficulty, score, elapsedSeconds) {
  const all = loadAll()
  const list = all[difficulty] ?? []
  const entry = { score, elapsedSeconds, date: new Date().toISOString() }

  const updated = [...list, entry].sort(compareEntries).slice(0, MAX_ENTRIES)

  const isNewRecord = updated.includes(entry)

  all[difficulty] = updated
  saveAll(all)

  return { isNewRecord, entries: updated }
}

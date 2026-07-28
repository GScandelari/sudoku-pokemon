// Geração de puzzle Sudoku 9x9 válido, com solução completa e solução única
// após a remoção de células, conforme decisões do Game Designer.

const SIZE = 9
const BOX = 3

export const DIFFICULTY = {
  FACIL: 'facil',
  MEDIO: 'medio',
  DIFICIL: 'dificil',
}

// Quantidade de "givens" (células pré-preenchidas) por nível, de um total de 81.
export const GIVENS_BY_DIFFICULTY = {
  [DIFFICULTY.FACIL]: 40,
  [DIFFICULTY.MEDIO]: 32,
  [DIFFICULTY.DIFICIL]: 26,
}

function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function isPlacementValid(grid, row, col, value) {
  for (let i = 0; i < SIZE; i++) {
    if (grid[row][i] === value || grid[i][col] === value) return false
  }
  const boxRow = Math.floor(row / BOX) * BOX
  const boxCol = Math.floor(col / BOX) * BOX
  for (let r = boxRow; r < boxRow + BOX; r++) {
    for (let c = boxCol; c < boxCol + BOX; c++) {
      if (grid[r][c] === value) return false
    }
  }
  return true
}

function findEmptyCell(grid) {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === 0) return [row, col]
    }
  }
  return null
}

// Backtracking com ordem de valores aleatória para gerar uma solução completa e variada.
function fillGrid(grid) {
  const empty = findEmptyCell(grid)
  if (!empty) return true

  const [row, col] = empty
  const values = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])

  for (const value of values) {
    if (isPlacementValid(grid, row, col, value)) {
      grid[row][col] = value
      if (fillGrid(grid)) return true
      grid[row][col] = 0
    }
  }
  return false
}

export function generateFullSolution() {
  const grid = createEmptyGrid()
  fillGrid(grid)
  return grid
}

// Conta soluções até `limit` (parada antecipada) — usado apenas para checar unicidade,
// não para resolver o puzzle inteiro (evita custo exponencial desnecessário).
function countSolutions(grid, limit = 2) {
  let count = 0

  function solve(g) {
    if (count >= limit) return
    const empty = findEmptyCell(g)
    if (!empty) {
      count++
      return
    }
    const [row, col] = empty
    for (let value = 1; value <= 9; value++) {
      if (count >= limit) return
      if (isPlacementValid(g, row, col, value)) {
        g[row][col] = value
        solve(g)
        g[row][col] = 0
      }
    }
  }

  solve(grid.map((r) => [...r]))
  return count
}

// Remove células de uma solução completa até atingir o número de givens desejado,
// garantindo a cada remoção que o puzzle continua tendo solução única.
function digHoles(fullGrid, targetGivens) {
  const puzzle = fullGrid.map((r) => [...r])
  const cells = shuffle(
    Array.from({ length: SIZE * SIZE }, (_, i) => [Math.floor(i / SIZE), i % SIZE]),
  )

  let givens = SIZE * SIZE

  for (const [row, col] of cells) {
    if (givens <= targetGivens) break

    const backup = puzzle[row][col]
    puzzle[row][col] = 0

    if (countSolutions(puzzle, 2) !== 1) {
      puzzle[row][col] = backup
      continue
    }

    givens--
  }

  return puzzle
}

export function generatePuzzle(difficulty = DIFFICULTY.MEDIO) {
  const targetGivens = GIVENS_BY_DIFFICULTY[difficulty]
  if (!targetGivens) {
    throw new Error(`Dificuldade inválida: ${difficulty}`)
  }

  const solution = generateFullSolution()
  const puzzle = digHoles(solution, targetGivens)

  return { puzzle, solution, difficulty }
}

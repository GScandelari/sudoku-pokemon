// Validação de jogadas do jogador: um "erro" é definido como divergir da solução
// única pré-computada na geração do puzzle (decisão do Game Designer).

export function isCorrectPlacement(solution, row, col, value) {
  return solution[row][col] === value
}

export function isBoardComplete(board, solution) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== solution[row][col]) return false
    }
  }
  return true
}

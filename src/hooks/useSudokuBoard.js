import { useEffect, useMemo, useState } from 'react'
import { generatePuzzle } from '../game-logic/sudokuGenerator'
import { isBoardComplete, isCorrectPlacement } from '../game-logic/sudokuValidator'

function cloneGrid(grid) {
  return grid.map((row) => [...row])
}

// `savedGame`, quando fornecido, restaura um tabuleiro salvo em vez de gerar
// um novo puzzle — usado pela opção "Continuar" do menu. Só é lido na
// primeira renderização (não reage a mudanças posteriores).
export function useSudokuBoard(difficulty, savedGame) {
  // A geração (sobretudo no nível Difícil) pode levar até ~2s e bloqueia a thread principal.
  // Por isso roda em useEffect (após a primeira pintura) em vez de direto no useState,
  // permitindo exibir um estado de carregamento em vez de travar a UI sem feedback.
  const [puzzleData, setPuzzleData] = useState(() =>
    savedGame ? { puzzle: savedGame.puzzle, solution: savedGame.solution } : null,
  )
  const [board, setBoard] = useState(() => (savedGame ? savedGame.board : null))
  const [wrongMask, setWrongMask] = useState(() => (savedGame ? savedGame.wrongMask : null))

  useEffect(() => {
    if (savedGame) return
    const data = generatePuzzle(difficulty)
    setPuzzleData(data)
    setBoard(cloneGrid(data.puzzle))
    setWrongMask(data.puzzle.map((row) => row.map(() => false)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty])

  const givensMask = useMemo(
    () => (puzzleData ? puzzleData.puzzle.map((row) => row.map((v) => v !== 0)) : null),
    [puzzleData],
  )

  // Uma célula fica travada se for um given original OU se o jogador já a acertou —
  // isso evita perder uma vida sobrescrevendo por engano uma resposta já correta.
  // Células erradas continuam editáveis (o jogador pode apagar e tentar de novo).
  const lockedMask = useMemo(() => {
    if (!givensMask || !board || !wrongMask) return null
    return board.map((row, r) =>
      row.map((value, c) => givensMask[r][c] || (value !== 0 && !wrongMask[r][c])),
    )
  }, [board, wrongMask, givensMask])

  function isLocked(row, col) {
    return lockedMask[row][col]
  }

  // Um valor "esgota" quando suas 9 ocorrências já estão corretamente
  // preenchidas no tabuleiro — não há mais nenhuma célula que possa recebê-lo.
  const completedValues = useMemo(() => {
    if (!board || !wrongMask) return null
    const counts = new Array(10).fill(0)
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = board[r][c]
        if (value !== 0 && !wrongMask[r][c]) counts[value]++
      }
    }
    const completed = new Set()
    for (let value = 1; value <= 9; value++) {
      if (counts[value] === 9) completed.add(value)
    }
    return completed
  }, [board, wrongMask])

  // Retorna { correct } para quem chama decidir o efeito em vidas/pontuação/combo.
  function placeValue(row, col, value) {
    if (isLocked(row, col)) return null

    const correct = isCorrectPlacement(puzzleData.solution, row, col, value)

    setBoard((prev) => {
      const next = cloneGrid(prev)
      next[row][col] = value
      return next
    })
    setWrongMask((prev) => {
      const next = cloneGrid(prev)
      next[row][col] = !correct
      return next
    })

    return { correct }
  }

  function clearCell(row, col) {
    if (isLocked(row, col)) return

    setBoard((prev) => {
      const next = cloneGrid(prev)
      next[row][col] = 0
      return next
    })
    setWrongMask((prev) => {
      const next = cloneGrid(prev)
      next[row][col] = false
      return next
    })
  }

  const isReady = puzzleData !== null
  const isComplete = isReady && isBoardComplete(board, puzzleData.solution)

  return {
    isReady,
    board,
    puzzle: puzzleData?.puzzle ?? null,
    solution: puzzleData?.solution ?? null,
    givensMask,
    wrongMask,
    lockedMask,
    completedValues,
    isLocked,
    placeValue,
    clearCell,
    isComplete,
  }
}

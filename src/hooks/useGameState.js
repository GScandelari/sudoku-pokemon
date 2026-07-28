import { useEffect, useState } from 'react'
import { useSudokuBoard } from './useSudokuBoard'
import { useHighScores } from './useHighScores'
import { saveGame, clearSavedGame } from '../game-logic/savedGame'
import {
  MAX_LIVES,
  MIN_MULTIPLIER,
  nextMultiplier,
  pointsForCorrectMove,
  timeBonus as computeTimeBonus,
} from '../game-logic/scoring'

// `sound` é injetado (instância única de useSound criada em App) em vez de
// instanciado aqui, para que o estado de mudo não fique dessincronizado entre
// a tela de dificuldade e a partida em andamento.
// `savedGame`, quando fornecido, retoma uma partida salva (opção "Continuar").
export function useGameState(difficulty, sound, savedGame) {
  const sudoku = useSudokuBoard(difficulty, savedGame)
  const highScores = useHighScores(difficulty)

  const [selectedCell, setSelectedCell] = useState(null)
  const [score, setScore] = useState(() => savedGame?.score ?? 0)
  const [multiplier, setMultiplier] = useState(() => savedGame?.multiplier ?? MIN_MULTIPLIER)
  const [lives, setLives] = useState(() => savedGame?.lives ?? MAX_LIVES)
  const [elapsedSeconds, setElapsedSeconds] = useState(() => savedGame?.elapsedSeconds ?? 0)
  const [status, setStatus] = useState('playing') // 'playing' | 'won' | 'lost'
  const [paused, setPaused] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)

  const timeBonus = status === 'won' ? computeTimeBonus(elapsedSeconds) : 0
  const finalScore = score + timeBonus

  useEffect(() => {
    if (!sudoku.isReady || status !== 'playing' || paused) return undefined
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [sudoku.isReady, status, paused])

  useEffect(() => {
    if (status === 'playing' && lives <= 0) setStatus('lost')
  }, [lives, status])

  useEffect(() => {
    if (status === 'playing' && sudoku.isComplete) setStatus('won')
  }, [sudoku.isComplete, status])

  // Salva a partida continuamente (localStorage) enquanto estiver em
  // andamento, para a opção "Continuar" do menu — inclusive se o jogador
  // fechar a aba sem clicar em "Sair".
  useEffect(() => {
    if (!sudoku.isReady || status !== 'playing') return
    saveGame({
      difficulty,
      puzzle: sudoku.puzzle,
      solution: sudoku.solution,
      board: sudoku.board,
      wrongMask: sudoku.wrongMask,
      score,
      multiplier,
      lives,
      elapsedSeconds,
    })
  }, [sudoku.isReady, status, difficulty, sudoku.puzzle, sudoku.solution, sudoku.board, sudoku.wrongMask, score, multiplier, lives, elapsedSeconds])

  // Dispara o som, grava o recorde e limpa a partida salva na transição de
  // status (dependência limitada a `status` de propósito, para não repetir).
  useEffect(() => {
    if (status === 'won') {
      sound.playVictory()
      setIsNewRecord(highScores.submit(finalScore, elapsedSeconds))
      clearSavedGame()
    } else if (status === 'lost') {
      sound.playDefeat()
      clearSavedGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  function selectCell(row, col) {
    if (!sudoku.isReady || status !== 'playing' || paused) return
    if (sudoku.isLocked(row, col)) return
    setSelectedCell({ row, col })
  }

  function chooseValue(value) {
    if (!sudoku.isReady || status !== 'playing' || paused || !selectedCell) return

    const result = sudoku.placeValue(selectedCell.row, selectedCell.col, value)
    if (!result) return

    if (result.correct) {
      sound.playCorrect()
      const newMultiplier = nextMultiplier(multiplier)
      setMultiplier(newMultiplier)
      setScore((prev) => prev + pointsForCorrectMove(newMultiplier))
    } else {
      sound.playWrong()
      setMultiplier(MIN_MULTIPLIER)
      setLives((prev) => prev - 1)
    }
  }

  function clearSelectedCell() {
    if (!sudoku.isReady || status !== 'playing' || paused || !selectedCell) return
    sudoku.clearCell(selectedCell.row, selectedCell.col)
  }

  function togglePause() {
    if (status !== 'playing') return
    setPaused((prev) => !prev)
  }

  return {
    isReady: sudoku.isReady,
    board: sudoku.board,
    givensMask: sudoku.givensMask,
    lockedMask: sudoku.lockedMask,
    wrongMask: sudoku.wrongMask,
    completedValues: sudoku.completedValues,
    selectedCell,
    selectCell,
    chooseValue,
    clearSelectedCell,
    score,
    multiplier,
    lives,
    elapsedSeconds,
    status,
    timeBonus,
    finalScore,
    paused,
    togglePause,
    highScoreEntries: highScores.entries,
    isNewRecord,
  }
}

import { useCallback, useState } from 'react'
import {
  playCorrectSound,
  playWrongSound,
  playVictorySound,
  playDefeatSound,
} from '../game-logic/sound'

const MUTED_KEY = 'pokemon-sudoku-muted'

function readMuted() {
  return localStorage.getItem(MUTED_KEY) === 'true'
}

export function useSound() {
  const [muted, setMuted] = useState(readMuted)

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      localStorage.setItem(MUTED_KEY, String(next))
      return next
    })
  }, [])

  const playCorrect = useCallback(() => {
    if (!readMuted()) playCorrectSound()
  }, [])
  const playWrong = useCallback(() => {
    if (!readMuted()) playWrongSound()
  }, [])
  const playVictory = useCallback(() => {
    if (!readMuted()) playVictorySound()
  }, [])
  const playDefeat = useCallback(() => {
    if (!readMuted()) playDefeatSound()
  }, [])

  return { muted, toggleMuted, playCorrect, playWrong, playVictory, playDefeat }
}

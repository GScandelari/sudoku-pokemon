import { useCallback, useState } from 'react'
import { getHighScores, submitHighScore } from '../game-logic/highScores'

export function useHighScores(difficulty) {
  const [entries, setEntries] = useState(() => getHighScores(difficulty))

  const refresh = useCallback(() => {
    setEntries(getHighScores(difficulty))
  }, [difficulty])

  const submit = useCallback(
    (score, elapsedSeconds) => {
      const result = submitHighScore(difficulty, score, elapsedSeconds)
      setEntries(result.entries)
      return result.isNewRecord
    },
    [difficulty],
  )

  return { entries, refresh, submit }
}

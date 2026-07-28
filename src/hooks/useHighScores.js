import { useCallback, useEffect, useState } from 'react'
import { getTopScores, submitScore } from '../game-logic/highScores'

export function useHighScores(difficulty) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      setEntries(await getTopScores(difficulty))
    } catch (err) {
      console.error('Falha ao carregar o placar:', err)
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [difficulty])

  useEffect(() => {
    refresh()
  }, [refresh])

  const submit = useCallback(
    async (score, elapsedSeconds, player) => {
      try {
        const result = await submitScore({
          uid: player.uid,
          playerName: player.displayName,
          difficulty,
          score,
          elapsedSeconds,
        })
        setEntries(result.entries)
        return result.isNewRecord
      } catch (err) {
        console.error('Falha ao gravar pontuação no placar:', err)
        return false
      }
    },
    [difficulty],
  )

  return { entries, loading, refresh, submit }
}

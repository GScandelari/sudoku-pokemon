import { useEffect } from 'react'
import { startGameMusic, stopGameMusic } from '../game-logic/music'

export function useGameMusic(enabled) {
  useEffect(() => {
    if (enabled) {
      startGameMusic()
    } else {
      stopGameMusic()
    }
    return () => stopGameMusic()
  }, [enabled])
}

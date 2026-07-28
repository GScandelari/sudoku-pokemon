import { useEffect } from 'react'
import { startBackgroundMusic, stopBackgroundMusic } from '../game-logic/music'

export function useBackgroundMusic(enabled) {
  useEffect(() => {
    if (enabled) {
      startBackgroundMusic()
    } else {
      stopBackgroundMusic()
    }
    return () => stopBackgroundMusic()
  }, [enabled])
}

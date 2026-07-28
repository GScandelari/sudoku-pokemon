import { useCallback, useState } from 'react'

const SEEN_KEY = 'pokemon-sudoku-onboarding-seen'
const CHARACTER_KEY = 'pokemon-sudoku-character'

export function useOnboarding() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(
    () => localStorage.getItem(SEEN_KEY) === 'true',
  )
  const [characterId, setCharacterId] = useState(() => localStorage.getItem(CHARACTER_KEY))

  const chooseCharacter = useCallback((id) => {
    localStorage.setItem(CHARACTER_KEY, id)
    setCharacterId(id)
  }, [])

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(SEEN_KEY, 'true')
    setHasSeenOnboarding(true)
  }, [])

  return { hasSeenOnboarding, characterId, chooseCharacter, completeOnboarding }
}

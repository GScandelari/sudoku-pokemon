// Fórmulas de pontuação conforme especificação oficial do projeto.

export const BASE_POINTS = 100
export const COMBO_STEP = 0.5
export const MAX_MULTIPLIER = 5.0
export const MIN_MULTIPLIER = 1.0
export const MAX_LIVES = 3

export function nextMultiplier(currentMultiplier) {
  return Math.min(MAX_MULTIPLIER, currentMultiplier + COMBO_STEP)
}

export function pointsForCorrectMove(multiplier) {
  return BASE_POINTS * multiplier
}

export function timeBonus(elapsedSeconds) {
  return Math.max(0, 10000 - elapsedSeconds * 10)
}

import { useState } from 'react'
import CharacterPortrait from './CharacterPortrait'
import SoundToggle from '../ui/SoundToggle'
import { ONBOARDING_STEPS } from '../../content/onboardingText'

export default function OnboardingGuide({ characterId, onFinish, muted, toggleMuted }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = ONBOARDING_STEPS[stepIndex]
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1

  function handleNext() {
    if (isLastStep) {
      onFinish()
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  return (
    <div className="onboarding-guide">
      <div className="screen-top-bar">
        <SoundToggle muted={muted} onToggle={toggleMuted} />
      </div>

      <div className="onboarding-guide__dialogue">
        <CharacterPortrait characterId={characterId} pose={step.pose} size={120} />
        <div className="onboarding-guide__bubble">
          <p>{step.text}</p>
        </div>
      </div>
      <div className="onboarding-guide__controls">
        <button type="button" className="icon-toggle" onClick={onFinish}>
          Pular
        </button>
        <span className="onboarding-guide__progress">
          {stepIndex + 1}/{ONBOARDING_STEPS.length}
        </span>
        <button type="button" onClick={handleNext}>
          {isLastStep ? 'Começar!' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}

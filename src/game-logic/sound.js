// Efeitos sonoros sintetizados via Web Audio API (osciladores estilo 8-bit),
// sem depender de arquivos de áudio externos.

let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioContext = new AudioContextClass()
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  return audioContext
}

function playTone({ frequency, duration, type = 'square', startTime = 0, volume = 0.2 }) {
  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency
  oscillator.connect(gain)
  gain.connect(ctx.destination)

  const t0 = ctx.currentTime + startTime
  gain.gain.setValueAtTime(volume, t0)
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration)

  oscillator.start(t0)
  oscillator.stop(t0 + duration)
}

export function playCorrectSound() {
  playTone({ frequency: 660, duration: 0.12, type: 'square' })
  playTone({ frequency: 880, duration: 0.15, type: 'square', startTime: 0.08 })
}

export function playWrongSound() {
  playTone({ frequency: 220, duration: 0.25, type: 'sawtooth' })
  playTone({ frequency: 160, duration: 0.3, type: 'sawtooth', startTime: 0.1 })
}

export function playVictorySound() {
  const notes = [523.25, 659.25, 783.99, 1046.5] // Dó5, Mi5, Sol5, Dó6
  notes.forEach((frequency, i) =>
    playTone({ frequency, duration: 0.2, type: 'square', startTime: i * 0.15 }),
  )
}

export function playDefeatSound() {
  const notes = [392, 349.23, 311.13, 261.63] // descendente
  notes.forEach((frequency, i) =>
    playTone({ frequency, duration: 0.25, type: 'triangle', startTime: i * 0.18 }),
  )
}

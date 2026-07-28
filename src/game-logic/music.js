// Trilhas de fundo: composições originais em estilo chiptune (8-bit),
// sintetizadas via Web Audio API — não reproduzem nenhuma música protegida
// por direitos autorais, apenas se inspiram na sonoridade retrô de Game Boy.

let audioContext = null

// Quanto antes (em ms) do instante real de início a próxima iteração é
// agendada — garante loop sem cortes mesmo com a imprecisão do setTimeout.
const LOOKAHEAD_MS = 200

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

const NOTE_FREQ = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0,
}

function scheduleNote(ctx, destination, frequency, type, startTime, duration, volume) {
  const oscillator = ctx.createOscillator()
  const noteGain = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.value = frequency
  oscillator.connect(noteGain)
  noteGain.connect(destination)

  noteGain.gain.setValueAtTime(volume, startTime)
  noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.95)

  oscillator.start(startTime)
  oscillator.stop(startTime + duration)
}

// Fábrica de faixa em loop contínuo: cada faixa mantém seu próprio estado
// (tocando ou não, e o instante exato em que a próxima iteração começa),
// para permitir múltiplas composições independentes sem cortes no loop.
function createLoopingTrack({ lead, bass, beatSeconds, volume = 0.15 }) {
  let playing = false
  let nextStartTime = 0
  let timerId = null
  let gainNode = null

  function scheduleIteration() {
    const ctx = getAudioContext()
    if (!gainNode) {
      gainNode = ctx.createGain()
      gainNode.gain.value = volume
      gainNode.connect(ctx.destination)
    }

    const startTime = nextStartTime > ctx.currentTime ? nextStartTime : ctx.currentTime + 0.05

    let t = startTime
    for (const [note, beats] of lead) {
      scheduleNote(ctx, gainNode, NOTE_FREQ[note], 'square', t, beats * beatSeconds, 0.5)
      t += beats * beatSeconds
    }
    const loopDuration = t - startTime

    let tb = startTime
    for (const [note, beats] of bass) {
      scheduleNote(ctx, gainNode, NOTE_FREQ[note], 'triangle', tb, beats * beatSeconds, 0.6)
      tb += beats * beatSeconds
    }

    nextStartTime = startTime + loopDuration

    const msUntilNextSchedule = Math.max(0, (nextStartTime - ctx.currentTime) * 1000 - LOOKAHEAD_MS)
    timerId = setTimeout(() => {
      if (playing) scheduleIteration()
    }, msUntilNextSchedule)
  }

  return {
    start() {
      if (playing) return
      playing = true
      nextStartTime = 0
      scheduleIteration()
    },
    stop() {
      playing = false
      if (timerId) {
        clearTimeout(timerId)
        timerId = null
      }
      if (gainNode) {
        // scheduleIteration agenda todas as notas de um loop inteiro de uma vez,
        // então cancelar o timer não basta: notas já agendadas continuam tocando
        // até o fim (causando sobreposição audível ao trocar de faixa). Zerar o
        // ganho aqui silencia imediatamente tudo que já estava agendado nesta faixa.
        const ctx = getAudioContext()
        const node = gainNode
        node.gain.cancelScheduledValues(ctx.currentTime)
        node.gain.setValueAtTime(node.gain.value, ctx.currentTime)
        node.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.03)
        setTimeout(() => node.disconnect(), 60) // disconnect() não aceita horário agendado
        gainNode = null
      }
    },
  }
}

// Tema do menu: 16 tempos (4 compassos), clima aventureiro em Dó maior.
const MENU_LEAD_MELODY = [
  ['E5', 1], ['G5', 1], ['A5', 1], ['G5', 1],
  ['E5', 1], ['D5', 1], ['C5', 2],
  ['D5', 1], ['E5', 1], ['F5', 1], ['E5', 1],
  ['D5', 1], ['C5', 1], ['D5', 2],
]
const MENU_BASS_LINE = [
  ['C3', 2], ['G3', 2],
  ['A3', 2], ['E3', 2],
  ['F3', 2], ['C3', 2],
  ['G3', 2], ['G3', 2],
]

// Tema da partida: arpejo mais rápido e focado, transmitindo concentração.
const GAME_LEAD_MELODY = [
  ['C5', 1], ['E5', 1], ['G5', 1], ['E5', 1],
  ['A4', 1], ['C5', 1], ['E5', 1], ['C5', 1],
  ['F4', 1], ['A4', 1], ['C5', 1], ['A4', 1],
  ['G4', 1], ['B4', 1], ['D5', 1], ['B4', 1],
]
const GAME_BASS_LINE = [
  ['C3', 4],
  ['A3', 4],
  ['F3', 4],
  ['G3', 4],
]

const menuTrack = createLoopingTrack({ lead: MENU_LEAD_MELODY, bass: MENU_BASS_LINE, beatSeconds: 0.28 })
const gameTrack = createLoopingTrack({
  lead: GAME_LEAD_MELODY,
  bass: GAME_BASS_LINE,
  beatSeconds: 0.22,
  volume: 0.12,
})

export function startBackgroundMusic() {
  menuTrack.start()
}

export function stopBackgroundMusic() {
  menuTrack.stop()
}

export function startGameMusic() {
  gameTrack.start()
}

export function stopGameMusic() {
  gameTrack.stop()
}

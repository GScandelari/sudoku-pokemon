// Personagens-guia (menino/menina) usados na introdução guiada e para o
// jogador se identificar. Cada pose aponta para um asset real; quando uma
// pose não existe ainda para o personagem, CharacterPortrait.jsx usa um
// placeholder (círculo colorido com inicial).

// import.meta.env.BASE_URL reflete o `base` do vite.config.js (ex: '/sudoku-pokemon/'),
// necessário porque o jogo é hospedado num subcaminho, não na raiz do domínio.
const ASSETS_BASE = `${import.meta.env.BASE_URL}assets/characters`

export const CHARACTERS = [
  {
    id: 'menino',
    label: 'Menino',
    placeholderInitial: 'M',
    placeholderColor: '#4870D9',
    poses: {
      idle: `${ASSETS_BASE}/menino-idle.png`,
      apontando: `${ASSETS_BASE}/menino-apontando.png`,
      comemorando: `${ASSETS_BASE}/menino-comemorando.png`,
      derrotado: `${ASSETS_BASE}/menino-derrotado.png`,
    },
  },
  {
    id: 'menina',
    label: 'Menina',
    placeholderInitial: 'F',
    placeholderColor: '#E85A9C',
    poses: {
      idle: `${ASSETS_BASE}/menina-idle.png`,
      apontando: `${ASSETS_BASE}/menina-apontando.png`,
      comemorando: `${ASSETS_BASE}/menina-comemorando.png`,
      derrotado: `${ASSETS_BASE}/menina-derrotado.png`,
    },
  },
]

export function getCharacterById(id) {
  return CHARACTERS.find((c) => c.id === id) ?? null
}

// Mapeamento oficial valor (1-9) -> Pokémon, conforme especificação do projeto.
// spriteX corresponde à posição horizontal do sprite no spritesheet final (576x64px, sprites de 64x64px).

export const POKEMON_MAP = [
  { value: 1, id: 1, name: 'Bulbasauro', line: 'planta', stage: 'base', spriteX: 0 },
  { value: 2, id: 2, name: 'Ivysauro', line: 'planta', stage: 'estagio1', spriteX: 64 },
  { value: 3, id: 3, name: 'Venusauro', line: 'planta', stage: 'estagio2', spriteX: 128 },
  { value: 4, id: 4, name: 'Charmander', line: 'fogo', stage: 'base', spriteX: 192 },
  { value: 5, id: 5, name: 'Charmeleon', line: 'fogo', stage: 'estagio1', spriteX: 256 },
  { value: 6, id: 6, name: 'Charizard', line: 'fogo', stage: 'estagio2', spriteX: 320 },
  { value: 7, id: 7, name: 'Squirtle', line: 'agua', stage: 'base', spriteX: 384 },
  { value: 8, id: 8, name: 'Wartortle', line: 'agua', stage: 'estagio1', spriteX: 448 },
  { value: 9, id: 9, name: 'Blastoise', line: 'agua', stage: 'estagio2', spriteX: 512 },
]

export const SPRITE_SIZE = 64
// import.meta.env.BASE_URL reflete o `base` do vite.config.js (ex: '/sudoku-pokemon/'),
// necessário porque o jogo é hospedado num subcaminho, não na raiz do domínio.
export const SPRITESHEET_PATH = `${import.meta.env.BASE_URL}assets/sprites/pokemon-spritesheet.png`

export function getPokemonByValue(value) {
  return POKEMON_MAP.find((p) => p.value === value) ?? null
}

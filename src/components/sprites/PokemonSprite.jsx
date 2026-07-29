import { getPokemonByValue, SPRITE_SIZE, SPRITESHEET_PATH } from '../../data/pokemonMap'

// Sem `size`: preenche 100% do elemento pai via porcentagens de CSS (usado
// nas células do tabuleiro, que têm tamanho fluido/responsivo). Com `size`:
// dimensão fixa em px (usado no seletor de Pokémon, tamanho sempre igual).
export default function PokemonSprite({ value, size }) {
  const pokemon = getPokemonByValue(value)

  if (!pokemon) return null

  if (size) {
    const scale = size / SPRITE_SIZE
    return (
      <div
        className="pokemon-sprite"
        title={pokemon.name}
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${SPRITESHEET_PATH})`,
          backgroundPosition: `${-pokemon.spriteX * scale}px 0`,
          backgroundSize: `${SPRITE_SIZE * 9 * scale}px ${SPRITE_SIZE * scale}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
        }}
      />
    )
  }

  const frameIndex = pokemon.spriteX / SPRITE_SIZE // 0..8

  return (
    <div
      className="pokemon-sprite"
      title={pokemon.name}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${SPRITESHEET_PATH})`,
        backgroundPosition: `${(frameIndex / 8) * 100}% 0`,
        backgroundSize: '900% 100%',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  )
}

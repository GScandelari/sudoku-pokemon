import { getPokemonByValue, SPRITE_SIZE, SPRITESHEET_PATH } from '../../data/pokemonMap'

export default function PokemonSprite({ value, size = SPRITE_SIZE }) {
  const pokemon = getPokemonByValue(value)

  if (!pokemon) return null

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

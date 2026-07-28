import PokemonSprite from '../sprites/PokemonSprite'
import { POKEMON_MAP } from '../../data/pokemonMap'

export default function PokemonPicker({ disabled, completedValues, onSelect, onClear }) {
  return (
    <div className="pokemon-picker">
      {POKEMON_MAP.map((p) => {
        const isCompleted = completedValues?.has(p.value)
        return (
          <button
            key={p.value}
            type="button"
            className={`pokemon-picker__option${isCompleted ? ' pokemon-picker__option--completed' : ''}`}
            disabled={disabled || isCompleted}
            onClick={() => onSelect(p.value)}
          >
            <PokemonSprite value={p.value} size={48} />
          </button>
        )
      })}
      <button
        type="button"
        className="pokemon-picker__clear"
        disabled={disabled}
        onClick={onClear}
      >
        Apagar
      </button>
    </div>
  )
}

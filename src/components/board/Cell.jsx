import PokemonSprite from '../sprites/PokemonSprite'

export default function Cell({ row, col, value, isGiven, isLocked, isWrong, isSelected, onSelect }) {
  const classNames = ['sudoku-cell']
  if (isGiven) classNames.push('sudoku-cell--given')
  if (isWrong) classNames.push('sudoku-cell--wrong')
  if (isSelected) classNames.push('sudoku-cell--selected')

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      disabled={isLocked}
      onClick={() => onSelect(row, col)}
      data-row={row}
      data-col={col}
    >
      {value !== 0 && <PokemonSprite value={value} size={44} />}
    </button>
  )
}

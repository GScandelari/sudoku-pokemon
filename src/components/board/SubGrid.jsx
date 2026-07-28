import Cell from './Cell'

export default function SubGrid({ boxRow, boxCol, board, givensMask, lockedMask, wrongMask, selectedCell, onSelectCell }) {
  const cells = []

  for (let localRow = 0; localRow < 3; localRow++) {
    for (let localCol = 0; localCol < 3; localCol++) {
      const row = boxRow * 3 + localRow
      const col = boxCol * 3 + localCol

      cells.push(
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
          value={board[row][col]}
          isGiven={givensMask[row][col]}
          isLocked={lockedMask[row][col]}
          isWrong={wrongMask[row][col]}
          isSelected={selectedCell?.row === row && selectedCell?.col === col}
          onSelect={onSelectCell}
        />,
      )
    }
  }

  return <div className="sudoku-subgrid">{cells}</div>
}

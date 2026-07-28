import SubGrid from './SubGrid'

export default function SudokuGrid({ board, givensMask, lockedMask, wrongMask, selectedCell, onSelectCell }) {
  const boxes = []

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      boxes.push(
        <SubGrid
          key={`${boxRow}-${boxCol}`}
          boxRow={boxRow}
          boxCol={boxCol}
          board={board}
          givensMask={givensMask}
          lockedMask={lockedMask}
          wrongMask={wrongMask}
          selectedCell={selectedCell}
          onSelectCell={onSelectCell}
        />,
      )
    }
  }

  return <div className="sudoku-grid">{boxes}</div>
}

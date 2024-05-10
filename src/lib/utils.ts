import { CoordinateArr, Player, boardT } from "./types.js";

export const getAvailableMoves = (board: boardT): CoordinateArr => {
  const availableMoves: CoordinateArr = [];

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === -1) {
        availableMoves.push([i, j]);
      }
    }
  }
  return availableMoves;
};

export function checkAllCoordsAreEqual(
  coordArray: CoordinateArr[],
  board: boardT
): CoordinateArr | void {
  for (let i = 0; i < coordArray.length; i++) {
    const currentDiag: CoordinateArr = coordArray[i];
    let val = -1;
    for (let j = 0; j < currentDiag.length; j++) {
      const coords = currentDiag[j];
      const [x, y] = coords;

      const boardVal = board[x][y];

      if (boardVal === Player.NONE) {
        val = -1;
        break;
      }

      if (j === 0) {
        val = boardVal;
        continue;
      }

      if (val !== boardVal) {
        break;
      }
      val = boardVal;
      if (j === currentDiag.length - 1) {
        return currentDiag;
      }
    }
  }
}

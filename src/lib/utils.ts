import { CoordinateArr, Player, boardT } from "./types.js";

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

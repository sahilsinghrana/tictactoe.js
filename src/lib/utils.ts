import {
  DIAGONAL_COORDS,
  HORIZONTAL_COORDS,
  VERTICAL_COORDS,
} from "./constants";
import { CoordinateArr, Player, boardT } from "./types";

export type checkAllCoordsAreEqualReturnT = CoordinateArr | void;

/**
 * Checks if all coordinates in the given array are equal on the board.
 * @param coordArray - Array of coordinates to check.
 * @param board - The game board.
 * @returns Returns the winning coordinates if all are equal, otherwise void.
 */
export function checkAllCoordsAreEqual(
  coordArray: CoordinateArr[],
  board: boardT
): checkAllCoordsAreEqualReturnT {
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

/**
 * Checks for winning diagonals on the board.
 * @param board - The game board.
 * @returns Returns the winning diagonal coordinates if present, otherwise void.
 */
export function checkDiagonals(board: boardT): checkAllCoordsAreEqualReturnT {
  return checkAllCoordsAreEqual(DIAGONAL_COORDS, board);
}

/**
 * Checks for winning horizontal lines on the board.
 * @param board - The game board.
 * @returns Returns the winning horizontal line coordinates if present, otherwise void.
 */
export function checkHorizontals(board: boardT): checkAllCoordsAreEqualReturnT {
  return checkAllCoordsAreEqual(HORIZONTAL_COORDS, board);
}

/**
 * Checks for winning vertical lines on the board.
 * @param board - The game board.
 * @returns Returns the winning vertical line coordinates if present, otherwise void.
 */
export function checkVerticals(board: boardT): checkAllCoordsAreEqualReturnT {
  return checkAllCoordsAreEqual(VERTICAL_COORDS, board);
}

/**
 * Checks for a win on the board by checking diagonals, horizontals, and verticals.
 * @param board - The game board.
 * @returns Returns the winning coordinates if present, otherwise false.
 */
export function checkWin(board: boardT): CoordinateArr | false {
  const diagonals = checkDiagonals(board);
  if (diagonals) return diagonals;

  const verticals = checkVerticals(board);
  if (verticals) return verticals;

  const horizontals = checkHorizontals(board);
  if (horizontals) return horizontals;

  return false;
}

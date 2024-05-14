import {
  getDefaultBoard,
  DIAGONAL_COORDS,
  HORIZONTAL_COORDS,
  VERTICAL_COORDS,
} from "./constants";

import { Coordinate, CoordinateArr, Player, boardT } from "./types";

import { checkAllCoordsAreEqual, getAvailableMoves } from "./utils";

class Board {
  board: boardT = getDefaultBoard();

  constructor(board: boardT | null | undefined) {
    if (board) {
      this.board = board;
    } else {
      board = getDefaultBoard();
    }
  }

  public getAvailableMovesFromBoard(): CoordinateArr {
    return getAvailableMoves(this.board);
  }

  update(x: number, y: number, player: Player) {
    this.board[x][y] = player;
  }

  getPos(x: Coordinate, y: Coordinate) {
    return this.board[x][y];
  }

  private checkDiagonals(): CoordinateArr | void {
    return checkAllCoordsAreEqual(DIAGONAL_COORDS, this.board);
  }

  private checkHorizontals(): CoordinateArr | void {
    return checkAllCoordsAreEqual(HORIZONTAL_COORDS, this.board);
  }
  private checkVerticals(): CoordinateArr | void {
    return checkAllCoordsAreEqual(VERTICAL_COORDS, this.board);
  }

  checkWin(): CoordinateArr | false {
    const diagonals = this.checkDiagonals();
    if (diagonals) return diagonals;

    const verticals = this.checkVerticals();
    if (verticals) return verticals;

    const horizontals = this.checkHorizontals();
    if (horizontals) return horizontals;

    return false;
  }
}

export default Board;

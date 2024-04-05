import {
  DIAGONAL_COORDS,
  HORIZONTAL_COORDS,
  VERTICAL_COORDS,
} from "./constants.js";

import {
  CoordinateArr,
  ErrorTypes,
  Player,
  boardT,
  gameStatuses,
} from "./types.js";

import { getAvailableMoves, checkAllCoordsAreEqual } from "./utils.js";

class UnplayableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorTypes.Unplayable;
  }
}

class WrongMoveError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorTypes.WrongMove;
  }
}

class TicTacToe {
  board: boardT = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  currentPlayer: Player;
  gameStatus: gameStatuses = gameStatuses.NOT_STARTED;
  winner: Player = Player.NONE;
  winCoordinates: CoordinateArr | undefined;
  availableMoves: CoordinateArr = getAvailableMoves(this.board);

  constructor() {
    this.currentPlayer = Player.PLAYER_A;
    this.gameStatus = gameStatuses.ONGOING;
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

  private checkWin(): CoordinateArr | false {
    const diagonals = this.checkDiagonals();
    if (diagonals) return diagonals;

    const verticals = this.checkVerticals();
    if (verticals) return verticals;

    const horizontals = this.checkHorizontals();
    if (horizontals) return horizontals;

    return false;
  }

  private checkGameStatus(): void {
    this.availableMoves = getAvailableMoves(this.board);
    if (!this.availableMoves.length) {
      this.gameStatus = gameStatuses.COMPLETED;
    }
  }

  private changePlayer(): void {
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
    } else {
      this.currentPlayer = 0;
    }
  }

  private updateNode(x: number, y: number): void {
    const currentValOnNode = this.board[x][y];
    if (currentValOnNode !== Player.NONE) {
      throw new WrongMoveError("Already played in that position");
    }

    this.board[x][y] = this.currentPlayer;

    const win: CoordinateArr | false = this.checkWin();
    if (win) {
      this.winCoordinates = win;
      this.gameStatus = gameStatuses.COMPLETED;
      this.winner = this.currentPlayer;
      return;
    }

    this.checkGameStatus();
  }

  public play(x: number, y: number) {
    if (this.gameStatus !== gameStatuses.ONGOING)
      throw new UnplayableError(
        "Either a player has won or game has not started"
      );

    if (x > 3 || y > 3) throw new UnplayableError("wrong position");

    this.updateNode(x, y);
    this.changePlayer();
  }
}

export default TicTacToe;

import {
  DIAGONAL_COORDS,
  HORIZONTAL_COORDS,
  VERTICAL_COORDS,
} from "./constants";

import {
  CoordinateArr,
  ErrorTypes,
  Player,
  boardT,
  gameStatuses,
} from "./types";

import {
  checkAllCoordsAreEqual,
  checkDiagonals,
  checkHorizontals,
  checkVerticals,
  checkWin,
} from "./utils";

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
  constructor() {
    this.currentPlayer = Player.PLAYER_A;
    this.gameStatus = gameStatuses.ONGOING;
  }

  private changePlayer(): void {
    const win = checkWin(this.board);
    if (win) {
      this.winCoordinates = win;
      this.gameStatus = gameStatuses.COMPLETED;
      this.winner = this.currentPlayer;
      return;
    }
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
    } else {
      this.currentPlayer = 0;
    }
  }

  private updateNode(x: number, y: number): void {
    const currentValOnNode = this.board[x][y];
    if (currentValOnNode === Player.NONE) {
      this.board[x][y] = this.currentPlayer;
      return;
    }

    throw new WrongMoveError("Already played in that position");
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

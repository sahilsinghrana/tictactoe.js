import {
  CoordinateArr,
  Coordinates,
  ErrorTypes,
  Player,
  boardT,
  gameStatuses,
} from "./types";

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

const DIAGONAL_COORDS: CoordinateArr[] = [
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
];

const VERTICAL_COORDS: CoordinateArr[] = [
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [idx, 0]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [idx, 1]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [idx, 2]),
];

const HORIZONTAL_COORDS: CoordinateArr[] = [
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [0, idx]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [1, idx]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [2, idx]),
];

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

  private checkDiagonals(): CoordinateArr | void {
    return checkAllCoordsAreEqual(DIAGONAL_COORDS, this.board);
  }

  private checkHorizontals(): CoordinateArr | void {
    return checkAllCoordsAreEqual(HORIZONTAL_COORDS, this.board);
  }
  private checkVerticals(): CoordinateArr | void {
    return checkAllCoordsAreEqual(VERTICAL_COORDS, this.board);
  }

  public checkWin(): CoordinateArr | false {
    const diagonals = this.checkDiagonals();
    if (diagonals) return diagonals;

    const verticals = this.checkVerticals();
    if (verticals) return verticals;

    const horizontals = this.checkHorizontals();
    if (horizontals) return horizontals;

    return false;
  }

  private changePlayer(): void {
    const win = this.checkWin();
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

    console.log("newB oad", {
      board: this.board,
    });
  }
}

export default TicTacToe;

function checkAllCoordsAreEqual(
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

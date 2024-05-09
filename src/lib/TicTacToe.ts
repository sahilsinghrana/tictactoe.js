import Board from "./Board.js";

import { getBestMove } from "./cpuPlayer.js";

import { CoordinateArr, ErrorTypes, Player, gameStatuses } from "./types.js";

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
  board = new Board(null);
  currentPlayer: Player;
  gameStatus: gameStatuses = gameStatuses.NOT_STARTED;
  winner: Player = Player.NONE;
  winCoordinates: CoordinateArr | undefined;
  availableMoves: CoordinateArr = this.board.getAvailableMovesFromBoard();
  moveCount: number = 0;

  constructor() {
    this.currentPlayer = Player.PLAYER_A;
    this.gameStatus = gameStatuses.ONGOING;
    console.log("sdLInked COnstructir");
  }

  private checkGameStatus(): void {
    this.availableMoves = this.board.getAvailableMovesFromBoard();
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
    const currentValOnNode = this.board.getPos(x, y);
    if (currentValOnNode !== Player.NONE) {
      throw new WrongMoveError("Already played in that position");
    }

    this.board.update(x, y, this.currentPlayer);

    const win: CoordinateArr | false = this.board.checkWin();
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
    this.moveCount++;
    if (this.moveCount > 0 && this.gameStatus === gameStatuses.ONGOING) {
      const predictionTree = getBestMove(
        this.board,
        0,
        [x, y],
        this.currentPlayer
      );

      const sortedResults = Object.values(predictionTree?.nextStates)?.sort(
        (a: Object, b: Object) => {
          return b.nextStatesScore - a.nextStatesScore;
        }
      );

      const bestMove = sortedResults[0];
      if (bestMove) {
        const [cpuX, cpuY] = bestMove.move;
        // const [cpuX, cpuY] = bestMove.move;
        this.updateNode(cpuX, cpuY);
        this.changePlayer();
        this.moveCount++;
      }
    }
  }
}

export default TicTacToe;

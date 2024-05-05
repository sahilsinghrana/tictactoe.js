import Board from "./Board";
import { CoordinateArr, Coordinates, Player, boardT } from "./types";

const WIN_POINTS = 1;
const LOSE_POINTS = -1;
const DRAW_POINTS = 0;

/**
 * Calculates the points of the
 * move based on the depth and the current result of the move
 *
 * @param result {number}
 * @param depth {number}
 */

function calculatePoints(result: number, depth: number) {
  return result - depth;
}

const createResults = (
  move: Coordinates | null,
  result: number,
  depth: number,
  resultOwner: number
) => {
  return [resultOwner, calculatePoints(result, depth), move, result, depth];
};

export function gamePredictor(board: Board, player: number) {
  const results: Object = {};
  console.log("Start Prediction");

  function predict(
    currentBoard: Board,
    depth: number = 0,
    currentMove: Coordinates | null,
    currentPlayer: Player
  ) {
    const playedMoves: Array<Object> = [];
    const isWin = currentBoard.checkWin();
    if (isWin) {
      const winningPlayer = isWin[0];

      return createResults(currentMove, 1, depth, winningPlayer[0]);
    }

    const availableMoves = currentBoard.getAvailableMovesFromBoard();
    console.log({ availableMoves });
    if (!availableMoves.length) {
      return createResults(currentMove, 0, depth, -1);
    }

    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      console.log("looping for move", move);
      const newBoard: Board = new Board(
        JSON.parse(JSON.stringify(currentBoard.board))
      );

      console.log("looping for move: newBoard", newBoard);
      newBoard.update(move[0], move[1], currentPlayer);
      console.log("looping for move after update: newBoard", newBoard);

      const predictionsForBoard = predict(
        newBoard,
        depth + 1,
        move,
        currentPlayer === 1 ? 0 : 1
      );
      console.log("looping for move: predictionsForBoard", predictionsForBoard);
      playedMoves.push([
        {
          currentPlayer,
          depth,
          move,
          predictionsForBoard,
          currentMove,
        },
      ]);
    }

    console.log("Pushing into results", playedMoves);
    if (playedMoves) {
      if (results[depth]) {
        results[depth].push({
          playedMoves,
          message: "This move generated not result",
          depth,
        });
      } else {
        results[depth] = [
          {
            playedMoves,
            message: "This move generated not result",
            depth,
          },
        ];
      }
    }
  }

  console.log("END Prediction", results);

  predict(board, 0, null, player);
  return results;
}

/**
 *
 * @param coordArray
 * @param board
 * @returns
 */
export function checkIsCoordWinnable(
  coordArray: CoordinateArr[],
  board: boardT
) {
  for (let i = 0; i < coordArray.length; i++) {
    const currentDiag: CoordinateArr = coordArray[i];

    // default value
    let val = -1;
    for (let j = 0; j < currentDiag.length; j++) {
      const isLastElement = j === currentDiag.length - 1;
      const coords = currentDiag[j];
      const [x, y] = coords;

      const boardVal: Player = board[x][y];

      if (j === 0) {
        val = boardVal;
        continue;
      }

      if (val !== boardVal && boardVal !== -1) {
        val = -1;
        break;
      }

      val = boardVal;
      if (isLastElement) {
        return currentDiag;
      }
    }
  }
  return false;
}

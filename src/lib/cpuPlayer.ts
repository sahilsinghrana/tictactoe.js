import Board from "./Board";
import { CoordinateArr, Coordinates, Player, boardT } from "./types";

/**
 * Calculates the points of the
 * move based on the depth and the current result of the move
 *
 * @param result {number}
 * @param depth {number}
 */

function calculatePoints(result: number, depth: number, resultOwner: number) {
  if (result === 1) {
    if (resultOwner === 1) {
      return 10 - depth;
    } else {
      return depth - 10;
    }
  } else {
    return 0;
  }
}

const createResults = (
  move: Coordinates | null,
  result: number,
  depth: number,
  resultOwner: number,
  meta: object
) => {
  return {
    resultOwner,
    points: calculatePoints(result, depth, resultOwner),
    move,
    result,
    depth,
    meta,
  };
};

const getStringKeyFromMove = (coordinates: Coordinates): string => {
  return `${coordinates[0]}_${coordinates[1]}`;
};

const appendMoves = (str: String, nextMove: Coordinates) => {

export function getBestMove(
  currentBoard: Board,
  depth: number = 0,
  currentMove: Coordinates,
  currentPlayer: Player,
  referenceMoves = getStringKeyFromMove(currentMove)
) {
  const results: any = {
    nextStates: [],
    nextStatesScore: 0,
    currentStateResult: {},
  };
  const playedMoves: any[] = [];

  const isWin = currentBoard.checkWin();

  if (Array.isArray(isWin)) {
    const winningPlayer = currentBoard.getPos(currentMove[0], currentMove[1]);
    const winResult = createResults(currentMove, 1, depth, winningPlayer, {
      referenceMoves,
      currentBoard,
    });
    results.nextStatesScore = winResult.points;
    results.currentStateResult = winResult;

    return results;
  }

  const availableMoves = currentBoard.getAvailableMovesFromBoard();

  if (!availableMoves.length) {
    const drawResult = createResults(currentMove, 0, depth, -1, {
      referenceMoves,
      currentBoard,
    });
    // addToFinalResult(drawResult);
    results.nextStatesScore = drawResult.points;
    results.currentStateResult = drawResult;
    return results;
  }

  let nextStatesScore = 0;

  for (let i = 0; i < availableMoves.length; i++) {

    const move: Coordinates = availableMoves[i];

    const newBoard: Board = new Board(
      JSON.parse(JSON.stringify(currentBoard.board))
    );

    newBoard.update(move[0], move[1], currentPlayer);

    const newDepth = depth + 1;
    const newPlayer = currentPlayer === 1 ? 0 : 1;

    const predictionsForBoard = getBestMove(
      newBoard,
      newDepth,
      move,
      newPlayer,
      appendMoves(referenceMoves, move)
    );


    playedMoves.push({
      currentPlayer,
      depth: newDepth,
      move,
      previousMove: currentMove,
      ...predictionsForBoard,
      currentBoard: newBoard,
    });
  }

  const sortedPlayedMoves: any[] = playedMoves.sort(
    (a: any, b: any): number => {
      return a.nextStatesScore - b.nextStatesScore;
    }
  );

  if (currentPlayer === 0) {
    if (sortedPlayedMoves[0].nextStatesScore) {
      nextStatesScore =
        nextStatesScore + (sortedPlayedMoves[0].nextStatesScore || 0);
    }
  } else {
    if (sortedPlayedMoves[sortedPlayedMoves.length - 1].nextStatesScore) {
      nextStatesScore =
        nextStatesScore +
        (sortedPlayedMoves[sortedPlayedMoves.length - 1].nextStatesScore || 0);
    }
  }

  results.nextStatesScore = nextStatesScore;
  results.nextStates = playedMoves;
  return results;
}

/**
 *
 * @param coordArray
 * @param board
 * @returns
 */
export function getWinnableCoords(coordArray: CoordinateArr[], board: boardT) {
  const winnableCoords = [];
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
        winnableCoords.push(currentDiag);
      }
    }
  }
  return winnableCoords;
}

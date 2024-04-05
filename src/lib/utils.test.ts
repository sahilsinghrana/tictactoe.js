import { DIAGONAL_COORDS } from "./constants";
import { boardT } from "./types";
import { checkAllCoordsAreEqual, checkAllCoordsAreEqualReturnT } from "./utils";

const diagonalBoards: [boardT, checkAllCoordsAreEqualReturnT][] = [
  [
    [
      [0, 1, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
  ],
  [
    [
      [0, 1, 0],
      [1, 0, -1],
      [0, 1, -1],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ],
  [
    [
      [0, 1, 0],
      [1, 0, -1],
      [1, 1, -1],
    ],
    undefined,
  ],
];

describe("checkAllCoordsAreEqual-diagonal", () => {
  test.each(diagonalBoards)(
    "should return the coordinates if board has diagonals matching or undefined if not",
    (board, res) => {
      expect(checkAllCoordsAreEqual(DIAGONAL_COORDS, board)).toEqual(res);
    }
  );
});

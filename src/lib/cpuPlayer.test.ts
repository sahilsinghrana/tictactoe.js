import { expect, test, describe } from "vitest";
import { checkIsCoordWinnable } from "./cpuPlayer";
import {
  DIAGONAL_COORDS,
  HORIZONTAL_COORDS,
  VERTICAL_COORDS,
} from "./constants";

describe("checkIsCoordWinnable", () => {
  describe("diagonals", () => {
    test("noDiagWinnable", () => {
      expect(
        checkIsCoordWinnable(DIAGONAL_COORDS, [
          [-1, -1, -1],
          [-1, 0, -1],
          [-1, -1, 1],
        ])
      ).toBe(false);
    });
    test("diag1Winnable", () => {
      expect(
        checkIsCoordWinnable(DIAGONAL_COORDS, [
          [-1, -1, 0],
          [-1, -1, -1],
          [1, -1, -1],
        ])
      ).toEqual([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
    });

    test("diag2Winnable", () => {
      expect(
        checkIsCoordWinnable(DIAGONAL_COORDS, [
          [-1, -1, 0],
          [-1, 0, -1],
          [0, -1, -1],
        ])
      ).toEqual([
        [2, 0],
        [1, 1],
        [0, 2],
      ]);
    });
  });

  test("horizontals", () => {
    expect(
      checkIsCoordWinnable(HORIZONTAL_COORDS, [
        [1, 1, 1],
        [-1, 0, -1],
        [-1, -1, 1],
      ])
    ).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
    expect(
      checkIsCoordWinnable(HORIZONTAL_COORDS, [
        [-1, -1, -1],
        [-1, 0, -1],
        [-1, -1, 1],
      ])
    ).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  test("Verticals", () => {
    expect(
      checkIsCoordWinnable(VERTICAL_COORDS, [
        [1, -1, -1],
        [1, 0, -1],
        [1, -1, 1],
      ])
    ).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });
});

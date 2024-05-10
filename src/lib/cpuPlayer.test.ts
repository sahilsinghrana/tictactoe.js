import { expect, test, describe } from "vitest";
import { getWinnableCoords } from "./cpuPlayer";
import {
  DIAGONAL_COORDS,
  HORIZONTAL_COORDS,
  VERTICAL_COORDS,
} from "./constants";

describe("checkIsCoordWinnable", () => {
  describe("diagonals", () => {
    test("noDiagWinnable", () => {
      expect(
        getWinnableCoords(DIAGONAL_COORDS, [
          [-1, -1, -1],
          [-1, 0, -1],
          [-1, -1, 1],
        ])
      ).toBe(false);
    });
    test("diag1Winnable", () => {
      expect(
        getWinnableCoords(DIAGONAL_COORDS, [
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
        getWinnableCoords(DIAGONAL_COORDS, [
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
      getWinnableCoords(HORIZONTAL_COORDS, [
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
      getWinnableCoords(HORIZONTAL_COORDS, [
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
      getWinnableCoords(VERTICAL_COORDS, [
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

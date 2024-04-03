import TicTac from "./TicTacToe";

import { CoordinateArr, Coordinates } from "./types";

export const DIAGONAL_COORDS: CoordinateArr[] = [
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

export const VERTICAL_COORDS: CoordinateArr[] = [
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [idx, 0]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [idx, 1]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [idx, 2]),
];

export const HORIZONTAL_COORDS: CoordinateArr[] = [
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [0, idx]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [1, idx]),
  Array.from({ length: 3 }).map((_, idx: number): Coordinates => [2, idx]),
];

var TicTacToe = TicTac;

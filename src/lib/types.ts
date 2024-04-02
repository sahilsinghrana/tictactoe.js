export enum ErrorTypes {
  Unplayable = "Unplayable",
  WrongMove = "WrongMove",
}

export type Coordinate = number;
export type Coordinates = [Coordinate, Coordinate];
export type CoordinateArr = Coordinates[];

export enum Player {
  NONE = -1,
  PLAYER_A = 0,
  PLAYER_B = 1,
}

export enum gameStatuses {
  COMPLETED = 1,
  NOT_STARTED = -1,
  ONGOING = 0,
}

export type boardT = [Player[], Player[], Player[]];

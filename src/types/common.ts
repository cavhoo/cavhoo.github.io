/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructable<T, TArgs extends any[] = any> = {
  new (...args: TArgs): T;
};

export enum Direction {
  North = "North",
  South = "South",
  West = "West",
  East = "East",
  NorthIdle = "NorthIdle",
  SouthIdle = "SouthIdle",
  WestIdle = "WestIdle",
  EastIdle = "EastIdle",
}

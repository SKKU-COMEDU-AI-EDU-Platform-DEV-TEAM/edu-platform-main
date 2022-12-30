import { atom, selector } from "recoil";
import { Point, User } from "../types";
import { v1 } from "uuid";
import { mockupPoint, mockupUser } from "./mockupData";
import { TypeDescriptionList } from "../config";

export const userState = atom<User>({
  key: `userState/${v1()}`,
  default: mockupUser
});

// export const userState = atom<User|null>({
//   key: `userState/${v1()}`,
//   default: null
// });

export const typeSelector = selector({
  key: `typeSelector${v1()}`,
  get: ({ get }) => {
    const user = get(userState);
    return TypeDescriptionList[user.type - 1];
  }
});

export const pointState = atom<Point>({
  key: `pointState${v1()}`,
  default: mockupPoint
});

export const quizScoreState = atom<number[]>({
  key: `quizScoreState/${v1()}`,
  default: []
});

export const bestScoreState = atom<number>({
  key: `bestScoreState/${v1()}`,
  default: Number.MAX_SAFE_INTEGER
});

export const moveState = atom<number>({
  key: `moveState/${v1()}`,
  default: 0
});

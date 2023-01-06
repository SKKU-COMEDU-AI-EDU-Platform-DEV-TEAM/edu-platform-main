import { atom, selector } from "recoil";
import { Point, User } from "../types";
import { v1 } from "uuid";
import { lectureList, TypeDescriptionList } from "../config";

export const userState = atom<User | null>({
  key: `userState/${v1()}`,
  default: null
});

export const typeSelector = selector({
  key: `typeSelector${v1()}`,
  get: ({ get }) => {
    const userType = get(userState)?.type;
    return TypeDescriptionList[userType! - 1];
  }
});

export const stepSelector = selector({
  key: `stepSelector${v1()}`,
  get: ({ get }) => {
    const userType = get(userState)?.step;
    return lectureList[userType!];
  }
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

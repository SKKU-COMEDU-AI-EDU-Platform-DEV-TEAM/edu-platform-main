import { atom, selector } from "recoil";
import { Point, User } from "../types";
import { v1 } from "uuid";
import {
  mockupPoint,
  mockupTypeDescriptionList,
  mockupUser
} from "./mockupData";

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
    return mockupTypeDescriptionList[user.type - 1];
  }
});

export const pointState = atom<Point>({
  key: `pointState${v1()}`,
  default: mockupPoint
});

import { atom } from "recoil";

export const userDataAtom = atom({
  key: "userDataAtom",
  default: JSON.parse(localStorage.getItem('user'))
});
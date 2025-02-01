import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Default
export const busyValueAtom = atom(25);
export const busyValueDateAtom = atom(new Date());
// export const busySliderState = atom("read");
export const busyLastSubmitTime = atomWithStorage(
  "lastSubmitTime",
  new Date().toISOString()
);

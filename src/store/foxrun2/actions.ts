import { useFoxrunStore } from "./store";

export default {
  foxrunStore() {
    return useFoxrunStore();
  },

  SET_FOX_SPEED(speed: number) {
    this.foxrunStore().foxJumpingTime = speed;
  },
  SET_ROCK_SPEED(speed: number) {
    this.foxrunStore().rockSpeed = speed;
  },
};

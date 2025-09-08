import { defineStore } from "pinia";
import actions from "./actions";

export const useFoxrunStore = defineStore("foxrun", {
  state: () => {
    return {
      foxJumpingTime: 1000,
      rockSpeed: 500,
    };
  },
  getters: {},
  actions: actions,
});

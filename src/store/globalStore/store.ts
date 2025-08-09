import { defineStore } from "pinia";
import actions from "./actions";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      toastMessage: "",
      toastState: "error",
      toastTime: 1000,

      berryChance: 40,
      berryScore: 150,

      gameSpeed: 5,
      gameInterval: 50,
    };
  },
  getters: {},
  actions: actions,
});

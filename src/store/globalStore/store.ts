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
    };
  },
  getters: {},
  actions: actions,
});

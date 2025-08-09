import { defineStore } from "pinia";
import actions from "./actions";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      toastMessage: "",
      toastState: "error",
      toastTime: 1000,
    };
  },
  getters: {},
  actions: actions,
});

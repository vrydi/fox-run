import { defineStore } from "pinia";
import actions from "./actions";

export const useSnakeStore = defineStore("snake", {
  state: () => {
    return {
      score: 0,
      highscore: 0,
      fps: 1,
      gridWidth: 15,
      gridHeight: 15,
      snake: [] as { x: number; y: number }[],
      food: { x: 0, y: 0 },

      initSnakeLength: 3,

      direction: "right" as "up" | "down" | "left" | "right",
      nextDirection: "right" as "up" | "down" | "left" | "right",

      gameInterval: 0,
    };
  },
  getters: {},
  actions: actions,
});

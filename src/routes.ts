import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import FoxRun from "./views/fox-run/fox-run.vue";
import Draw from "./views/draw/draw.vue";
import Snake from "./views/snake/snake.vue";
import Calculator from "./views/calculator/Calculator.vue";

export const routes = [
  {
    name: "Fox Run",
    path: "/",
    component: FoxRun,
  },
  {
    name: "Pixel Draw",
    path: "/draw",
    component: Draw,
  },
  {
    name: "Snake",
    path: "/snake",
    component: Snake,
  },
  {
    name: "calculator",
    path: "/calc",
    component: Calculator,
  },
] as RouteRecordRaw[];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

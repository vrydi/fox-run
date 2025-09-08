import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import FoxRun from "./views/fox-run/fox-run.vue";
import Draw from "./views/draw/draw.vue";
import Snake from "./views/snake/snake.vue";
import Calculator from "./views/calculator/Calculator.vue";
import Foxrun2 from "./views/foxrun2/Foxrun2.vue";

export const routes = [
  {
    name: "Fox Run",
    path: "/",
    component: FoxRun,
  },
  {
    name: "Fox Run 2",
    path: "/foxrun",
    component: Foxrun2,
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

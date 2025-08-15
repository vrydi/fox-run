import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";
import FoxRun from "./views/fox-run/fox-run.vue";
import Draw from "./views/draw/draw.vue";

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
] as RouteRecordRaw[];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

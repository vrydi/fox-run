import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Obstacle from "./components/obstacle/obstacle.vue";
import Character from "./components/character/character.vue";
import Toast from "./components/toast/toast.vue";
import { createPinia } from "pinia";
import Berry from "./components/berry/berry.vue";
import Speed from "./components/speed/speed.vue";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.component("obstacle", Obstacle);
app.component("character", Character);
app.component("toast", Toast);
app.component("berry", Berry);
app.component("speed", Speed);

app.mount("#app");

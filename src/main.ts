import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Obstacle from './components/obstacle/obstacle.vue'
import Character from './components/character/character.vue'

const app = createApp(App)

app.component("obstacle", Obstacle)
app.component("character", Character)

app.mount('#app')

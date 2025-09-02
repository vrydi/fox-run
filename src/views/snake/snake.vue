<script setup lang="ts">
import { computed, ref } from "vue";
import { useSnakeStore } from "../../store/snake/store";

const snakeState = useSnakeStore();

const gameStarted = ref(false);
const gameContainer = ref<HTMLElement | null>(null);

const gameEnded = computed(() => {
  return snakeState.gameInterval === 0;
});

const startGame = () => {
  gameStarted.value = true;
  snakeState.initSnake();
  gameContainer.value?.focus();
};

const resetGame = () => {
  snakeState.$reset();
  gameStarted.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <h1 class="text-4xl font-bold mb-4">Snake Game</h1>
    <p class="text-lg">Score: {{ snakeState.score }}</p>

    <div
      class="mt-6 p-4 border rounded-lg bg-gray-100"
      @keydown="snakeState.handleKeydown($event)"
      tabindex="0"
      ref="gameContainer"
    >
      <div v-if="gameEnded && gameStarted" class="text-center">
        <h2 class="text-2xl font-bold mb-2">Game Over!</h2>
        <p class="mb-4">Your final score: {{ snakeState.score }}</p>
        <button
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          @click="resetGame"
        >
          Reset Game
        </button>
      </div>
      <div
        class="mt-4 flex justify-center space-x-4"
        v-if="!gameStarted || gameEnded"
      >
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="startGame"
          v-if="!gameStarted"
        >
          Start Game
        </button>
      </div>

      <table v-else>
        <tbody className="">
          <tr v-for="y in snakeState.gridWidth" :key="y" class="h-[20px]">
            <td
              v-for="x in snakeState.gridHeight"
              :key="x"
              class="w-[20px] border border-gray-300"
              :class="{
                'bg-green-800':
                  snakeState.snake[0].x === x - 1 &&
                  snakeState.snake[0].y === y - 1,
                'bg-green-500': snakeState.snake.some(
                  (segment) => segment.x === x - 1 && segment.y === y - 1
                ),
                'bg-red-500':
                  snakeState.food.x === x - 1 && snakeState.food.y === y - 1,
              }"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="gamepad flex flex-col items-center mt-4"
      v-if="gameStarted && !gameEnded"
    >
      <button
        class="m-2 p-4 bg-gray-300 rounded-full"
        @click="snakeState.changeDirection('up')"
      >
        ↑
      </button>
      <div class="flex justify-center">
        <button
          class="m-2 p-4 bg-gray-300 rounded-full"
          @click="snakeState.changeDirection('left')"
        >
          ←
        </button>
        <button
          class="m-2 p-4 bg-gray-300 rounded-full"
          @click="snakeState.changeDirection('down')"
        >
          ↓
        </button>
        <button
          class="m-2 p-4 bg-gray-300 rounded-full"
          @click="snakeState.changeDirection('right')"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

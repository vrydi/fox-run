<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import FoxComponent from "./FoxComponent.vue";
import Rock from "./Rock.vue";
import { useFoxrunStore } from "../../store/foxrun2/store";

export default defineComponent({
  setup() {
    const playarea = ref<HTMLDivElement | null>(null);
    const fox = ref<typeof FoxComponent | null>(null);
    const rockElements = ref<InstanceType<typeof Rock>[]>([]);

    const foxrunState = useFoxrunStore();
    const foxrunActions = toRaw(useFoxrunStore());

    return { playarea, fox, rockElements, foxrunState, foxrunActions };
  },
  components: { FoxComponent, Rock },
  data() {
    return {
      rocks: [] as string[],
      fps: 60,
      started: false,
      sequenceTimeoutId: 0,

      score: 0,
      timeSinceLastObject: 0,
    };
  },
  computed: {},
  methods: {
    start() {
      this.started = true;

      this.score = 0;
      this.rocks = [];

      this.foxrunState.$reset();

      // this.rocks.push(crypto.randomUUID());

      this.runSequence();
    },
    runSequence() {
      this.sequenceTimeoutId = setTimeout(() => {
        this.foxrunState.foxJumpingTime -= 0.025;
        this.foxrunState.rockSpeed -= 0.025;

        this.timeSinceLastObject--;

        this.fox?.checkForCollision();

        if (Math.random() * 100 < 10 && this.timeSinceLastObject <= 0) {
          this.rocks.push(crypto.randomUUID());
          this.timeSinceLastObject = 50;
        }

        this.runSequence();
      }, this.fps);
    },
    end() {
      window.clearTimeout(this.sequenceTimeoutId);
      this.started = false;
    },
    generateNewRock(ID: string) {
      if (!this.started) return;

      this.rocks = this.rocks.filter((rock: string) => rock !== ID);
      this.score++;
    },
  },
});
</script>

<template>
  <section>
    <div
      class="play-area h-[500px] container bg-blue-400 relative overflow-hidden"
      ref="playarea"
    >
      <div
        class="start flex h-full w-full justify-center items-center"
        v-if="!started"
      >
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="start"
        >
          start
        </button>
      </div>

      <FoxComponent ref="fox" :rocks="rockElements" @hit="end" />

      <template v-if="started">
        <p class="absolute top-5 right-10">Score: {{ score }}</p>

        <Rock
          ref="rockElements"
          v-for="x in rocks"
          :key="x"
          :ID="x"
          :widthOfArea="playarea?.getBoundingClientRect().width"
          @finished="generateNewRock"
        />
      </template>
    </div>
  </section>
</template>

<style scoped></style>

import { defineComponent, ref, toRaw } from "vue";
import Obstacle from "../../components/obstacle/obstacle.vue";
import { useGlobalStore } from "../../store/globalStore/store";

interface obstacle {
  type: "obstacle";
  show: boolean;
  ID: `${string}-${string}-${string}-${string}-${string}`;
  interval: number;
}

export default defineComponent({
  name: "FoxRun",
  setup() {
    const obstacleRefs = ref<(typeof Obstacle)[] | null>(null);

    const globalState = useGlobalStore();
    const globalActions = toRaw(useGlobalStore());

    return { obstacleRefs, globalState, globalActions };
  },
  data() {
    return {
      started: false,
      obstacles: [] as obstacle[],
      interval: 0,
      checkInterval: 0,
      score: 0,
      lastScore: 0,
      highscore: 0,
    };
  },
  computed: {},
  mounted() {},
  unmounted() {
    window.clearInterval(this.interval);
    window.clearInterval(this.checkInterval);
  },
  methods: {
    startGame() {
      this.started = true;
      this.createObstacle();

      this.interval = setInterval(() => {
        setTimeout(() => {
          this.createObstacle();
        }, Math.random() * 5000);
      }, 5000);

      this.checkInterval = setInterval(() => {
        this.score++;
        this.obstacles.forEach((obstacleObj) => {
          const obstacle = document.getElementById(obstacleObj.ID);
          if (!obstacle) return;
          let div1 = obstacle.getBoundingClientRect();

          function touching(d2: DOMRect) {
            const leftTopCoordElements = document.elementsFromPoint(
              d2.left,
              d2.top
            );
            const leftBottomCoordElements = document.elementsFromPoint(
              d2.left,
              d2.bottom
            );
            const rightTopCoordElements = document.elementsFromPoint(
              d2.right,
              d2.top
            );
            const rightBottomCoordElements = document.elementsFromPoint(
              d2.right,
              d2.bottom
            );
            return (
              leftTopCoordElements.some((el) => el.id === "character") ||
              leftBottomCoordElements.some((el) => el.id === "character") ||
              rightTopCoordElements.some((el) => el.id === "character") ||
              rightBottomCoordElements.some((el) => el.id === "character")
            );
          }

          if (touching(div1) || !this.started) {
            console.log("touch");

            this.globalActions.show_toast(
              `Your score is: ${this.score}`,
              "success",
              3000
            );
            this.started = false;
            window.clearInterval(this.interval);
            window.clearInterval(this.checkInterval);

            this.obstacles = [];
            this.lastScore = this.score;
            if (this.score > this.highscore) this.highscore = this.score;
            this.score = 0;
          }
        });
      }, 50);
    },
    createObstacle() {
      const ID = crypto.randomUUID();

      this.obstacles.push({
        type: "obstacle",
        show: true,
        ID: ID,
        interval: 0,
      });
    },
    destroyObstacle(ID: `${string}-${string}-${string}-${string}-${string}`) {
      const obstacle = this.obstacles.find((obstacle) => obstacle.ID !== ID);
      window.clearInterval(obstacle?.interval);
      this.obstacles = this.obstacles.filter((obstacle) => obstacle.ID !== ID);
    },
  },
});

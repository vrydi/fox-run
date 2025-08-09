import { defineComponent, nextTick, ref, toRaw } from "vue";
import Obstacle from "../../components/obstacle/obstacle.vue";
import { useGlobalStore } from "../../store/globalStore/store";

type ID = `${string}-${string}-${string}-${string}-${string}`;

interface obstacle {
  type: "obstacle";
  show: boolean;
  ID: ID;
  interval: number;
}

interface berry {
  type: "berry";
  ID: ID;
}

interface speed {
  type: "speed";
  ID: ID;
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
      key: 0,
      started: false,
      obstacles: [] as obstacle[],
      obstacleTimeout: 0,
      checkInterval: 0,
      berryTimeout: 0,
      speedTimeout: 0,
      score: 0,
      lastScore: 0,
      highscore: localStorage.highscore || 0,
      berries: [] as berry[],
      speed: null as speed | null,
      hasZoomies: false,
      tempSpeed: 0,
      tempSpeedInterval: 0,
      speedTimeLeft: 0,
    };
  },
  computed: {},
  mounted() {},
  unmounted() {
    window.clearTimeout(this.obstacleTimeout);
    window.clearInterval(this.checkInterval);
    window.clearTimeout(this.berryTimeout);
  },
  methods: {
    startGame() {
      this.started = true;
      this.createObstacle();

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

      this.checkInterval = setInterval(() => {
        this.score++;
        if (this.hasZoomies) this.score++;
        this.obstacles.forEach((obstacleObj) => {
          const obstacle = document.getElementById(obstacleObj.ID);
          if (!obstacle) return;
          let div1 = obstacle.getBoundingClientRect();

          if (touching(div1) || !this.started) {
            console.log("touch");

            this.endGame();
          }
        });

        this.berries.forEach((berryObj) => {
          const berry = document.getElementById(berryObj.ID);
          if (!berry) return;
          let div1 = berry.getBoundingClientRect();

          if (touching(div1)) {
            this.score += this.globalState.berryScore;
            this.destroyBerry(berryObj.ID);
          }
        });

        const checkSpeed = () => {
          if (!this.speed || this.hasZoomies) return;
          const speed = document.getElementById(this.speed.ID);
          if (!speed) return;
          let div1 = speed.getBoundingClientRect();
          if (touching(div1)) {
            this.tempSpeed = this.globalState.gameSpeed;
            this.tempSpeedInterval = this.globalState.gameInterval;
            this.hasZoomies = true;
            this.globalState.gameSpeed = this.globalState.gameSpeed * 2;

            this.speedTimeLeft = 5;
            const speedInterval = setInterval(() => {
              this.speedTimeLeft--;
            }, 1000);
            setTimeout(() => {
              this.hasZoomies = false;
              this.globalState.gameSpeed = this.tempSpeed;
              this.globalState.gameInterval = this.tempSpeedInterval;
              window.clearInterval(speedInterval);
            }, 5000);
            this.destroySpeed();
          }
        };

        checkSpeed();

        const expectedGameSpeed = Number((this.score / 500).toFixed(0)) + 5;
        if (
          this.globalState.gameSpeed !== expectedGameSpeed &&
          !this.hasZoomies
        ) {
          this.globalState.gameSpeed++;
          if (this.globalState.gameSpeed % 3 === 0) {
            this.globalState.gameInterval -= 10;
          }
        }
      }, this.globalState.gameInterval);
    },
    endGame() {
      this.globalActions.show_toast(
        `Your score is: ${this.score}`,
        "success",
        3000
      );

      nextTick(() => {
        this.started = false;
        window.clearTimeout(this.obstacleTimeout);
        window.clearInterval(this.checkInterval);
        window.clearTimeout(this.berryTimeout);

        this.obstacles = [];
        this.berries = [];
        this.speed = null;
        this.speedTimeLeft = 0;

        this.lastScore = this.score;
        if (this.score > this.highscore) this.highscore = this.score;
        this.score = 0;

        localStorage.highscore = this.highscore;

        this.globalState.gameSpeed = 5;
        this.globalState.gameInterval = 50;
        this.key++;
      });
    },
    createObstacle() {
      const ID = crypto.randomUUID();

      this.obstacles.push({
        type: "obstacle",
        show: true,
        ID: ID,
        interval: 0,
      });

      setTimeout(() => {
        if (!this.started) return;
        this.createObstacle();
        // 40% chance
        if (Math.random() > (100 - this.globalState.berryChance) / 100)
          this.berryTimeout = setTimeout(() => {
            this.createBerry();
          }, Math.random() * 5000);

        if (
          Math.random() > (100 - this.globalState.speedChance) / 100 &&
          !this.hasZoomies
        )
          setTimeout(() => {
            this.createSpeed();
          }, 1000);
      }, Math.random() * (50 * this.globalState.gameInterval) + 60 * this.globalState.gameInterval);
    },

    destroyObstacle(ID: ID) {
      this.obstacles = this.obstacles.filter((obstacle) => obstacle.ID !== ID);
    },

    createBerry() {
      this.berries.push({
        type: "berry",
        ID: crypto.randomUUID(),
      });
    },

    destroyBerry(ID: ID) {
      this.berries = this.berries.filter((berry) => berry.ID !== ID);
    },

    createSpeed() {
      if (!this.speed)
        this.speed = {
          type: "speed",
          ID: crypto.randomUUID(),
        };
    },
    destroySpeed() {
      this.speed = null;
    },
  },
});

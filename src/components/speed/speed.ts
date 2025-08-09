import { defineComponent, ref } from "vue";
import { useGlobalStore } from "../../store/globalStore/store";

export default defineComponent({
  name: "Speed",
  props: {
    ID: {
      type: String,
    },
  },
  setup() {
    const speed = ref<null | HTMLImageElement>(null);

    const globalState = useGlobalStore();

    return { speed, globalState };
  },
  data() {
    return {
      positionRight: -24,
      animationID: 0,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      if (!this.speed) return;

      const elementIsVisibleInViewport = (
        el: HTMLElement,
        partiallyVisible = false
      ) => {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        return partiallyVisible
          ? ((top > 0 && top < innerHeight) ||
              (bottom > 0 && bottom < innerHeight)) &&
              ((left > 0 && left < innerWidth) ||
                (right > 0 && right < innerWidth))
          : top >= 0 &&
              left >= 0 &&
              bottom <= innerHeight &&
              right <= innerWidth;
      };

      this.speed.style.right = this.positionRight + "px";

      this.animationID = setTimeout(() => {
        if (!this.speed) return;
        this.positionRight += this.globalState.gameSpeed;
        this.speed.style.right = this.positionRight + "px";
        if (!elementIsVisibleInViewport(this.speed!, true)) {
          this.stopAnimation();

          this.$emit("destroy", this.ID);
        } else {
          this.startAnimation();
        }
      }, this.globalState.gameInterval);
    },
    stopAnimation() {
      window.clearInterval(this.animationID);
    },
    resetAnimation() {
      this.positionRight = -24;
      this.speed!.style.right = this.positionRight + "px";
    },
  },
});

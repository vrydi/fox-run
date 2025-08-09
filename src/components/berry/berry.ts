import { defineComponent, ref } from "vue";
import { useGlobalStore } from "../../store/globalStore/store";

export default defineComponent({
  name: "Berry",
  props: {
    ID: {
      type: String,
    },
  },
  setup() {
    const berry = ref<null | HTMLImageElement>(null);

    const globalState = useGlobalStore();

    return { berry, globalState };
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
      if (!this.berry) return;

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

      this.berry.style.right = this.positionRight + "px";

      this.animationID = setTimeout(() => {
        if (!this.berry) return;
        this.positionRight += this.globalState.gameSpeed;
        this.berry.style.right = this.positionRight + "px";
        if (!elementIsVisibleInViewport(this.berry!, true)) {
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
      this.berry!.style.right = this.positionRight + "px";
    },
  },
});

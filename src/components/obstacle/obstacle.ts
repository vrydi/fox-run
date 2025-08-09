import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Obstacle",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    ID: {
      type: String,
    },
  },
  setup() {
    const obstacle = ref<null | HTMLImageElement>(null);

    return { obstacle };
  },
  data() {
    return {
      positionRight: -24,
      animationID: 0,
    };
  },
  computed: {},
  watch: {
    show() {
      if (this.show) {
        this.resetAnimation();
        this.startAnimation();
      } else {
        this.stopAnimation();
        this.resetAnimation();
      }
    },
  },
  mounted() {
    if (this.show) this.startAnimation();
  },
  methods: {
    startAnimation() {
      if (!this.obstacle) return;

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

      this.obstacle.style.right = this.positionRight + "px";

      this.animationID = setInterval(() => {
        if (!this.obstacle) return;
        this.positionRight += 5;
        this.obstacle.style.right = this.positionRight + "px";
        if (!elementIsVisibleInViewport(this.obstacle!, true)) {
          this.stopAnimation();

          this.$emit("destroy", this.ID);
        }
      }, 50);
    },
    stopAnimation() {
      window.clearInterval(this.animationID);
    },
    resetAnimation() {
      this.positionRight = -24;
      this.obstacle!.style.right = this.positionRight + "px";
    },
  },
});

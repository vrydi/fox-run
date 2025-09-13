<script lang="ts">
import { ref, toRaw, defineComponent } from "vue";
import { useFoxrunStore } from "../../store/foxrun2/store";

export default defineComponent({
  name: "Berry",
  props: {
    widthOfArea: {
      type: Number,
      default: 1000,
    },
    ID: {
      type: String,
    },
  },

  setup() {
    const berry = ref<HTMLImageElement | null>(null);
    const foxrunState = useFoxrunStore();
    const foxrunActions = toRaw(useFoxrunStore());

    return { berry, foxrunState, foxrunActions };
  },

  data() {
    return {};
  },
  computed: {
    speed() {
      return this.foxrunState.rockSpeed;
    },
  },
  mounted() {
    this.move();
  },
  methods: {
    move() {
      const duration = (this.widthOfArea * this.speed) / 100;

      const animation = this.berry?.animate(
        [{ right: "-100px" }, { right: this.widthOfArea + "px" }],
        {
          easing: "linear",
          duration: duration,
          iterations: 1,
        }
      );

      animation!.onfinish = () => {
        this.$emit("finished", this.ID);
      };
    },
  },
});
</script>

<template>
  <img
    src="https://i.ibb.co/3y2y5BXR/berry.png"
    alt="berry"
    class="absolute bottom-[-32px] h-[32px] right-0 berry"
    :id="ID"
    ref="berry"
  />
</template>

<style scoped></style>

<script lang="ts">
import { ref, toRaw, defineComponent } from "vue";
import { useFoxrunStore } from "../../store/foxrun2/store";

export default defineComponent({
  name: "Rock",
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
    const rock = ref<HTMLImageElement | null>(null);
    const foxrunState = useFoxrunStore();
    const foxrunActions = toRaw(useFoxrunStore());

    return { rock, foxrunState, foxrunActions };
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

      const animation = this.rock?.animate(
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
    src="https://i.ibb.co/LhRLHLcp/rock.png"
    alt="rock"
    class="absolute bottom-0 h-[32px] right-0 rock"
    :id="ID"
    ref="rock"
  />
</template>

<style scoped></style>

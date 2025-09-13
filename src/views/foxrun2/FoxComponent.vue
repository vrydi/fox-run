<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import { useFoxrunStore } from "../../store/foxrun2/store";
import Rock from "./Rock.vue";
import Berry from "./Berry.vue";

export default defineComponent({
  props: {
    rocks: {
      type: Array as () => InstanceType<typeof Rock>[],
    },
    berries: {
      type: Array as () => InstanceType<typeof Berry>[],
    },
  },
  emits: ["hit", "berry"],
  setup() {
    const fox = ref<HTMLImageElement | null>(null);
    const foxrunState = useFoxrunStore();
    const foxrunActions = toRaw(useFoxrunStore());

    return { fox, foxrunState, foxrunActions };
  },
  data() {
    return {
      walkingImage:
        "https://art.ngfiles.com/images/2090000/2090065_generalbaker_8-bit-fox-gif.gif?f1632328669",
      jumpingImage: "https://i.ibb.co/VcjY68JX/fox-jump.gif",
      jumping: false,
      // jumpingTime: 1000,
    };
  },
  computed: {
    image() {
      return this.jumping ? this.jumpingImage : this.walkingImage;
    },
    jumpingTime() {
      return this.foxrunState.foxJumpingTime;
    },
    // rocks() {
    //   return this.$parent?.$refs.rockElements;
    // },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.jump();
      }
    });

    document.addEventListener("click", () => {
      this.jump();
    });
  },
  unmounted() {
    document.removeEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.jump();
      }
    });
    document.removeEventListener("click", () => {
      this.jump();
    });
  },
  methods: {
    jump() {
      if (this.jumping) return;
      this.jumping = true;

      setTimeout(() => {
        this.jumping = false;
      }, this.jumpingTime + 50);

      setTimeout(() => {
        this.fox!.animate(
          [
            {
              transform: "translateY(0)",
            },
            {
              transform: "translateY(-64px)",
            },
            {
              transform: "translateY(0)",
            },
          ],
          {
            easing: "cubic-bezier(.37,.87,.33,.04)",
            duration: this.jumpingTime,
            iterations: 1,
          }
        );
      }, 50);
    },
    updateSpeed(speed: number) {
      this.foxrunActions.SET_FOX_SPEED(speed);
    },
    checkForCollision() {
      const overlaps = this.rocks?.map((rock: InstanceType<typeof Rock>) => {
        const rect1 = this.fox!.getBoundingClientRect();
        const rect2 = rock.$el.getBoundingClientRect();

        return !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );
      });

      const berryOverlaps = this.berries?.map(
        (berry: InstanceType<typeof Berry>) => {
          const rect1 = this.fox!.getBoundingClientRect();
          const rect2 = berry.$el.getBoundingClientRect();

          return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
          );
        }
      );

      const hit = overlaps?.reduce(
        (tot: Boolean, curr: Boolean) => tot || curr,
        false
      );

      const berry = berryOverlaps?.reduce(
        (tot: Boolean, curr: Boolean) => tot || curr,
        false
      );

      if (hit) this.$emit("hit");
      if (berry) this.$emit("berry");
    },
  },
});
</script>

<template>
  <img
    :src="image"
    alt="fox"
    class="absolute bottom-0 h-[64px] ml-5 z-10"
    id="fox"
    ref="fox"
  />
</template>

<style scoped></style>

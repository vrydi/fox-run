import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Character",
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
    const character = ref<null | HTMLImageElement>(null);

    return { character };
  },
  data() {
    return {
      positionBottom: 0,
      animationID: 0,
      jumping: false,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    document.addEventListener("keypress", this.keypress);
    document.getElementById("play-area")?.addEventListener("click", this.jump);
  },
  methods: {
    keypress(event: KeyboardEvent) {
      if (event.key === " ") {
        this.jump();
      }
    },
    jump() {
      if (!this.character) return;
      if (this.jumping) return;
      this.jumping = true;

      const moveUp = () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.positionBottom += 5;
            this.character!.style.bottom = this.positionBottom + "px";
            resolve();
          }, 30);
        });
      };

      const moveDown = () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            this.positionBottom -= 5;
            this.character!.style.bottom = this.positionBottom + "px";
            resolve();
          }, 30);
        });
      };

      moveUp().then(() => {
        moveUp().then(() => {
          moveUp().then(() => {
            moveUp().then(() => {
              moveUp().then(() => {
                moveUp().then(() => {
                  moveUp().then(() => {
                    moveUp().then(() => {
                      moveUp().then(() => {
                        setTimeout(() => {
                          moveDown().then(() => {
                            moveDown().then(() => {
                              moveDown().then(() => {
                                moveDown().then(() => {
                                  moveDown().then(() => {
                                    moveDown().then(() => {
                                      moveDown().then(() => {
                                        moveDown().then(() => {
                                          moveDown().then(() => {
                                            this.jumping = false;
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        }, 750);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    },
  },
});

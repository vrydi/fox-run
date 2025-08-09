import { defineComponent, ref, toRaw } from "vue";
import { useGlobalStore } from "../../store/globalStore/store";

export default defineComponent({
  name: "Toast",
  props: {},
  setup() {
    const globalState = useGlobalStore();
    const globalActions = toRaw(useGlobalStore());

    const toast = ref<null | HTMLDivElement>(null);

    return { globalState, globalActions, toast };
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    message() {
      return this.globalState.toastMessage;
    },
    time() {
      return this.globalState.toastTime;
    },
    state() {
      return this.globalState.toastState as "success" | "error" | "warning";
    },
    successStatus() {
      return this.state === "success";
    },
    errorStatus() {
      return this.state === "error";
    },
    warningStatus() {
      return this.state === "warning";
    },
  },
  watch: {
    message() {
      this.showToast();
    },
  },
  methods: {
    showToast() {
      this.show = true;
      setTimeout(() => {
        this.hideToast();
      }, this.time);
    },
    hideToast() {
      this.show = false;
    },
  },
});

import { useGlobalStore } from "./store";

export default {
  globalState() {
    return useGlobalStore();
  },

  show_toast(
    message: string,
    state: "error" | "success" | "warning" = "error",
    time = 1000
  ) {
    this.globalState().toastMessage = message;
    this.globalState().toastState = state;
    this.globalState().toastTime = time;
  },
};

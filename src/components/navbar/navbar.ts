import { defineComponent } from "vue";
import { Bars3Icon } from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "Navbar",
  components: { Bars3Icon },
  setup() {},
  data() {
    return {
      open: false,
    };
  },
  computed: {
    currentRoute() {
      return this.$route;
    },
    routes() {
      return this.$router.getRoutes();
    },
  },
  methods: {},
});

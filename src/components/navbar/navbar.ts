import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
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

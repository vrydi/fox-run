import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  setup() {},
  data() {
    return {};
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

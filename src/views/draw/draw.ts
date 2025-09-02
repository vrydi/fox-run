import { defineComponent } from "vue";

export default defineComponent({
  name: "Draw",
  data() {
    return {
      gridWidth: 30,
      gridHeight: 30,
      grid: [[]] as string[][],
      colours: [
        "bg-yellow-600",
        "bg-yellow-400",
        "bg-green-600",
        "bg-red-600",
        "bg-blue-600",
        "bg-pink-600",
        "bg-white",
        "bg-black",
      ],
      brushColour: "bg-black",
    };
  },
  computed: {},
  mounted() {
    this.generateGrid();
  },
  methods: {
    generateGrid() {
      this.grid = Array.from({ length: this.gridHeight }).map((_) =>
        Array.from({ length: this.gridWidth }).map((_) => "&nbsp;")
      );
    },
    colourCell(row: number, col: number) {
      this.grid[row][col] = this.brushColour;
    },
  },
});

import { useGlobalStore } from "../globalStore/store.ts";
import { useSnakeStore } from "./store.ts";

export default {
  globalState() {
    return useGlobalStore();
  },

  snakeState() {
    return useSnakeStore();
  },

  initSnake() {
    const snake = this.snakeState().snake;

    const length = this.snakeState().initSnakeLength;

    const initCoordinate = {
      x: Math.floor(this.snakeState().gridWidth / 2),
      y: Math.floor(this.snakeState().gridHeight / 2),
    };

    snake.push({ ...initCoordinate });

    for (let i = 1; i < length; i++) {
      snake.push({ x: initCoordinate.x - i, y: initCoordinate.y });
    }

    this.snakeState().food = this.getRandomFoodPosition();

    this.snakeState().score = 0;
    this.snakeState().fps = 1;

    this.snakeState().snake = snake;

    this.snakeState().direction = "down";
    this.snakeState().nextDirection = "down";

    this.snakeState().gameInterval = window.setInterval(() => {
      this.gameLoop();
    }, 1000 / this.snakeState().fps);
  },

  getRandomFoodPosition() {
    const snake = this.snakeState().snake;
    const gridWidth = this.snakeState().gridWidth;
    const gridHeight = this.snakeState().gridHeight;

    let newFoodPosition = { x: 0, y: 0 };

    while (true) {
      newFoodPosition = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight),
      };
      const overlap = snake.some((segment) => {
        return (
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
        );
      });
      if (!overlap) break;
    }

    return newFoodPosition;
  },

  gameLoop() {
    const snake = this.snakeState().snake;
    const food = this.snakeState().food;
    const direction = this.snakeState().direction;
    const nextDirection = this.snakeState().nextDirection;
    const gridWidth = this.snakeState().gridWidth;
    const gridHeight = this.snakeState().gridHeight;

    // Update direction
    if (nextDirection === "up" && direction !== "down") {
      this.snakeState().direction = "up";
    } else if (nextDirection === "down" && direction !== "up") {
      this.snakeState().direction = "down";
    } else if (nextDirection === "left" && direction !== "right") {
      this.snakeState().direction = "left";
    } else if (nextDirection === "right" && direction !== "left") {
      this.snakeState().direction = "right";
    }

    // Move snake
    const head = { ...snake[0] };
    if (this.snakeState().direction === "up") {
      head.y -= 1;
    } else if (this.snakeState().direction === "down") {
      head.y += 1;
    } else if (this.snakeState().direction === "left") {
      head.x -= 1;
    } else if (this.snakeState().direction === "right") {
      head.x += 1;
    }
    snake.unshift(head);
    snake.pop();

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
      this.snakeState().score += 1;
      snake.push({ ...snake[snake.length - 1] }); // Grow snake
      this.snakeState().food = this.getRandomFoodPosition();
      this.snakeState().fps += 0.5; // Increase speed
      clearInterval(this.snakeState().gameInterval);
      this.snakeState().gameInterval = window.setInterval(() => {
        this.gameLoop();
      }, 1000 / this.snakeState().fps);
    }

    // Check for wall collision
    if (
      head.x < 0 ||
      head.x >= gridWidth ||
      head.y < 0 ||
      head.y >= gridHeight
    ) {
      this.endGame();
      return;
    }

    // Check for self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        this.endGame();
        return;
      }
    }
  },

  endGame() {
    clearInterval(this.snakeState().gameInterval);
    this.snakeState().gameInterval = 0;
    if (this.snakeState().score > this.snakeState().highscore) {
      this.snakeState().highscore = this.snakeState().score;
      this.globalState().toastMessage = `New Highscore: ${
        this.snakeState().highscore
      }`;
    } else {
      this.globalState().toastMessage = `Game Over! Your score: ${
        this.snakeState().score
      }`;
    }
  },

  changeDirection(newDirection: "up" | "down" | "left" | "right") {
    this.snakeState().nextDirection = newDirection;
  },

  handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      this.changeDirection("up");
    } else if (event.key === "ArrowDown") {
      this.changeDirection("down");
    } else if (event.key === "ArrowLeft") {
      this.changeDirection("left");
    } else if (event.key === "ArrowRight") {
      this.changeDirection("right");
    }
  },
};

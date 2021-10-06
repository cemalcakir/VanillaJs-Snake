import Snake from './snake.js';
import InputHandler from './input.js';
import Food from './food.js';


export default class Game {
    constructor(gameWidth, gameHeight, snakeLength, ctx) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.snakeLength = snakeLength;
        this.ctx = ctx;
        this.score = 0;
        this.gameState = "running";
        this.food = null;
    };

    start() {
        this.snake = new Snake(this.gameWidth, this.gameHeight, this.snakeLength, this);
        this.snake.draw(this.ctx);
        new InputHandler(this.snake);
        this.updateFood();
        this.update();
    };

    update() {
        let runGame = window.setInterval(() => {
            this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
            this.checkFeed();
            this.updateFood()
            this.snake.update(this.ctx);
            if (this.gameState === "end") {
                this.endGame();
                clearInterval(runGame);
            }
        }, 50);
    }

    updateFood() {
        if (this.food === null) {
            this.food = new Food(this.gameWidth, this.gameHeight);
        };
        if (this.snake.snakeCells.some(cell => (
                cell.locationX === this.food.position.x && cell.locationY === this.food.position.y
            ))) {
            this.food = new Food(this.gameWidth, this.gameHeight);
            this.updateFood();
        } else {
            this.food.draw(this.ctx);
        }
    }

    checkFeed() {
        if (this.snake.snakeCells[0].locationX === this.food.position.x &&
            this.snake.snakeCells[0].locationY === this.food.position.y) {
            this.score++;
            document.getElementById("score").innerText = this.score;
            this.food == null;
        } else {
            this.snake.snakeCells.pop();
        };
    };

    endGame() {
        this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillStyle = "black";
        this.ctx.fill();

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "KEŞBİŞOLSUN NEOLTU",
            this.gameWidth / 2,
            this.gameHeight / 2
        )
        this.ctx.font = "10px Arial";
        this.ctx.fillText(
            "(Tekrar başlamak için herhangi bir tuşa basın)",
            (this.gameWidth / 2),
            (this.gameHeight / 2) + 20
        )
        document.addEventListener("keydown", () => {
            location.reload();
        })
    };
};
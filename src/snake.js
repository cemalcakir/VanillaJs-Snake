export default class Snake {
    constructor(gameWidth, gameHeight, snakeLength, game) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.snakeLength = snakeLength;
        this.game = game;
        this.width = 5;
        this.height = 5;
        this.direction = "right";
        this.turnedThisFrame = false;

        this.position = {
            x: (gameWidth / 2) - (this.width * (snakeLength + 1)),
            y: (gameHeight / 2) - this.width
        };

        this.snakeCells = [];
        for (let i = 0; i < snakeLength; i++) {
            this.snakeCells.push({
                locationX: this.position.x - (i * this.width),
                locationY: this.position.y
            });
        };
    };

    draw(ctx) {
        ctx.fillStyle = "#555555";
        this.snakeCells.forEach(cell => {
            ctx.fillRect(cell.locationX, cell.locationY, this.width, this.height);
        });
    };

    update(ctx) {
        this.turnedThisFrame = false;
        this.updateLocation();
        this.moveSnake();
        this.checkCollision();
        this.draw(ctx);
    }

    updateLocation() {
        switch (this.direction) {
            case "right":
                this.position.x += this.width;
                break;
            case "left":
                this.position.x -= this.width;
                break;
            case "down":
                this.position.y += this.width;
                break;
            case "up":
                this.position.y -= this.width;
                break;
        }
    }

    moveSnake() {
        let newHead = {
            locationX: this.position.x,
            locationY: this.position.y
        }
        this.snakeCells.unshift(newHead);
    };

    turn(newDirection) {
        if (this.turnedThisFrame) return;
        switch (newDirection) {
            case "up":
                if (this.direction !== "down") {
                    this.direction = "up";
                }
                break;
            case "right":
                if (this.direction !== "left") {
                    this.direction = "right";
                }
                break;
            case "down":
                if (this.direction !== "up") {
                    this.direction = "down";
                }
                break;
            case "left":
                if (this.direction !== "right") {
                    this.direction = "left";
                }
                break;
        }
        this.turnedThisFrame = true;
    }

    checkCollision() {
        if (this.snakeCells[0].locationX < 0 || this.snakeCells[0].locationX >= this.gameWidth ||
            this.snakeCells[0].locationY < 0 || this.snakeCells[0].locationY >= this.gameHeight) {
            this.game.gameState = "end";
        }
        for (let i = 1; i < this.snakeLength; i++) {
            if (this.snakeCells[i].locationX === this.snakeCells[0].locationX &&
                this.snakeCells[i].locationY === this.snakeCells[0].locationY) {
                this.game.gameState = "end";
            }
        }
    }
};
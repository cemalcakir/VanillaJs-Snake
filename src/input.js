export default class InputHandler {
    constructor(snake) {
        document.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 38:
                    snake.turn("up");
                    break;
                case 39:
                    snake.turn("right");
                    break;
                case 37:
                    snake.turn("left");
                    break;
                case 40:
                    snake.turn("down");
                    break;
                case 32:
                    alert("PAUSED");
            }
        })
    };
};
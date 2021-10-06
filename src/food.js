export default class Food {
    constructor(gameWidth, gameHeight) {
        let randomX = (Math.floor(Math.random() * gameWidth));
        let randomY = (Math.floor(Math.random() * gameHeight));
        this.position = {
            x: randomX - randomX % 5,
            y: randomY - randomY % 5
        }
    }

    draw(ctx) {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.position.x, this.position.y, 5, 5);
    };
}
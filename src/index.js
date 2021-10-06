import Game from './game.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let startButton = document.getElementById("startButton");
let selectSpeed = document.getElementById("speed");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const SNAKE_LENGTH = 3;


let game = new Game(GAME_WIDTH, GAME_HEIGHT, SNAKE_LENGTH, ctx);
game.start();
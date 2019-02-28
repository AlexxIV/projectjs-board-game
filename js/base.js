import {Knight} from './knight.js';
import {Elf} from './elf.js';
import {Dwarf} from './dwarf.js';
import Loader from './loader.js';
import GameState from './game-state.js';
import Draw from './drawing.js';

// const canvas = document.createElement('canvas');
const canvas = document.getElementById('game-body');
const ctx = canvas.getContext('2d');


const boardWidth = 900;
const boardHeight = 700;
const ratio = 100;
const unitsTemplate = Array.from(document.getElementsByClassName('unit-template'));
canvas.width = boardWidth;
canvas.height = boardHeight;





//
// let elfReady = false;
// const elfImage = new Image();
// elfImage.onload = () => {
//     console.log('Elf loaded');
//     elfReady = true;
// };
// elfImage.src = 'images/elf.png';
//
// let dwarfReady = false;
// const dwarfImage = new Image();
// dwarfImage.onload = () => {
//     console.log('Dwarf loaded');
//     dwarfReady = true;
// };
// dwarfImage.src = 'images/dwarf.png';

// let knight = new Knight(5, 5, 5, 5, 5);
// let elf = new Elf(3, 3, 7, 9, 9);
// let dwarf = new Dwarf(8, 8, 4, 3, 3);


let render = (gameState) => {
    // drawGameBackground(boardWidth, boardHeight, 'red', 'blue', 3);
    // Draw.drawBoard(boardHeight / ratio, boardWidth / ratio, boardWidth, boardHeight, '#ccc', '#333', 3);

    Draw.initBoard(ctx, gameState);
    // if (knightReady) {
    //     ctx.drawImage(knightImage, 0, 0);
    // }
    // if (elfReady) {
    //     ctx.drawImage(elfImage, 100, 100);
    // }
    // if (dwarfReady) {
    //     ctx.drawImage(dwarfImage, 200, 200);
    // }

    // ctx.fillStyle = 'rgb(250, 250, 250)';
    // ctx.font = '24px Helvetica';
    // ctx.textAlign = 'left';
    // ctx.textBaseline = 'top';
    // ctx.fillText('Testing the units', 20, 20, 20);


};

let main = () => {
    let gameState = new GameState(canvas.width, canvas.height, ratio, '#999', '#eee');

    let loader = new Loader(canvas, ctx, unitsTemplate, gameState);
    //
    // requestAnimationFrame(main);
    render(gameState);
    loader.attachInitEvents();


};

const w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();








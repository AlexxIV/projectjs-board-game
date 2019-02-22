import {Knight} from "./knight.js";
import {Elf} from "./elf.js";
import {Dwarf} from "./dwarf.js";
import Draw from './drawing.js';
import {Game} from "./game.js";

export default class {
    constructor(canvas, ctx, unitsTemplates, gameState) {
        this.position = {};
        this.canvas = canvas;
        this.ctx = ctx;
        this.unitsTemplates = unitsTemplates;
        this.gameState = gameState;
        this.units = new Map([['knight', Knight], ['elf', Elf], ['dwarf', Dwarf]]);
    }

    removeElements = (elms) => [...elms].forEach(el => el.remove());

    startDrag(event) {
        event.dataTransfer.setData('Text', event.target.id);
        Draw.drawAvailableTiles(this.ctx, this.gameState, 'red');
    };

    drop(event, ctx, gameState) {
        event.preventDefault();
        Draw.clearAllStrokes(ctx, gameState);

        let itemTarget = event.dataTransfer.getData('Text');
        let image = document.getElementById(itemTarget);

        this.position.x = event.x;
        this.position.y = event.y;

        if (gameState.unitsLoading === true) {
            let currentActivePlayer = gameState.activePlayer;
            if (currentActivePlayer === 'playerOne') {
                if (this.position.y > 200) {
                    return;
                }
            }
            if (currentActivePlayer === 'playerTwo') {
                if (this.position.y < 500) {
                    return;
                }
            }
            let newUnit = new (this.units.get(itemTarget.toLowerCase()))(this.position.x, this.position.y, gameState.activePlayer, 'live', image);
            gameState[currentActivePlayer].units.push(newUnit);
            let coordinates = [newUnit.squareX, newUnit.squareY];
            Draw.drawImageWithCoordinates(ctx, image, coordinates);
            coordinates = coordinates.map(x => x / gameState.ratio);
            coordinates = coordinates.reverse();
            newUnit.boardTile = coordinates;
            gameState.gameBoard[coordinates[0]][coordinates[1]] = newUnit;
            this.toggleActivePlayer();
        }
        if (gameState.playerOne.units.length === 2 && gameState.playerTwo.units.length === 1) {
            gameState.unitsLoading = false;
            gameState.gameStarted = true;
            this.removeElements(document.querySelectorAll('.unit-template'));

            this.startGame(gameState, ctx, this.canvas);
        }
    };

    toggleActivePlayer() {
        const writingString = 'Active Player: ';
        if (this.gameState.activePlayer === 'playerOne') {
            this.gameState.activePlayer = 'playerTwo';
        } else {
            this.gameState.activePlayer = 'playerOne';
        }
        let playerDisplay = document.getElementById('player-display');
        playerDisplay.innerText = writingString + this.gameState.activePlayer.charAt(0).toUpperCase() + this.gameState.activePlayer.slice(1);
    }

    attachInitEvents() {
        this.canvas.addEventListener('drop', (e) => {
            this.drop(e, this.ctx, this.gameState);
        });
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.unitsTemplates.forEach((unit) => {
            unit.addEventListener('dragstart', (e) => {
                this.startDrag(e);
            });
        });
    }

    startGame(gameState, ctx, canvas) {
        let game = new Game(gameState, ctx, canvas);
        game.start();
    }
}
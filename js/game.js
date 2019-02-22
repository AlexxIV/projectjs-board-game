import Draw from './drawing.js';

export class Game {
    constructor(gameState, ctx, canvas) {
        this.gameState = gameState;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    start() {
        this.attachGameEvents();
    }

    attachGameEvents() {
        this.canvas.addEventListener('click', (e) => {
            this.handleClickEvent(e, this.ctx, this.gameState);
        });
    }

    handleClickEvent(event, ctx, gameState) {
        const clickCoordinates = [event.y, event.x].map(x => Math.floor(x / 100));
        const eventCoordinates = [event.x, event.y];

        let target = this.isClickTargetSomething(clickCoordinates, gameState.gameBoard);

        if (target !== undefined) {

            let targetType = target.constructor.name;
            switch (targetType) {
                case 'Knight':
                case 'Elf':
                case 'Dwarf': {
                    if (gameState[gameState.activePlayer].units.includes(target)) {
                        this.unitsHandler(target, gameState);
                    }
                    break;
                }
                case 'Obstacle': {
                    this.obstaclesHandler(ctx, clickCoordinates, gameState, target);
                    break;
                }
                default: {
                    console.log('This should not be triggered, unknown object');
                    break;
                }
            }
        } else {
            this.defaultHandler(ctx, clickCoordinates, eventCoordinates, gameState);
        }

    }

    isClickTargetSomething(coordinates, board) {
        let currentTarget = board[coordinates[0]][coordinates[1]];
        if (currentTarget !== undefined) {
            return currentTarget;
        }
    }


    unitsHandler(target, gameState) {
        let drawingElements = target.showAvailableMoveTiles(gameState.gameBoard);
        gameState.activeUnit = target;
        gameState.availableMoves = drawingElements[0];
        gameState.obstaclesInRange = drawingElements[1];
        Draw.drawAvailableMoves(this.ctx, drawingElements[0], target.getCanvasCoordinates());
        Draw.drawObstaclesAvailableForAttack(this.ctx, drawingElements[1]);
    }

    elfHandler(target, gameState) {

    }

    dwarfHandler(target, gameState) {

    }

    defaultHandler(ctx, coordinates, originalEventCoordinats, gameState) {
        if (gameState.availableMoves.some(
            r => r.length === coordinates.length &&
                r.every((value, index) => coordinates[index] === value)
        )) {
            Draw.reDrawUnit(ctx, coordinates, gameState);
            gameState.gameBoard[gameState.activeUnit.boardTile[0]][gameState.activeUnit.boardTile[1]] = undefined;
            gameState.gameBoard[coordinates[0]][coordinates[1]] = gameState.activeUnit;
            gameState.activeUnit.boardTile = coordinates;
            gameState.activeUnit.coordinateX = originalEventCoordinats[0];
            gameState.activeUnit.coordinateY = originalEventCoordinats[1];
            gameState.activeUnit.calculateCurrentSquare();
            this.endMove(gameState);
        }
    }

    obstaclesHandler(ctx, coordinates, gameState) {

        if (gameState.obstaclesInRange.some(
            r => r.length === coordinates.length &&
                r.every((value, index) => coordinates[index] === value)
        )) {
            console.log('attack trigered on available obstacle');
            let reDrawingCoordinates = [...coordinates];
            reDrawingCoordinates = reDrawingCoordinates.reverse().map(x => x * 100);
            Draw.reDrawSingleTile(ctx, reDrawingCoordinates, 'grey');
            gameState.gameBoard[coordinates[0]][coordinates[1]] = undefined;
            this.endMove(gameState);
        }
    }

    endMove(gameState) {
        const writingString = 'Active Player: ';
        Draw.clearAllStrokes(this.ctx, gameState);
        delete gameState.availableMoves;
        delete gameState.obstaclesInRange;
        gameState.activeUnit = undefined;
        if (gameState.activePlayer === 'playerOne') {
            gameState.activePlayer = 'playerTwo'
        } else {
            gameState.activePlayer = 'playerOne';
        }
        let playerDisplay = document.getElementById('player-display');
        playerDisplay.innerText = writingString + this.gameState.activePlayer.charAt(0).toUpperCase() + this.gameState.activePlayer.slice(1);
        let loader = document.getElementById('loader');
        loader.style.display = 'block';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    isFieldEmpty(board, coordinatesToCheck) {
        // console.log(coordinatesToCheck);
        // return board[coordinatesToCheck[0]][coordinatesToCheck[1]] !== undefined;

    }
}


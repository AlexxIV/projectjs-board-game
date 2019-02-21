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
                case 'Knight': {
                    this.knightHandler(target, gameState);
                }
                    break;
                case 'Elf': {
                    this.elfHandler(target, gameState);
                }
                    break;
                case 'Dwarf': {
                    this.dwarfHandler(target, gameState);
                }
                    break;
                case 'Obstacle': {
                    console.log('The only way to remove obstacle is to attack it ;)')
                }
                    break;
                default: {
                    console.log('This should be trigger unknown object');
                }
                    break;
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


    knightHandler(target, gameState) {
        let availableMoves = target.showAvailableMoveTiles(gameState.gameBoard);
        gameState.activeUnit = target;
        gameState.availableMoves = availableMoves;
        Draw.drawAvailableMoves(this.ctx, availableMoves, target.getCanvasCoordinates());
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
            delete gameState.availableMoves;
            gameState.activeUnit = undefined;
            console.log(gameState);
        } else {
            return;
        }


    }

    isFieldEmpty(board, coordinatesToCheck) {
        // console.log(coordinatesToCheck);
        // return board[coordinatesToCheck[0]][coordinatesToCheck[1]] !== undefined;

    }
}


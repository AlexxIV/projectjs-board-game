import {Obstacle} from './obstacle.js';

export default class {
    static drawBoard(dimensionX, dimensionY, boardWidth, boardHeight, firstColor, secondColor, battleFieldCols) {

        let playerFieldSize = dimensionX - battleFieldCols;
        let singlePlayerFieldSize = playerFieldSize / 2;
        let singleBlockWidth = boardWidth / dimensionY;
        let singleBlockHeight = boardHeight / dimensionX;

        for (let x = 0; x < dimensionX; x++) {
            for (let y = 0; y < dimensionY; y++) {
                ctx.fillStyle = firstColor;

                if (x % 2 !== y % 2) {
                    ctx.fillStyle = secondColor
                }

                if (x >= singlePlayerFieldSize && x < dimensionX - singlePlayerFieldSize) {
                    ctx.fillStyle = 'grey';
                }

                ctx.fillRect(y * singleBlockWidth, x * singleBlockHeight, singleBlockWidth, singleBlockHeight);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(y * singleBlockWidth, x * singleBlockHeight, singleBlockWidth, singleBlockHeight);
            }
        }
    };

    static drawAvailableFields(gameState) {

    }

    static reDrawBoard() {

    }

    static initBoard(ctx, gameState) {
        let playerFieldSize = gameState.gameBoard.length - gameState.battleFieldSize;
        let singlePlayerFieldSize = playerFieldSize / 2;

        for (let x = 0; x < gameState.gameBoard.length; x++) {
            for (let y = 0; y < gameState.gameBoard[x].length; y++) {

                ctx.fillStyle = gameState.playerOneColor;

                if (x % 2 !== y % 2) {
                    ctx.fillStyle = gameState.playerTwoColor;
                }

                if (x >= singlePlayerFieldSize && x < gameState.gameBoard.length - singlePlayerFieldSize) {
                    ctx.fillStyle = 'grey';
                }

                ctx.fillRect(y * gameState.ratio, x * gameState.ratio, gameState.ratio, gameState.ratio);
                // ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.strokeRect(y * gameState.ratio, x * gameState.ratio, gameState.ratio, gameState.ratio);
            }
        }

        this.generateObstacles(ctx, gameState);

    }

    static drawAvailableTiles(ctx, gameState, color) {
        // let x = gameState.availableTiles.length;
        // let y = gameState.availableTiles[x-1].length;
        if (gameState.activePlayer === 'playerOne') {

            for (let x = 0; x < gameState.availableTiles.length; x++) {
                for (let y = 0; y < gameState.availableTiles[x].length; y++) {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'red';
                    ctx.strokeRect(y * gameState.ratio, x * gameState.ratio, gameState.ratio, gameState.ratio);
                }
            }
        }
        if (gameState.activePlayer === 'playerTwo') {
            for (let x = 0; x < gameState.availableTiles.length; x++) {
                for (let y = 0; y < gameState.availableTiles[x].length; y++) {
                    ctx.strokeStyle = 'red';
                    ctx.strokeRect(y * gameState.ratio, ((gameState.height / gameState.ratio) - 1 - x) * gameState.ratio, gameState.ratio, gameState.ratio);
                }
            }
        }

    }

    static clearAllStrokes(ctx, gameState) {
        for (let x = 0; x < gameState.gameBoard.length; x++) {
            for (let y = 0; y < gameState.gameBoard[x].length; y++) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.strokeRect(y * gameState.ratio, x * gameState.ratio, gameState.ratio, gameState.ratio);
            }
        }
    }

    static generateObstacles(ctx, gameState) {
        gameState.obstacles = [];
        let obstaclesCount = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        for (let i = 0; i < obstaclesCount; i++) {
            let obstaclesCoordinates = [];
            obstaclesCoordinates.push((Math.floor(Math.random() * (9))) * 100);
            obstaclesCoordinates.push((Math.floor(Math.random() * (4 - 2 + 1)) + 2) * 100 + 25);
            let duplicate = false;
            gameState.obstacles.forEach(obstacle => {
                if (obstacle[0] === obstaclesCoordinates[0] && obstacle[1] === obstaclesCoordinates[1]) {
                    duplicate = true;
                    console.log('duplicate');
                }
            });
            if (duplicate) {
                i--;
                continue;
            }
            let obstacle = new Obstacle(1, ...obstaclesCoordinates);
            gameState.obstacles.push(obstaclesCoordinates);
            gameState.gameBoard[obstacle.boardCoordinates[0]][obstacle.boardCoordinates[1]] = obstacle;
            obstacle.obstacleImage.onload = () => {
                ctx.drawImage(obstacle.obstacleImage, ...obstaclesCoordinates);
            }
        }
    }

    static drawImageWithCoordinates(ctx, image, coordinates) {
        ctx.drawImage(image, coordinates[0], coordinates[1]);
    }

    static drawAvailableMoves(ctx, moves, currentPositionOnCanvas) {
        moves.forEach(move => {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            let readyMove = [...move];
            readyMove = readyMove.reverse().map(x => x * 100);
            ctx.strokeRect(...readyMove, 100, 100);
        })
    }

    static reDrawUnit(ctx, newCoordinates, gameState) {
        let oldDrawingCoordinates = [...gameState.activeUnit.boardTile];

        let color = '#999';
        console.log(oldDrawingCoordinates);
        if (oldDrawingCoordinates[0] > 1 && oldDrawingCoordinates[0] < 5)
        {
            color = 'grey';
        }
        else if (gameState.activeUnit.boardTile[0] % 2 !== gameState.activeUnit.boardTile[1] % 2) {
            color = '#eee';
        }
        ctx.fillStyle = color;
        oldDrawingCoordinates = oldDrawingCoordinates.reverse().map(x => x * 100);
        ctx.fillRect(...oldDrawingCoordinates, 100, 100);
        let drawingCoordinates = [...newCoordinates];
        drawingCoordinates = drawingCoordinates.reverse().map(x => x * 100);
        ctx.drawImage(gameState.activeUnit.image, ...drawingCoordinates);
        this.clearAllStrokes(ctx, gameState);
    }
}
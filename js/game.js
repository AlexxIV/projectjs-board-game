import Draw from './drawing.js';
import {Obstacle} from "./obstacle.js";
import Unit from './unit.js';

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
                    this.unitsHandler(target, gameState);
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
        if (gameState[gameState.activePlayer].units.includes(target) && gameState.activeUnit === undefined) {
            let drawingElements = this.showAvailableMoveTiles(target, gameState.gameBoard);
            let enemiesInRange = this.showAvailableEnemies(target, gameState.gameBoard);
            gameState.activeUnit = target;
            gameState.availableMoves = drawingElements[0];
            gameState.obstaclesInRange = drawingElements[1];
            gameState.enemiesInRange = enemiesInRange;
            Draw.drawAvailableMoves(this.ctx, drawingElements[0], target.getCanvasCoordinates());
            Draw.drawObstaclesAvailableForAttack(this.ctx, drawingElements[1]);
            Draw.drawEnemiesAvailableForAttack(this.ctx, enemiesInRange);
        } else if (gameState.activeUnit === target) {
            this.triggerHeal(target, gameState);
        } else {
            if (gameState.enemiesInRange.some(
                r => r.length === target.boardTile.length &&
                    r.every((value, index) => target.boardTile[index] === value)
            )) {
                this.triggerAttack(target, gameState);
            }
        }
        console.log(gameState);
        console.log(target);

    }

    elfHandler(target, gameState) {

    }

    dwarfHandler(target, gameState) {

    }

    defaultHandler(ctx, coordinates, originalEventCoordinats, gameState) {

        if (gameState.availableMoves !== undefined && gameState.availableMoves.some(
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
            this.endMove(gameState, 'Moving');
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
            this.endMove(gameState, 'Attacking obstacle');
        }
    }

    endMove(gameState, currentMove) {
        const writingString = 'Active Player: ';
        Draw.clearAllStrokes(this.ctx, gameState);
        delete gameState.availableMoves;
        delete gameState.obstaclesInRange;
        delete gameState.enemiesInRange;
        gameState.round += 1;
        gameState.activeUnit = undefined;
        if (gameState.activePlayer === 'playerOne') {
            gameState.activePlayer = 'playerTwo'
        } else {
            gameState.activePlayer = 'playerOne';
        }
        let playerDisplay = document.getElementById('player-display');
        playerDisplay.innerText = writingString + this.gameState.activePlayer.charAt(0).toUpperCase() + this.gameState.activePlayer.slice(1);
        let loader = document.getElementById('loader');
        let messageContainer = document.getElementById('move-description');
        messageContainer.innerText = currentMove;
        loader.style.display = 'block';
        setTimeout(() => {
            loader.style.display = 'none';
            messageContainer.innerText = '';
        }, 1000);
        if (gameState.playerOne.units.length === 0 || gameState.playerTwo.units.length === 0) {
            let winner = gameState.playerOne.units.length > gameState.playerTwo.units.length ? 'playerOne' : 'playerTwo';
            this.triggerEndOfGame(gameState, winner);
        }
    }

    isFieldEmpty(board, coordinatesToCheck) {
        // console.log(coordinatesToCheck);
        // return board[coordinatesToCheck[0]][coordinatesToCheck[1]] !== undefined;

    }

    showAvailableMoveTiles(target, gameBoard) {
        // let availableMoveTiles = {
        //     up: 0,
        //     down: 0,
        //     left: 0,
        //     right: 0
        // };
        //
        // while((availableMoveTiles.up < this.ms) && (this.boardTile[0] - availableMoveTiles.up > 0)) {
        //     availableMoveTiles.up++;
        // }
        //
        // while((availableMoveTiles.down < this.ms) && (this.boardTile[0] + availableMoveTiles.down < 6)) {
        //     availableMoveTiles.down++;
        // }
        //
        // while((availableMoveTiles.left < this.ms) && (this.boardTile[1] - availableMoveTiles.left > 0)) {
        //     availableMoveTiles.left++;
        // }
        // while((availableMoveTiles.right < this.ms) && (this.boardTile[1] + availableMoveTiles.right < 8)) {
        //     availableMoveTiles.right++;
        // }
        let availableMoveTiles = [];
        let obstaclesArray = [];
        let obstacles = {};

        for (let i = 1; i <= target.ms; i++) {
            if (target.boardTile[0] - i >= 0 && obstacles.up === undefined) {
                let coordinates = [target.boardTile[0] - i, target.boardTile[1]];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.up = 1;
                    obstaclesArray.push(coordinates);
                }
            }
            if (target.boardTile[0] + i <= 6 && obstacles.down === undefined) {
                let coordinates = [target.boardTile[0] + i, target.boardTile[1]];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.down = 1;
                    obstaclesArray.push(coordinates);
                }
            }
            if (target.boardTile[1] - i >= 0 && obstacles.left === undefined) {
                let coordinates = [target.boardTile[0], target.boardTile[1] - i];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.left = 1;
                    obstaclesArray.push(coordinates);
                }
            }
            if (target.boardTile[1] + i <= 8 && obstacles.right === undefined) {
                let coordinates = [target.boardTile[0], target.boardTile[1] + i];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.right = 1;
                    obstaclesArray.push(coordinates);
                }
            }
        }

        return [availableMoveTiles, obstaclesArray];
    }

    showAvailableEnemies(target, gameBoard) {
        let availableEnemies = [];
        let enemies = {};
        if (target.boardTile[0] - target.range >= 0 && enemies.up === undefined) {
            let coordinates = [target.boardTile[0] - target.range, target.boardTile[1]];
            if (this.isThereEnemy(gameBoard, coordinates)) {
                availableEnemies.push(coordinates);
                enemies.up = coordinates;
            }
        }
        if (target.boardTile[0] + target.range <= 6 && enemies.down === undefined) {
            let coordinates = [target.boardTile[0] + target.range, target.boardTile[1]];
            if (this.isThereEnemy(gameBoard, coordinates)) {
                availableEnemies.push(coordinates);
                enemies.down = coordinates;
            }
        }

        if (target.boardTile[1] - target.range >= 0 && enemies.left === undefined) {
            let coordinates = [target.boardTile[0], target.boardTile[1] - target.range];
            if (this.isThereEnemy(gameBoard, coordinates)) {
                availableEnemies.push(coordinates);
                enemies.left = coordinates;
            }
        }

        if (target.boardTile[1] + target.range <= 8 && enemies.right === undefined) {
            let coordinates = [target.boardTile[0], target.boardTile[1] + target.range];
            if (this.isThereEnemy(gameBoard, coordinates)) {
                availableEnemies.push(coordinates);
                enemies.right = coordinates;
            }
        }

        return availableEnemies;
    }


    isMoveAvailable(gameBoard, coordinatesToCheck) {
        return !(gameBoard[coordinatesToCheck[0]][coordinatesToCheck[1]] instanceof Obstacle)
    }

    isThereEnemy(gameBoard, coordinatesToCheck) {
        let target = gameBoard[coordinatesToCheck[0]][coordinatesToCheck[1]];
        if (target !== undefined && target instanceof Unit) {
            return !this.gameState[this.gameState.activePlayer].units.includes(target);
        }
        // return target instanceof this && !gameState[gameState.activePlayer].units.includes(target);
    }

    triggerAttack(defendant, gameState) {
        let attacker = gameState.activeUnit;
        let endUserMessage = 'Attack on enemy';
        let dice1 = this.rollDice();
        let dice2 = this.rollDice();
        let dice3 = this.rollDice();
        if (dice1 + dice2 + dice3 === defendant.hp) {
            endUserMessage = 'Attack dodged';
            this.endMove(gameState, endUserMessage);
            return;
        }
        let dmg = attacker.attack - defendant.defence;
        if (dice1 + dice2 + dice3 === 3) {
            endUserMessage = 'Half attack';
            dmg = Math.floor(dmg / 2);
        }
        console.log(dmg);
        gameState[gameState.activePlayer].points += dmg;
        if (defendant.hp > dmg) {
            defendant.hp -= dmg;
        } else {
            this.killUnit(defendant, gameState);
            return;
        }
        this.endMove(gameState, endUserMessage);

    }

    triggerHeal(unitToHeal, gameState) {
        let currentMove = `${gameState.activeUnit.constructor.name} healed`;
        let dice = this.rollDice();
        unitToHeal.hp += dice;

        dice = this.rollDice();
        if (dice % 2 !== 0) {
            return;
        }
        this.endMove(gameState, currentMove);
    }

    killUnit(unitToKill, gameState) {
        let attacker = gameState.activePlayer;
        let defendend = unitToKill.player;
        let unitIndex = gameState[defendend].units.indexOf(unitToKill);
        let deadMessage = `${defendend} ${unitToKill.constructor.name} has been killed`;
        gameState[defendend].units = gameState[defendend].units.splice(unitIndex, unitToKill);
        gameState[defendend].deadUnits.push(unitToKill);
        gameState[attacker].killedUnits.push(unitToKill);
        let color = '#999';
        let reDrawCoordinates = [...unitToKill.boardTile];

        if (reDrawCoordinates[0] > 1 && reDrawCoordinates[0] < 5) {
            color = 'grey';
        } else if (reDrawCoordinates[0] % 2 !== reDrawCoordinates[1]) {
            color = '#eee';
        }

        reDrawCoordinates = reDrawCoordinates.reverse().map(x => Math.floor(x * 100));
        Draw.reDrawSingleTile(this.ctx, reDrawCoordinates, color);
        this.endMove(gameState, deadMessage);
    }


    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    triggerEndOfGame(gameState, winner) {
        let winnerContainer = document.getElementById('game-over');
        let winnerString = 'Winner: ';
        let winnerBox = document.getElementById('winner');
        let score = document.getElementById('score');
        let rounds = document.getElementById('rounds');
        switch (winner) {
            case 'playerOne': winnerString += 'PlayerOne';
                break;
            case 'playerTwo': winnerString += 'PlayerTwo';
        }
        winnerBox.innerText = winnerString;
        score.innerText = `Score: ${gameState[winner].points}`;
        rounds.innerText = `Round: ${gameState.round}`;
        winnerContainer.style.display = 'block';
    }
}


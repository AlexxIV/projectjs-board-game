export default class {
    constructor(attack, defence, hp, range, ms, coordinateX, coordinateY, player, status, image) {
        this.attack = attack;
        this.defence = defence;
        this.hp = hp;
        this.range = range;
        this.ms = ms;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.player = player;
        this.status = status;
        this.image = image;


        this.calculateCurrentSquare();
        // this.boardCoordinates([coordinateX, coordinateY]);
    }

    boardCoordinates(coordinates) {
        let tempCoordinates = coordinates.map(x => Math.floor(x / 100));
        this.boardTile = [coordinates[1], coordinates[0]];
    }

    move() {

    }

    attackEnemy() {

    }

    healSelf() {

    }

    calculateCurrentSquare() {
        //this.squareX = (((Math.floor(coordinateX / 100)) + (Math.ceil(coordinateX / 100))) / 2) * 100;
        this.squareX = (Math.floor(this.coordinateX / 100)) * 100;
        this.squareY = (Math.floor(this.coordinateY / 100)) * 100;
    }

    GetCurrentSquareCoordinates() {
        return [this.squareX, this.squareY];
    }

    showAvailableMoveTiles(gameBoard) {
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
        let obstacles = {};
        for (let i = 1; i <= this.ms; i++) {
            if (this.boardTile[0] - i >= 0 && obstacles.up === undefined) {
                let coordinates = [this.boardTile[0] - i, this.boardTile[1]];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.up = 1;
                }
            }
            if (this.boardTile[0] + i <= 6 && obstacles.down === undefined) {
                let coordinates = [this.boardTile[0] + i, this.boardTile[1]];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.down = 1;
                }
            }
            if (this.boardTile[1] - i >= 0 && obstacles.left === undefined) {
                let coordinates = [this.boardTile[0], this.boardTile[1] - i];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                } else {
                    obstacles.left = 1;
                }
            }
            if (this.boardTile[1] + i <= 8 && obstacles.right === undefined) {
                let coordinates = [this.boardTile[0], this.boardTile[1] + i];
                if (this.isMoveAvailable(gameBoard, coordinates)) {
                    availableMoveTiles.push(coordinates);
                }
            } else {
                obstacles.right = 1;
            }
        }

        return availableMoveTiles;
    }

    getCanvasCoordinates() {
        return [this.coordinateX, this.coordinateY];
    }

    isMoveAvailable(gameBoard, coordinatesToCheck) {
        return gameBoard[coordinatesToCheck[0]][coordinatesToCheck[1]] === undefined;
    }
}

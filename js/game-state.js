export default class {
    constructor(width, height, ratio, playerOneColor, playerTwoColor) {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        this.activePlayer = 'playerOne';
        this.playerOneColor = playerOneColor;
        this.playerTwoColor = playerTwoColor;
        this.battleFieldSize = 3;
        this.currentAction = '';
        this.actions = ['attack', 'move', 'heal'];
        this.playerOne = {
            units: [],
            points: 0,
            deadUnits: [],
            killedUnits: []
        };
        this.playerTwo = {
            units: [],
            points: 0,
            deadUnits: [],
            killedUnits: []
        };
        this.unitsLoading = true;
        this.gameBoard = this.createBoardTiles(width, height, ratio);
        this.obstacles = [];
        this.round = 0;
    }

    createBoardTiles(width, height, ratio) {
        return Array.from(Array(height / ratio), () => new Array(width / ratio))
    }

    calculateAvailableTiles() {
        // let field = (this.height / this.ratio - this.battleFieldSize) / 2;
        // if (this.activePlayer === 'playerOne') {
            let test = Array.from(this.gameBoard);
            let number = this.height / this.ratio;
            let testing = number - this.battleFieldSize;
            let asd = testing / 2;
            return test.splice(0,asd);
            // console.log(test);
            // return Array.from(Array(test), () => new Array(this.width / this.ratio));
        // }
        // if (this.activePlayer === 'playerTwo') {
        //     return Array.from()
        // }
    }

    get availableTiles() {
        return this.calculateAvailableTiles();
    }

}
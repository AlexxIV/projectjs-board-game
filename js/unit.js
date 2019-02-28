import {Obstacle} from "./obstacle.js";

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

    getCanvasCoordinates() {
        return [this.coordinateX, this.coordinateY];
    }


}

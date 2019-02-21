export class Obstacle {
    constructor(hp, coordinateX, coordinateY) {
        this.obstacleImage = new Image();
        this.obstacleImage.src = this.generateRandomObstacleImage();
        this.hp = hp;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.calculateCurrentSquare(coordinateX, coordinateY);
    }

    calculateCurrentSquare(coordinateX, coordinateY) {
        this.boardCoordinates = [Math.floor(coordinateY / 100), Math.floor(coordinateX / 100)];
    }

    generateRandomObstacleImage() {
        let index = (Math.floor(Math.random() * (3 - 1 + 1)) + 1);
        return `images/rocks/rock-${index}.png`;
    }
}


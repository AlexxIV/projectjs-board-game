import Unit from './unit.js';

export class Knight extends Unit {
    constructor(coordinateX, coordinateY, player, status, image) {
        super(8, 3, 15, 1, 1, coordinateX, coordinateY, player, status, image);
    }
}
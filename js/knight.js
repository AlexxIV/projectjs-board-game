import Unit from './unit.js';

export class Knight extends Unit {
    constructor(coordinateX, coordinateY, player, status, image) {
        super(8, 3, 15, 1, 3, coordinateX, coordinateY, player, status, image);
    }
}
import Unit from './unit.js';

export class Dwarf extends Unit {
    constructor(coordinateX, coordinateY, player, status, image) {
        super(6, 2, 12, 2, 2, coordinateX, coordinateY, player, status, image);
    }
}
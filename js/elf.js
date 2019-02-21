import Unit from './unit.js';

export class Elf extends Unit {
    constructor(coordinateX, coordinateY, player, status) {
        super(5, 1, 10, 3, 3, coordinateX, coordinateY, player, status);
    }
}
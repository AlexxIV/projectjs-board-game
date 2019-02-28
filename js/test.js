let knightReady = false;
let knightImage = new Image();
knightImage.onload = () => {
    knightReady = true;
};
knightImage.src = 'images/knight.png';

let elfReady = false;
let elfImage = new Image();
elfImage.onload = () => {
    elfReady = true;
};
elfImage.src = 'images/elf.png';

let dwarfReady = false;
let dwarfImage = new Image();
dwarfImage.onload = () => {
    dwarfReady = true;
};
dwarfImage.src = 'images/dwarf.png';

(() => {
    var canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 700;
    document.body.appendChild(canvas);

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');

        // for (let i = 0; i < 9; i++) {
        //     for (let j = 0; j < 7; j++) {
        //         let color = 'rgb(0, 0, 200)';
        //         if (i % 2 === 0 && j % 2 === 0) {
        //             color = 'rgb(200, 0, 0)';
        //         }
        //         if (i % 2 !== 0 && j % 2 !== 0) {
        //             color = 'rgb(200, 0, 0)';
        //         }
        //         if (j > 1 && j < 5) {
        //             color = 'rgba(200, 200, 200)';
        //         }
        //
        //         ctx.fillStyle = color;
        //         ctx.fillRect(i * 100, j * 100, 100, 100);
        //         ctx.strokeRect(i * 100, j * 100, 100, 100);
        //     }
        // }

        while(!knightReady && !elfReady && !dwarfReady) {
            console.log('loading');
        }

        if (knightReady) {
            ctx.drawImage(knightImage, 0, 0);
        }
        if (elfReady) {
            ctx.drawImage(elfImage, 100, 100);
        }
        if (dwarfReady) {
            ctx.drawImage(dwarfImage, 200, 200);
        }
        //
        //
        // ctx.fillStyle = 'rgb(200, 0, 0)';
        // ctx.fillRect(0, 0, 100, 100);
        // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        // ctx.fillRect(100, 0, 100, 100);
    }
})();


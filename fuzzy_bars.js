const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');



const settings = {
  dimensions: [ 2000, 1350 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 8;
    const rows = 50;
    const numCells = cols * rows;

    const gridw = width *  0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width -  gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      // add reference to frame here to have the sketch move
      const n = random.noise2D(x + frame*25, y, 0.001);
      const angle = n * Math.PI * 0.2;
      
      //const scale = (n + 1) / 2 * 30;
      //const scale = (n * 0.5 + 0.5) * 30;
      const scale = math.mapRange(n, -1, 1, 1, 30);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw*0.5, cellh*0.5);
      context.rotate(angle);

      context.lineWidth = scale;


      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w *  0.5, 0);
      context.stroke();


      context.restore();
    }

  };
};

canvasSketch(sketch, settings);

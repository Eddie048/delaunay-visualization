const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

type point = {
  x: number;
  y: number;
};

// Points Array
const points: point[] = [];

var frame = 0;

const animationLoop = () => {
  // Clear screen
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create new point every once in a while
  if (frame % 50 == 0)
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    });

  ctx.fillStyle = "black";

  for (let p in points) {
    // Draw point
    ctx.beginPath();
    ctx.arc(points[p].x, points[p].y, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  // Recursive
  frame += 1;
  window.requestAnimationFrame(animationLoop);
};

// Start animation loop
window.requestAnimationFrame(animationLoop);

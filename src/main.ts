const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

type point = {
  x: number;
  y: number;
};

const points: point[] = [];

const animationLoop = () => {
  // Recursive
  window.requestAnimationFrame(animationLoop);

  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";

  for (let p in points) {
    // Draw point
    ctx.beginPath();
    ctx.arc(points[p].x, points[p].y, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
};

// Start animation loop
window.requestAnimationFrame(animationLoop);

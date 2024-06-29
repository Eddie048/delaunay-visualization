import { point, triangle } from "./utils";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const c = <CanvasRenderingContext2D>canvas.getContext("2d");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Points Array
const points: point[] = [];

// Triangles Array
const triangles: triangle[] = [];

const animationLoop = async () => {
  // Clear screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Create new point
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  });

  c.fillStyle = "black";

  // Draw all points
  for (let point of points) {
    c.beginPath();
    c.arc(point.x, point.y, 3, 0, Math.PI * 2);
    c.closePath();
    c.fill();
  }

  // Draw all triangles
  for (let triangle of triangles) {
    for (let i = 0; i < triangle.length; i++) {
      c.beginPath();
      c.moveTo(triangle[i].x, triangle[i].y);
      c.lineTo(triangle[(i + 1) % 3].x, triangle[(i + 1) % 3].y);
      c.stroke();
    }
  }

  // Recursive
  await sleep(1000);
  window.requestAnimationFrame(animationLoop);
};

// Start animation loop
window.requestAnimationFrame(animationLoop);

import { isPointInTriangle, point, triangle } from "./utils";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const c = <CanvasRenderingContext2D>canvas.getContext("2d");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Points Array
const points: point[] = [];

// Triangles Array
const triangles: triangle[] = [];

// Initialize some points and triangles
let p1 = { x: 0, y: 0 };
let p2 = { x: 0, y: canvas.height };
let p3 = { x: canvas.width, y: 0 };
let p4 = { x: canvas.width, y: canvas.height };

points.push(p1, p2, p3, p4);
triangles.push([p1, p2, p3], [p2, p3, p4]);

const animationLoop = async () => {
  // Clear screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Create new point
  let newPoint = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
  points.push(newPoint);

  // Check which triangle new point is inside
  for (let i = 0; i < triangles.length; i++) {
    if (isPointInTriangle(triangles[i], newPoint)) {
      // Split triangle into 3 new triangles
      triangles.push(
        [newPoint, triangles[i][0], triangles[i][1]],
        [newPoint, triangles[i][1], triangles[i][2]],
        [newPoint, triangles[i][2], triangles[i][0]]
      );

      // Remove old triangle
      triangles.splice(i, 1);

      // Exit loop
      break;
    }
  }

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

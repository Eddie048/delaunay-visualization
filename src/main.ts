import { drawCircle, drawPoint, drawTriangle } from "./draw";
import {
  getCircumcenter,
  isPointInCircumcircle,
  point,
  triangle,
} from "./utils";

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

triangles.push([p1, p2, p3], [p2, p3, p4]);

const reDraw = () => {
  c.fillStyle = "black";
  c.strokeStyle = "black";

  // Clear screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Draw all points
  for (let point of points) {
    drawPoint(c, point, "black");
  }

  // Draw all triangles
  for (let triangle of triangles) {
    drawTriangle(c, triangle, "black");
  }
};

const animationLoop = async () => {
  // Create new point
  let newPoint = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
  points.push(newPoint);

  // Draw new point
  drawPoint(c, newPoint, "blue");
  await sleep(1000);

  // Find any triangles whos circumcircles contain the new point
  let badTriangles: triangle[] = [];
  for (let i = 0; i < triangles.length; i++) {
    let isInside = isPointInCircumcircle(triangles[i], newPoint);

    // Draw circumcircle
    let circumcenter = getCircumcenter(triangles[i]);
    drawCircle(
      c,
      circumcenter.x,
      circumcenter.y,
      Math.sqrt(
        Math.pow(circumcenter.x - triangles[i][0].x, 2) +
          Math.pow(circumcenter.y - triangles[i][0].y, 2)
      ),
      isInside ? "red" : "green"
    );

    // Show circumcircles
    await sleep(100);

    if (isInside) {
      // Add bad triangle to array, delete it from triangles array and fix the index
      badTriangles.push(triangles[i]);
      triangles.splice(i, 1);
      i -= 1;
    }
  }
  await sleep(1000);

  // Show bad triangles
  reDraw();
  for (let triangle of badTriangles) {
    drawTriangle(c, triangle, "red");
  }
  drawPoint(c, newPoint, "blue");
  await sleep(1000);

  // Show bad triangles deleted
  reDraw();
  drawPoint(c, newPoint, "blue");
  await sleep(1000);

  // Find outside edge of hole
  let outsideEdges: [point, point][] = [];
  for (let triangle of badTriangles) {
    // Loop through this triangle's sides
    for (let i = 0; i < 3; i += 1) {
      // Check if this edge is in any other triangle
      let uniqueEdge = true;

      for (let other of badTriangles) {
        if (other == triangle) continue;

        // Loop through otherTriangle's sides
        for (let j = 0; j < 3; j += 1) {
          if (
            (triangle[i] == other[j] &&
              triangle[(i + 1) % 3] == other[(j + 1) % 3]) ||
            (triangle[i] == other[(j + 1) % 3] &&
              triangle[(i + 1) % 3] == other[j])
          ) {
            uniqueEdge = false;
            break;
          }
        }
        if (!uniqueEdge) break;
      }

      // If this was a unique edge, add it to the unique edges array
      if (uniqueEdge) {
        outsideEdges.push([triangle[i], triangle[(i + 1) % 3]]);
      }
    }
  }

  // Add new triangles back
  for (let edge of outsideEdges) {
    triangles.push([edge[0], edge[1], newPoint]);
    reDraw();
    await sleep(100);
  }

  // Draw
  reDraw();

  // Recursive
  await sleep(1000);
  window.requestAnimationFrame(animationLoop);
};

// Start animation loop
window.requestAnimationFrame(animationLoop);

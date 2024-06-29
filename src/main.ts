import { isPointInCircumcircle, point, triangle } from "./utils";

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

  // Find any triangles whos circumcircles contain the new point
  let badTriangles: { triangle: triangle; index: number }[] = [];
  for (let i = 0; i < triangles.length; i++) {
    if (isPointInCircumcircle(triangles[i], newPoint)) {
      // Add bad triangle to array, delete it from triangles array and fix the index
      badTriangles.push({ triangle: triangles[i], index: i });
      triangles.splice(i, 1);
      i -= 1;
    }
  }

  // find outside edge of hole
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
            (triangle.triangle[i] == other.triangle[j] &&
              triangle.triangle[(i + 1) % 3] == other.triangle[(j + 1) % 3]) ||
            (triangle.triangle[i] == other.triangle[(j + 1) % 3] &&
              triangle.triangle[(i + 1) % 3] == other.triangle[j])
          ) {
            uniqueEdge = false;
            break;
          }
        }
        if (!uniqueEdge) break;
      }

      // If this was a unique edge, add it to the unique edges array
      if (uniqueEdge) {
        outsideEdges.push([
          triangle.triangle[i],
          triangle.triangle[(i + 1) % 3],
        ]);
      }
    }
  }

  for (let edge of outsideEdges) {
    triangles.push([edge[0], edge[1], newPoint]);
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

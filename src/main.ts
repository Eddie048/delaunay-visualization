import { getCircumcenter, isInsideCircumcircle, point } from "./utils";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const c = <CanvasRenderingContext2D>canvas.getContext("2d");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Points Array
const points: point[] = [];

const animationLoop = async () => {
  // Clear screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Create new point every once in a while
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

    // Draw line between all points
    for (let other of points) {
      if (point == other) continue;

      c.beginPath();
      c.moveTo(point.x, point.y);
      c.lineTo(other.x, other.y);
      c.stroke();
    }
  }

  // Recursive
  await sleep(1000);
  window.requestAnimationFrame(animationLoop);
};

// Start animation loop
// window.requestAnimationFrame(animationLoop);

while (true) {
  // Clear screen
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Set fill style
  c.fillStyle = "black";
  c.strokeStyle = "black";
  c.lineWidth = 2;

  // Vertices
  const vertices: point[] = [];

  // Generate and draw 3 vertices and the lines between them
  for (let i = 0; i < 3; i++) {
    const newPoint: point = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };

    vertices.push(newPoint);

    // Draw vertices
    c.beginPath();
    c.arc(newPoint.x, newPoint.y, 4, 0, Math.PI * 2);
    c.closePath();
    c.fill();

    // Draw line between all vertices
    for (let other of vertices) {
      if (newPoint == other) continue;

      c.beginPath();
      c.moveTo(newPoint.x, newPoint.y);
      c.lineTo(other.x, other.y);
      c.stroke();
    }

    await sleep(500);
  }

  // Generate new point
  const testPoint: point = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };

  // Draw new point
  c.fillStyle = "blue";
  c.beginPath();
  c.arc(testPoint.x, testPoint.y, 4, 0, Math.PI * 2);
  c.closePath();
  c.fill();

  await sleep(500);

  // Draw circumcircle
  let circumcenter = getCircumcenter(vertices);
  let radius = Math.sqrt(
    Math.pow(circumcenter.x - vertices[0].x, 2) +
      Math.pow(circumcenter.y - vertices[0].y, 2)
  );

  c.strokeStyle = isInsideCircumcircle(vertices, testPoint) ? "green" : "red";

  c.beginPath();
  c.arc(circumcenter.x, circumcenter.y, radius, 0, Math.PI * 2);
  c.closePath();
  c.stroke();

  await sleep(1000);
}

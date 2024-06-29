import { isInsideCircumcircle, point } from "./utils";

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

c.fillStyle = "black";

// Generate and draw 3 points and the lines between them
for (let i = 0; i < 3; i++) {
  const newPoint: point = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };

  points.push(newPoint);

  // Draw points
  c.beginPath();
  c.arc(newPoint.x, newPoint.y, 3, 0, Math.PI * 2);
  c.closePath();
  c.fill();

  // Draw line between all points
  for (let other of points) {
    if (newPoint == other) continue;

    c.beginPath();
    c.moveTo(newPoint.x, newPoint.y);
    c.lineTo(other.x, other.y);
    c.stroke();
  }

  await sleep(1000);
}

// Generate new point
const testPoint: point = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
};

// Draw new point
c.fillStyle = "red";
c.beginPath();
c.arc(testPoint.x, testPoint.y, 3, 0, Math.PI * 2);
c.closePath();
c.fill();

console.log(isInsideCircumcircle(points, testPoint));

import { determinant } from "./matrix";

type point = {
  x: number;
  y: number;
};

// Determine if 3 points are arranged clockwise or counterclockwise
const isCounterClockwise = (vertices: point[]) => {
  // Ensure 3 verticies
  if (vertices.length != 3) throw "getCircumcenter takes in 3 vertices exactly";

  const matrix: number[][] = [];

  for (let point of vertices) {
    matrix.push([point.x, point.y, 1]);
  }

  return determinant(matrix) > 0;
};

// Determine if a test point is within the circumcircle described by 3 other points
const isInsideCircumcircle = (vertices: point[], toTest: point) => {
  // Ensure 3 verticies
  if (vertices.length != 3) throw "getCircumcenter takes in 3 vertices exactly";

  let direction = isCounterClockwise(vertices);

  const matrix: number[][] = [];

  for (let point of vertices) {
    matrix.push([
      point.x - toTest.x,
      point.y - toTest.y,
      Math.pow(point.x - toTest.x, 2) + Math.pow(point.y - toTest.y, 2),
    ]);
  }

  return direction == determinant(matrix) > 0;
};

// Get the circumcenter of 3 points
const getCircumcenter = (vertices: point[]) => {
  // Ensure 3 verticies
  if (vertices.length != 3) throw "getCircumcenter takes in 3 vertices exactly";

  // Pretend vertices[0] is at 0, 0 to simplify equations
  let b: point = {
    x: vertices[1].x - vertices[0].x,
    y: vertices[1].y - vertices[0].y,
  };
  let c: point = {
    x: vertices[2].x - vertices[0].x,
    y: vertices[2].y - vertices[0].y,
  };

  // Calculate x and y of circumcenter
  let d = 2 * (b.x * c.y - b.y * c.x);
  let x = (c.y * (b.x * b.x + b.y * b.y) - b.y * (c.x * c.x + c.y * c.y)) / d;
  let y = (b.x * (c.x * c.x + c.y * c.y) - c.x * (b.x * b.x + b.y * b.y)) / d;

  // Add vertices[0] back to circumcenter
  let center: point = { x: x + vertices[0].x, y: y + vertices[0].y };
  return center;
};

export { type point, isInsideCircumcircle, getCircumcenter };

import { determinant } from "./matrix";

type point = {
  x: number;
  y: number;
};

type triangle = [point, point, point];

// Determine if 3 points are arranged clockwise or counterclockwise
const isCounterClockwise = (vertices: triangle) => {
  const matrix: number[][] = [];

  for (let point of vertices) {
    matrix.push([point.x, point.y, 1]);
  }

  return determinant(matrix) > 0;
};

// Determine if a test point is within the circumcircle described by 3 other points
const isPointInCircumcircle = (vertices: triangle, toTest: point) => {
  // Get direction of triangle
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
const getCircumcenter = (vertices: triangle) => {
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

// Get which side of a line a point is on
const sign = (p1: point, p2: point, p3: point) => {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y) < 0;
};

const isPointInTriangle = (vertices: triangle, toTest: point) => {
  let b1 = sign(toTest, vertices[0], vertices[1]);
  let b2 = sign(toTest, vertices[1], vertices[2]);
  let b3 = sign(toTest, vertices[2], vertices[0]);
  return b1 == b2 && b2 == b3;
};

export {
  type point,
  type triangle,
  isPointInCircumcircle,
  getCircumcenter,
  isPointInTriangle,
};

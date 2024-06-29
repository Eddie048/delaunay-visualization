import { determinant } from "./matrix";

type point = {
  x: number;
  y: number;
};

// Determine if 3 points are arranged clockwise or counterclockwise
const isCounterClockwise = (vertices: point[]) => {
  const matrix: number[][] = [];

  for (let point of vertices) {
    matrix.push([point.x, point.y, 1]);
  }

  return determinant(matrix) > 0;
};

// Determine if a test point is within the circumcircle described by 3 other points
const isInsideCircumcircle = (vertices: point[], toTest: point) => {
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

export { type point, isInsideCircumcircle };

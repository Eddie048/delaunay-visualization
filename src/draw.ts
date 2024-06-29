import { point, triangle } from "./utils";

// Draw a point of a specified color
const drawPoint = (
  c: CanvasRenderingContext2D,
  point: point,
  color: string
) => {
  c.fillStyle = color;
  c.beginPath();
  c.arc(point.x, point.y, 3, 0, Math.PI * 2);
  c.closePath();
  c.fill();
};

// Draw a triangle of a specified color
const drawTriangle = (
  c: CanvasRenderingContext2D,
  triangle: triangle,
  color: string
) => {
  c.strokeStyle = color;
  for (let i = 0; i < triangle.length; i++) {
    c.beginPath();
    c.moveTo(triangle[i].x, triangle[i].y);
    c.lineTo(triangle[(i + 1) % 3].x, triangle[(i + 1) % 3].y);
    c.stroke();
  }
};

// Draw a circle of a specified color
const drawCircle = (
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  c.strokeStyle = color;
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.stroke();
};

export { drawPoint, drawTriangle, drawCircle };

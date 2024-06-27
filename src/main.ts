const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

ctx.fillText("Hello, world!", 10, 20);
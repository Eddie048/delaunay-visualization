const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

ctx.font = "30px Arial";
ctx.fillText("Hello, World!", 10, 30);
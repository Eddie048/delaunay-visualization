const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");


var x = 0;
const animationLoop = () => {
  window.requestAnimationFrame(animationLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "blue";
  ctx.fillRect(x, 100, 200, 100);
  x += 5;
  if (x > canvas.width) x = -200;
}

window.requestAnimationFrame(animationLoop);

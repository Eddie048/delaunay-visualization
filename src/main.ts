const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

type particle = {
  x: number;
  y: number;
  radius: number;
}

const particles: particle[] = []

ctx.fillStyle = "blue";

const animationLoop = () => {
  window.requestAnimationFrame(animationLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.push({x: Math.random() * canvas.width, y: canvas.height, radius: 70})

  for (let x in particles) {
    ctx.beginPath();
    ctx.arc(particles[x].x, particles[x].y, particles[x].radius, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();

    particles[x].y -= 0.5;
    particles[x].radius -= 0.25;

    if (particles[x].radius <= 0) delete particles[x]
  }


}

window.requestAnimationFrame(animationLoop);

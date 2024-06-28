const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

type particle = {
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
  radius: number;
};

const particles: particle[] = [];
var frame = 0;

const animationLoop = () => {
  // Recursive
  window.requestAnimationFrame(animationLoop);

  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create new particle
  particles.push({
    x: Math.random() * canvas.width,
    y: -20,
    xVelocity: (Math.random() - 0.5) * 2,
    yVelocity: (Math.random() - 0.5) * 4,
    radius: 20,
  });

  ctx.fillStyle = "black";

  for (let p in particles) {
    // Draw particle
    ctx.beginPath();
    ctx.arc(
      particles[p].x,
      particles[p].y,
      particles[p].radius,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // Update x, y, and radius
    particles[p].y += particles[p].yVelocity;
    particles[p].x += particles[p].xVelocity;
    particles[p].radius -= 0.02;

    // Loop on edges of screen, ensure no popping in and out by subtracting radius
    if (particles[p].x > canvas.width + particles[p].radius)
      particles[p].x -= canvas.width + particles[p].radius * 2;
    if (particles[p].x < -particles[p].radius)
      particles[p].x += canvas.width + particles[p].radius * 2;
    if (particles[p].y > canvas.height + particles[p].radius)
      particles[p].y -= canvas.height + particles[p].radius * 2;
    if (particles[p].y < -particles[p].radius)
      particles[p].y += canvas.height + particles[p].radius * 2;

    // If particle is too small, delete it
    if (particles[p].radius <= 0) delete particles[p];

    frame += 1;
  }
};

// Start animation loop
window.requestAnimationFrame(animationLoop);

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('simulation-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    // Start the simulation
    startSimulation(ctx, canvas.width, canvas.height);
});

class Molecule {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }
}

function startSimulation(ctx, canvasWidth, canvasHeight) {
    const molecules = [];

    for (let i = 0; i < 10; i++) {
        const radius = 10;
        const x = Math.random() * (canvasWidth - radius * 2) + radius;
        const y = Math.random() * (canvasHeight - radius * 2) + radius;
        const color = 'green';
        const velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };

        molecules.push(new Molecule(x, y, radius, color, velocity));
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        molecules.forEach(molecule => {
            molecule.update(canvasWidth, canvasHeight);
            molecule.draw(ctx);
        });

        requestAnimationFrame(animate);
    }
 
    animate();
}

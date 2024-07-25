// script.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('simulation-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const molecules = [];

    class Molecule {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.velocity.x = -this.velocity.x;
            }

            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.velocity.y = -this.velocity.y;
            }
        }
    }

    function createMolecules(count) {
        for (let i = 0; i < count; i++) {
            const radius = 5;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const color = 'green';
            const velocity = {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };

            molecules.push(new Molecule(x, y, radius, color, velocity));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        molecules.forEach(molecule => {
            molecule.update();
            molecule.draw();
        });

        requestAnimationFrame(animate);
    }

    createMolecules(100);
    animate();
});

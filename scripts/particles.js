class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createExplosion(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }

    createTrail(x, y, color) {
        this.particles.push(new Particle(x, y, color, true));
    }

    update() {
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.life > 0;
        });
    }

    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }
}

class Particle {
    constructor(x, y, color, isTrail = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isTrail = isTrail;
        
        if (isTrail) {
            this.velocity = {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };
            this.life = 20;
            this.maxLife = 20;
            this.size = 3;
        } else {
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.life = 40;
            this.maxLife = 40;
            this.size = 5;
        }
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;

        if (!this.isTrail) {
            this.velocity.y += 0.1; // gravity
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (this.life / this.maxLife), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
} 
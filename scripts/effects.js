class VisualEffects {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.effects = [];
    }

    addShockwave(x, y) {
        this.effects.push({
            type: 'shockwave',
            x: x,
            y: y,
            radius: 0,
            maxRadius: 100,
            life: 1
        });
    }

    addNeonTrail(points, color) {
        this.effects.push({
            type: 'neonTrail',
            points: points,
            color: color,
            life: 1
        });
    }

    update() {
        this.effects = this.effects.filter(effect => {
            if (effect.type === 'shockwave') {
                effect.radius += 5;
                effect.life -= 0.02;
                return effect.life > 0;
            }
            if (effect.type === 'neonTrail') {
                effect.life -= 0.05;
                return effect.life > 0;
            }
            return false;
        });
    }

    draw() {
        this.effects.forEach(effect => {
            if (effect.type === 'shockwave') {
                this.drawShockwave(effect);
            } else if (effect.type === 'neonTrail') {
                this.drawNeonTrail(effect);
            }
        });
    }

    drawShockwave(effect) {
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(52, 152, 219, ${effect.life})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawNeonTrail(effect) {
        this.ctx.save();
        this.ctx.strokeStyle = effect.color;
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = effect.color;
        this.ctx.globalAlpha = effect.life;
        
        this.ctx.beginPath();
        this.ctx.moveTo(effect.points[0].x, effect.points[0].y);
        for (let i = 1; i < effect.points.length; i++) {
            this.ctx.lineTo(effect.points[i].x, effect.points[i].y);
        }
        this.ctx.stroke();
        this.ctx.restore();
    }
} 
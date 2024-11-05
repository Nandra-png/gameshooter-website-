class PowerUpSystem {
    constructor() {
        this.powerUps = [];
        this.types = {
            'speedBoost': {
                color: '#f1c40f',
                duration: 5000,
                effect: (player) => {
                    player.speed *= 1.5;
                    setTimeout(() => {
                        player.speed /= 1.5;
                    }, 5000);
                }
            },
            'rapidFire': {
                color: '#e74c3c',
                duration: 3000,
                effect: (player) => {
                    const originalFireRates = {};
                    Object.keys(player.weapons).forEach(weapon => {
                        originalFireRates[weapon] = player.weapons[weapon].fireRate;
                        player.weapons[weapon].fireRate /= 2;
                    });
                    setTimeout(() => {
                        Object.keys(player.weapons).forEach(weapon => {
                            player.weapons[weapon].fireRate = originalFireRates[weapon];
                        });
                    }, 3000);
                }
            },
            'shield': {
                color: '#3498db',
                duration: 8000,
                effect: (player) => {
                    player.isInvulnerable = true;
                    setTimeout(() => {
                        player.isInvulnerable = false;
                    }, 8000);
                }
            }
        };
    }

    spawnPowerUp(x, y, type) {
        if (this.types[type]) {
            this.powerUps.push({
                x: x,
                y: y,
                type: type,
                radius: 15,
                color: this.types[type].color,
                pulseSize: 0,
                pulseDirection: 1
            });
        }
    }

    update() {
        this.powerUps.forEach(powerUp => {
            // Animasi pulsing
            if (powerUp.pulseDirection === 1) {
                powerUp.pulseSize += 0.2;
                if (powerUp.pulseSize >= 5) powerUp.pulseDirection = -1;
            } else {
                powerUp.pulseSize -= 0.2;
                if (powerUp.pulseSize <= 0) powerUp.pulseDirection = 1;
            }
        });
    }

    draw(ctx) {
        this.powerUps.forEach(powerUp => {
            // Efek glow
            ctx.save();
            ctx.shadowBlur = 15;
            ctx.shadowColor = powerUp.color;
            
            // Lingkaran dalam
            ctx.beginPath();
            ctx.fillStyle = powerUp.color;
            ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Lingkaran luar (pulsing)
            ctx.beginPath();
            ctx.strokeStyle = powerUp.color;
            ctx.lineWidth = 2;
            ctx.arc(powerUp.x, powerUp.y, powerUp.radius + powerUp.pulseSize, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        });
    }

    checkCollision(player) {
        this.powerUps = this.powerUps.filter(powerUp => {
            const dx = player.x - powerUp.x;
            const dy = player.y - powerUp.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < player.radius + powerUp.radius) {
                this.types[powerUp.type].effect(player);
                return false;
            }
            return true;
        });
    }
} 
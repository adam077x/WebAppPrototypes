let bullets = [];
let player;
let enemies = [];
var canvas;
let score = 0;
let particles = [];
let running = false;

class Particle {
    constructor(x, y, dir, rgb) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.radius = 32;
        this.decaySpeed = 0.5 + Math.random();
        this.speed = (2 * Math.random() + 2);
        this.rgb = rgb;
        //this.rgb.r += Math.random() * 32;
        //this.rgb.g += Math.random() * 32;
        //this.rgb.b += Math.random() * 32;
    }

    update(ctx) {
        this.x += Math.cos(this.dir) * this.speed;
        this.y += Math.sin(this.dir) * this.speed;
        if(this.radius > 0) {
            this.radius -= this.decaySpeed;
        }
        if(this.radius <= 0) {
            for(var i = 0; i < particles.length; i++) {
                if(particles[i] == this) {
                    particles.splice(i, 1);
                }
            }
            return;
        }

        ctx.fillStyle = "rgb(" + this.rgb.r + ", " +  this.rgb.g + ", " + this.rgb.b + " )";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.deg = 0;
        this.radius = 32;

        this.rgb = {
            r: Math.random() * 128 + 127,
            g: Math.random() * 128 + 127,
            b: Math.random() * 128 + 127
        };

        console.log(this.rgb);
    }

    update(ctx) {
        for(var i = 0; i < bullets.length; i++) {
            var dx = this.x - bullets[i].x;
            var dy = this.y - bullets[i].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius + bullets[i].radius) {
                for(var j = 0; j < enemies.length; j++) {
                    if(enemies[j] == this) {
                        for(var x = 0; x < Math.floor(20 * Math.random() + 5); x++) {
                            particles.push(new Particle(enemies[j].x + (Math.random() * 16 + 16), enemies[j].y + (Math.random() * 16 + 16), Math.PI * 2 * Math.random(), this.rgb));
                        }
                        enemies.splice(j, 1);
                        score++;
                    }
                }

                bullets.splice(i, 1);
            }
        }

        var deltaX = player.x - this.x;
        var deltaY = player.y - this.y;
        this.deg = Math.atan2(deltaY, deltaX);
        this.x += Math.cos(this.deg) * (2+score*0.02);
        this.y += Math.sin(this.deg) * (2+score*0.02);
        //ctx.fillStyle = "#fff";
        ctx.fillStyle = "rgb(" + this.rgb.r + ", " +  this.rgb.g + ", " + this.rgb.b + " )";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.deg = 0;
        this.radius = 8;
    }

    update(ctx) {
        this.x += Math.cos(this.deg) * 7;
        this.y += Math.sin(this.deg) * 7;

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

class Player {
    constructor() {
        this.radius = 32;
        this.x = canvas.width/2 + this.radius/2;
        this.y = canvas.height/2 + this.radius/2;
        this.vel = {
            x: 0,
            y: 0
        };
    }

    update(ctx) {
        if(this.x + this.vel.x >= canvas.width || this.x + this.vel.x <= 0 || this.y + this.vel.y >= canvas.height || this.y + this.vel.y <= 0) {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        this.x += this.vel.x;
        this.y += this.vel.y;

        for(var i = 0; i < enemies.length; i++) { 
            var dx = this.x - enemies[i].x;
            var dy = this.y - enemies[i].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius + enemies[i].radius) {
                document.querySelector("#scoreEnd").innerHTML = "Your score is " + score.toString();
                document.querySelector("#stopGame").style.opacity = "1.0";
                document.querySelector("#stopGame").hidden = false;
                running = false;
                return;
            }
        }

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();

        console.log("ASDADW");
    }

    keyDown(key) {
        if(key == "w") {
            this.vel.y = -5;
        }
        else if(key == "s") {
            this.vel.y = 5;
        }

        if(key == "a") {
            this.vel.x = -5;
        }
        else if(key == "d") {
            this.vel.x = 5;
        }
    }

    keyUp(key) {
        if(key == "w") {
            this.vel.y = 0;
        }
        else if(key == "s") {
            this.vel.y = 0;
        }

        if(key == "a") {
            this.vel.x = 0;
        }
        else if(key == "d") {
            this.vel.x = 0;
        }
    }

    click(e) {
        var bullet = new Bullet(this.x, this.y);
        bullets.push(bullet);
        var deltaX = e.pageX - this.x;
        var deltaY = e.pageY - this.y;
        bullet.deg = Math.atan2(deltaY, deltaX);
    }
}

$('DOMContentLoaded', function() {
    canvas = document.querySelector("#gameCanvas")
    var ctx = canvas.getContext("2d");

    canvas.width = $(window).width();
    canvas.height = $(window).height();

    player = new Player();

    document.querySelector("#stopGame").hidden = true;

    setInterval(() => {
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if(!running) {
            return;
        }

        player.update(ctx);

        for(var i = 0; i < bullets.length; i++) {
            bullets[i].update(ctx);

            if(bullets[i].x >= canvas.width || bullets[i].x <= 0 || bullets[i].y >= canvas.height || bullets[i].y <= 0) {
                bullets.splice(i, 1);
            }
        }

        for(var i = 0; i < particles.length; i++) {
            particles[i].update(ctx);
        }

        for(var i = 0; i < enemies.length; i++) {
            enemies[i].update(ctx);
        }
        
        ctx.fillStyle = "#FFF";
        ctx.font = "40px Arial";
        var scoreString = score.toString();
        ctx.fillText(scoreString, canvas.width/2, 100);
    }, 5);

    let time = 0;
    setInterval(() => {
        if(!running) return;
        time++;
        if(time >= Math.max(100-score, 50)) {
            time = 0;
            var dir = (Math.PI * 2 * Math.random());
            var x = player.x + Math.cos(dir) * 1000;
            var y = player.y + Math.sin(dir) * 1000;
            enemies.push(new Enemy(x, y));
        }
    }, 10);

    $(document).keypress(function(e) {
        player.keyDown(e.key.toLowerCase());
    });

    $(document).keyup(function(e) {
        player.keyUp(e.key.toLowerCase());
    });

    $(document).click(function(e) {
        player.click(e);
    });

    $(window).resize(function(e) {
        canvas.width = $(window).width();
        canvas.height = $(window).height();
    });
});

function restart() {
    running = true;
    player = new Player();
    player.x = canvas.width/2 + player.radius/2;
    player.y = canvas.height/2 + player.radius/2;
    enemies.splice(0, enemies.length)
    bullets.splice(0, bullets.length)
    particles.splice(0, bullets.length)
    document.querySelector("#stopGame").hidden = true;
    document.querySelector("#stopGame").style.opacity = "0.0";
    score = 0;
}

function startGame() {
    document.querySelector("#startGame").style.opacity = "0";
    running = true;
}
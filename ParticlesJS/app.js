let canvas;
let ctx;

window.onload = function() {
	canvas = document.getElementById("mainCanvas");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	setInterval(run, 0);
	setInterval(spawnParticles, 3)
}

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

let now = Date.now()/1000;
let last = Date.now()/1000;
let deltaTime = 0;
let frames = 0;
let fpswait = 0;

function run() {
	now = Date.now()/1000;
	deltaTime = now - last;
	fpswait += deltaTime;
	frames++;

	// Print game FPS
	if(fpswait >= 1) {
		console.log(frames);
		frames = 0;
		fpswait = 0;
	}

	if(deltaTime >= 0.1) {
		deltaTime = 0.1;
	}

	ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#E25822";
	ctx.fillRect(0, canvas.height - 50, canvas.width, canvas.height);

	for(let i = 0; i < particles.length; i++) {
		particles[i].update(deltaTime);
		particles[i].render(ctx);
	}

	last = now;
}
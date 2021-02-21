let ctx;
let canvas;
let running = false;

let radius = 10;
let angleMultiplier = 3.8;
let offsetConst = 1;
let colorAdd = 0.5;

window.onload = function() {
	canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");

    var back = document.getElementById("back");
    var start = document.getElementById("start");
    start.onclick = function() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        var radiusIn = document.getElementById("radiusField");
        radius = parseFloat(radiusIn.value);

        if(Number.isNaN(radius)) radius = 10;

        var angelIn = document.getElementById("angleField");
        angleMultiplier = parseFloat(angelIn.value);

        if(Number.isNaN(angleMultiplier)) angleMultiplier = 3.8;

        var offsetIn = document.getElementById("offsetField");
        offsetConst = parseFloat(offsetIn.value);

        if(Number.isNaN(offsetConst)) offsetConst = 1;

        var colorIn = document.getElementById("colorField");
        colorAdd = parseFloat(colorIn.value);

        if(Number.isNaN(colorAdd)) colorAdd = 0.5;

        console.log(radius);
        console.log(angleMultiplier);
        console.log(offsetConst);
        console.log(colorAdd);

        back.style.opacity = 0;
        running = true;
    };

	setInterval(update, 0);
}

let offset = 0;
let color = 0;

let update = function() {
    if(!running) return; 

    let angle = offset * angleMultiplier;
    let distance = radius * Math.sqrt(offset);
    let x = distance * Math.sin(angle) + canvas.width / 2;
    let y = distance * Math.cos(angle) + canvas.height / 2;

    ctx.fillStyle = 'hsl(' + color +', 100%, 50%)';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    color += colorAdd;
    offset += offsetConst;
}
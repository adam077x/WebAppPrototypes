var canvas, ctx;
var brush = { x: 0, y: 0, color: "#000000", size: 10, down: false};
var strokes = [];
var currentStroke = null;

var img;

function redraw() {
	ctx.clearRect(0, 0, canvas.width(), canvas.height());

	ctx.lineCap = 'round';
	for (var i =0; i < strokes.length; i++) {
		var s = strokes[i];
		ctx.strokeStyle = s.color;
		ctx.lineWidth = s.size;
		ctx.beginPath();
		ctx.moveTo(s.points[0].x, s.points[0].y);
		for(var j = 0; j < s.points.length; j++) {
			var p = s.points[j];
			ctx.lineTo(p.x, p.y);
		}
		ctx.stroke();
	}
}

function init() {
	canvas = $('#draw');
	canvas.attr({
		width: window.innerWidth,
		height: window.innerHeight
	});

	ctx = canvas[0].getContext('2d');
	img = new Image();

	function mouseEvent(e) {
		brush.x = e.pageX;
		brush.y = e.pageY-30; 

		currentStroke.points.push({
			x: brush.x,
			y: brush.y
		});

		redraw();
	}

	canvas.mousedown(function(e) {
		brush.down = true;

		currentStroke = {
			color: brush.color,
			size: brush.size,
			points: [],
		};

		strokes.push(currentStroke);

		mouseEvent(e);
	}).mouseup(function(e) {
		brush.down = false;

		mouseEvent(e);

		currentStroke = null;
	}).mousemove(function(e) {
		if(brush.down) 
			mouseEvent(e);
	});
}

$('#save-btn').click(function () {
	window.open(canvas[0].toDataURL());
});

$('#undo-btn').click(function () {
	strokes.pop();
	redraw();
});

$('#clear-btn').click(function () {
	strokes = [];
	redraw();
});

$('#color-picker').on('input', function () {
	brush.color = this.value;
});

$('#brush-size').on('input', function () {
	brush.size = this.value;
});

function clear() {
	strokes = [];
	redraw();
}

function undo() {
	strokes.pop();
	redraw();
}

function loadImage() {
	const readFileBtn = document.getElementById("read-file");
	readFileBtn.click();
}

function downloadImage() {
	var link = document.createElement('a');
	link.download = 'image.png';
	link.href = document.getElementById('draw').toDataURL()
	link.click();
};

$(init);
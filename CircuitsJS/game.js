let canvas;
let ctx;

let map = [];
let oldMap = [];

let mapSize = {
    x: 128,
    y: 128
};

let tiles = {
    WIRE: 1,
    ACTIVATED_WIRE: 2,
    TRAIL_WIRE: 3,
    ACTIVATOR: 4,
    INVERTER: 5,
}

let place = tiles.WIRE;

window.onload = function() {
    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < mapSize.x; i++) {
        map[i] = [];
        for (let j = 0; j < mapSize.y; j++) {
            map[i][j] = 0;
        }
    }

    //map[2][1] = tiles.ACTIVATOR;
    //for (let i = 0; i < 10; i++) {
    //    map[i + 3][1] = 1;
    //}


    setInterval(run, 1);
    setInterval(update, 50);
}

function update() {
    for (let i = 0; i < mapSize.x; i++) {
        oldMap[i] = [];
        for (let j = 0; j < mapSize.y; j++) {
            oldMap[i][j] = map[i][j];
        }
    }

    for (let i = 0; i < mapSize.x; i++) {
        for (let j = 0; j < mapSize.y; j++) {
            if (oldMap[i][j] == tiles.TRAIL_WIRE) {
                map[i][j] = tiles.WIRE;
            }

            if (oldMap[i][j] == tiles.ACTIVATED_WIRE) {
                map[i][j] = tiles.TRAIL_WIRE;
            }

            if (i + 1 < mapSize.x) {
                updateTile(1, 0, i, j);
            }

            if (i > 0) {
                updateTile(-1, 0, i, j);
            }

            if (j + 1 < mapSize.y) {
                updateTile(0, 1, i, j);
            }

            if (j > 0) {
                updateTile(0, -1, i, j);
            }
        }
    }
}

function updateTile(offsetX, offsetY, i, j) {
    if (oldMap[i + offsetX][j + offsetY] == tiles.WIRE && oldMap[i][j] == tiles.ACTIVATED_WIRE || oldMap[i][j] == tiles.ACTIVATOR) {
        map[i + offsetX][j + offsetY] = tiles.ACTIVATED_WIRE;
        if (oldMap[i][j] != tiles.ACTIVATOR) {
            map[i][j] = tiles.TRAIL_WIRE;
        }
    }
}

function run() {
    ctx.fillStyle = "#AAA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < mapSize.x; i++) {
        for (let j = 0; j < mapSize.y; j++) {

            if (map[i][j] == tiles.WIRE) {
                ctx.fillStyle = "#666600";
                ctx.fillRect(i * 32, j * 32, 32, 32);
            } else if (map[i][j] == tiles.ACTIVATED_WIRE) {
                ctx.fillStyle = "#EEEE88";
                ctx.fillRect(i * 32, j * 32, 32, 32);
            } else if (map[i][j] == tiles.TRAIL_WIRE) {
                ctx.fillStyle = "#FFFFAA";
                ctx.fillRect(i * 32, j * 32, 32, 32);
            } else if (map[i][j] == tiles.ACTIVATOR) {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(i * 32, j * 32, 32, 32);
            } else if (map[i][j] == tiles.INVERTER) {
                ctx.fillStyle = "#0000FF";
                ctx.fillRect(i * 32, j * 32, 32, 32);
            }
        }
    }

    for (let i = 0; i < mapSize.x; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 32, 0);
        ctx.lineTo(i * 32, window.innerHeight);
        ctx.stroke();
    }

    for (let i = 0; i < mapSize.y; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 32);
        ctx.lineTo(window.innerWidth, i * 32);
        ctx.stroke();
    }
}

document.addEventListener("click", function(e) {
    let pos = [Math.floor(e.pageX / 32), Math.floor(e.pageY / 32)];
    map[pos[0]][pos[1]] = place;
    console.log(map[pos[0]][pos[1]]);
    console.log(e);

    console.log("x = " + pos[0]);
    console.log("y = " + pos[1]);
});

document.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "1":
            place = 0;
            break;
        case "2":
            place = tiles.WIRE;
            break;
        case "3":
            place = tiles.ACTIVATOR;
            break;
        case "4":
            place = tiles.ACTIVATED_WIRE;
            break;
        case "5":
            place = tiles.INVERTER;
            break;
    }
    console.log(e);
    console.log(place);
});
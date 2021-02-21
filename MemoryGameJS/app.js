let screen = {
	x: 3,
	y: 3
};

let playing = false;
let grid;
let numOfHidden = 0;
let numOfHiddenCounter = 0;

let lives;
let livesElement;

window.addEventListener('DOMContentLoaded', function() {
	lives = 3;
	livesElement = document.getElementById("lives");
	livesElement.textContent = "Lives: " + lives;

	grid = document.getElementById('grid');

    do {
    	createTable();	
    } while(numOfHidden <= 0);

    setTimeout(hideResults, 2000)
});

function createTable() {
	var table = document.createElement('table');

	numOfHidden = 0;

	for (let x = 0; x < screen.x; x++) {
		var tr = document.createElement('tr');
		for (let y = 0; y < screen.y; y++) {
			let th = document.createElement('th');
			let r = Math.random() * 5 + 1;
			tr.appendChild(th);
			if(Math.floor(r) == 1) {
				th.style.backgroundColor = 'white';
				th.setAttribute("value", 1);
				numOfHidden++;
			}
			else {
				th.setAttribute("value", 0);
			}
			th.addEventListener("click", function() {
				if(!playing) return;

				if(th.getAttribute("value") == 0) {
					th.style.backgroundColor = 'rgb(150, 150, 255)';
					lives--;
					th.classList.toggle('flipped');
					if(lives <= 0) {
						resetGame();
					}
				} 
				else {
					th.style.backgroundColor = 'white';
					th.classList.toggle('flipped');
					numOfHiddenCounter++;
					if(numOfHiddenCounter == numOfHidden) {
						setTimeout(nextLevel, 1000);
						playing = false;
					}
				}
				livesElement.textContent = "Lives: " + lives;
			});
		}		
		table.appendChild(tr);
	}

	grid.appendChild(table);
}

function hideResults() {
	var elements = document.querySelectorAll('th');
	console.log(elements);
	elements.forEach(element => {
		if(element.getAttribute("value") == 1) {
			element.style.backgroundColor = 'rgb(180, 180, 255)';
			playing = true;
			element.classList.toggle('flipped');
		}
	});
}

function cleanTable() {
	var tableElement = document.querySelector('table');
	var gridElement = document.querySelector('#grid');

	gridElement.removeChild(tableElement);
}

function resetGame() {
	screen = {
		x: 3,
		y: 3
	};
	numOfHiddenCounter = 0;
	numOfHidden = 0;
	lives = 3;
	playing = false;
	cleanTable();
	do {
    	createTable();	
    } while(numOfHidden <= 0);
    setTimeout(hideResults, 1000 * screen.x)
}

function nextLevel() {
	playing = true;
	numOfHidden = 0;
	numOfHiddenCounter = 0;
	screen.x += 1;
	screen.y += 1;
	playing = false;
	cleanTable();
	do {
    	createTable();	
    } while(numOfHidden <= 0);
    setTimeout(hideResults, 2000)
}
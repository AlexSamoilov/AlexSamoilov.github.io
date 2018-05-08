//variables
var scoreTable      = document.getElementById('score'),
	canvas          = document.getElementById('canvas'),
	canvasWidth     = canvas.width,
	canvasHeight    = canvas.height,
	ctx             = canvas.getContext('2d'),
	startCoordinate = 0,
	elementWidth  	= 20,
	elementHeight 	= 20,
	userScore       = 0,
	startElementTime         	= 0,
	createElementTimePeriod  	= 100,
	stopElementProducing     	= false,	
	elements 					= new Array();

//start element constructor
function Element() {
	this.coordinateX = getRandomCoordianteX();
	this.coordinateY = startCoordinate;
	this.speed       = getRandomSpeed()/3;
	this.color       = getRandomColor();
	this.isRemoved   = false;

	this.draw = () => {
  	ctx.fillRect(this.coordinateX, 
  				this.coordinateY,
  				elementWidth,
  				elementHeight);
  	ctx.fillStyle = this.color;
	}

	this.move = () => {
		this.coordinateY += this.speed;
		if(this.coordinateY >= canvasHeight) this.coordinateY = startCoordinate;
	}

	this.hitTest = (x, y) => {
		var xDifference = x - this.coordinateX;
		var yDifference = y - this.coordinateY;

		if (elementWidth > xDifference > 0 && elementHeight > yDifference > 0) return true;

		return false;
	}
}

function newElement() {
	elements.push( new Element());
}

function startProduceElements() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	if (stopElementProducing) return false;
	if (startElementTime % createElementTimePeriod === 0) newElement();
	for (var i = 0, l = elements.length; i < l; i++) {
		elements[i].draw();
		elements[i].move();
		if(elements[i].isRemoved) {
			elements.splice(i, 1);
			i--;
			l--;
		}
	}
	startElementTime++;
	requestAnimationFrame(startProduceElements);	
}

function clickCoordinate(e, canvas) {
	var element = canvas,
		  offsetX = 0,
		  offsetY = 0,
		  mx, my;

  	if (element.offsetParent !== undefined) {
  		do {
  			offsetX += element.offsetLeft;
  			offsetY += element.offsetTop;
  		} while ((element = element.offsetParent));
  	}

  	mx = e.pageX - offsetX;
  	my = e.pageY - offsetY;

  	return {
  		x: mx,
  		y: my
  	};
}

canvas.addEventListener('click', function(e){
	var clickPoint = clickCoordinate(e, canvas);

	for (var i = 0, l = elements.length; i < l; i++) {
		if (elements[i].hitTest(clickPoint.x, clickPoint.y)) {
			userScore++;
			updateUserScore();
			elements[i].isRemoved = true;
		}
	}
});

function startGame() {
	stopElementProducing = false;
	startProduceElements();
}
function endGame() {
	stopElementProducing = true;
	resetUserScore();
	elements.splice(0);
}

// User score
function updateUserScore() {
	scoreTable.innerHTML = userScore;
}
function resetUserScore() {
	userScore = 0;
	scoreTable.innerHTML = userScore;
}

// random initial conditions for Elements 
function getRandomCoordianteX() {
	return Math.round( Math.random() * Math.floor(canvasWidth) );
}
function getRandomSpeed() {
	return Math.round( Math.random() * Math.floor(10) + 2);	
}
function getRandomColor() {
	return "#"+((1<<24)*Math.random()|0).toString(16);
}
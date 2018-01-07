// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	 this.x = 0;
	 this.y = Math.floor(Math.random() * 3) + 1;
	 this.speed = Math.floor(Math.random() * 3) + 1;

	 console.log("Created enemy @ ", this.y, ", speed = ", this.speed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	 this.x = (this.x + (this.speed * dt)) % 5;

	 if(Math.floor(this.x) == player.x
 		&& this.y == player.y)
	 {
		player.deltaX = 0;
		player.deltaY = 0;
		player.x = 2;
		player.y = 5;
	 }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.x = 2;
	this.y = 5;
	this.deltaX = 0;
	this.deltaY = 0;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

	if(this.x + this.deltaX >= 0
		&& this.x + this.deltaX <= 4
		&& this.y + this.deltaY >= 0
		&& this.y + this.deltaY <= 5)
	{
		this.x += this.deltaX;
		this.y += this.deltaY;
	}
	else {
		console.log("Cannot move: ", this.x, this.deltaX, this.y, this.deltaY);
	}

	this.deltaX = 0;
	this.deltaY = 0;

	if(this.y == 0)
	{
		score++;
		console.log("Score: ", score);
		this.x = 2;
		this.y = 5;
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

Player.prototype.handleInput = function(direction) {
	switch(direction)
	{
		case "left":
			this.deltaX--;
		break;
		case "right":
			this.deltaX++;
		break;
		case "up":
			this.deltaY--;
		break;
		case "down":
			this.deltaY++;
		break;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
var maxEnemies = Math.floor(Math.random() * 4) + 1;
allEnemies = [];
var score = 0;
for(var enemyCount = 1; enemyCount <= maxEnemies; ++enemyCount)
{
	allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

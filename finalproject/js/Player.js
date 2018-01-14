var Player = function(board) {
	var spawnPoint = board.GetSpawnPoint();
	Character.call(this, spawnPoint.column, spawnPoint.row, 101, 83, 'images/char-boy.png', board);
	this.deltaColumns = 0;
	this.deltaRows = 0;

	console.log("Player spawned @ ", this.column, ",", this.row);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	if(this.board.WithinBounds(this.row + this.deltaRows, this.column + this.deltaColumns))
	{
		this.column += this.deltaColumns;
		this.row += this.deltaRows;
	}
	else
	{
		console.log("Cannot make move: ", this.deltaColumns, this.deltaRows);
	}

	this.deltaColumns = 0;
	this.deltaRows = 0;
};

Player.prototype.handleInput = function(direction) {
	switch(direction)
	{
		case "left":
			this.deltaColumns--;
		break;
		case "right":
			this.deltaColumns++;
		break;
		case "up":
			this.deltaRows--;
		break;
		case "down":
			this.deltaRows++;
		break;
	}
};

Player.prototype.GetRow = function() {
	return this.row;
};

Player.prototype.Reset = function() {
	Character.prototype.Reset.call(this);
	this.deltaColumns = 0;
	this.deltaRows = 0;
};

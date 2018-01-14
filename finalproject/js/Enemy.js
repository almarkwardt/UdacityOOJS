var Enemy = function(board) {
	var startingColumn = -1.0;
	var potentialStartingRows = board.GetDangerRows();
	var startingRow = potentialStartingRows[Math.floor(Math.random() * potentialStartingRows.length)];
	Character.call(this, startingColumn, startingRow, 101, 83, 'images/enemy-bug.png', board);
	this.speedColumnsPerSecond = Math.floor(Math.random() * 3) + 1;
	this.homePositionOffset = 0.0;

	console.log("Created enemy @ ", this.column, ",", this.row, ", speed = ", this.speedColumnsPerSecond);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(timeDeltaSeconds) {
	this.homePositionOffset = (this.homePositionOffset + (this.speedColumnsPerSecond * timeDeltaSeconds))
	                          % (this.board.GetColumnCount() + 1);

	 this.column = -1.0 + this.homePositionOffset;
};

Enemy.prototype.Reset = function() {
	Character.prototype.Reset.call(this);
	this.homePositionOffset = 0.0;
};

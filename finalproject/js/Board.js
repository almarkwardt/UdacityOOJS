var Board = function() {
	this.rowCount = 8;
	this.columnCount = 5;
	this.rowHeight = 83;
	this.columnWidth = 101;
	// One goal row, one safe row, means (RowCount - 2) dangerous rows.
	this.dangerRowCount = (this.rowCount - 2);
	this.goalRowImage = 'images/water-block.png';
	this.dangerRowImage = 'images/stone-block.png';
	this.spawnRowImage = 'images/grass-block.png';
};

Board.prototype.WithinBounds = function(row, column) {
	return (row >= 0 && row < this.rowCount
		&& column >= 0 && column < this.columnCount);
};

Board.prototype.GetGoalRow = function() {
	return 0;
};

Board.prototype.GetDangerRows = function() {
	var rows = [];

	for(var row = 1; row <= this.dangerRowCount; ++row)
	{
		rows.push(row);
	}

	return rows;
};

Board.prototype.GetSpawnPoint = function() {
	return {
		row: (this.rowCount - 1),
		column: 0
	};
};

Board.prototype.Render = function(context) {
	// First, draw the goal zone at the top
	for(var column = 0; column < this.columnCount; ++column)
	{
		context.drawImage(Resources.get(this.goalRowImage), column * this.columnWidth, this.GetGoalRow() * this.rowHeight);
	}

	// Next, draw the dangerous rows (however many there are)
	for(var row = 1; row <= this.dangerRowCount; ++row)
	{
		for(var column = 0; column < this.columnCount; ++column)
		{
			context.drawImage(Resources.get(this.dangerRowImage), column * this.columnWidth, row * this.rowHeight);
		}
	}

	// Finally, draw the spawn zones (however many rows are left)
	for(var row = (this.dangerRowCount + 1); row < this.rowCount; ++row)
	{
		for(var column = 0; column < this.columnCount; ++column)
		{
			context.drawImage(Resources.get(this.spawnRowImage), column * this.columnWidth, row * this.rowHeight);
		}
	}
};

Board.prototype.GetRowCount = function() {
	return this.rowCount;
};

Board.prototype.GetColumnCount = function() {
	return this.columnCount;
};

Board.prototype.GetRowHeight = function() {
	return this.rowHeight;
};

Board.prototype.GetColumnWidth = function() {
	return this.columnWidth;
};

Board.prototype.GetSprites = function() {
	var sprites = [];
	sprites.push(this.goalRowImage);
	sprites.push(this.dangerRowImage);
	sprites.push(this.spawnRowImage);

	return sprites;
};

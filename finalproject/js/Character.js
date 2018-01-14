var Character = function(column, row, width, height, sprite, board) {
	this.column = column;
	this.row = row;
	this.originalColumn = column;
	this.originalRow = row;
	this.width = width;
	this.height = height;
	this.sprite = sprite;
	this.board = board;
};

Character.prototype.render = function(context) {
	context.drawImage(Resources.get(this.sprite), this.column * this.board.GetColumnWidth(), this.row * this.board.GetRowHeight());
};

Character.prototype.GetSprites = function() {
	var sprites = [];

	sprites.push(this.sprite);

	return sprites;
};

Character.prototype.IsOverlapping = function(otherChar) {
	var otherLeft = otherChar.column * otherChar.width;
	var otherRight = otherLeft + otherChar.width;

	var thisLeft = this.column * this.width;
	var thisRight = thisLeft + this.width;

	return (((otherLeft >= thisLeft && otherLeft <= thisRight)
	       || (otherRight >= thisLeft && otherRight <= thisRight))
	       &&
	       (otherChar.row == this.row));
};

Character.prototype.Reset = function() {
	this.row = this.originalRow;
	this.column = this.originalColumn;
};

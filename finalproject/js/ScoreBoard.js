var ScoreBoard = function() {
	this.playerScore = 0;
	this.enemyScore = 0;
};

ScoreBoard.prototype.Score1Player = function() {
	this.playerScore++;
};

ScoreBoard.prototype.Score1Enemy = function() {
	this.enemyScore++;
};

ScoreBoard.prototype.GetPlayerScore = function() {
	return this.playerScore;
};

ScoreBoard.prototype.GetEnemyScore = function() {
	return this.enemyScore;
};

ScoreBoard.prototype.Reset = function() {
	this.playerScore = 0;
	this.enemyScore = 0;
};

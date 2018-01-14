var ScoringRules = function(board, player, enemies) {
	this.gameboard = board;
	this.gamePlayer = player;
	this.gameEnemies = enemies;
};

ScoringRules.prototype.DidPlayerWin = function() {
	return (this.gamePlayer.GetRow() == this.gameboard.GetGoalRow());
};

ScoringRules.prototype.DidEnemiesWin = function() {
	var enemiesWon = false;

	var player = this.gamePlayer;
	this.gameEnemies.forEach(function(enemy) {
		if(enemy.IsOverlapping(player))
		{
			enemiesWon = true;
		}
		else
		{
			// Nothing special happened yet
		}
	});

	return enemiesWon;
};

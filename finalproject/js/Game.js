var Game = (function(global) {
	// We have a gameboard, which is the world where the game takes place.
	// We have a player, which is controlled by the user.
	// We have some number of enemies which roam the world.
	// There is a set of rules that determines whether the player wins
	// a game or if an enemy defeats the player.
	// There is a scoreboard that keeps track of the number of times the
	// player wins and the number of times they are defeated by an enemy.
	gameboard = new Board();
	player = new Player(gameboard);
	var maxEnemies = Math.floor(Math.random() * gameboard.GetDangerRows().length) + 1;
	allEnemies = [];
	for(var enemyCount = 1; enemyCount <= maxEnemies; ++enemyCount)
	{
		allEnemies.push(new Enemy(gameboard));
	}
	rules = new ScoringRules(gameboard, player, allEnemies);
	scoreboard = new ScoreBoard();

	// This code is borrowed from the original, provided code. It sets up
	// some variables that we use within the game.
	var doc = global.document,
		win = global.window,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		lastTime;

	// The canvas dimensions are determined by the board dimensions.
	canvas.width = gameboard.GetColumnCount() * gameboard.GetColumnWidth();
	canvas.height = gameboard.GetRowCount() * gameboard.GetRowHeight() + 100;
	doc.body.appendChild(canvas);

	// Wire up a callback for the arrow keys so the user can control
	// the player.
	document.addEventListener('keyup', function(e) {
		var allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};

		player.handleInput(allowedKeys[e.keyCode]);
	});

	// The game board, the player, and the enemies may all require sprites
	// to be loaded. They may or may not be shared. We ask each of these
	// things to tell us what sprites it needs, then we'll filter the list
	// so we don't ask for duplicates, and we'll ask the resource loader to
	// load them, then to call the init() function when it's ready.
	var spritesToLoad = gameboard.GetSprites();
	Array.prototype.push.apply(spritesToLoad, player.GetSprites());
	allEnemies.forEach(function(enemy) {
		Array.prototype.push.apply(spritesToLoad, enemy.GetSprites());
	});
	spritesToLoad = spritesToLoad.filter(function(item, index, inputArray) {
		return (inputArray.indexOf(item) == index);
	});

	Resources.load(spritesToLoad);
	Resources.onReady(init);

	// The init() function is the actual entrypoint for the game. Initialize
	// the current time so we can use it to create our time deltas for updating
	// and call main() for the first time.
	function init() {
		lastTime = Date.now();
		main();
	};

	// This is the main loop of the game. We'll figure out how long it's been
	// since we last updated the game state, ask the enemies and the player
	// objects to update themselves, evaluate if the player won or lost (or
	// did neither), and give everyone a chance to render themselves. When
	// we're done, we'll ask for the main() function to be called again whenever
	// the browser is ready to render another frame of the game.
	function main() {
		var now = Date.now();
		var timeDeltaSeconds = (now - lastTime) / 1000.0;
		lastTime = now;

		allEnemies.forEach(function(enemy) {
			enemy.update(timeDeltaSeconds);
		});
		player.update();

		if(rules.DidPlayerWin())
		{
			scoreboard.Score1Player();
			console.log("Player scored!");
			PrintScore();
			ResetGame();
		}
		else if(rules.DidEnemiesWin())
		{
			scoreboard.Score1Enemy();
			console.log("Enemy scored!");
			PrintScore();
			ResetGame();
		}
		else
		{
			// Ok, go ahead and render everything, the game is in progress
		}

		ctx.clearRect(0,0,canvas.width,canvas.height)

		gameboard.Render(ctx);

		allEnemies.forEach(function(enemy) {
			enemy.render(ctx);
		});

		player.render(ctx);

		win.requestAnimationFrame(main);
	};

	// The PrintScore function just logs the current scores.
	function PrintScore() {
		console.log("Score is now:");
		console.log("Enemy:", scoreboard.GetEnemyScore());
		console.log("Player:", scoreboard.GetPlayerScore());
	};

	// The ResetGame function resets all of the moving entities (player
	// and enemies) to their initial positions.
	function ResetGame() {
		player.Reset();
		allEnemies.forEach(function(enemy) {
			enemy.Reset();
		});
	};

})(this);

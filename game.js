var mainState = ( function () {
    // var you;
    var cursor;
    refinerySpawnCooldown = 100;
    timeRemainingForRefinerySpawn = refinerySpawnCooldown;

    var preload = function () {
	game.load.spritesheet('iceberg', 'img/iceberg.png', 70,70);
	game.load.spritesheet('sun', 'img/sun.png', 50, 50);
	game.load.spritesheet('glow', 'img/glow2.png', 91, 91);
	game.load.spritesheet('refinery', 'img/refinery.png', 100, 100);
	game.load.spritesheet('smog', 'img/smog.png', 200, 150);
	game.load.image('water', 'img/water.png');
    };

    var create = function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.tileSprite(0,0, 800,600, 'water', 0);
	game.stage.backgroundColor = '#99f';
	cursor = game.input.keyboard.createCursorKeys();
	cursor.attack = game.input.keyboard.addKey(Phaser.Keyboard.A);

	you = new Iceberg(game, cursor);
	sun = new Sun(game, you);
	you.sun = sun;
    };

    var update = function () {
	// sun.update();
	you.update();
	simulateDepth();

	timeRemainingForRefinerySpawn--;
	if (timeRemainingForRefinerySpawn <= 0) {
	    timeRemainingForRefinerySpawn = refinerySpawnCooldown;
	    spawnRefinery(game, you);
	}

	for (var i=0; i<corporation.length; i++)
	    corporation[i].update();

    };

    return { preload : preload,
	     create : create,
	     update : update };

})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');

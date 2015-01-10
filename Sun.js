var Sun = function (game, player) {
    this.speed = 90;
    this.strength = 20;

    this.fireball = game.add.sprite(0,0, 'sun');
    this.fireball.anchor.setTo(0.5,0.6);
    this.fireball.animations.add('mad', [0,1,2,1], 8, true);
    this.target = player;

    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY,
				  'glow');
    this.sprite.anchor.setTo(0.5,0.5);
    this.sprite.animations.add('glow', [0,1,2,3,4], 16, true);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.addChild(this.fireball);

    this.sprite.bringToTop();
    this.fireball.bringToTop();
    this.sprite.animations.play('glow');
    this.fireball.animations.play('mad');
    this.sprite.body.maxVelocity.setTo(this.speed, this.speed);
    addToLayer(this.sprite, GALAXY);
};

Sun.prototype.update = function () {
    var direction = Dot.minus([this.target.sprite.position.x,
			       this.target.sprite.position.y],
			      [this.sprite.position.x,
			       this.sprite.position.y]);
    direction = Dot.unitVector(direction);
    this.sprite.body.velocity.x += direction[X]*this.strength;
    this.sprite.body.velocity.y += direction[Y]*this.strength;
};

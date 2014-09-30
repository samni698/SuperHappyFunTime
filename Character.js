Character = function(gameState) {
	this.gameState = gameState;
};

Character.prototype = {

	preload: function() {
		this.gameState.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);

		this.GRAVITY = 800;
		this.ACCELERATION = 50;
		this.JUMP_ACCELERATION = -350;
		this.MAX_SPEED = 500;
		this.hookShot = new HookShot(this.gameState, this);
		this.hookShot.preload();
	},

	/**
	 * The initial position of the Character in world coordinates.
	 */
	create: function(x, y) {
		this.resetData();

		this.sprite = this.gameState.add.sprite(x, y, 'character');
		this.gameState.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = this.GRAVITY;
		this.sprite.anchor.setTo(0.5, 0.5);

		// Define the animations
		this.sprite.animations.add('left', [0, 1, 2, 3], 15);
		this.sprite.animations.add('right', [5, 6, 7, 4], 15);
		this.sprite.animations.add('jumpLeft', [2], 10);
		this.sprite.animations.add('jumpRight', [7], 10);
		this.sprite.animations.add('landLeft', [1], 10);
		this.sprite.animations.add('landRight', [6], 10);

		this.cursors = this.gameState.input.keyboard.createCursorKeys();

		this.gameState.camera.follow(this.sprite);

		this.sprite.checkWorldBounds = true;
		this.sprite.events.onOutOfBounds.add(this.characterOutsideWorld);

		this.hookShot.create();
	},

	update: function() {
		// Do physics-y things first
		this.gameState.physics.arcade.collide(this.sprite, this.gameState.platforms);
		this.hookShot.update();

		// Walk left and right
		var accel = 0;
		if (this.cursors.right.isDown){
			accel = this.ACCELERATION;
			this.sprite.animations.play('right');
			this.turnedRight = true;
		}
		else if (this.cursors.left.isDown){
			accel = -this.ACCELERATION;
			this.sprite.animations.play('left');
			this.turnedRight = false;
		}

		if(this.sprite.body.touching.down)
			this.sprite.body.velocity.x += accel;
		else
			this.sprite.body.velocity.x += accel / 2;

		// Enforce the max speed
		if(this.sprite.body.velocity.x >= this.MAX_SPEED)
			this.sprite.body.velocity.x = this.MAX_SPEED;
		else if(this.sprite.body.velocity.x <= -this.MAX_SPEED)
			this.sprite.body.velocity.x = -this.MAX_SPEED;
		if(this.sprite.body.velocity.y <= -this.MAX_SPEED)
			this.sprite.body.velocity.y = -this.MAX_SPEED;

		if(this.sprite.body.touching.down){
			if(isNaN(this.sprite.body.velocity.x))
				this.sprite.body.velocity.x = 0;

			// Stop bobby if he's on the ground and the user doesn't want him to move.
			if(! this.cursors.left.isDown && ! this.cursors.right.isDown)
				this.sprite.body.velocity.x -= this.sprite.body.velocity.x / 5;

			// Landing animation, note that this must be before the jump function.
			if(this.jumping){
				this.jumping = false;
				if(this.sprite.body.velocity.x > 0)
					this.sprite.animations.play('landRight');
				else
					this.sprite.animations.play('landLeft');
			}

			// Jump bobby, jump!
			if (this.cursors.up.isDown) {
				this.jumping = true;
				this.turnedWhileJumping = false;
				this.sprite.body.velocity.y = this.JUMP_ACCELERATION;
				if(this.sprite.body.velocity.x > 0)
					this.sprite.animations.play('jumpRight');
				else
					this.sprite.animations.play('jumpLeft');
			}
		}

		// Fire ze hookshot!
		if(game.input.activePointer.isDown)
			this.hookShot.shoot();
	},

	render: function() {
	},

	resetData: function() {
		// Jag är osäker på om vi vill sätta sprite osv. till null här. Gör inte det att bobbys sprite försvinner när vi resattar?
		this.sprite = null;
		this.cursors = null;
		this.turnedRight = false;
		this.jumping = true;

	},

	characterOutsideWorld: function() {
		game.state.restart(game.state.current);
	}

};

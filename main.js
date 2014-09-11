window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

        function preload () {
		game.load.image('background', 'assets/background.png');
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('character', 'assets/character_sprite_sheet.png', 64, 79);
        }

	var platforms;

        function create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0, 0, 'background');

		platforms = game.add.group();

		platforms.enableBody = true;

		var floor = platforms.create(0, game.world.height - 64, 'platform');
		
		floor.scale.setTo(2, 2);

		floor.body.immovable = true;

		character = game.add.sprite(32, game.world.height - 150, 'character');

		game.physics.arcade.enable(character);

		character.body.bounce.y = 0.2;
		character.body.gravity.y = 300;
		character.body.collideWorldBounds = true;

		character.animations.add('right', [0, 1, 2, 3], 10);
        }

	function update() {

	}
};

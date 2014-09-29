Level1 = function() {};

Level1.prototype = new Level(1600, 800);

Level1.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 800, 64);

	this.addPlatform(900, this.world.height - 400, 300, 40);

	this.addPlatform(1200, this.world.height - 64, 400, 64);
};

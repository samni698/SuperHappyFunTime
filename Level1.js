Level1 = function() {};

Level1.prototype = new Level(1600, 600);

Level1.prototype.loadLevelObjects = function() {

	this.addPlatform(0, this.world.height - 64, 800, 64);

	this.addText(100, this.world.height - 180, "Press left and right arrows to move");
};
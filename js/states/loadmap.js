
class Map {
	constructor(obj) {
		this.game = obj;
	}

	loadMap__(level) {
		game.load.image("outside", "map/tiles/outside.png");
  		game.load.tilemapTiledJSON("map", "map/levels/"+level+".json");
	}
}



function loadMap(game) {
	game.load.image("outside", "map/tiles/outside.png");
  	game.load.tilemapTiledJSON("map", "map/levels/level1.json");

}

function createLayers(game, layers) {
	console.log(layers);

	map = game.make.tilemap({ key: "map" });
	const tileset = map.addTilesetImage("outside", "outside");

	let new_layers = {};
	for (let i=0; i < layers.length; i++){
		let layer = map.createStaticLayer(layers[i], tileset, 0, 0);
		new_layers[layers[i]] = layer;
	}
	return new_layers;
}

function setCollision(game, layers){



}
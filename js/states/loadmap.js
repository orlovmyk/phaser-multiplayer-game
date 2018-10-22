
class Map {
	constructor(obj) {
		this.game = obj;
		this.layers;
		this.tilest;
		this.tilemap;
	}

	loadMap(level, tileset) {
		this.game.load.image(tileset, "map/tiles/"+tileset+".png");
  		this.game.load.tilemapTiledJSON("map", "map/levels/"+level+".json");
	}

	createLayers(layers, tileset, collidelayers) {
		//tileset 64x64 big .png file
		this.tilemap = this.game.make.tilemap({ key: "map" });
		this.tileset = this.tilemap.addTilesetImage(tileset, tileset);

		//layers existing 
		let new_layers = {};
		for (let i=0; i < layers.length; i++){
			let layer = this.tilemap.createStaticLayer(layers[i], tileset, 0, 0);
			new_layers[layers[i]] = layer;
		}

		//layers colliding
		for (let i=0; i < collidelayers.length; i++){
			new_layers[collidelayers[i]].setCollisionByProperty({ collides: true });
		}

		this.layers = new_layers;
	}

	setCollision(obj, layer){
		this.game.physics.add.collider(obj, this.layers[layer]);
	}

	debugCollision(layer){
		this.debugGraphics = this.game.add.graphics().setAlpha(0.75);
		this.layers[layer].renderDebug(this.debugGraphics, {
		    tileColor: null, // Color of non-colliding tiles
		    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  		});
	}

	spawnObjects(){
		console.log(this.tilemap.objects);

		//Tiled names of objects
		let g = this.tilemap.createFromObjects("spawns", "SpawnPoint", {key:"player"});
		for (let i=0;i<g.length;i++){
			g[i].anims.load('walk').play('walk');
		}

		console.log(g);
	}
}

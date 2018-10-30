class Map {
	constructor(obj) {
		this.scene = obj;
		this.layers;
		this.tilest;
		this.tilemap;
	}

	loadMap(level, tileset) {
		this.scene.load.image(tileset, "map/tiles/"+tileset+".png");
  		this.scene.load.tilemapTiledJSON("map", "map/levels/"+level+".json");
	}

	createLayers(layers, tileset, collidelayers) {
		//tileset 64x64 big .png file
		this.tilemap = this.scene.make.tilemap({ key: "map" });
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
			new_layers[collidelayers[i]].visible = false;
		}

		this.layers = new_layers;
	}

	setCollision(obj, layer){
		this.scene.physics.add.collider(obj, this.layers[layer]);
	}

	debugCollision(layer){
		this.debugGraphics = this.scene.add.graphics().setAlpha(0.75);
		this.layers[layer].renderDebug(this.debugGraphics, {
		    tileColor: null, // Color of non-colliding tiles
		    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  		});
	}

	spawnMobs(group, layer){
		let spawn_layer = this.tilemap.getObjectLayer(layer);
		let new_mob;

		for (let i=0; i < spawn_layer.objects.length; i++){
			new_mob = new Mob(this.scene, spawn_layer.objects[i].x, spawn_layer.objects[i].y);
			group.add(new_mob.sprite);
		}
	}
}

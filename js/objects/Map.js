class Tilemap {
	static preload(scene, level, tileset) {
		scene.load.image(tileset, "map/tiles/"+tileset+".png");
  		scene.load.tilemapTiledJSON("map", "map/levels/"+level+".json");
	}

	constructor(obj) {
		this.scene = obj;
		this.layers = ["collision_layer","bot","mid"];

		this.layer_top = "top";

		this.layerCollide = "collision_layer";
		this.layerMob = "mob";
		this.layerPolygon = "polygon";
		this.layerDialogePolygon = "dialogues";
		this.layerNPC = "npc";

		this.tileset = LVL_NAME;
		this.tilemap;
		
		this.objects;
		this.polygons = [];
		this.dialogue_polygons = [];

		this.MobSpawn;
	}

	createLayers() {
		//tileset 64x64 big .png file
		this.tilemap = this.scene.make.tilemap({ key: "map" });
		this.tileset = this.tilemap.addTilesetImage(this.tileset, this.tileset);

		//layers existing 
		let new_layers = {};
		for (let i=0; i < this.layers.length; i++){
			let layer = this.tilemap.createStaticLayer(this.layers[i], this.tileset, 0, 0);
			new_layers[this.layers[i]] = layer;
		}

		new_layers[this.layerCollide].setCollisionByProperty({ collides: true });
		new_layers[this.layerCollide].visible = false;


		this.layers = new_layers;

		let spawn_layer = this.tilemap.getObjectLayer(this.layerMob);
		this.objects = spawn_layer.objects;

		//Converting Tiled polygons to Phaser polygons and add them to array
		//this.polygons = [];
		let polygon_layer = this.tilemap.getObjectLayer(this.layerPolygon);
		for (let i=0; i<polygon_layer.objects.length; i++){
			let temp = polygon_layer.objects[i];
			temp.polygon.forEach((item)=>{
				item.x += temp.x;
				item.y += temp.y;
			})

			let new_polygon = new Phaser.Geom.Polygon(polygon_layer.objects[i].polygon);
			new_polygon.objects = [];
			new_polygon.isActive = true;
			this.polygons.push(new_polygon);
		}
		this.addObjectsToPolygons();

		//this.dialogue_polygons = [];
		polygon_layer = this.tilemap.getObjectLayer(this.layerDialogePolygon);
		for (let i=0; i<polygon_layer.objects.length; i++){
			let temp = polygon_layer.objects[i];
			temp.polygon.forEach((item)=>{
				item.x += temp.x;
				item.y += temp.y;
			})

			let new_polygon = new Phaser.Geom.Polygon(polygon_layer.objects[i].polygon);
			new_polygon.file = temp.properties[0].value;
			new_polygon.isActive = true;
			this.dialogue_polygons.push(new_polygon);
		}		
	}

	createTopLayer(){
		let layer = this.tilemap.createStaticLayer(this.layer_top, this.tileset, 0, 0);
	}

	addObjectsToPolygons(){
		this.polygons.forEach((polygon)=> {
			this.objects.forEach((object)=> {
				if (polygon.contains(object.x, object.y)) polygon.objects.push(object);
			})
		})
	}

	updatePolygons(){
		this.polygons.forEach((polygon)=> {
			if (polygon.isActive){
				if (polygon.contains(player.x, player.y)){
					polygon.isActive = false;
					polygon.objects.forEach((object)=> {
						this.addMobByPoint(object);
					})
				}
			}
		})

		this.dialogue_polygons.forEach((polygon)=> {
			if (polygon.isActive){
				if (polygon.contains(player.x, player.y)){
					polygon.isActive = false;
					UI.handleDialogue(dialogue_data[polygon.file]);
				}
			}
		})

	}

	setCollision(obj){
		this.scene.physics.add.collider(obj, this.layers[this.layerCollide]);
	}

	debugCollision(){
		let debugGraphics = this.scene.add.graphics().setAlpha(0.75);
		this.layers[this.layerCollide].renderDebug(debugGraphics, {
		    tileColor: null, // Color of non-colliding tiles
		    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  		});
	}

	//add to group by name in tiled <objects>mob_spawn layer
	addMobByPoint(point){	
		switch (point.name) {
			case "Bat":
				mobs.add(new Bat(this.scene, point.x, point.y));
				break;

			case "Skeleton":
				mobs.add(new Bat(this.scene, point.x, point.y));
				break;
		}
	}

}

let layers = ["bot","mid","top"];
let layersColliding = ["bot"];

let UI;
let camera;
let map;
let player;
let mob;
let mobs;

class SceneGame extends Phaser.Scene{
	constructor(){
		super(
			{
				key: "Game",
				active: true
			}
		);
	};

	preload(){	
		Player.preload(this);
		Mob.preload(this);

		map = new Map(this);
  		map.loadMap("level1", "level1");
	};

	create(){

		//CUSTOM GAME OBJECT https://labs.phaser.io/view.html?src=src\game%20objects\images\custom%20game%20object.js
		UI = this.scene.get('Interface');

		map.createLayers(layers, "level1", layersColliding);
  		map.debugCollision("bot");

  		player = new Player(this, 300, 300);
		player.createCursors(UI.joystick);
		player.healthbar = UI.healthbar;

		mob = new Mob(this, 400, 300);
		
		mobs = this.physics.add.group();
		mobs.add(mob.sprite);

		camera = this.cameras.main;
		camera.startFollow(player.sprite, true, 0.4, 0.4);


		UI.events.on("pressA", function(){
			player.attack();
		});

		UI.events.on("pressB", function(){

		});

		UI.events.on("pressC", function(){

		});

		//UI.healthbar.damage(10);
	
		map.setCollision(player.sprite, "bot");

		this.physics.add.collider(player.sprite, mobs, function(){
			player.healthbar.damage(1);

		});

		//player.sprite.setBounce(1);
		//mob.sprite.setBounce(1);
		//mob.sprite.setMass(10);
	};

	update(time, delta){
		player.update(time, delta);

		//this.physics.moveToObject(mob.sprite, player.sprite, 50);
	};

}
let layers = ["bot","mid","top"];
let layersColliding = ["bot"];

let UI;
let camera;
let map;
let player;
let mob;

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
		UI = this.scene.get('Interface');

		map.createLayers(layers, "level1", layersColliding);
  		map.debugCollision("bot");

  		player = new Player(this, 300, 300);
		player.createCursors(UI.joystick);
		player.healthbar = UI.healthbar;

		mob = new Mob(this, 400, 300);
		
		camera = this.cameras.main;
		camera.startFollow(player.sprite, true, 0.5, 0.5);


		UI.events.on("pressA", function(){
			
		});

		UI.events.on("pressB", function(){

		});

		UI.events.on("pressC", function(){

		});

		//UI.healthbar.damage(10);
	
		map.setCollision(player.sprite, "bot");

		this.physics.add.collider(player.sprite, mob.sprite, function(){
			player.healthbar.damage(1);

		});

		//player.sprite.setBounce(1);
		//mob.sprite.setBounce(1);
		//mob.sprite.setMass(10);
	};

	update(){
		player.update();

		this.physics.moveToObject(mob.sprite, player.sprite, 50);
	};

}
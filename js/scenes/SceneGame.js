let LVL_NAME = "level1";

let UI;
let camera;
let map;
let player;
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
		Bat.preload(this);
  		Tilemap.preload(this, LVL_NAME, LVL_NAME);
	};

	create(){
		UI = this.scene.get('Interface');

		// --Tilemap--
		map = new Tilemap(this);
		map.createLayers();
  		map.debugCollision();

  		// --Player--
  		player = new Player(this, 150, 60);
		
  		//creating for joystick (UI.joystick);
		player.createCursors(UI.keyboard);
		player.healthbar = UI.healthbar;

		// --Mobs--
		mobs = this.physics.add.group();
		Bat.createAnims(this);
		//map.addMobByName(mobs, "Bat");

		
		// --Camera--
		camera = this.cameras.main;
		camera.startFollow(player.sprite, true, 0.4, 0.4);

		this.defineColliders();
		this.defineButtons();
	};

	update(time, delta){
		map.updatePolygons();

		player.update(time, delta);
		mobs.children.each((mob) =>{
			mob.update();
		}, this)

		//this.physics.moveToObject(mob.sprite, player.sprite, 50);
	};

	defineButtons(){	
		UI.events.on("pressA",() =>{
			player.attack();
		});

		UI.events.on("pressB",() =>{
			UI.toggleVisible();
			camera.zoomTo(2);
			camera.once("camerazoomcomplete", () => {
				UI.dialogue.toggleVisible();
		    });

		});

		UI.events.on("pressC",() =>{

		});
	}

	defineColliders(){
		map.setCollision(player.sprite);
		map.setCollision(mobs);

		//add collision between each other mobs
		this.physics.add.collider(mobs, mobs);

		this.physics.add.collider(player.sprite, mobs, () =>{
			player.healthbar.damage(1);
		});
	}
}

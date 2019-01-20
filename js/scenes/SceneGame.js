let LVL_NAME = "level1";

let UI;
let camera;
let camera_default_zoom = 1.5;
let map;
let player;
let mobs;
let bullets;

let dialogue_data;

let DEBUG_FLAG = true;


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
		this.load.json('dialogues_data1', 'dialogues/dialogues_data1.json');
		this.load.image('bullet', 'sprites/bullet.png');
		Player.preload(this);
		
		Bat.preload(this);
  		Sorcerer.preload(this);
  		Eye_monster.preload(this);
  		Summoner.preload(this);
  		Barmen.preload(this);

  		Tilemap.preload(this, LVL_NAME, LVL_NAME);
	};

	create(){
		UI = this.scene.get('Interface');

		// --Tilemap--
		map = new Tilemap(this);
		map.createLayers();
  		map.debugCollision();

  		// --Player--
  		player = new Player(this, 730, 480);
		player.createCursors(UI.keyboard, UI.joystick);
		player.createHealthBar(UI.healthbar);
		player.createAnims();

		// --Mobs--
		mobs = this.physics.add.group();
		Bat.createAnims(this);
		Sorcerer.createAnims(this);
		Eye_monster.createAnims(this);
		Summoner.createAnims(this);

		// --Camera--
		camera = this.cameras.main;
		camera.startFollow(player, true, 0.4, 0.4);
		camera.zoomTo(camera_default_zoom);

		// --Bullets--
		bullets = this.add.group({
        	classType: Bullet,
        	maxSize: 50,
        	runChildUpdate: true
		});

		Barmen.createAnims(this);
		new Barmen(this, 3632, 413);

		this.defineColliders();
		this.defineButtons();

		dialogue_data = UI.cache.json.get("dialogues_data1");

		map.createTopLayer();
	};

	update(time, delta){
		map.updatePolygons();

		player.update(time, delta);
		mobs.children.each((mob) =>{
			mob.update(time);
		}, this)

		DrawTarget();
		//this.physics.moveToObject(mob.sprite, player, 50);
	};

	defineButtons(){	
		UI.events.on("pressA",() =>{
			player.attack();
		});

		UI.events.on("pressB",() =>{

		});

		UI.events.on("pressC",() =>{
		
		});
	}

	defineColliders(){
		map.setCollision(player);
		map.setCollision(mobs);

		//add collision between each other mobs
		this.physics.add.collider(mobs, mobs);
		this.physics.add.collider(player.hitbox, mobs, (ob, mob) =>{
 			if (player.isAttack) {
 				MobBounce(ob, mob);
 				mob.damage(player.attack_damage);
 				player.canMove = true;
 			}
		});

		this.physics.add.collider(player, mobs, (ob, mob) =>{
			if (!player.isAttack){
				PlayerBounce(ob, mob);
				player.damage(mob.attack_damage);
			};
		});

		this.physics.add.collider(player, bullets, (ob, bullet) =>{
			PlayerBounce(ob, bullet);
			player.damage(bullet.damage);
		});
	}
}

function PlayerBounce(ob, mob){
	let angle = (Phaser.Math.Angle.Between(player.x, player.y, mob.x, mob.y)*180)/Math.PI-180;
	let velocity = new Phaser.Math.Vector2();
    velocity.setToPolar(Phaser.Math.DegToRad(angle), player.bouncePower);

    player.canMoveStartTimerBounce = true;
    player.setVelocity(velocity.x, velocity.y);
    player.setTint(0xf00000);
}

function MobBounce(ob, mob){
	let angle = (Phaser.Math.Angle.Between(player.x, player.y, mob.x, mob.y)*180)/Math.PI-180;
	let velocity = new Phaser.Math.Vector2();
    velocity.setToPolar(Phaser.Math.DegToRad(angle), -mob.bouncePower);

    mob.bounceStart = true;
    mob.setVelocity(velocity.x, velocity.y);
    mob.setTint(0xf00000);
}

function ResetGame(){
	camera.shake(100, 0.05);
    camera.fade(255, 0, 0, 0);

    timedEvent = UI.time.delayedCall(1000, ()=>{
	    let death = UI.physics.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2, 'death');
		death.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    }, [], this);	

    timedEvent = UI.time.delayedCall(3000, ()=>{
		Game.scene.scenes[2].scene.restart();
		Game.scene.scenes[1].scene.restart();
    }, [], this);	
}


function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
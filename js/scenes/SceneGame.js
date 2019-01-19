let LVL_NAME = "level1";

let UI;
let camera;
let map;
let player;
let mobs;

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
  		player = new Player(this, 730, 450);
		player.createCursors(UI.keyboard, UI.joystick);
		player.createHealthBar(UI.healthbar);
		player.createAnims();

		// --Mobs--
		mobs = this.physics.add.group();
		Bat.createAnims(this);

		// --Camera--
		camera = this.cameras.main;
		camera.startFollow(player, true, 0.4, 0.4)

		this.defineColliders();
		this.defineButtons();
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
			//ob1.setTint(0xf00000);
			//player.healthbar.damage(1);
			if (!player.isAttack){
				PlayerBounce(ob, mob);
				player.damage(mob.attack_damage);
			};
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

    timedEvent = UI.time.delayedCall(3000, ()=>{

		Game.scene.scenes[2].scene.restart();
		Game.scene.scenes[1].scene.restart();
    }, [], this);	
}

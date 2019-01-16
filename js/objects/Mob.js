class Bat extends Phaser.Physics.Arcade.Sprite{
	static preload(game){
		game.load.multiatlas("bat", "sprites/bat.json", "sprites");
	}

	static createAnims(scene){
		let frames = scene.anims.generateFrameNames("bat", {
                        start: 0, 
                        end: 4,
                        prefix: "bat_fly_", 
                        suffix: '.png'
                     });
	
		scene.anims.create({ 
			key: "bat_fly", 
			frames: frames, 
			frameRate: 10, 
			repeat: -1, 
			yoyo:true
		});
	}

	damage(amount){
		this.health -= amount;
	}

	constructor(scene, x, y){
		super(scene, x, y, "bat", "bat_fly_0.png");
		
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);

		this.body.setSize(25, 25);
		this.anims.play("bat_fly");
		this.health = 20;

		this.isBounced = false;
		this.bounceStart = false;
		this.bouncePower = 500;
		this.bounceTimer = 0;
		this.bounceTime = 1000;

		this.attack_damage = 10;

		this.setMaxVelocity(30);
	}

	update(time){
		if (this.bounceStart){
			this.bounceStart = false;
			this.isBounced = true;
			this.bounceTimer = time + this.bounceTime;
		}

		if (time > this.bounceTimer){
			this.isBounced = false;
			this.clearTint();
		}

		if (!this.isBounced){
			PlayerFollow(this, 80);			
		}

		if (this.health < 0) this.destroy();
	}
}


function PlayerFollow(sprite, speed){
	let angle = (Phaser.Math.Angle.Between(player.x, player.y, sprite.x, sprite.y)*180)/Math.PI-180;
	let velocity = new Phaser.Math.Vector2();
    velocity.setToPolar(Phaser.Math.DegToRad(angle), speed);
    sprite.setVelocity(velocity.x, velocity.y);
}

function ClosestMobToPlayer(){
	let closest_mob = null;
	let distance = 999;

	mobs.children.each((mob) =>{
			let temp_dist = Phaser.Math.Distance.Between(mob.x, mob.y, player.x, player.y);
			if (temp_dist < distance){
				distance = temp_dist;
				closest_mob = mob;
			}
		}, this)
	return closest_mob;
}

function DrawTarget(){
	let mob = ClosestMobToPlayer();

	if (mob == null) {
		player.circle.visible = false;
	}

	else {
		if(!player.circle.visible) player.circle.visible = true;
		player.circle.x = mob.x;
		player.circle.y = mob.y;
	}
 }
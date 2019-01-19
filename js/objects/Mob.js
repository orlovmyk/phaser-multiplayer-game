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
		this.health = 40;

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


class Sorcerer extends Phaser.Physics.Arcade.Sprite{
	static preload(game){
		game.load.multiatlas("sorcerer", "sprites/sorcerer.json", "sprites");
	}

	static createAnims(scene){
		let frames = scene.anims.generateFrameNames("sorcerer", {
                        start: 0, 
                        end: 9,
                        prefix: "sorcerer attack_Animation 1_", 
                        suffix: '.png'
                     });
	
		scene.anims.create({ 
			key: "sorcerer_attack", 
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
		super(scene, x, y, "sorcerer", "sorcerer attack_Animation 1_0.png");
		
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);

		this.body.setSize(25, 35);
		this.anims.play("sorcerer_attack");
		this.health = 70;

		this.isBounced = false;
		this.bounceStart = false;
		this.bouncePower = 500;
		this.bounceTimer = 0;
		this.bounceTime = 1000;

		this.summonTimer = 0;
		this.summonTime = 5000;

		this.attack_damage = 20;

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

		if (this.summonTimer < time){
			this.summonTimer = time + this.summonTime;
			mobs.add(new Bat(this.scene, this.x + randomInteger(0, 50), this.y + + randomInteger(0, 50)));
		}

		if (!this.isBounced){
			PlayerFollow(this, 120);			
		}

		if (this.health < 0) this.destroy();
	}
}

class Eye_monster extends Phaser.Physics.Arcade.Sprite{
	static preload(game){
		game.load.multiatlas("eye_monster", "sprites/eye_monster.json", "sprites");
	}

	static createAnims(scene){
		let frames = scene.anims.generateFrameNames("eye_monster", {
                        start: 0, 
                        end: 3,
                        prefix: "eye_monster_", 
                        suffix: '.png'
                     });

		scene.anims.create({ 
			key: "eye_monster_attack", 
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
		super(scene, x, y, "eye_monster", "eye_monster_0.png");
		
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);

		this.body.setSize(25, 35);
		this.anims.play("eye_monster_attack");
		this.health = 70;

		this.isBounced = false;
		this.bounceStart = false;
		this.bouncePower = 500;
		this.bounceTimer = 0;
		this.bounceTime = 1000;

		this.attack_damage = 5;

		this.setMaxVelocity(70);
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
			PlayerFollow(this, 180);			
		}

		if (this.health < 0) this.destroy();
	}
}


class Summoner extends Phaser.Physics.Arcade.Sprite{
	static preload(game){
		game.load.multiatlas("summoner", "sprites/summoner.json", "sprites");
	}

	static createAnims(scene){
		let frames = scene.anims.generateFrameNames("summoner", {
                        start: 0, 
                        end: 9,
                        prefix: "summoner_", 
                        suffix: '.png'
                     });

		scene.anims.create({ 
			key: "summoner_attack", 
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
		super(scene, x, y, "summoner", "summoner_0.png");
		
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);

		this.body.setSize(25, 35);
		this.anims.play("summoner_attack");
		this.health = 70;

		this.isBounced = false;
		this.bounceStart = false;
		this.bouncePower = 500;
		this.bounceTimer = 0;
		this.bounceTime = 1000;

		this.fireTimer = 0;
		this.fireDelay = 1200;

		this.attack_damage = 5;

		this.attack_bullet_damage = 5;

		this.setMaxVelocity(70);
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

		if (time > this.fireTimer && !this.isBounced){
			this.fireTimer = time + this.fireDelay;
			bullets.get().fire(this.x, this.y);
		}

		if (!this.isBounced){
			PlayerFollow(this, 180);			
		}

		if (this.health < 0) this.destroy();
	}
}

let Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Sprite,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bullet');
            scene.physics.add.existing(this);

            this.incX = 0;
            this.incY = 0;
            this.damage = 5;

            this.speed = Phaser.Math.GetSpeed(200, 1);
        },

        fire: function (x, y)
        {
            this.setPosition(x, y);

            var angle = Phaser.Math.Angle.Between(player.x, player.y, x, y);

            this.setRotation(angle);

            this.incX = Math.cos(angle);
            this.incY = Math.sin(angle);

            this.lifespan = 2000;

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
        	this.lifespan -= delta;

            this.x -= this.incX * (this.speed * delta);
            this.y -= this.incY * (this.speed * delta);

           	if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

});




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
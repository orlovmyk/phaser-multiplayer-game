class Mob{
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
	
		scene.anims.create({ key: "bat_fly", frames: frames, frameRate: 10, repeat: -1, yoyo:true});
	}

	constructor(scene, x, y){
		this.scene = scene;
		this.sprite = this.scene.physics.add.sprite(x, y, "bat", "bat_fly_0.png");
		this.sprite.body.setSize(25, 25);

		this.sprite.update = function(){		
			//PlayerFollow(this, 80);
		}

		this.sprite.anims.play("bat_fly");
	}

	follow(){
		this.sprite.setVelocityX();
		this.sprite.setVelocityY();

	}
}




function PlayerFollow(sprite, speed){
	let angle = (Phaser.Math.Angle.Between(player.sprite.x, player.sprite.y, sprite.x, sprite.y)*180)/Math.PI-180;
	
	let velocity = new Phaser.Math.Vector2();
    PHYSICS.velocityFromAngle(angle, speed, velocity);

    sprite.setVelocity(velocity.x, velocity.y);
}
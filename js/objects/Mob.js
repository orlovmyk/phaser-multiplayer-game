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

	constructor(scene, x, y){
		super(scene, x, y, "bat", "bat_fly_0.png");
		
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);

		this.body.setSize(25, 25);
		this.anims.play("bat_fly");
		this.health = 20;
	}

	update(){
		PlayerHitboxBounce(this, 80);
		if (this.health < 0) this.destroy();
	}
}


function PlayerFollow(sprite, speed){
	let angle = (Phaser.Math.Angle.Between(player.x, player.y, sprite.x, sprite.y)*180)/Math.PI-180;
	let velocity = new Phaser.Math.Vector2();
    velocity.setToPolar(Phaser.Math.DegToRad(angle), speed);
    sprite.setVelocity(velocity.x, velocity.y);
}

function PlayerHitboxBounce(sprite, speed){
	let angle = (Phaser.Math.Angle.Between(player.x, player.y, sprite.x, sprite.y)*180)/Math.PI-180;
	let velocity = new Phaser.Math.Vector2();
    velocity.setToPolar(Phaser.Math.DegToRad(angle), -speed);
    sprite.setVelocity(velocity.x, velocity.y);
}
class Player {
	static preload(game) {
		game.load.spritesheet(
		      "player",
		      "sprites/player.png",
		      {
		        frameWidth: 40,
		        frameHeight: 40
		      }
		);

		game.load.image("empty_image", "sprites/empty_image.png");
	}

	constructor(scene, x, y){
		this.scene = scene;
		this.cursors;

		this.sprite = this.scene.physics.add.sprite(x, y, 'player');
		this.sprite.body.setSize(20, 10).setOffset(10, 30);

		this.hitbox = this.scene.physics.add.sprite(x, y, 'empty_image');
		this.hitbox.body.setSize(18, 35);

		this.velocity = 400;
	} 

	destroy(){
		this.sprite.destroy();
		this.hitbox.destroy();
	}

	createCursors(obj){
		this.cursors = obj.createCursorKeys();
	}

	loadAnims(){
		console.log(this.game.anims.generateFrameNumbers('player'));
		let framesArr = this.game.anims.generateFrameNumbers('player');

		this.game.anims.create({
	        key: 'idle-right',
	        frames: framesArr.slice(0,4),
	        frameRate: 10,
	        yoyo: false,
	        repeat: -1
		});

		this.game.anims.create({
	        key: 'idle-left',
	        frames: framesArr.slice(4,8),
	        frameRate: 10,
	        yoyo: false,
	        repeat: -1
		});

		this.game.anims.create({
	        key: 'walk-right',
	        frames: framesArr.slice(8,13),
	        frameRate: 10,
	        yoyo: false,
	        repeat: -1
		});

		this.game.anims.create({
	        key: 'walk-left',
	        frames: framesArr.slice(13,19),
	        frameRate: 10,
	        yoyo: false,
	        repeat: -1
		});

		
		this.sprite.anims.load('idle-right');
		this.sprite.anims.load('idle-left');
		this.sprite.anims.load('walk-right');
		this.sprite.anims.load('walk-left');
	}

	update(){
		this.hitbox.x = this.sprite.x;
		this.hitbox.y = this.sprite.y;

		this.sprite.setVelocity(0);
		this.hitbox.setVelocity(0);

		if (this.cursors.left.isDown)
		{
			this.sprite.setVelocityX(-this.velocity);
			this.hitbox.setVelocityX(-this.velocity);
			//this.sprite.anims.play('walk-left');
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity);
			this.hitbox.setVelocityX(this.velocity);
			//this.sprite.anims.play('walk-right');
		}

		if (this.cursors.up.isDown)
		{
			this.sprite.setVelocityY(-this.velocity);
			this.hitbox.setVelocityY(-this.velocity);
		}
		else if (this.cursors.down.isDown)
		{
			this.sprite.setVelocityY(this.velocity);
			this.hitbox.setVelocityY(this.velocity);
		}   
	}

}
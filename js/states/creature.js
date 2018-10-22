class Player {
	constructor(obj){ 
		this.game=obj;
		this.velocity=200;

		this.game.load.spritesheet(
		      "player",
		      "sprites/player.png",
		      {
		        frameWidth: 40,
		        frameHeight: 40
		      }
		);

		this.game.load.image("empty_image", "sprites/empty_image.png");
	} 

	spawn(x, y){
		  this.sprite = this.game.physics.add.sprite(x, y, 'player');
		  this.sprite.body.setSize(20, 10).setOffset(10, 30);

		  this.hitbox = this.game.physics.add.sprite(x, y, 'empty_image');
		  this.hitbox.body.setSize(18, 35);
	}

	createCursors(){
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}

	getSprite(){
		return this.sprite;
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
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity);
			this.hitbox.setVelocityX(this.velocity);
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
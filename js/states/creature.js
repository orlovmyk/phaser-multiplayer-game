class Player {
	static preload(game) {
		game.load.multiatlas("knight", "sprites/knight.json", "sprites");

		game.load.image("empty_image", "sprites/empty_image.png");
	}


	constructor(scene, x, y){
		this.scene = scene;
		this.cursors;

		this.sprite = this.scene.physics.add.sprite(x, y, "knight", "knight_idle_0.png");
		this.sprite.body.setSize(20, 10).setOffset(10, 30);

		this.hitbox = this.scene.physics.add.sprite(x, y, 'empty_image');
		this.hitbox.body.setSize(18, 35);

		this.velocity = 140;

		this.loadAnims();
	} 

	destroy(){
		this.sprite.destroy();
		this.hitbox.destroy();
	}

	createCursors(obj){
		this.cursors = obj.createCursorKeys();
	}

	loadAnims(){
		var frameNames = this.scene.anims.generateFrameNames('knight', {
                         start: 0, end: 3,
                         prefix: 'knight_idle_', suffix: '.png'
                     });
		this.scene.anims.create({ key: 'idle', frames: frameNames, frameRate: 10, repeat: -1 });
    	this.sprite.anims.play('idle');
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
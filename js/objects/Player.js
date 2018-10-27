class Player {
	static preload(game) {
		game.load.multiatlas("knight", "sprites/knight.json", "sprites");

		game.load.image("empty_image", "sprites/empty_image.png");
	}


	constructor(scene, x, y){
		this.scene = scene;
		this.cursors;

		this.sprite = this.scene.physics.add.sprite(x, y, "knight", "knight_idle_0.png");
		this.sprite.body.setSize(10, 30);
		//.setOffset(10, 30);

		this.hitbox = this.scene.physics.add.sprite(x, y, 'empty_image');
		//this.hitbox.body.setSize(18, 35);

		this.animation;
		this.animationList = [];

		this.velocity = 140;

		this.heath = 100;
		this.healthbar;


		this.loadAnims();
	} 

	destroy(){
		this.sprite.destroy();
		this.hitbox.destroy();
	}

	createCursors(obj){
		this.cursors = obj.createCursorKeys();
	}

	loadAnimation(name, prefix, start, end, key){
		let frameNames = this.scene.anims.generateFrameNames(name, {
                        start: start, 
                        end: end,
                        prefix: prefix, 
                        suffix: '.png'
                     });
	
		this.scene.anims.create({ key: key, frames: frameNames, frameRate: 10, repeat: -1 });
	}

	loadAnims(){
		this.loadAnimation('knight','knight_idle_', 0, 3, 'idle');
		this.loadAnimation('knight','knight_run_up_', 0, 4, 'up');
		this.loadAnimation('knight','knight_run_down_', 0, 4, 'down');
		this.loadAnimation('knight','knight_run_right_', 0, 5, 'right');
		this.loadAnimation('knight','knight_run_left_', 0, 5, 'left');
	}

	update(){
		this.hitbox.x = this.sprite.x;
		this.hitbox.y = this.sprite.y;

		this.sprite.setVelocity(0);
		this.hitbox.setVelocity(0);

		if (this.cursors.left.isUp && 
			this.cursors.right.isUp &&
			this.cursors.up.isUp &&
			this.cursors.down.isUp &&
			this.animation != "idle"){
					this.animation = "idle"
					this.sprite.anims.play(this.animation);
			}


		if (this.cursors.up.isDown && this.cursors.left.isDown)
		{
			this.sprite.setVelocityX(-this.velocity);
			this.hitbox.setVelocityX(-this.velocity);

			this.sprite.setVelocityY(-this.velocity);
			this.hitbox.setVelocityY(-this.velocity);
			if(this.animation != "left_up") 
				{
					this.animation = "left_up"
					this.sprite.anims.play("left");
				};
			return;
		}
		else if (this.cursors.up.isDown && this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity);
			this.hitbox.setVelocityX(this.velocity);

			this.sprite.setVelocityY(-this.velocity);
			this.hitbox.setVelocityY(-this.velocity);
			if(this.animation != "right_up") 
				{
					this.animation = "right_up"
					this.sprite.anims.play("right");
				};
			return;
		}

		if (this.cursors.down.isDown && this.cursors.left.isDown)
		{
			this.sprite.setVelocityX(-this.velocity);
			this.hitbox.setVelocityX(-this.velocity);

			this.sprite.setVelocityY(this.velocity);
			this.hitbox.setVelocityY(this.velocity);
			if(this.animation != "left_down") 
				{
					this.animation = "left_down"
					this.sprite.anims.play("left");
				};
			return;
		}
		else if (this.cursors.down.isDown && this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity);
			this.hitbox.setVelocityX(this.velocity);

			this.sprite.setVelocityY(this.velocity);
			this.hitbox.setVelocityY(this.velocity);
			if(this.animation != "right_down") 
				{
					this.animation = "right_down"
					this.sprite.anims.play("right");
				};
			return;
		}   

		else if (this.cursors.left.isDown)
		{
			this.sprite.setVelocityX(-this.velocity);
			this.hitbox.setVelocityX(-this.velocity);
			if(this.animation != "left") 
				{
					this.animation = "left"
					this.sprite.anims.play(this.animation);
				};
			return;
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity);
			this.hitbox.setVelocityX(this.velocity);
			if(this.animation != "right") 
				{
					this.animation = "right"
					this.sprite.anims.play(this.animation);
				};
			return;
		}

		else if (this.cursors.up.isDown)
		{
			this.sprite.setVelocityY(-this.velocity);
			this.hitbox.setVelocityY(-this.velocity);
			if(this.animation != "up" && this.animation != "left" && this.animation != "right") 
				{
					this.animation = "up"
					this.sprite.anims.play(this.animation);
				};
			return;
		}
		else if (this.cursors.down.isDown)
		{
			this.sprite.setVelocityY(this.velocity);
			this.hitbox.setVelocityY(this.velocity);
			if(this.animation != "down" && this.animation != "left" && this.animation != "right") 
				{
					this.animation = "down"
					this.sprite.anims.play(this.animation);
				};
			return;
		}   

	}

}
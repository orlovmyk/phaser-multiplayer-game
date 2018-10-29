class Player {
	static preload(game) {
		game.load.multiatlas("knight", "sprites/knight.json", "sprites");
		game.load.multiatlas("knight_slice", "sprites/knight_slice.json", "sprites");

		game.load.image("empty_image", "sprites/empty_image.png");
	}


	constructor(scene, x, y){
		this.scene = scene;
		this.cursors;

		this.isImmune = false;
		this.canMove = true;
		this.direction = "right";
		
		this.attackAnimationTime = 0;
		this.attackTimer = 0;
		this.attackDuration = 500;
		this.attackFreeze = 900;

		this.tiltTimer = 0;
		this.tiltDuration = 200;

		this.time = 0;

		this.sprite = this.scene.physics.add.sprite(x, y, "knight", "knight_idle_0.png");
		this.sprite.body.setSize(10, 30);
		//.setOffset(10, 30);

		this.hitbox = this.scene.physics.add.sprite(x, y, 'empty_image');
		//this.hitbox.body.setSize(18, 35);

		this.animation;
		this.attackAnimationList = ['up', 'down', 'right', 'left'];

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

	loadMoveAnimation(name, prefix, start, end, key){
		let frameNames = this.scene.anims.generateFrameNames(name, {
                        start: start, 
                        end: end,
                        prefix: prefix, 
                        suffix: '.png'
                     });
	
		this.scene.anims.create({ 	key: key, 
								    frames: frameNames, 
								    frameRate: 10, 
								    repeat: -1 });
	}

	loadSliceAnimation(name, prefix, start, end, key){
		let frameNames = this.scene.anims.generateFrameNames(name, {
                        start: start, 
                        end: end,
                        prefix: prefix, 
                        suffix: '.png'
                     });
	
		this.scene.anims.create({ 	key: key, 
								    frames: frameNames, 
								    duration: this.attackDuration,
									yoyo: true });
	}

	loadAnims(){
		this.loadMoveAnimation('knight','knight_idle_', 0, 3, 'idle');
		this.loadMoveAnimation('knight','knight_run_up_', 0, 4, 'up');
		this.loadMoveAnimation('knight','knight_run_down_', 0, 4, 'down');
		this.loadMoveAnimation('knight','knight_run_right_', 0, 5, 'right');
		this.loadMoveAnimation('knight','knight_run_left_', 0, 5, 'left');

		this.loadSliceAnimation('knight_slice','knight_slice_up_', 0, 2, 'slice_up');
		this.loadSliceAnimation('knight_slice','knight_slice_down_', 0, 2, 'slice_down');
		this.loadSliceAnimation('knight_slice','knight_slice_right_', 0, 2, 'slice_right');
		this.loadSliceAnimation('knight_slice','knight_slice_left_', 0, 2, 'slice_left');
	}

	attack(){
		if (this.attackTimer < this.time){
			if (this.attackAnimationList.includes(this.direction)){
				this.sprite.anims.play("slice_" + this.direction);
				this.attackAnimationTime = this.time + this.attackDuration + 100;
				this.attackTimer = this.time + this.attackFreeze;
				this.canMove = false;

				if (this.direction == "right") { this.sprite.setAccelerationX(400) }
				else if (this.direction == "left") { this.sprite.setAccelerationX(-400)}
				else if (this.direction == "down") { this.sprite.setAccelerationY(400)}
				else if (this.direction == "up") { this.sprite.setAccelerationY(-400)}
			}
		}	
	}

	attackUpdate(time){
		if (this.attackAnimationTime < this.time){
			this.canMove = true;
			this.sprite.setAccelerationY(0)
			this.sprite.setAccelerationX(0)
		}

		else {
			return;
		}
	}

	tilt(){
		if (this.tiltTimer < this.time){
			this.tiltTimer = this.time + this.tiltTimer;
			this.canMove = false;

		}
	}

	tiltUpdate(){
		if (this.tiltTimer > this.time){


		}
	}

	update(time, delta){

		this.time = time;
		this.attackUpdate(time);
		this.tiltUpdate(time);

		this.hitbox.x = this.sprite.x; this.hitbox.y = this.sprite.y;
		if(!this.canMove) return;

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
			this.sprite.setVelocityX(-this.velocity); this.hitbox.setVelocityX(-this.velocity);

			this.sprite.setVelocityY(-this.velocity); this.hitbox.setVelocityY(-this.velocity);
			if(this.animation != "left_up") 
				{
					this.animation = "left_up"
					this.direction = this.animation;
					this.sprite.anims.play("left");
				};
			return;
		}
		else if (this.cursors.up.isDown && this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity); this.hitbox.setVelocityX(this.velocity);

			this.sprite.setVelocityY(-this.velocity); this.hitbox.setVelocityY(-this.velocity);
			if(this.animation != "right_up") 
				{
					this.animation = "right_up"
					this.direction = this.animation;
					this.sprite.anims.play("right");
				};
			return;
		}

		if (this.cursors.down.isDown && this.cursors.left.isDown)
		{
			this.sprite.setVelocityX(-this.velocity); this.hitbox.setVelocityX(-this.velocity);

			this.sprite.setVelocityY(this.velocity); this.hitbox.setVelocityY(this.velocity);
			if(this.animation != "left_down") 
				{
					this.animation = "left_down"
					this.direction = this.animation;
					this.sprite.anims.play("left");
				};
			return;
		}
		else if (this.cursors.down.isDown && this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity); this.hitbox.setVelocityX(this.velocity);

			this.sprite.setVelocityY(this.velocity); this.hitbox.setVelocityY(this.velocity);
			if(this.animation != "right_down") 
				{
					this.animation = "right_down"
					this.direction = this.animation;
					this.sprite.anims.play("right");
				};
			return;
		}   

		else if (this.cursors.left.isDown)
		{
			this.sprite.setVelocityX(-this.velocity); this.hitbox.setVelocityX(-this.velocity);
			if(this.animation != "left") 
				{
					this.animation = "left"
					this.direction = this.animation;
					this.sprite.anims.play(this.animation);
				};
			return;
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.setVelocityX(this.velocity); this.hitbox.setVelocityX(this.velocity);
			if(this.animation != "right") 
				{
					this.animation = "right"
					this.direction = this.animation;
					this.sprite.anims.play(this.animation);
				};
			return;
		}

		else if (this.cursors.up.isDown)
		{
			this.sprite.setVelocityY(-this.velocity); this.hitbox.setVelocityY(-this.velocity);
			if(this.animation != "up" && this.animation != "left" && this.animation != "right") 
				{
					this.animation = "up"
					this.direction = this.animation;
					this.sprite.anims.play(this.animation);
				};
			return;
		}
		else if (this.cursors.down.isDown)
		{
			this.sprite.setVelocityY(this.velocity); this.hitbox.setVelocityY(this.velocity);
			if(this.animation != "down" && this.animation != "left" && this.animation != "right") 
				{
					this.animation = "down"
					this.direction = this.animation;
					this.sprite.anims.play(this.animation);
				};
			return;
		}   

	}

}
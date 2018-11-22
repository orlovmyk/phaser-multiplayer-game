class Player extends Phaser.Physics.Arcade.Sprite{
	static preload(game){
		game.load.multiatlas("knight", "sprites/knight.json", "sprites");
		game.load.multiatlas("knight_slice", "sprites/knight_slice.json", "sprites");
		game.load.image("empty_image", "sprites/empty_image.png");
	}

	createAnims(scene){
		this.createMoveAnimation('knight','knight_idle_', 0, 3, 'idle');
		this.createMoveAnimation('knight','knight_run_up_', 0, 4, 'up');
		this.createMoveAnimation('knight','knight_run_down_', 0, 4, 'down');
		this.createMoveAnimation('knight','knight_run_right_', 0, 5, 'right');
		this.createMoveAnimation('knight','knight_run_left_', 0, 5, 'left');

		this.createSliceAnimation('knight_slice','knight_slice_up_', 0, 2, 'slice_up');
		this.createSliceAnimation('knight_slice','knight_slice_down_', 0, 2, 'slice_down');
		this.createSliceAnimation('knight_slice','knight_slice_right_', 0, 2, 'slice_right');
		this.createSliceAnimation('knight_slice','knight_slice_left_', 0, 2, 'slice_left');
	}

	createMoveAnimation(name, prefix, start, end, key){
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

	createSliceAnimation(name, prefix, start, end, key){
		let frameNames = this.scene.anims.generateFrameNames(name, {
                        start: start, 
                        end: end,
                        prefix: prefix, 
                        suffix: '.png'
                     });
	
		this.scene.anims.create({ 	key: key, 
								    frames: frameNames,
								    frameRate: 10,  
								    duration: this.attackDuration,
									yoyo: true });
	}

	createCursors(keyboard, joystick){
		this.keyCursors = keyboard.createCursorKeys();
		this.joyCursors = joystick.createCursorKeys();
	}

	createHealthBar(healthbar){
		this.healthbar = healthbar;
	}

	constructor(scene, x, y){
		super(scene, x, y, "knight", "knight_idle_0.png");
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);
		this.bodyWidth = 16;
		this.bodyHeight = 32; 

		this.setSize(this.bodyWidth, this.bodyHeight);

		this.hitbox = this.scene.physics.add.sprite(x, y, 'empty_image');
		this.hitbox.setSize(this.bodyWidth+10, this.bodyHeight+10);
		this.hitbox.debugBodyColor = 777777;
		this.hitbox.debugShowVelocity = false;

		//this.hitbox[dir.up].checkCollision = false;

		this.direction;

		this.velocity = 140;
	}

	attack(){

	}

	update(){
		this.setVelocity(0, 0);
		this.updateJoystick();
		this.updateKeyboard();
		this.updateIdle();

		this.hitbox.x = this.x;
		this.hitbox.y = this.y;

		this.playMoveAnimation();
	}

	//KOSTIL' SRANYII
	updateIdle(){
		if ((this.keyCursors.left.isUp && this.keyCursors.right.isUp &&
			this.keyCursors.up.isUp && this.keyCursors.down.isUp && 
			this.direction != dir.idle) &&

			(this.joyCursors.left.isUp && this.joyCursors.right.isUp &&
			this.joyCursors.up.isUp && this.joyCursors.down.isUp && 
			this.direction != dir.idle)) this.direction = dir.idle
	}

	updateJoystick(){
		if (this.joyCursors.up.isDown && this.joyCursors.left.isDown){
			this.setVelocity(-this.velocity, -this.velocity);
			if(this.direction != dir.upleft) this.direction = dir.upleft;
			return;
		}

		if (this.joyCursors.up.isDown && this.joyCursors.right.isDown){
			this.setVelocity(this.velocity, -this.velocity);
			if(this.direction != dir.upright) this.direction = dir.upright;
			return;
		}

		if (this.joyCursors.down.isDown && this.joyCursors.left.isDown){
			this.setVelocity(-this.velocity, this.velocity);
			if(this.direction != dir.downleft) this.direction = dir.downleft;
			return;
		}

		if (this.joyCursors.down.isDown && this.joyCursors.right.isDown){
			this.setVelocity(this.velocity, this.velocity);
			if(this.direction != dir.downright) this.direction = dir.downright;
			return;
		}

		if (this.joyCursors.up.isDown){
			this.setVelocityY(-this.velocity);
			if(this.direction != dir.up) this.direction = dir.up;
			return;
		}

		if (this.joyCursors.down.isDown){
			this.setVelocityY(this.velocity);
			if(this.direction != dir.down) this.direction = dir.down;
			return;
		}

		if (this.joyCursors.left.isDown){
			this.setVelocityX(-this.velocity);
			if(this.direction != dir.left) this.direction = dir.left;
			return;
		}

		if (this.joyCursors.right.isDown){
			this.setVelocityX(this.velocity);
			if(this.direction != dir.right) this.direction = dir.right;
			return;
		}
	}

	updateKeyboard(){
		if (this.keyCursors.up.isDown && this.keyCursors.left.isDown){
			this.setVelocity(-this.velocity, -this.velocity);
			if(this.direction != dir.upleft) this.direction = dir.upleft;
			return;
		}

		if (this.keyCursors.up.isDown && this.keyCursors.right.isDown){
			this.setVelocity(this.velocity, -this.velocity);
			if(this.direction != dir.upright) this.direction = dir.upright;
			return;
		}

		if (this.keyCursors.down.isDown && this.keyCursors.left.isDown){
			this.setVelocity(-this.velocity, this.velocity);
			if(this.direction != dir.downleft) this.direction = dir.downleft;
			return;
		}

		if (this.keyCursors.down.isDown && this.keyCursors.right.isDown){
			this.setVelocity(this.velocity, this.velocity);
			if(this.direction != dir.downright) this.direction = dir.downright;
			return;
		}

		if (this.keyCursors.up.isDown){
			this.setVelocityY(-this.velocity);
			if(this.direction != dir.up) this.direction = dir.up;
			return;
		}

		if (this.keyCursors.down.isDown){
			this.setVelocityY(this.velocity);
			if(this.direction != dir.down) this.direction = dir.down;
			return;
		}

		if (this.keyCursors.left.isDown){
			this.setVelocityX(-this.velocity);
			if(this.direction != dir.left) this.direction = dir.left;
			return;
		}

		if (this.keyCursors.right.isDown){
			this.setVelocityX(this.velocity);
			if(this.direction != dir.right) this.direction = dir.right;
			return;
		}
	}

	playMoveAnimation(){
		switch (this.direction) {
			case dir.up:
				this.anims.play(dir.up, true);
				break;

			case dir.down:
				this.anims.play(dir.down, true);
				break;

			case dir.right:
				this.anims.play(dir.right, true);
				break;

			case dir.left:
				this.anims.play(dir.left, true);
				break;

			case dir.upright:
				this.anims.play(dir.right, true);
				break;

			case dir.upleft:
				this.anims.play(dir.left, true);
				break;

			case dir.downright:
				this.anims.play(dir.right, true);
				break;

			case dir.downleft:
				this.anims.play(dir.left, true);
				break;

			case dir.idle:
				this.anims.play(dir.idle, true);
				break;
		}
	}
}

const dir = {
    up: "up",
    upleft: "upleft",
    upright: "upright",
    down: "down",
    downleft: "downleft",
    downright: "downright",
    right: "right",
    left: "left",
    idle: "idle"
}











/*
class Player {
	static precreate(game) {
		game.create.multiatlas("knight", "sprites/knight.json", "sprites");
		game.create.multiatlas("knight_slice", "sprites/knight_slice.json", "sprites");

		game.create.image("empty_image", "sprites/empty_image.png");
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


		this.createAnims();
	} 

	destroy(){
		this.sprite.destroy();
		this.hitbox.destroy();
	}

	createCursors(obj){
		this.cursors = obj.createCursorKeys();
	}

	createMoveAnimation(name, prefix, start, end, key){
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

	createSliceAnimation(name, prefix, start, end, key){
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

	createAnims(){
		this.createMoveAnimation('knight','knight_idle_', 0, 3, 'idle');
		this.createMoveAnimation('knight','knight_run_up_', 0, 4, 'up');
		this.createMoveAnimation('knight','knight_run_down_', 0, 4, 'down');
		this.createMoveAnimation('knight','knight_run_right_', 0, 5, 'right');
		this.createMoveAnimation('knight','knight_run_left_', 0, 5, 'left');

		this.createSliceAnimation('knight_slice','knight_slice_up_', 0, 2, 'slice_up');
		this.createSliceAnimation('knight_slice','knight_slice_down_', 0, 2, 'slice_down');
		this.createSliceAnimation('knight_slice','knight_slice_right_', 0, 2, 'slice_right');
		this.createSliceAnimation('knight_slice','knight_slice_left_', 0, 2, 'slice_left');
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

*/
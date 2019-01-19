class Player extends Phaser.Physics.Arcade.Sprite{
	static preload(game){
		game.load.multiatlas("knight", "sprites/knight.json", "sprites");
		game.load.multiatlas("knight_slice", "sprites/knight_slice.json", "sprites");
		game.load.image("empty_image", "sprites/empty_image.png");
		game.load.image("circle", "sprites/circle.png");
		game.load.image("death", "sprites/death.jpg");
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

	damage(amount){
		this.healthbar.damage(amount);
		this.health -= amount;
	}

	constructor(scene, x, y){
		super(scene, x, y, "knight", "knight_idle_0.png");
		scene.physics.add.existing(this);
		scene.sys.displayList.add(this);
		scene.sys.updateList.add(this);

		this.bodyWidth = 6;
		this.bodyHeight = 18; 

		this.setSize(this.bodyWidth, this.bodyHeight);

		this.hitbox = this.scene.physics.add.sprite(x, y, 'empty_image');
		this.hitbox.setSize(this.bodyWidth+8, this.bodyHeight+8);
		this.hitbox.debugBodyColor = 777777;
		this.hitbox.debugShowVelocity = false;

		this.circle = this.scene.physics.add.sprite(x, y, 'circle');
		this.circle.setSize(50, 50);
		this.circle.setDisplaySize(50, 50);

		this.canMove = true;
		this.canMoveTimer = 0;
		this.canMoveStartTimer = false;
		this.canMoveStartTimerBounce = false;
		
		// strict value that can be changed explicit
		this.strictCanMove = true;

		this.canAttack = true;
		this.canAttackTimer = 0;
		this.canAttackStartTimer = false;

		//change to reload attack faster
		this.attackReload = 800;
		//change to attack faster
		this.attackDuration = 500;
		
		//bounce
		this.bounceDuration = 300;
		this.bouncePower = 200;

		//to check collide on hitbox
		this.isAttack = false;

		this.attack_direction;

		//player damage
		this.attack_damage = 15;

		//player health
		this.health = 100;

		//is player dead
		this.isDead = false;

		this.direction;

		this.velocity = 140;
	}

	attack(){
		let mob = ClosestMobToPlayer();
		if (mob == null || !this.canAttack || !this.canMove) return;

		this.canMoveStartTimer = true;		
		this.canAttackStartTimer = true;
		this.canMove = false;

		this.isAttack = true;

		let angle = (Phaser.Math.Angle.Between(this.x, this.y, mob.x, mob.y)*180)/Math.PI-180;
		if ((angle > -315) || (angle < -45)){ this.attack_direction = dir.left}
		if ((angle > -315) && (angle < -225)){ this.attack_direction = dir.up}
		if ((angle > -225) && (angle < -135)){ this.attack_direction = dir.right}
		if ((angle > -135) && (angle < -45)){ this.attack_direction = dir.down}

		let velocity = new Phaser.Math.Vector2();
	    velocity.setToPolar(Phaser.Math.DegToRad(angle), -300);

	    this.setVelocity(velocity.x, velocity.y);
	}

	attackUpdate(time){
		if (this.canAttackStartTimer){
			this.canAttack = false;
			this.canAttackStartTimer = false;
			this.canAttackTimer = time + this.attackReload;
		}

		if (time > this.canAttackTimer){
			this.canAttack = true;
			this.isAttack = false;
		}

		if (this.canMoveStartTimer){
			this.canMove = false;
			this.canMoveStartTimer = false;
			this.canMoveTimer = time + this.attackDuration;
		}

		if (this.canMoveStartTimerBounce){
			this.canMove = false;
			this.canMoveStartTimerBounce = false;
			this.canMoveTimer = time + this.bounceDuration;
		}

		if (time > this.canMoveTimer){
			this.canMove = true;
			this.isAttack = false;
			this.clearTint();
		}



	}

	update(time, delta){
		if(this.canMove && this.strictCanMove){
			this.setVelocity(0, 0);

			this.updateJoystick();
			this.updateKeyboard();
			this.updateIdle();
		}

		if(this.health < 0){
			if (!this.isDead) ResetGame();
			this.isDead = true;
			this.canMoveStartTimer = true;
		}

		this.attackUpdate(time);

		this.hitbox.x = this.x;
		this.hitbox.y = this.y;

		if (this.isAttack){
			this.playAttackAnimation();
		}
		else {
			this.playMoveAnimation();
		}
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

	playAttackAnimation(){
		switch (this.attack_direction) {
			case dir.up:
				this.anims.play("slice_"+dir.up, true);
				break;

			case dir.down:
				this.anims.play("slice_"+dir.down, true);
				break;

			case dir.right:
				this.anims.play("slice_"+dir.right, true);
				break;

			case dir.left:
				this.anims.play("slice_"+dir.left, true);
				break;

			case dir.upright:
				this.anims.play("slice_"+dir.right, true);
				break;

			case dir.upleft:
				this.anims.play("slice_"+dir.left, true);
				break;

			case dir.downright:
				this.anims.play("slice_"+dir.right, true);
				break;

			case dir.downleft:
				this.anims.play("slice_"+dir.left, true);
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

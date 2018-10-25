class Interface {
	static preload(game){
		game.load.image('joystick_bot', "sprites/joystick_bot.png");
		game.load.image('joystick_top', "sprites/joystick_top.png");
	}

	constructor(scene){
		this.scene = scene;
	}

	addJoystick(){
		this.stickX = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		this.stickY = (GAME_HEIGHT/14)*12;

		this.size = GAME_HEIGHT/5;

		//turn off debug 
		let stickBot = this.scene.physics.add.image(0, 0, 'joystick_bot')
						.setDisplaySize(this.size, this.size);
		stickBot.debugShowBody = false;

		let stickTop = this.scene.physics.add.image(0, 0, 'joystick_top')
						.setDisplaySize(this.size, this.size);
		stickTop.debugShowBody = false;
				

		let config = {
			x: this.stickX,
			y: this.stickY,
			base: stickBot,
			thumb: stickTop 
		}

		this.joystick = new VirtualJoyStick(this.scene, config);
	}

	addHealthBar(){
		this.bar = new HealthBar(this.scene);
	}

	addButtons(){
		this.buttonA = new Button(this.scene, GAME_WIDTH-(Button.getSize()/2*5+30), GAME_HEIGHT - Button.getSize() + 30, "A");
		this.buttonB = new Button(this.scene, GAME_WIDTH-(Button.getSize()/2*3+25), GAME_HEIGHT - Button.getSize() + 20, "B");
		this.buttonC = new Button(this.scene, GAME_WIDTH-(Button.getSize()/2+20), GAME_HEIGHT - Button.getSize() + 10, "C");
	}
}
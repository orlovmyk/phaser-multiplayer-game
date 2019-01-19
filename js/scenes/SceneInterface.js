class SceneInterface extends Phaser.Scene{
	constructor(){
		super(
			{
				key: "Interface",
				active: true
			}
		);
	};

	preload(){
		Button.preload(this);
		HealthBar.preload(this);
		VirtualJoyStick.preload(this);
		Dialogue.preload(this);
	};

	create(){
		this.joystick = this.addVirtualJoyStick();
	  	this.healthbar = this.addHealthBar();
	  	this.button = this.addButtons();
	  	this.keyboard = this.addKeyboard();

	  	this.camera;

	  	this.dialogue = this.addDialogue();
	  	this.dialogue.toggleVisible();
	  	this.current_dialogue = [];
	};

	addCamera(camera){
		this.camera = camera;
	}

	addVirtualJoyStick(){
		let stickX = GAME_WIDTH * 0.12;
		let stickY = GAME_HEIGHT * 0.8;

		let joystick_size = GAME_HEIGHT/4;

		//turn off debug 
		let stickBot = this.physics.add.image(0, 0, 'joystick_bot')
						.setDisplaySize(joystick_size, joystick_size);
		stickBot.debugShowBody = false;

		let stickTop = this.physics.add.image(0, 0, 'joystick_top')
						.setDisplaySize(joystick_size, joystick_size);
		stickTop.debugShowBody = false;
				

		let config = {
			x: stickX,
			y: stickY,
			base: stickBot,
			thumb: stickTop,
			forceMin: 2 
		}

		return new VirtualJoyStick(this, config);
	};

	addKeyboard(){
		let keyboard = this.input.keyboard;

		keyboard.on('keydown_A', ()=>{
			this.events.emit("pressA");
		}, this);
		keyboard.on('keydown_S', ()=>{
			this.events.emit("pressB");
		}, this);
		keyboard.on('keydown_D', ()=>{
			this.events.emit("pressC");
		}, this);

		return keyboard;

	}

	addHealthBar(){
		return new HealthBar(this);
	};

	addButtons(){
		let buttonA = new Button(this, 
			GAME_WIDTH-(Button.getSize()/2*5+30), GAME_HEIGHT - Button.getSize() + 20, "A");

		let buttonB = new Button(this, 
			GAME_WIDTH-(Button.getSize()/2*3+25), GAME_HEIGHT - Button.getSize() + 10, "B");

		let buttonC = new Button(this, 
			GAME_WIDTH-(Button.getSize()/2+20), GAME_HEIGHT - Button.getSize(), "C");
		
		return {
			"A":buttonA, 
			"B":buttonB, 
			"C":buttonC
		};
	};

	addDialogue(){
		return new Dialogue(this);
	}

	//toggles visible for joystick buttons healthbar
	toggleVisible(){
		this.joystick.toggleVisible();
		this.button["A"].toggleVisible();
		this.button["B"].toggleVisible();
		this.button["C"].toggleVisible();
		this.healthbar.toggleVisible();
	}
	//this.cameras.main.setAlpha(1);

	handleDialogue(data){
		camera.zoomTo(2);
		this.toggleVisible();

		player.setVelocity(0, 0);
		player.strictCanMove = false;
		player.direction = "idle";

		this.current_dialogue = data.data.reverse();
		this.readDialogueLine();
	}

	readDialogueLine(){
		if(this.current_dialogue.length == 0){ 
			this.toggleVisible();
			this.dialogue.toggleVisible();
			camera.zoomTo(camera_default_zoom);
			player.strictCanMove = true;
		}
		else {
			let info = this.current_dialogue.pop();
			this.dialogue.print(info.say, info.name);
		}
	}
}
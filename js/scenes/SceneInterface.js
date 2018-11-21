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
	  	this.dialogue = this.addDialogue();
	  	this.keyboard = this.addKeyboard();

	  	this.camera;

	  	//FIX PLEASE
	  	this.dialogue.print("Я покакал!\nПрямо гамном");
	  	this.dialogue.toggleVisible();
	};

	addCamera(camera){
		this.camera = camera;
	}

	addVirtualJoyStick(){
		let stickX = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		let stickY = (GAME_HEIGHT/14)*12;

		this.size = GAME_HEIGHT/5;

		//turn off debug 
		let stickBot = this.physics.add.image(0, 0, 'joystick_bot')
						.setDisplaySize(this.size, this.size);
		stickBot.debugShowBody = false;

		let stickTop = this.physics.add.image(0, 0, 'joystick_top')
						.setDisplaySize(this.size, this.size);
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
		let config = {
		    width: 250,
		    height: 40,
		    x: 0,
		    y: 0,
		    bg: {
		      color: '#651828'
		    },
		    bar: {
		      color: '#FEFF03'
		    },
		    animationDuration: 200,
		    flipped: false
  		};
  		
		return new HealthBar(this, config);
	};

	addButtons(eventScene){
		let buttonA = new Button(this, GAME_WIDTH-(Button.getSize()/2*5+30), GAME_HEIGHT - Button.getSize() + 20, "A");
		let buttonB = new Button(this, GAME_WIDTH-(Button.getSize()/2*3+25), GAME_HEIGHT - Button.getSize() + 10, "B");
		let buttonC = new Button(this, GAME_WIDTH-(Button.getSize()/2+20), GAME_HEIGHT - Button.getSize(), "C");
		
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
}
class Button{
	static preload(game){
		game.load.image("buttonA","sprites/joystick/buttonA.png");
		game.load.image("buttonB","sprites/joystick/buttonB.png");
		game.load.image("buttonC","sprites/joystick/buttonC.png");
	}

	static getSize(){
		return GAME_HEIGHT/7;
	}

	constructor(scene, x, y, type){
		this.scene = scene;

		this.visible = true;
		this.button = this.scene.physics.add.image(x, y, 'button'+type)
					 .setDisplaySize(Button.getSize(), Button.getSize())
					 .setScrollFactor(0);
		this.button.type = type;
		this.button.setInteractive();
		this.button.debugShowBody = false;

		this.button.on("pointerdown", ()=>{
			this.button.alpha = 0.5;
			console.log(this);
			this.scene.events.emit("press" + this.button.type);
		})

		this.button.on("pointerup", ()=>{
			this.button.alpha = 1;
		})

		this.button.on("pointerout", ()=>{
			this.button.alpha = 1;
		})
	}

	toggleVisible(){
		if(this.visible){
			this.button.visible = false;
			this.visible = false;
		}

		else {
			this.button.visible = true;
			this.visible = true;
		}
	}

	toggleDebug(){
		if (this.button.debugShowBody)
			this.button.debugShowBody = false;
		else
			this.button.debugShowBody = true;
	}
}
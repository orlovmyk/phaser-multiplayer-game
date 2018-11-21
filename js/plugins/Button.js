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
		this.size = Button.getSize();
		this.button = this.scene.add.image(x, y, 'button'+type)
										 .setDisplaySize(this.size, this.size)
										 .setScrollFactor(0);
		this.button.type = type;

		this.button.setInteractive();
		this.debugShowBody = false;

		this.button.on("pointerdown", ()=>{
			this.alpha = 0.5;
			scene.events.emit("press" + this.type);
		})

		this.button.on("pointerup", ()=>{
			this.alpha = 1;
		})

		this.button.on("pointerout", ()=>{
			this.alpha = 1;
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
}
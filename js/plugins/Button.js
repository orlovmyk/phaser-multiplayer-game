class Button{
	static preload(game){
		game.load.image("buttonA","sprites/buttonA.png");
		game.load.image("buttonB","sprites/buttonB.png");
		game.load.image("buttonC","sprites/buttonC.png");
	}

	static getSize(){
		return GAME_HEIGHT/7;
	}

	constructor(scene, x, y, type){
		this.scene = scene;

		this.size = Button.getSize();

		this.button = this.scene.add.image(x, y, 'button'+type)
										 .setDisplaySize(this.size, this.size)
										 .setScrollFactor(0);

		this.button.setInteractive();
		this.debugShowBody = false;

		this.button.on("pointerdown", function(){
			this.alpha = 0.5;
			scene.events.emit("press");
		})

		this.button.on("pointerup", function(){
			this.alpha = 1;
		})

		this.button.on("pointerout", function(){
			this.alpha = 1;
		})
	}

	onclick(func){
		this.button.on("pointerdown", func)
	}

}
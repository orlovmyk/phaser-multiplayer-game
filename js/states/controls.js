class Dpad {
	constructor(obj){
		this.game = obj;
		this.isBeingDragged = false;

		this.stickBot;
		this.stickTop;

		this.x;
		this.y;

		this.stickWidth = GAME_HEIGHT/5;
		this.stickHeight = GAME_HEIGHT/5;


		this.game.load.image('stick-bot', "sprites/stick/bot.png");
		this.game.load.image('stick-top', "sprites/stick/top.png");
	}

	debugOn(){
		this.stickTop.debugShowBody = true;
		this.stickBot.debugShowBody = true;
	}

	create(){
		this.x = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		this.y = (GAME_HEIGHT/14)*12;


		this.stickBot = this.game.physics.add.image(this.x, this.y, 'stick-bot')
						.setDisplaySize(this.stickWidth, this.stickHeight);

		this.stickTop = this.game.physics.add.image(this.x, this.y, 'stick-top')
						.setDisplaySize(this.stickWidth, this.stickHeight);

		this.stickTop.originX = this.x;
		this.stickTop.originY = this.y;

		this.stickTop.debugShowBody = false;
		this.stickBot.debugShowBody = false;

		this.stickBot.setScrollFactor(0);
		this.stickTop.setScrollFactor(0);

		this.stickTop.setInteractive();
		this.game.input.setDraggable(this.stickTop);

		//отпускание
		this.stickTop.on('pointerdown', function () {
			//this for gameObject
	    });

		//нажатие
		this.stickTop.on('pointerup', function () {
        	this.x = this.originX;
        	this.y = this.originY;
	    });

	    this.stickTop.on('drag', function () {


	    });

	    /*
		//Относится ко всем инпутам

		this.game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
	        gameObject.x = dragX;
	        gameObject.y = dragY;
    	});
    	*/

		this.stickBot.setImmovable(true);
	}

	update(){
		console.log(Phaser.Math.Distance.Between(this.stickBot.body.center.x,
												 this.stickBot.body.center.y,
												 this.stickTop.body.center.x,
												 this.stickTop.body.center.y));
	}
}
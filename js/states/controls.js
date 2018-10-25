class Dpad {
	static preload(game) {
		game.load.image('stick_bot', "sprites/stick/bot.png");
		game.load.image('stick_top', "sprites/stick/top.png");
	}

	constructor(obj){
		this.game = obj;

		this.stickBot;
		this.stickTop;

		this.x;
		this.y;

		this.stickWidth = GAME_HEIGHT/5;
		this.stickHeight = GAME_HEIGHT/5;
	}

	debugOn(){
		this.stickTop.debugShowBody = true;
		this.stickBot.debugShowBody = true;
		this.dragger.debugShowBody = true;
	}

	create(){
		this.x = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		this.y = (GAME_HEIGHT/14)*12;


		this.stickBot = this.game.physics.add.image(this.x, this.y, 'stick_bot')
						.setDisplaySize(this.stickWidth, this.stickHeight);

		this.stickTop = this.game.physics.add.image(this.x, this.y, 'stick_top')
						.setDisplaySize(this.stickWidth, this.stickHeight);

		this.dragger = this.game.physics.add.image(this.x, this.y, 'stick_top')
						.setDisplaySize(this.stickWidth, this.stickHeight).setTint(3);

		this.dragger.origin = this.dragger.getCenter();

		this.stickTop.debugShowBody = false;
		this.stickBot.debugShowBody = false;
		this.dragger.debugShowBody = false;

		this.stickBot.setScrollFactor(0);
		this.stickTop.setScrollFactor(0);
		this.dragger.setScrollFactor(0);

		this.dragger.setInteractive();
		this.game.input.setDraggable(this.dragger);

		this.dragger.isBeingDragged = true;

		this.dragger.bot = this.stickBot;
		this.dragger.top = this.stickTop;

		this.dragger.getCenter().reset();

		this.stickTop.checkDistance = function(){
			return Phaser.Math.Distance.Between(this.bot.body.center.x,
												this.bot.body.center.y,
												this.body.center.x,
												this.body.center.y);

		}

		//console.log(this.stickTop.bot);

		//отпускание 

		//events for drag  drag  dragstart  dragend

		this.stickTop.on('dragstart', function () {
			this.isBeingDragged = true;
			//this for gameObject
	    });

		//нажатие
		this.stickTop.on('dragend', function () {
			this.isBeingDragged = false;
	    });

	    this.stickTop.on('drag', function (pointer, dragX, dragY) {
	    	
	    });

	    
		//Относится ко всем инпутам

		this.game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
	        gameObject.x = dragX;
	        gameObject.y = dragY;
	        

	        console.log(gameObject.getCenter().lengthSq());
	        //console.log(gameObject.getCenter().subtract(gameObject.origin));
    	});

    	this.game.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {

    	});

    	this.game.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
	        gameObject.setPosition(gameObject.origin.x, gameObject.origin.y);
	        gameObject.top.setPosition(gameObject.origin.x, gameObject.origin.y);
    	});

		this.stickBot.setImmovable(true);
	}

	update(){

	}
}


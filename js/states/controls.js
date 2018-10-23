class Dpad {
	constructor(obj){
		this.game = obj;
		this.isBeingDragged = false;

		this.stickWidth = GAME_HEIGHT/5;
		this.stickHeight = GAME_HEIGHT/5;


		this.game.load.image('stick-bot', "sprites/stick/bot.png");
		this.game.load.image('stick-top', "sprites/stick/top.png");
	}

	create(){
		let x = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		let y = (GAME_HEIGHT/14)*12;


		this.stickBot = this.game.physics.add.image(0, 0, 'stick-bot').setDisplaySize(this.stickWidth, this.stickHeight);
		this.stickTop = this.game.physics.add.image(0, 0, 'stick-top').setDisplaySize(this.stickWidth, this.stickHeight);

		this.stickBot.setX(x).setY(y);
		this.stickTop.setX(x).setY(y);

		this.stickBot.setScrollFactor(0);
		this.stickTop.setScrollFactor(0);

		this.stickTop.setInteractive();
		this.game.input.setDraggable(this.stickTop);
	}
}
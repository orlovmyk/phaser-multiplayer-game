class Dpad {
	constructor(obj){
		this.game = obj;
		this.isBeingDragged = false;

		this.game.load.image('bot-stick', "sprites/stick/bot.png");
		this.stick = this.game.physics.add.sprite(100, 100, 'bot-stick')

		console.log(this.stick)
	

	}
}
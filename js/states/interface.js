class Interface {
	constructor(scene){
		this.scene = scene;
	}

	addStick(){
		this.x = GAME_WIDTH - ((GAME_WIDTH/20)*18);
		this.y = (GAME_HEIGHT/14)*12;

		let config = {
			x: this.x,
			y: this.y,
			radius: 50	
		}

		this.stick = new VirtualJoyStick(this.scene, config);
	}
}
class Mob{
	static preload(game){
		game.load.multiatlas("bat", "sprites/bat.json", "sprites");
	}

	constructor(scene, x, y){
		this.scene = scene;
		this.sprite = this.scene.physics.add.sprite(x, y, "bat", "bat_fly_0.png");
		this.sprite.body.setSize(25, 25);

		this.sprite.anims.play("bat_fly");
	}

	static createAnims(scene){
		let frames = scene.anims.generateFrameNames("bat", {
                        start: 0, 
                        end: 4,
                        prefix: "bat_fly_", 
                        suffix: '.png'
                     });
	
		scene.anims.create({ key: "bat_fly", frames: frames, frameRate: 10, repeat: -1, yoyo:true});
	}

	follow(){

	}

}
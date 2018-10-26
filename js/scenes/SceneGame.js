let layers = ["ground_bot", "ground_top", "trunk", "items", "tree_top"];
let layersColliding = ["ground_bot"];

class SceneGame extends Phaser.Scene{
	constructor(){
		super(
			{
				key: "Game",
				active: true
			}
		);
	};

	preload(){	
		Player.preload(this);

		this.map = new Map(this);
  		this.map.loadMap("level1", "level1");
	};

	create(){
		this.interface = this.scene.get('Interface');

		this.map.createLayers(layers, "level1", layersColliding);
  		this.map.debugCollision("ground_bot");

  		this.player = new Player(this, 100, 100);
		this.player.createCursors(this.interface.joystick);
		

		this.cameras.main.startFollow(this.player.sprite, true, 0.5, 0.5);

	
		this.map.setCollision(this.player.sprite, "ground_bot");
	};

	update(){
		this.player.update();
	};
}
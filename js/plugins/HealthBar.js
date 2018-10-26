class HealthBar{
	static preload(){

	};

    preload(){

    };

	constructor(scene){
		this.scene = scene;

        this.value = 100;

        this.width = 300;
        this.height = 12;

        this.x = this.width/2 + 8;
        this.y = 12;

        this.bar = new Phaser.GameObjects.Rectangle(scene, this.x, this.y, this.width, this.height, 0x00ff00, 0.7);
        this.bar.setScrollFactor(0);

        scene.add.existing(this.bar);
	};
}
class Dialogue{
	static preload(game){
		game.load.image("player","sprites/avatar.png");
		game.load.image("dialogue_box", "sprites/dialogue_box.png");
	}

	constructor(scene){
		this.scene = scene;
		this.visible = true;

		this.width = GAME_WIDTH - GAME_WIDTH/4;
		this.height = GAME_HEIGHT/5;

		this.x = GAME_WIDTH*0.5;
		this.y = GAME_HEIGHT*0.85;

		//this.box = scene.add.box({ fillStyle: { color: 0xa0a0a0 } });
		//this.rect = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
        
		this.box = this.scene.add.sprite(this.x, this.y, 'dialogue_box')
        							.setDisplaySize(this.width, this.height);

        this.box.setInteractive();
        this.box.on('pointerup', function (pointer) {
			UI.readDialogueLine();
   	 	});

        this.avatarHeight = this.height*0.8;

        this.avatarX = this.x - this.avatarHeight*3.5;
        this.avatarY = this.y;

        this.avatar = this.scene.add.sprite(this.avatarX, this.avatarY, 'avatar')
        							.setDisplaySize(this.avatarHeight, this.avatarHeight);
        
        this.textX = this.avatarX + this.avatarHeight;
        this.textY = this.y - this.avatarHeight*0.5;
        this.text = this.scene.add.text(this.textX, this.textY, "Hello", { fontFamily: 'Arial', color: '#333333' });
	}

	toggleVisible(){
		if (this.visible){
			this.avatar.visible = false;
			this.box.visible = false;
			this.text.visible = false;
			this.visible = false;
		}
		else {
			this.avatar.visible = true;
			this.box.visible = true;
			this.text.visible = true;
			this.visible = true;
		}
	}

	print(text, avatar){
		this.addAvatar(avatar);
		this.text.setText(text);

		this.box.visible = true;
		this.visible = true;
		this.text.visible = true;
	}

	addAvatar(avatar){
		if(this.avatar) this.avatar.destroy();
		this.avatar = this.scene.add.sprite(this.avatarX, this.avatarY, avatar)
        							.setDisplaySize(this.avatarHeight, this.avatarHeight);
	}
}
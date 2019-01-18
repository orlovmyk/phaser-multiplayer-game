class Dialogue{
	static preload(game){
		game.load.image("avatar","sprites/avatar.png");
	}

	constructor(scene){
		this.scene = scene;
		this.visible = true;
		this.text;

		this.width = GAME_WIDTH - GAME_WIDTH/4;
		this.height = GAME_HEIGHT/5;

		this.x = GAME_WIDTH/2 - this.width/2;
		this.y = GAME_HEIGHT - GAME_HEIGHT/4;

		this.graphics = scene.add.graphics({ fillStyle: { color: 0x00ffff } });
        this.rect = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);

        this.avatarX = this.rect.x + this.width*0.1;
        this.avatarY = this.rect.y + this.height/2;
        this.avatarHeight = this.height*0.8;
        this.avatar = this.scene.add.sprite(this.avatarX, this.avatarY, 'avatar')
        							.setDisplaySize(this.avatarHeight, this.avatarHeight);

        this.textX = this.rect.x + this.width*0.2;
        this.textY = this.rect.y + this.height*0.1;

        this.graphics.fillRectShape(this.rect);
	}

	toggleVisible(){
		if (this.visible){
			this.avatar.visible = false;
			this.graphics.visible = false;
			this.text.visible = false;
			this.visible = false;
		}
		else {
			this.avatar.visible = true;
			this.graphics.visible = true;
			this.text.visible = true;
			this.visible = true;
		}
	}

	print(text){
		this.text = this.scene.add.text(this.textX, this.textY, text, { fontFamily: 'Arial', color: '#aa0000' });
	}

	addAvatar(avatar){

	}
}
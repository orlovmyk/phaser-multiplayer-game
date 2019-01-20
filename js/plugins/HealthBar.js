class HealthBar{
    static preload(){

        
    }

    constructor(scene){
        this.scene = scene;

        this.visible = true;

        this.width = (GAME_WIDTH/10)*4;
        this.height = 13;

        this.valueStart = 500;
        this.value = this.valueStart;

        this.graphicsBot = scene.add.graphics({ fillStyle: { color: 0x990000 } });
        this.rectBot = new Phaser.Geom.Rectangle(7, 7, this.width, this.height);

        this.graphicsTop = scene.add.graphics({ fillStyle: { color: 0x017000 } });
        this.rectTop = new Phaser.Geom.Rectangle(7, 7, this.width, this.height);

        this.graphicsBot.fillRectShape(this.rectBot);  
        this.graphicsTop.fillRectShape(this.rectTop);

    }

    damage(amount){
        if ((this.value - amount) < 0){
            this.value = 0;   
        }
        else {
            this.value -= amount;
        }

        this.graphicsTop.clear();
        this.rectTop.width = this.value * (this.width / this.valueStart);
        this.graphicsTop.fillRectShape(this.rectTop);
    }

    toggleVisible(){
        if(this.visible){
            this.graphicsTop.visible = false;
            this.graphicsBot.visible = false;
            this.visible = false;
        }

        else {
            this.graphicsTop.visible = true;
            this.graphicsBot.visible = true;
            this.visible = true;
        }
    }
}
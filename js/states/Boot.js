const config = {
  type: Phaser.WebGL, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "MainScene", // ID of the DOM element to add the canvas to
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }}
};

const Game = new Phaser.Game(config);

let map;
let layers = ["ground_bot", "ground_top", "trunk", "items", "tree_top"];
let layersColliding = ["ground_bot"];

let sprite;
let hitbox;

let container;

function preload() {
  // Runs once, loads up assets like images and audio
  map = new Map(this);
  map.loadMap("level1", "level1");

  this.load.spritesheet(
      "player",
      "sprites/player.png",
      {
        frameWidth: 40,
        frameHeight: 40
      }
  );
  this.load.image("empty_image", "sprites/empty_image.png");

}

function create() {
  //mainLayers["ground_bot"].setCollisionByProperty({ collides: true });
  map.createLayers(layers, "level1", layersColliding);
  


  //group = this.add.group();
  container = this.add.container();

  sprite = this.physics.add.sprite(300, 300, 'player');
  sprite.body.setSize(20, 10).setOffset(10, 30);

  hitbox = this.physics.add.sprite(300, 300, 'empty_image');
  hitbox.body.setSize(18, 35);



  cursors = this.input.keyboard.createCursorKeys();

  const Body = Phaser.Physics.Arcade.Body;
  

  const camera = this.cameras.main;
  camera.setBackgroundColor("#99ddff");

  this.cameras.main.startFollow(sprite, false, 0.5, 0.5);


  // Help text that has a "fixed" position on the screen
  let text = this.add
    .text(16, 16, "Ходить стрелочками", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 }
      //backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  //text.destroy();  ~working
  
  //player

  let config = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player'),
        frameRate: 10,
        yoyo: false,
        repeat: -1
    };

  this.anims.create(config);

  sprite.anims.load('walk');
  sprite.anims.play('walk');
  
  //group.add(sprite);

  //colission on debug on
  map.setCollision(sprite, "ground_bot");
  map.debugCollision("ground_bot");
  //map.spawnObjects();
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
    hitbox.x = sprite.x;
    hitbox.y = sprite.y;

    sprite.setVelocity(0);
    hitbox.setVelocity(0);

    if (cursors.left.isDown)
    {
        sprite.setVelocityX(-200);
        hitbox.setVelocityX(-200);
    }
    else if (cursors.right.isDown)
    {
        sprite.setVelocityX(200);
        hitbox.setVelocityX(200);
    }

    if (cursors.up.isDown)
    {
        sprite.setVelocityY(-200);
        hitbox.setVelocityY(-200);
    }
    else if (cursors.down.isDown)
    {
        sprite.setVelocityY(200);
        hitbox.setVelocityY(200);
    }   
}

function groupUpdate(child) {

}

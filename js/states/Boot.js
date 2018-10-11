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

const game = new Phaser.Game(config);
var sprite;
var hitbox;

var showDebug;
var debugGraphics;
var map;
var group;
var container;

function preload() {
  // Runs once, loads up assets like images and audio

  this.load.image("outside", "map/tiles/outside.png");
  this.load.tilemapTiledJSON("map", "map/levels/level1.json");
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

  map = this.make.tilemap({ key: "map" });

  const tileset = map.addTilesetImage("outside", "outside");

  const ground = map.createStaticLayer("ground-bot", tileset, 0, 0);
  map.createStaticLayer("ground-top", tileset, 0, 0);
  map.createStaticLayer("trunk", tileset, 0, 0);
  map.createStaticLayer("items", tileset, 0, 0);
  map.createStaticLayer("tree-top", tileset, 0, 0);

  ground.setCollisionByProperty({ collides: true });


  group = this.add.group();
  container = this.add.container();

  sprite = this.physics.add.sprite(300, 300, 'player');
  sprite.body.setSize(20, 10).setOffset(10, 30);

  hitbox = this.physics.add.sprite(300, 300, 'empty_image');
  hitbox.body.setSize(18, 35);



  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(sprite, ground);

  const Body = Phaser.Physics.Arcade.Body;
  

  const camera = this.cameras.main;
  camera.setBackgroundColor("#99ddff");

  this.cameras.main.startFollow(sprite, false, 0.5, 0.5);


  // Help text that has a "fixed" position on the screen
  var text = this.add
    .text(16, 16, "Ходить стрелочками", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 }
      //backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  //text.destroy();  ~working
  
  //player

  var config = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player'),
        frameRate: 10,
        yoyo: false,
        repeat: -1
    };

  this.anims.create(config);

  sprite.anims.load('walk');
  sprite.anims.play('walk');
  
  group.add(sprite);


  const debugGraphics = this.add.graphics().setAlpha(0.75);
      ground.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });
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
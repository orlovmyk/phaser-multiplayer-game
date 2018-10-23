//width: window.innerWidth       поменять для компиляции
const GAME_WIDTH = 800;

//height: window.innerHeight	   поменять для компиляции
const GAME_HEIGHT = 500;

const config = {
  type: Phaser.WebGL, // Which renderer to use

  width: GAME_WIDTH, // Canvas width in pixels
  height: GAME_HEIGHT, // Canvas height in pixels
  
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

let dpad;

let container;


function preload() {
  // Runs once, loads up assets like images and audio
  map = new Map(this);
  map.loadMap("level1", "level1");


  dpad = new Dpad(this);
  player = new Player(this);
}

function create() {
  map.createLayers(layers, "level1", layersColliding);
  
  player.spawn(300, 300);
  player.createCursors();
  player.loadAnims();
   
  dpad.create(100,100);

  //group = this.add.group();
  container = this.add.container();


  let test = this.physics.add.sprite(200, 300, 'player');
  test.setInteractive();
  this.input.setDraggable(test);
  this.input.on('drag', function (pointer, test, dragX, dragY) {

        test.x = dragX;
        test.y = dragY;

    });


  const camera = this.cameras.main;
  camera.setBackgroundColor("#99ddff");
  this.cameras.main.startFollow(player.getSprite(), false, 0.5, 0.5);


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


/*
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
*/
  
  //group.add(sprite);

  //colission on debug on
  map.setCollision(player.getSprite(), "ground_bot");
  map.debugCollision("ground_bot");
  //map.spawnObjects();
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
  player.update();
   
}

function groupUpdate(child) {

}

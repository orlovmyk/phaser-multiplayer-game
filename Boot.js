//width: window.innerWidth       поменять для компиляции
let GAME_WIDTH = 800;

//height: window.innerHeight	   поменять для компиляции
let GAME_HEIGHT = 400;

let Game;



const config = {
		type: Phaser.WebGL, // Which renderer to use

		width: GAME_WIDTH, // Canvas width in pixels
		height: GAME_HEIGHT, // Canvas height in pixels

		parent: "MainScene", // ID of the DOM element to add the canvas to
		pixelArt: true,
		scene: [
		  SceneBackground,
		  SceneGame,
		  SceneInterface
		],
		physics: {
		  default: "arcade",
		  arcade: {
		    debug: true,
		    gravity: { y: 0 }
		}},
		input: {
		    activePointers: 4
		}
	};

Game = new Phaser.Game(config); 
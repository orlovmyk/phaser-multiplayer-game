//width: window.innerWidth       поменять для компиляции
let GAME_WIDTH;

//height: window.innerHeight	   поменять для компиляции
let GAME_HEIGHT;

let Game;

/*
window.addEventListener('resize', function (event) {
    Game.resize(window.innerWidth, window.innerHeight);
}, false);
*/


document.addEventListener('deviceready', function (event) {
	
	GAME_WIDTH = window.screen.width * window.devicePixelRatio;
	GAME_HEIGHT = window.screen.height * window.devicePixelRatio; //window.innerHeight;

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
}, false);
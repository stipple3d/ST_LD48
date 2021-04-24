


let canvas, context, sceneManager, gameLoop;

//player room coords in the world (will be modified by the game as exits are used)
let playerRoomX = 0;
let playerRoomY = 0;
let playerMoveDir = '';

//for now, importing the tileMap image and storing it globally
//(will be moved to an assetMgr eventually)
let tileMapImage;


window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');

    // TOTO: determine if this is needed?
    context.imageSmoothingEnabled = false;

    //TODO: implement loading tilemap
    // LoadTileMap();
    Setup();
});

function LoadTileMap(){
	//set tileMapImage as a new Image
	tileMapImage = new Image();
	//set the onLoad callback for this image
	tileMapImage.onload = () => {
	    // the image is ready
	    //run setup function
	    Setup();
	};
	//set src for the image to start image load
	tileMapImage.src = blobSetData.imgPath;
}

function Setup(){
	//create a sceneManager and store in global REF
	sceneManager = new SceneManager();
	//register all scenes to the sceneManager
	for(var s = 0; s < config.scenes.length; s++){
		sceneManager.registerScene(config.scenes[s].name, config.scenes[s].class);
	}
	//init/store an instance of the gameLoop in the Global REF
	gameLoop = new GameLoop({fps: config.gameFPS, renderCallback: sceneManager.render, updateCallback: sceneManager.update});
	//load the first scene
	//TODO: specify this in the config file?
	sceneManager.gotoScene({
		index: config.initSceneIndex
	});
	//start loop
	gameLoop.startLoop();
}
/* const config = {
	// dynamicCanvas: true,
	// canvasID: "nesTimeTwoCanvas",
	// canvasWidth: 512,//512
	// canvasHeight: 480,//480
	// canvasMode: "2d",
	// canvasParent: "",
	scenes: [
		{name: "menu", class: MainMenuScene},
		// {name: "newPlayer", class: NewPlayerScene},
		// {name: "map", class: MapScene},
		// {name: "battle", class: BattleScene}
	],
	initSceneIndex: 0,
	gameFPS: 60,
	framesToCompleteTileMove: 30,
}; */
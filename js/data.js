const config = {
	// dynamicCanvas: true,
	// canvasID: "nesTimeTwoCanvas",
	// canvasWidth: 512,//512
	// canvasHeight: 480,//480
	// canvasMode: "2d",
	// canvasParent: "",
	scenes: [
		{name: "menu", class: MainMenuScene},
		{name: "room", class: RoomScene},
		{name: "roomTransition", class: RoomTransitionScene},
		// {name: "battle", class: BattleScene}
	],
	initSceneIndex: 0,
	gameFPS: 60,
	framesToCompleteTileMove: 30,
	//settings for min/max sizes for tile display
	minMapTileSize: 4,
	maxMapTileSize: 64,
	transitionTickDuration: 0.12,
	mapDisplayPadding: 10,
};

const unitDiagonalComponent = .70710678118;

const roomData_lrud = [
	0,0,0,0,1,1,1,0,0,0,0,
	0,1,1,1,1,1,1,1,1,1,0,
	0,1,1,1,1,1,1,1,1,1,0,
	1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,
	0,1,1,1,1,1,1,1,1,1,0,
	0,1,1,1,1,1,1,1,1,1,0,
	0,0,0,0,1,1,1,0,0,0,0
];
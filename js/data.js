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
};
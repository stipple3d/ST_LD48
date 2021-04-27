class MainMenuScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

        // console.log('MainMenuScene: INIT');

		//Init all player location, direction and extents data to defaults

		playerRoomX = 0;
		playerRoomY = 0;

		playerMoveDir = '';

		discoveredExtentsLeft = 0;
		discoveredExtentsRight = 0;
		discoveredExtentsUp = 0;
		discoveredExtentsDown = 0;

		playerComingFromDirection = '';

		//Init discovered rooms array & mark the initial tile as discovered
		discoveredRooms = [];
		discoveredRooms.push({x: 0, y: 0});

		//init the keyParts array & generate the locations of each part (the rooms it is in)
		keyParts = [];

		const minDistanceForKeyPart = 3;//6
		const maxDistanceForKeyPart = 12;//20
		const numKeyParts = 5;
		// const minDistBetweenKeyParts = 100;
		const minRotBetweenKeyParts = 60;
		const maxRotBetweenKeyParts = 80;

		//set initial rotation to a random direction from a circle
		let currTestRotation = Math.random() * 360;

		let currTestDist;
		let currTestX;
		let currTestY;
		let currObj;

		//radians = degrees * (Math.PI/180);

		for(var kp = 0; kp < numKeyParts; kp++){

			//iterate the rotation within the range
			currTestRotation += (Math.random() * (maxRotBetweenKeyParts - minRotBetweenKeyParts)) + minRotBetweenKeyParts;

			//pick random distance in range
			currTestDist = (Math.random() * (maxDistanceForKeyPart - minDistanceForKeyPart)) + minDistanceForKeyPart;

			//calc X/Y values
			currTestX = Math.floor(Math.cos(currTestRotation * (Math.PI/180)) * currTestDist);
			currTestY = Math.floor(Math.sin(currTestRotation * (Math.PI/180)) * currTestDist);

			// console.log(currTestX + ', ' + currTestY);

			//push the object into the keyParts array
			currObj = new Object();
			currObj.x = currTestX;
			currObj.y = currTestY;
			currObj.found = false;
			keyParts.push(currObj);
		}


		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        console.log('KEY PRESSED: ' + e.key);
		
		if(e.key == 'e'){
			//PLAY SELECTED

			hardMode = false;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'room'});
		}
		else if(e.key == 'h'){
			//PLAY SELECTED

			hardMode = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'room'});
		}
	}

	update = function(_deltaTime){
		//console.log('MainMenuScene: update Running');
	}

	render = function(){
		
		//check if we are to clear the BG on each render
		if(this.clearOnRender){
			//clear BG
			context.clearRect(0, 0, canvas.width, canvas.height);
		}

		context.save();
		//_____________________
		//draw elements

		//draw the distances out from the center point of the canvas as the "origin" and pick points for the key parts
		
		context.beginPath();
		context.textAlign = 'center';
		context.font = '40px Arial';
		context.fillStyle = '#8ac80b';
		context.fillText('EASY MODE  [ E ]', canvas.width /2, 200);
		context.fillText('HARD MODE  [ H ]', canvas.width /2, 450);

		context.beginPath();
		// context.textAlign = 'left';
		context.fillStyle = '#dce0e3';
		context.font = '30px Arial';
		context.fillText('Hinting toward the collection rooms is provided in rooms', canvas.width /2, 250);
		context.fillText('and on the transition screens between rooms.', canvas.width /2, 300);
		context.fillText('Hinting toward the collection rooms is provided', canvas.width /2, 500);
		context.fillText('ONLY IN THE ROOMS.', canvas.width /2, 550);
		context.fillText('( SUGGESTION: PLAY EASY FIRST! )', canvas.width /2, 650);


		if(config.debugDraw){

			/* context.beginPath();
			context.textAlign = 'center';
			context.fillStyle = '#dce0e3';
			context.font = '80px Arial';
			context.fillText('Deeply Random', canvas.width /2, 120); */

			//draw dot in the center of canvas for "origin"
			context.beginPath();
			context.fillStyle = 'white';
			context.arc(canvas.width /2, canvas.height /2, 2, 0, Math.PI *2);
			context.fill();

			for(var kp = 0; kp < keyParts.length; kp++){
				context.beginPath();
				context.fillStyle = 'red';
				context.arc((canvas.width /2) + keyParts[kp].x, (canvas.height /2) + keyParts[kp].y, 8, 0, Math.PI *2);
				context.fill();
			}

			context.beginPath();
			context.textAlign = 'left';
			context.font = '20px Arial';
			context.fillText('scene: ' + this.name, 30, 30);
		}
		

		//_____________________
		context.restore();
	}
}
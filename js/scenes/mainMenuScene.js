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

		//Init discovered rooms array & mark the initial tile as discovered
		discoveredRooms = [];
		discoveredRooms.push({x: 0, y: 0});

		//init the keyParts array & generate the locations of each part (the rooms it is in)
		keyParts = [];

		const minDistanceForKeyPart = 10;
		const maxDistanceForKeyPart = 200;
		const numKeyParts = 1;
		// const minDistBetweenKeyParts = 100;
		const minRotBetweenKeyParts = 10;
		const maxRotBetweenKeyParts = 60;

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

			console.log(currTestX + ', ' + currTestY);

			//push the object into the keyParts array
			currObj = new Object();
			currObj.x = currTestX;
			currObj.y = currTestY;
			keyParts.push(currObj);
		}


		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        console.log('KEY PRESSED: ' + e.key);
		
		if(e.key == 'p'){
			//PLAY SELECTED

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

		//draw dot in the center of canvas for "origin"
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(canvas.width /2, canvas.height /2, 2, 0, Math.PI *2);
		context.fill();

		//choose random starting angle and draw a line 200 in that direction

		console.log(keyParts.length);
		for(var kp = 0; kp < keyParts.length; kp){

			//console.log(keyParts[kp].x);

			context.beginPath();
			context.fillStyle = 'red';
			context.arc((canvas.width /2) + keyParts[kp].x, (canvas.height /2) + keyParts[kp].y, (kp *2) + 2, 0, Math.PI *2);
			context.fill();
		}
		


		context.beginPath();
		context.textAlign = 'center';
		context.fillStyle = '#dce0e3';
		context.font = '80px Arial';
		context.fillText('Deeply Random', canvas.width /2, 120);
		
		context.beginPath();
		context.font = '40px Arial';
		context.fillStyle = '#8ac80b';
		context.fillText('PLAY  [ P ]', canvas.width /2, canvas.height -40);


		context.beginPath();
		context.textAlign = 'left';
		context.font = '20px Arial';
		context.fillText('scene: ' + this.name, 30, 30);

		//_____________________
		context.restore();
	}
}
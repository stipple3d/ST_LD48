class RoomTransitionScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

        // console.log('MainMenuScene: INIT');

		//TODO: select random room distance in the chosen direction

		this.displayComplete = false;

		this.tickDuration = 0.2;
		this.tickTimer = this.tickDuration;
		this.ticksComplete = 0;

		this.distFromOriginInDirChosen = 0;
		this.distDisplay = this.distFromOriginInDirChosen;
		
		if(playerMoveDir == 'left' || playerMoveDir == 'right')
			this.distFromOriginInDirChosen = Math.abs(playerRoomX);
		else if(playerMoveDir == 'up' || playerMoveDir == 'down')
			this.distFromOriginInDirChosen = Math.abs(playerRoomY);

		this.minMove = 1;
		this.maxMove = 1;

		if(this.distFromOriginInDirChosen < 1){
			//no change from defaults
			this.minMove = 1;
			this.maxMove = 1;
		}
		else if(this.distFromOriginInDirChosen >= 1 && this.distFromOriginInDirChosen < 3){
			this.minMove = 1;
			this.maxMove = 2;
		}
		else if(this.distFromOriginInDirChosen >= 3 && this.distFromOriginInDirChosen < 5){
			this.minMove = 1;
			this.maxMove = 4;
		}
		else if(this.distFromOriginInDirChosen >= 5 && this.distFromOriginInDirChosen < 7){
			this.minMove = 1;
			this.maxMove = 6;
		}
		else if(this.distFromOriginInDirChosen >= 7 && this.distFromOriginInDirChosen < 9){
			this.minMove = 1;
			this.maxMove = 8;
		}
		else if(this.distFromOriginInDirChosen >= 9){
			this.minMove = 1;
			this.maxMove = 12;
		}
		else{
			console.log('unexpected value for distFromOriginInDirChosen');
		}

		this.randomNumOfRoomsInRange = Math.floor(Math.random() * this.maxMove) + 1;

		//TODO: show a map with:
		//		- all discovered extents shown
		//		- current tile highlighted
		//		- destination tile highlighted
		//		- path between current and destination "animated in grey"? (loops until transition complete?)

		//start distance display at minimum move dist
		//(result has already been this.distFromOriginInDirChosen, this is just for animation)
		this.distDisplay = this.minMove;

		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        console.log('KEY PRESSED: ' + e.key);

		//TODO: add a C to continue key handling
		//		(only if there was a previous save)
		
		if(this.displayComplete && e.key == 'r'){
			//room SELECTED

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'room'});

           
		}
		
	}

	update = function(_deltaTime){
		//console.log('MainMenuScene: update Running');

		if(this.displayComplete)
			return;

		//decrement the timer
		this.tickTimer -= _deltaTime;

		//if tick timer has expired
		if(this.tickTimer <= 0){
			//reset tick timer
			this.tickTimer = this.tickDuration;
			//add a completed tick
			this.ticksComplete ++;
			//check if all ticks have been completed
			if(this.ticksComplete >= 12){

				//set distDisplay to ACTUAL chosen number of rooms
				this.distDisplay = this.randomNumOfRoomsInRange;

				//adjust room X/Y values to reflect move
				if(playerMoveDir == 'left')
					playerRoomX -= this.randomNumOfRoomsInRange;
				else if(playerMoveDir == 'right')
					playerRoomX += this.randomNumOfRoomsInRange;
				else if(playerMoveDir == 'up')
					playerRoomY -= this.randomNumOfRoomsInRange;
				else if(playerMoveDir == 'down')
					playerRoomY += this.randomNumOfRoomsInRange;

				//mark display complete to activate continue key
				this.displayComplete = true;
			}
			else{
				this.distDisplay ++;
				if(this.distDisplay > this.maxMove)
					this.distDisplay = this.minMove;
			}
		}
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
		
		if(this.displayComplete){
			context.beginPath();
			context.font = '40px Arial';
			context.textAlign = 'center';
			context.fillStyle = '#8ac80b';
			context.fillText('GOTO ROOM  [ R ]', canvas.width /2, canvas.height -40);
	
		}
		
		context.beginPath();
		context.font = '40px Arial';
		context.fillStyle = '#8ac80b';
		context.textAlign = 'left';
		context.font = '20px Arial';
		context.fillText('scene: ' + this.name, 30, 30);

		context.fillText('direction Chosen: ' + playerMoveDir, 30, 60);
		
		context.fillText('maxMoves: ' + this.maxMove, 30, 90);
		context.fillText('movesChosen: ' + this.randomNumOfRoomsInRange, 30, 120);
		context.fillText('direction From Origin in Dir: ' + this.distFromOriginInDirChosen, 30, 150);
		context.fillText('roomCoords: ' + playerRoomX + ', ' + playerRoomY, 30, 180);

		context.font = '40px Arial';
		context.fillText('MOVING ' + this.distDisplay + ' rooms in the ' + playerMoveDir + ' DIRECTION', 30, 250);

		//_____________________
		context.restore();
	}
}
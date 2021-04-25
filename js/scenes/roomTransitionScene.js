class RoomTransitionScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

		//mark display complete as false
		this.displayComplete = false;

		//setup ticks (for counter/animations)
		this.tickTimer = config.transitionTickDuration;
		this.ticksComplete = 0;

		this.distFromOriginInDirChosen = 0;
		this.distDisplay = 0;
		
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
		

		//MAP

		//at this point the current room should already be marked as discoverd (last move)

		//holders for the temporary map extents
		//(will include the max number of possible moves in the direction selected, for display of path)

		//bring in the existing exents min/max for X/Y
		this.tempExtentsLeft = playerExtentsMinX;
		this.tempExtentsRight = playerExtentsMaxX;
		this.tempExtentsUp = playerExtentsMinY;
		this.tempExtentsDown = playerExtentsMaxY;

		//add more in the direction of potential in direction of travel (max possible move)
		//(adjust extents if necesssary)
		if(playerMoveDir == 'left' && playerRoomX - this.maxMove < this.tempExtentsLeft){
			this.tempExtentsLeft = playerRoomX - this.maxMove;
		}
		else if(playerMoveDir == 'right' && playerRoomX + this.maxMove > this.tempExtentsRight){
			this.tempExtentsRight = playerRoomX + this.maxMove;
		}
		else if(playerMoveDir == 'up' && playerRoomY - this.maxMove < this.tempExtentsUp){
			this.tempExtentsUp = playerRoomY - this.maxMove;
		}
		else if(playerMoveDir == 'down' && playerRoomY + this.maxMove > this.tempExtentsDown){
			this.tempExtentsDown = playerRoomY + this.maxMove;
		}

		//offsets for where the map ros/cols start (index values)
		//NOTE: these should be this.tempExtentsLeft and this.tempExtentsUp
		// this.topLeftMapColIndex = 0;
		// this.topLeftMapRowIndex = 0;

		//create an empty array to hold the rows in the temp map to be displayed
		this.tempMapRowsArray = [];

		this.rowsHigh = (this.tempExtentsDown - this.tempExtentsUp) +1;
		this.colsWide = (this.tempExtentsRight - this.tempExtentsLeft) +1;

		//loop through and create new rows for the range needed
		console.log("extents LRUD: " + this.tempExtentsLeft + ', ' + this.tempExtentsRight + ', ' + this.tempExtentsUp + ', ' + this.tempExtentsDown);

		console.log('LR width: ' + this.colsWide + ', UD height: ' + this.rowsHigh);

		for(var row = 0; row < this.rowsHigh; row ++){
			//create an empty array to hold the column values
			this.tempMapRowsArray[row] = [];
			for(var col = 0; col < this.colsWide; col ++){
				this.tempMapRowsArray[row][col] = 0;//zero for undiscovered and not the current room
			}
		}

		this.mapDisplayAreaWidth = 720;
		this.mapDisplayAreaHeight = 540;
		this.mapTLX = 40;
		this.mapTLY = 90;

		//TODO: show a map with:
		//		- all discovered extents shown
		//		- current tile highlighted
		//		- destination tile highlighted
		//		- path between current and destination "animated in grey"? (loops until transition complete?)

		//start distance display at minimum move dist
		//(result has already been this.distFromOriginInDirChosen, this is just for animation)
		this.distDisplay = 0;

		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        //console.log('KEY PRESSED: ' + e.key);
		
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
			this.tickTimer = config.transitionTickDuration;
			//add a completed tick
			this.ticksComplete ++;
			//check if all ticks have been completed
			if(this.ticksComplete >= 24){

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
				
				//mark the initial tile as discovered
				discoveredRooms.push({x: playerRoomX, y: playerRoomY});
				
				//adjust min/max extents if necessary
				if(playerRoomX < playerExtentsMinX)
					playerExtentsMinX = playerRoomX;
				if(playerRoomY < playerExtentsMinY)
					playerExtentsMinY = playerRoomY;
				if(playerRoomX > playerExtentsMaxX)
					playerExtentsMaxX = playerRoomX;
				if(playerRoomY > playerExtentsMaxY)
					playerExtentsMaxY = playerRoomY;

				//mark display complete to activate continue key
				this.displayComplete = true;
			}
			else{
				this.distDisplay ++;
				if(this.distDisplay > this.maxMove)
					this.distDisplay = 0;
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

		//MAP

		context.beginPath();
		context.strokeStyle = "#999999";
		context.rect(this.mapTLX, this.mapTLY, this.mapDisplayAreaWidth, this.mapDisplayAreaHeight)
		context.stroke();

		const mapDisplayPadding = 10;

		let mapTilesTLStartX = this.mapTLX + mapDisplayPadding;
		let mapTilesTLStartY = this.mapTLY + mapDisplayPadding;
		let mapTileSize = Math.floor((this.mapDisplayAreaWidth - mapDisplayPadding *2) / this.tempMapRowsArray[0].length);
		console.log('map' + mapTileSize);

		if(Math.floor((this.mapDisplayAreaHeight - mapDisplayPadding *2) / this.tempMapRowsArray.length) < mapTileSize)
			mapTileSize = Math.floor((this.mapDisplayAreaHeight - mapDisplayPadding *2) / this.tempMapRowsArray.length);
		console.log('map' + mapTileSize);

		for(var row = 0; row < this.tempMapRowsArray.length; row ++){
			for(var col = 0; col < this.tempMapRowsArray[row].length; col ++){
				if(this.tempMapRowsArray[row][col] == 0){
					context.beginPath();
					context.fillStyle = "#336699";
					context.rect(mapTilesTLStartX + (col * mapTileSize) +1, mapTilesTLStartY + (row * mapTileSize) +1, mapTileSize -2, mapTileSize -2)
					context.fill();
				}
			}
		}

		//TEXT
		
		if(this.displayComplete){
			context.beginPath();
			context.font = '20px Arial';
			context.textAlign = 'center';
			context.fillStyle = '#8ac80b';
			context.fillText('GO TO ROOM  [ R ]', canvas.width /2, canvas.height -8);
	
		}
		
		context.beginPath();
		context.font = '40px Arial';
		context.fillStyle = '#8ac80b';
		context.textAlign = 'left';
		context.font = '20px Arial';

		//debug text
		/* context.fillText('scene: ' + this.name, 30, 30);
		context.fillText('direction Chosen: ' + playerMoveDir, 30, 60);
		context.fillText('maxMoves: ' + this.maxMove, 30, 90);
		context.fillText('movesChosen: ' + this.randomNumOfRoomsInRange, 30, 120);
		context.fillText('direction From Origin in Dir: ' + this.distFromOriginInDirChosen, 30, 150);
		context.fillText('roomCoords: ' + playerRoomX + ', ' + playerRoomY, 30, 180); */

		//display BG BOXES
		context.beginPath();
		context.strokeStyle = "#FFFFFF";
		context.rect(250, 10, 80, 80);
		context.stroke();

		context.beginPath();
		context.strokeStyle = "#FFFFFF";
		context.rect(500, 10, 160, 80);
		context.stroke();

		//display text
		context.font = '40px Arial';
		context.fillStyle = '#FFFFFF';
		context.textAlign = 'right';
		context.fillText('MOVING', 240, 70);
		context.fillText('ROOMS', 490, 70);
		context.font = '60px Arial';
		context.fillStyle = '#8ac80b';
		context.textAlign = 'center';
		context.fillText(this.distDisplay.toString(), 290, 70);
		context.fillText(playerMoveDir, 580, 70);

		//_____________________
		context.restore();
	}
}
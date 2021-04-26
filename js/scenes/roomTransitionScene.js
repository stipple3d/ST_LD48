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

		//init distance from origin value (in direction of input)
		this.distFromOriginInDirChosen = 0;
		//update distance from origin based on input direction
		if(playerMoveDir == 'left' || playerMoveDir == 'right')
			this.distFromOriginInDirChosen = Math.abs(playerRoomX);
		else if(playerMoveDir == 'up' || playerMoveDir == 'down')
			this.distFromOriginInDirChosen = Math.abs(playerRoomY);

		//init min/max move range vars
		this.minMove = 1;
		this.maxMove = 1;

		//update min/max move range based on distance from origin in the direction of travel
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

		//select the CHOSEN destination room within the min/max range
		//TODO: currently, this calc assumes a min is always 1, if that is not the case, this
		//		will need to change
		this.randomNumOfRoomsInRange = Math.floor(Math.random() * this.maxMove) + 1;

		//NOTE: at this point the current room should already be marked as discoverd (last move)

		//vars to hold the temporary EXTENDED map extents
		//bring in the existing exents min/max for X/Y extents
		this.tempExtentsLeft = discoveredExtentsLeft;
		this.tempExtentsRight = discoveredExtentsRight;
		this.tempExtentsUp = discoveredExtentsUp;
		this.tempExtentsDown = discoveredExtentsDown;

		//EXPAND THE EXTENTS in the direction of potential travel (max possible move)
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

		//if we are forcing display of all key parts (EASY MODE), 
		//expand the extents to include all of the keyPrt rooms as well
		if(!hardMode){
			for(var kpr = 0; kpr < keyParts.length; kpr++){
				if(keyParts[kpr].x < this.tempExtentsLeft)
					this.tempExtentsLeft = keyParts[kpr].x;
				if(keyParts[kpr].x > this.tempExtentsRight)
					this.tempExtentsRight = keyParts[kpr].x;
				if(keyParts[kpr].y < this.tempExtentsUp)
					this.tempExtentsUp = keyParts[kpr].y;
				if(keyParts[kpr].y > this.tempExtentsDown)
					this.tempExtentsDown = keyParts[kpr].y;
			}
		}
		

		//in addition to rendering all discovered rooms and the current Room, 
		//		we need to highlight the potential move tiles as the counter is spinning
		//make an array of all the potential move tiles, in order away from the current room, 
		//		in the direction of move, not counting the current room
		//		(the number of these that is rendered will match the counter display)

		//create an empty array to hold the potential move tiles to be animated
		this.potentialMoveTiles = [];

		//for each direction, fill the array with the possible moves in the selected direction
		if(playerMoveDir == 'left'){
			for(var i = 1; i < this.maxMove +1; i++){
				this.potentialMoveTiles.push({x: playerRoomX - i, y: playerRoomY});
			}
		}
		else if(playerMoveDir == 'right'){
			for(var i = 1; i < this.maxMove +1; i++){
				this.potentialMoveTiles.push({x: playerRoomX + i, y: playerRoomY});
			}
		}
		else if(playerMoveDir == 'up'){
			for(var i = 1; i < this.maxMove +1; i++){
				this.potentialMoveTiles.push({x: playerRoomX, y: playerRoomY - i});
			}
		}
		else if(playerMoveDir == 'down'){
			for(var i = 1; i < this.maxMove +1; i++){
				this.potentialMoveTiles.push({x: playerRoomX, y: playerRoomY + i});
			}
		}

		//calculate the tilesWide and TilesHigh for the EXTENDED extents to be displlayed
		this.rowsHighExtended = (this.tempExtentsDown - this.tempExtentsUp) +1;
		this.colsWideExtended = (this.tempExtentsRight - this.tempExtentsLeft) +1;

		this.mapDisplayAreaWidth = 720;
		this.mapDisplayAreaHeight = 540;
		this.mapDisplayAreaTLX = 40;
		this.mapDisplayAreaTLY = 90;

		//start out distance display value as ZERO
		//(ZERO is not a possible amount, but this will be used by counter and animations
		//	and will make sense visually)
		//NOTE: actual move result has already been selected. This is just for visual effect/clarity
		this.distDisplay = 0;

		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        //console.log('KEY PRESSED: ' + e.keyCode);
		
		if(this.displayComplete && e.keyCode == 32){
			//CONTINUE SELECTED

			e.preventDefault();

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
			if(this.ticksComplete >= this.randomNumOfRoomsInRange + (this.maxMove *2)){

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
				//(if it is not already marked as discovered)
				let dupFound = false;
				for(var dr = 0; dr < discoveredRooms.length; dr++){
					if(discoveredRooms[dr].x == playerRoomX && discoveredRooms[dr].y == playerRoomY){
						dupFound = true;
						break;
					}
				}
				if(!dupFound)
					discoveredRooms.push({x: playerRoomX, y: playerRoomY});

				//adjust min/max extents if necessary
				if(playerRoomX < discoveredExtentsLeft)
				discoveredExtentsLeft = playerRoomX;
				if(playerRoomY < discoveredExtentsUp)
				discoveredExtentsUp = playerRoomY;
				if(playerRoomX > discoveredExtentsRight)
				discoveredExtentsRight = playerRoomX;
				if(playerRoomY > discoveredExtentsDown)
				discoveredExtentsDown = playerRoomY;

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

		

		//calc the map tile size (factoring padding within the bounds of the area for displaying map)
		let mapTileSize = Math.floor((this.mapDisplayAreaWidth - config.mapDisplayPadding *2) / this.colsWideExtended);

		//if the vertical mapTileSize calculation woudl result in a LOWER size, use that instead
		if(Math.floor((this.mapDisplayAreaHeight - config.mapDisplayPadding *2) / this.rowsHighExtended) < mapTileSize)
			mapTileSize = Math.floor((this.mapDisplayAreaHeight - config.mapDisplayPadding *2) / this.rowsHighExtended);
		
		//constrain the map tile size to min/max values (from config settings)
		if(mapTileSize < config.minMapTileSize)
			mapTileSize = config.minMapTileSize;
		if(mapTileSize > config.maxMapTileSize)
			mapTileSize = config.maxMapTileSize;

		//calc the total map width/height to be displayed
		let mapTileTotalWidthToDisplay = this.colsWideExtended * mapTileSize;
		let mapTileTotalHeightToDisplay = this.rowsHighExtended * mapTileSize;

		//calc the TL corner of the mapTiles in display (factoring in padding and centering the map in within the display area)
		// let mapTilesTLStartX = this.mapDisplayAreaTLX + config.mapDisplayPadding;
		let mapTilesTLStartX = ((this.mapDisplayAreaWidth - mapTileTotalWidthToDisplay) /2) + this.mapDisplayAreaTLX;
		let mapTilesTLStartY = ((this.mapDisplayAreaHeight - mapTileTotalHeightToDisplay) /2) + this.mapDisplayAreaTLY;

		let xAdjustment, yAdjustment;

		//loop through and draw each of the discovered rooms in correct place relative to map on screen
		for(var dr = 0; dr < discoveredRooms.length; dr++){
			xAdjustment = discoveredRooms[dr].x - this.tempExtentsLeft;
			yAdjustment = discoveredRooms[dr].y - this.tempExtentsUp;

			//console.log(discoveredRooms[dr].x + ', ' + discoveredRooms[dr].y + ' -- ' + playerRoomX + ', ' + playerRoomY);
			context.beginPath();
			if(playerRoomX == discoveredRooms[dr].x && playerRoomY == discoveredRooms[dr].y)
				context.fillStyle = "#8ac80b";
			else
				context.fillStyle = "#D3D8E1";
			context.rect(mapTilesTLStartX + (xAdjustment * mapTileSize) +1, mapTilesTLStartY + (yAdjustment * mapTileSize) +1, mapTileSize -2, mapTileSize -2)
			context.fill();
		}

		//display the number of potential move tiles from the array to match the value in
		//this.distDisplay
		for(var pm = 0; pm <= this.distDisplay; pm++){
			if(pm != 0){

				xAdjustment = this.potentialMoveTiles[pm-1].x - this.tempExtentsLeft;
				yAdjustment = this.potentialMoveTiles[pm-1].y - this.tempExtentsUp;
				
				context.beginPath();
				context.fillStyle = "#909087";
				// context.rect(mapTilesTLStartX + (xAdjustment * mapTileSize) +1, mapTilesTLStartY + (yAdjustment * mapTileSize) +1, mapTileSize -2, mapTileSize -2)
				context.arc(mapTilesTLStartX + (xAdjustment * mapTileSize) + (mapTileSize /2), mapTilesTLStartY + (yAdjustment * mapTileSize) + (mapTileSize /2), mapTileSize /4, 0, Math.PI *2)
				context.fill();
			}
		}

		//draw a small highlight circle on origin room (for REF)
		xAdjustment = 0 - this.tempExtentsLeft;
		yAdjustment = 0 - this.tempExtentsUp;
		context.beginPath();
		context.fillStyle = "black";
		context.arc(mapTilesTLStartX + (xAdjustment * mapTileSize) + (mapTileSize /2), mapTilesTLStartY + (yAdjustment * mapTileSize) + (mapTileSize /2),(mapTileSize *.25), 0, Math.PI *2)
		context.fill();

		


		//if we are forcing display of all key parts (config setting), 
		//draw each key part room as a bordered box
		if(!hardMode){
			for(var kpr = 0; kpr < keyParts.length; kpr++){
				if(!keyParts[kpr].found){
					xAdjustment = keyParts[kpr].x - this.tempExtentsLeft;
					yAdjustment = keyParts[kpr].y - this.tempExtentsUp;

					context.beginPath();
					context.fillStyle = keyPartColors[kpr];
					context.rect(mapTilesTLStartX + (xAdjustment * mapTileSize) +1, mapTilesTLStartY + (yAdjustment * mapTileSize) +1, mapTileSize -2, mapTileSize -2)
					context.fill();
				}
				
			}
		}

		if(config.debugDraw){
			//draw a border around the mapTileExtents
			context.beginPath();
			context.strokeStyle = "blue";
			context.rect(mapTilesTLStartX, mapTilesTLStartY, mapTileTotalWidthToDisplay, mapTileTotalHeightToDisplay)
			context.stroke();

			//draw a border around the mapDisplayArea
			context.beginPath();
			context.strokeStyle = "red";
			context.rect(this.mapDisplayAreaTLX, this.mapDisplayAreaTLY, this.mapDisplayAreaWidth, this.mapDisplayAreaHeight)
			context.stroke();

			//draw a circle border around the current tile
			xAdjustment = playerRoomX - this.tempExtentsLeft;
			yAdjustment = playerRoomY - this.tempExtentsUp;
			context.beginPath();
			context.lineWidth = 2;
			context.setLineDash([10, 4]);
			context.strokeStyle = "yellow";
			context.arc(mapTilesTLStartX + (xAdjustment * mapTileSize) + (mapTileSize /2), mapTilesTLStartY + (yAdjustment * mapTileSize) + (mapTileSize /2),(mapTileSize *.55), 0, Math.PI *2)
			context.stroke();
		}

		
		

		//TEXT
		
		if(this.displayComplete){
			context.beginPath();
			context.font = '20px Arial';
			context.textAlign = 'center';
			context.fillStyle = '#8ac80b';
			context.fillText('CONTINUE [ SPACE ]', canvas.width /2, canvas.height -8);
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
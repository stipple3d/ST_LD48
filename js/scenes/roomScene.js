class RoomScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

        this.directionChosen = false;

		this.mapDisplayAreaWidth = 704;
		this.mapDisplayAreaHeight = 704;
		this.mapDisplayAreaTLX = (canvas.width - this.mapDisplayAreaWidth) /2;
		this.mapDisplayAreaTLY = (canvas.height - this.mapDisplayAreaHeight) /2;

		this.roomRows = 11;
		this.roomCols = 11;

		this.roomTileSize = 64;

		this.playerCollideWidth = 48;
		this.playerCollideHeight = 56;

		this.playerTrails = [];
		this.trailTimeTick = 0.1;
		this.trailTimeCounter = this.trailTimeTick;
		this.playerRadius = 24;

		this.displayFoundMessage = false;
		this.weAreInKeyRoomIndex = -1;
		for(var kp = 0; kp < keyParts.length; kp++){
			if(keyParts[kp].x == playerRoomX && keyParts[kp].y == playerRoomY){
				this.weAreInKeyRoomIndex = kp;
				if(keyParts[kp].found != true){
					keyParts[kp].found = true;
					this.displayFoundMessage = true;
				}
				break;
			}
		}

		this.partsLeft = 5;
		for(var kp = 0; kp < keyParts.length; kp++){
			if(keyParts[kp].found == true){
				this.partsLeft --;
			}
		}

		if(this.partsLeft <= 0){
			sceneManager.gotoScene({name: 'win'});
		}

		//TODO: **********************************
		//		conditions for player position depending on if there is a direction coming from
		if(playerComingFromDirection == 'left'){
			this.playerPosX = this.mapDisplayAreaTLX + (this.roomTileSize * 1);
			this.playerPosY = this.mapDisplayAreaTLY + (this.mapDisplayAreaHeight /2) - (this.playerCollideHeight /2);
		}
		else if(playerComingFromDirection == 'right'){
			this.playerPosX = this.mapDisplayAreaTLX + (this.roomTileSize * 9);
			this.playerPosY = this.mapDisplayAreaTLY + (this.mapDisplayAreaHeight /2) - (this.playerCollideHeight /2);
		}
		else if(playerComingFromDirection == 'above'){
			this.playerPosX = this.mapDisplayAreaTLX + (this.mapDisplayAreaWidth /2) - (this.playerCollideWidth /2);
			this.playerPosY = this.mapDisplayAreaTLY + (this.roomTileSize * 1);
		}
		else if(playerComingFromDirection == 'below'){
			this.playerPosX = this.mapDisplayAreaTLX + (this.mapDisplayAreaWidth /2) - (this.playerCollideWidth /2);
			this.playerPosY = this.mapDisplayAreaTLY + (this.roomTileSize * 9);
		}
		else{
			this.playerPosX = this.mapDisplayAreaTLX + (this.mapDisplayAreaWidth /2) - (this.playerCollideWidth /2);
			this.playerPosY = this.mapDisplayAreaTLY + (this.roomTileSize * 3);
		}

		//currently, center spawn
		//NOTE: player Postion is the TL point (only have to adjust for collisions at B & R dirs)
		
		/* OLD (BEFORE ADDING MULT SPOAWN POINTS)
		this.playerPosX = this.mapDisplayAreaTLX + (this.mapDisplayAreaWidth /2) - (this.playerCollideWidth /2);
		this.playerPosY = this.mapDisplayAreaTLY + (this.mapDisplayAreaHeight /2) - (this.playerCollideHeight /2); */

		this.leftTriggerX = this.mapDisplayAreaTLX + (this.roomTileSize * 0.7);
		this.rightTriggerX = (this.mapDisplayAreaTLX + this.mapDisplayAreaWidth) - (this.roomTileSize * 0.7);
		this.topTriggerY = this.mapDisplayAreaTLY + (this.roomTileSize * 0.7);
		this.bottomTriggerY = (this.mapDisplayAreaTLY + this.mapDisplayAreaHeight) - (this.roomTileSize * 0.7);

		this.leftRoomBoundsX = this.mapDisplayAreaTLX + this.roomTileSize;
		this.rightRoomBoundsX = (this.mapDisplayAreaTLX + this.mapDisplayAreaWidth) - this.roomTileSize;
		this.topRoomBoundsY = this.mapDisplayAreaTLY + this.roomTileSize;
		this.bottomRoomBoundsY = (this.mapDisplayAreaTLY + this.mapDisplayAreaHeight) - this.roomTileSize;

		this.tbDoorLeftX = this.mapDisplayAreaTLX + (this.roomTileSize * 4);
		this.tbDoorRightX = this.mapDisplayAreaTLX + (this.roomTileSize * 7);
		this.sideDoorTopY = this.mapDisplayAreaTLY + (this.roomTileSize *4);
		this.sideDoorBottomY = this.mapDisplayAreaTLY + (this.roomTileSize *7);

		this.statusDisplayText = '';

		this.xInput = 0;
		this.yInput = 0;

		this.upPressed = false;
		this.downPressed = false;
		this.leftPressed = false;
		this.rightPressed = false;

		this.speedFactor = 250.0;

		this.keyParticalVisuals = [];

		//calculate the direction to all of the remaining keyparts
		for(var kp = 0; kp < keyParts.length; kp++){

			if(!keyParts[kp].found){
				//TODO: add a keyParts particle class to an array and send it the current room X/Y
				//		(it will be able to generate particals moving from a point just outside of the 
				//		room to EITHER a point just inside the room, or a point just beyond the opposite
				//		side of the room)
				this.keyParticalVisuals.push(new KeyParticlesVisual(kp, playerRoomX, playerRoomY, this.mapDisplayAreaWidth, this.mapDisplayAreaHeight, this.mapDisplayAreaTLX, this.mapDisplayAreaTLY));

			}
		}

        // console.log('MainMenuScene: INIT');
		document.addEventListener("keydown", this.keyPressHandler);
		document.addEventListener("keyup", this.keyReleaseHandler);
	}

	end = function(){

		document.removeEventListener("keydown", this.keyPressHandler);
		document.removeEventListener("keyup", this.keyReleaseHandler);
	}

	keyPressHandler = (e) =>{

        /* if(this.directionChosen)
            return; */

        //console.log('KEY PRESSED: ' + e.key);
		
		if(e.key == 'm'){
			//MENU SELECTED (Instant exit)

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'menu'});
		}
		else if(e.key == 'w'){
			//UP INPUT
			this.upPressed = true;
		}
        else if(e.key == 'a'){
			//LEFT INPUT
			this.leftPressed = true;
		}
        else if(e.key == 's'){
			//DOWN INPUT
			this.downPressed = true;
		}
        else if(e.key == 'd'){
			//RIGHT INPUT
			this.rightPressed = true;
		}
	}

	keyReleaseHandler = (e) =>{

        if(e.key == 'w'){
			//UP RELEASE
			this.upPressed = false;
		}
        else if(e.key == 'a'){
			//LEFT RELEASE
			this.leftPressed = false;
		}
        else if(e.key == 's'){
			//DOWN RELEASE
			this.downPressed = false;
		}
        else if(e.key == 'd'){
			//RIGHT RELEASE
			this.rightPressed = false;
		}
	}

	update = function(_deltaTime){

		//console.log('MainMenuScene: update Running');

		//decrement player trail sizes and remove if at zero
		for(var t = this.playerTrails.length -1; t >= 0; t--){
			this.playerTrails[t].size --;
			if(this.playerTrails[t].size <= 0){
				this.playerTrails.pop();
			}
		}

		//handle player trails
		this.trailTimeCounter -= _deltaTime;
		if(this.trailTimeCounter <= 0){
			//reset counter and handle tick
			this.trailTimeCounter = this.trailTimeTick;
			let tObj = new Object();
			tObj.centerX = this.playerPosX + (this.playerCollideWidth /2);
			tObj.centerY = this.playerPosY + (this.playerCollideHeight /2);
			tObj.size = this.playerRadius -2;
			this.playerTrails.push(tObj);
		}
		// console.log('trails: ' + this.playerTrails.length);


		//call update on any keyPartVisual classes in the array
		for(var kpv = 0; kpv < this.keyParticalVisuals.length; kpv++){
			this.keyParticalVisuals[kpv].update(_deltaTime);
		}

		//zero out input from last frame
		this.xInput = 0;
		this.yInput = 0;

		//read in input values for each direction
		if(this.leftPressed)
			this.xInput -= 1;
		if(this.rightPressed)
			this.xInput += 1;
		if(this.upPressed)
			this.yInput -= 1;
		if(this.downPressed)
			this.yInput += 1;

		let potMoveX = 0;
		let potMoveY = 0;

		//if no input, return out (no update needed)
		if(this.xInput == 0 && this.yInput == 0)
			return;
		//input in only X axis
		else if(this.xInput != 0 && this.yInput == 0){
			//apply full speed in X axis
			potMoveX = this.speedFactor * _deltaTime * this.xInput;
		}
		//input in only Y axis
		else if(this.xInput == 0 && this.yInput != 0){
			//apply full speed in X axis
			potMoveY = this.speedFactor * _deltaTime * this.yInput;
		}
		else{
			//input in both X/Y axis (apply X/Y to equal full speed TOTAL)

			//scale down X/Y values to result in a TOTAL vector of 1.0 (.70715)
			this.xInput *= unitDiagonalComponent;
			this.yInput *= unitDiagonalComponent;

			//apply full speed in X and Y axis
			potMoveX = this.speedFactor * _deltaTime * this.xInput;
			potMoveY = this.speedFactor * _deltaTime * this.yInput;
			
		}

		
		

		this.statusDisplayText = potMoveX + ', ' + potMoveY;

		//check collisions and adjust/constrain X/Y move as necessary
		if(potMoveX > 0){
			//moving right

			if(this.playerPosX + potMoveX + this.playerCollideWidth > this.rightRoomBoundsX){
				//would be over right bounds
				if(this.playerPosY > this.sideDoorTopY && this.playerPosY + this.playerCollideHeight < this.sideDoorBottomY){
					//player is moving right into the doorway, allow it
					this.playerPosX += potMoveX;
				}
				else{
					//player is colliding with the left wall, constrain it to the wall boundary
					this.playerPosX = this.rightRoomBoundsX - this.playerCollideWidth;
				}
			}
			else{
				this.playerPosX += potMoveX;
			}

		}
		else if(potMoveX < 0){
			//moving left
			if(this.playerPosX + potMoveX < this.leftRoomBoundsX){
				//would be over left bounds
				if(this.playerPosY > this.sideDoorTopY && this.playerPosY + this.playerCollideHeight < this.sideDoorBottomY){
					//player is moving left into the doorway, allow it
					this.playerPosX += potMoveX;
				}
				else{
					//player is colliding with the left wall, constrain it to the wall boundary
					this.playerPosX = this.leftRoomBoundsX;
				}
			}
			else{
				this.playerPosX += potMoveX;
			}
		}

		if(potMoveY > 0){
			//moving down
			if(this.playerPosY + potMoveY + this.playerCollideHeight > this.bottomRoomBoundsY){
				//would be over the bottom bounds
				if(this.playerPosX > this.tbDoorLeftX && this.playerPosX + this.playerCollideWidth < this.tbDoorRightX){
					//player is moving down into the doorway, allow it
					this.playerPosY += potMoveY;
				}
				else{
					//player is colliding with the bottom wall, constrain it to the wall boundary
					this.playerPosY = this.bottomRoomBoundsY - this.playerCollideHeight;
				}
			}
			else{
				this.playerPosY += potMoveY;
			}
		}
		else if(potMoveY < 0){
			//moving up
			if(this.playerPosY + potMoveY < this.topRoomBoundsY){
				//would be over top bounds
				if(this.playerPosX > this.tbDoorLeftX && this.playerPosX + this.playerCollideWidth < this.tbDoorRightX){
					//player is moving up into the doorway, allow it
					this.playerPosY += potMoveY
				}
				else{
					//player is colliding with the top wall, constrain it to the wall boundary
					this.playerPosY = this.topRoomBoundsY;
				}
			}
			else{
				this.playerPosY += potMoveY
			}
		}

		this.statusDisplayText = '';

		if(this.playerPosX < this.leftTriggerX){
			this.statusDisplayText = 'LEFT TRIGGER ACTIVE';

			playerMoveDir = 'left';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
		}
		else if(this.playerPosX + this.playerCollideWidth > this.rightTriggerX){
			this.statusDisplayText = 'RIGHT TRIGGER ACTIVE';

			playerMoveDir = 'right';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
		}
		else if(this.playerPosY < this.topTriggerY){
			this.statusDisplayText = 'TOP TRIGGER ACTIVE';

			playerMoveDir = 'up';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
		}
		else if(this.playerPosY + this.playerCollideHeight > this.bottomTriggerY){
			this.statusDisplayText = 'BOTTOM TRIGGER ACTIVE';

			playerMoveDir = 'down';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
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

		

		let currentDataIndex = 0;

		// context.globalAlpha = .3;

		for(var row = 0; row < this.roomRows; row++){
			for(var col = 0; col < this.roomCols; col++){
				
				//draw tile
				context.beginPath();

				if(roomData_lrud[currentDataIndex] == 0){
					// context.globalAlpha = 1;
					if(this.weAreInKeyRoomIndex == -1){
						context.fillStyle = "#909087";
					}
					else{
						context.fillStyle = keyPartColors[this.weAreInKeyRoomIndex];
					}
				}
				else{
					// context.globalAlpha = .3;
					context.fillStyle = "#282729";
				}
					
					
				context.rect(this.mapDisplayAreaTLX + (col * this.roomTileSize) +1 , this.mapDisplayAreaTLY + (row * this.roomTileSize) +1 , this.roomTileSize -2, this.roomTileSize -2)
				context.fill();

				//increment currentIndex
				currentDataIndex ++;
			}
		}

		// context.globalAlpha = 1;

		if(config.debugDraw){

			//draw a border around the mapDisplayArea
			context.beginPath();
			context.strokeStyle = "red";
			context.rect(this.mapDisplayAreaTLX, this.mapDisplayAreaTLY, this.mapDisplayAreaWidth, this.mapDisplayAreaHeight)
			context.stroke();

			//draw room exit trigger box
			context.beginPath();
			context.strokeStyle = "yellow";
			context.rect(this.leftTriggerX, this.topTriggerY, this.rightTriggerX - this.leftTriggerX, this.bottomTriggerY - this.topTriggerY)
			context.stroke();

			context.beginPath();
			context.font = '40px Arial';
			context.textAlign = 'center';
			context.fillStyle = '#8ac80b';
			context.fillText(this.statusDisplayText, canvas.width /2, canvas.height /2 - 32);

			//draw player collision box
			context.beginPath();
			context.strokeStyle = "red";
			context.rect(this.playerPosX, this.playerPosY, this.playerCollideWidth, this.playerCollideHeight)
			context.stroke();

		}

		//call render on any keyPartVisual classes in the array
		for(var kpv = 0; kpv < this.keyParticalVisuals.length; kpv++){
			this.keyParticalVisuals[kpv].render();
		}

		// console.log('trailsToRender: ' + this.playerTrails.length);
		//render player trails
		for(var t = 0; t < this.playerTrails.length; t++){
			context.beginPath();
			context.fillStyle = "grey";
			context.arc(this.playerTrails.x, this.playerTrails.y, this.playerTrails.size, 0, Math.PI *2)
			context.fill();
		}

		//draw player circle
		context.beginPath();
		context.fillStyle = "#8ac80b";
		context.arc(this.playerPosX + (this.playerCollideWidth /2), this.playerPosY + (this.playerCollideHeight /2), this.playerRadius, 0, Math.PI *2)
		context.fill();

		
		if(this.displayFoundMessage){
			context.beginPath();
			context.font = '40px Arial';
			context.textAlign = 'center';
			if(this.weAreInKeyRoomIndex == -1){
				context.fillStyle = 'black';
			}
			else{
				context.fillStyle = keyPartColors[this.weAreInKeyRoomIndex];
			}
			
			context.fillText('YOU FOUND ELEMENT # ' + this.weAreInKeyRoomIndex, canvas.width /2, canvas.height /2 - 174);
			// context.fillText('ELEMENT #' + this.weAreInKeyRoomIndex, canvas.width /2, canvas.height /2 + 20);
		}


		context.beginPath();
		context.font = '20px Arial';
		context.textAlign = 'center';
		context.fillStyle = '#8ac80b';
		context.fillText('EXIT THE ROOM THROUGH A DOORWAY', canvas.width /2, canvas.height -8);
		context.textAlign = 'right';
		context.fillText('MENU  [ M ]', canvas.width -40, canvas.height -8);


		context.beginPath();
		context.textAlign = 'left';
		//context.fillText('scene: ' + this.name, 30, 30);
        context.fillText('roomCoords: ' + playerRoomX + ', ' + playerRoomY, 30, canvas.height -8);

		//_____________________
		context.restore();
	}
}
class KeyParticlesVisual{
	constructor(_kpi, _rmX, _rmY, _rmWidth, _rmHeight, _rmTLX, _rmTLY, _clr = 'purple'){
		
        this.keyPartIndex = _kpi;
        this.roomX = _rmX;
        this.roomY = _rmY;
        this.roomWidth = _rmWidth;
        this.roomHeight = _rmHeight;
        this.roomTL_x = _rmTLX;
        this.roomTL_y = _rmTLY;
        this.color = _clr;

        //TODO: from center of the currently loaded room, what is the direction 
        //      TOWARD the relative x/y location of the room with the keyPart in it

        //TODO: convert that into a normalized vector from the center of the room
        //TODO: multiply the magnitude of the X/Y components of the vector to find a relative point just outside the room
        //TODO: multiply the magnitude again to find a point a certain distance inside the room (or from center?)
        //TODO: set up keyParticals to send particals from the outside point to the iside point
	}

    update = function(_deltaTime){

		//console.log('MainMenuScene: update Running');

		
			
	}

	render = function(){

		context.save();
		//_____________________
		//draw elements

		//draw a border around the mapDisplayArea
		/* context.beginPath();
		context.strokeStyle = "red";
		context.rect(this.mapDisplayAreaTLX, this.mapDisplayAreaTLY, this.mapDisplayAreaWidth, this.mapDisplayAreaHeight)
		context.stroke();

		let currentDataIndex = 0;

		for(var row = 0; row < this.roomRows; row++){
			for(var col = 0; col < this.roomCols; col++){
				
				//draw tile
				context.beginPath();

				if(roomData_lrud[currentDataIndex] == 0)
					context.fillStyle = "black";
				else
					context.fillStyle = "grey";

				context.rect(this.mapDisplayAreaTLX + (col * this.roomTileSize) +1 , this.mapDisplayAreaTLY + (row * this.roomTileSize) +1 , this.roomTileSize -2, this.roomTileSize -2)
				context.fill();

				//increment currentIndex
				currentDataIndex ++;
			}
		}

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


		context.beginPath();
		context.font = '20px Arial';
		context.textAlign = 'center';
		context.fillStyle = '#8ac80b';
		context.fillText('EXIT THE ROOM THROUGH A DOORWAY', canvas.width /2, canvas.height -32);
		context.fillText('EXIT TO MENU  [ M ]', canvas.width /2, canvas.height -8);


		context.beginPath();
		context.textAlign = 'left';
		//context.fillText('scene: ' + this.name, 30, 30);
        context.fillText('roomCoords: ' + playerRoomX + ', ' + playerRoomY, 30, 20); */

		//_____________________
		context.restore();
	}
}
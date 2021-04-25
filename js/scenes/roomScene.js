class RoomScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

        this.directionChosen = false;

		this.mapDisplayAreaWidth = 704;
		this.mapDisplayAreaHeight = 576;
		this.mapDisplayAreaTLX = (canvas.width - this.mapDisplayAreaWidth) /2;
		this.mapDisplayAreaTLY = (canvas.height - this.mapDisplayAreaHeight) /2;

		this.roomRows = 9;
		this.roomCols = 11;

		this.roomTileSize = 64;

        // console.log('MainMenuScene: INIT');
		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){

		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        if(this.directionChosen)
            return;

        console.log('KEY PRESSED: ' + e.key);
		
		if(e.key == 'm'){
			//MENU SELECTED

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'menu'});
		}
		else if(e.key == 'w'){
			//ROOM UP SELECTED

            playerMoveDir = 'up';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
		}
        else if(e.key == 'a'){
			//ROOM LEFT SELECTED

            playerMoveDir = 'left';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
		}
        else if(e.key == 's'){
			//ROOM DOWN SELECTED

            playerMoveDir = 'down';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
		}
        else if(e.key == 'd'){
			//ROOM RIGHT SELECTED

            playerMoveDir = 'right';
			this.directionChosen = true;

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});
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

		//draw a border around the mapDisplayArea
		context.beginPath();
		context.strokeStyle = "red";
		context.rect(this.mapDisplayAreaTLX, this.mapDisplayAreaTLY, this.mapDisplayAreaWidth, this.mapDisplayAreaHeight)
		context.stroke();


		/* this.mapDisplayAreaWidth = 704;
		this.mapDisplayAreaHeight = 576;
		this.mapDisplayAreaTLX = (canvas.width - this.mapDisplayAreaWidth) /2;
		this.mapDisplayAreaTLY = (canvas.height - this.mapDisplayAreaHeight) /2;

		this.roomRows = 9;
		this.roomCols = 11; */


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






		context.beginPath();
		context.font = '20px Arial';
		context.textAlign = 'center';
		context.fillStyle = '#8ac80b';
		context.fillText('EXIT THE ROOM THROUGH A DOORWAY', canvas.width /2, canvas.height -32);
		context.fillText('EXIT TO MENU  [ M ]', canvas.width /2, canvas.height -8);


		context.beginPath();
		context.textAlign = 'left';
		//context.fillText('scene: ' + this.name, 30, 30);
        context.fillText('roomCoords: ' + playerRoomX + ', ' + playerRoomY, 30, 20);

		//_____________________
		context.restore();
	}
}
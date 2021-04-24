class RoomScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

        this.directionChosen = false;

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

		//TODO: add a C to continue key handling
		//		(only if there was a previous save)
		
		if(e.key == 'm'){
			//MENU SELECTED

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'menu'});

           
		}
		else if(e.key == 'w'){
			//ROOM UP SELECTED

            playerMoveDir = 'up';

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});

           
		}
        else if(e.key == 'a'){
			//ROOM LEFT SELECTED

            playerMoveDir = 'left';

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});

           
		}
        else if(e.key == 's'){
			//ROOM DOWN SELECTED

            playerMoveDir = 'down';

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'roomTransition'});

           
		}
        else if(e.key == 'd'){
			//ROOM RIGHT SELECTED

            playerMoveDir = 'right';

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
		
		context.beginPath();
		context.font = '40px Arial';
        context.textAlign = 'center';
		context.fillStyle = '#8ac80b';
        context.fillText('EXIT DIRECTION  [ WASD ]', canvas.width /2, canvas.height -80);
		context.fillText('MENU  [ M ]', canvas.width /2, canvas.height -40);


		context.beginPath();
		context.textAlign = 'left';
		context.font = '20px Arial';
		context.fillText('scene: ' + this.name, 30, 30);
        context.fillText('roomCoords: ' + playerRoomX + ', ' + playerRoomY, 30, 60);

		//_____________________
		context.restore();
	}
}
class MainMenuScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

        // console.log('MainMenuScene: INIT');
		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        console.log('KEY PRESSED: ' + e.key);

		//TODO: add a C to continue key handling
		//		(only if there was a previous save)
		
		if(e.key == 'p'){
			//PLAY SELECTED

            //TODO: set initial roomX, roomY coords?

            playerRoomX = 0;
            playerRoomY = 0;
            playerMoveDir = '';

			//goto newPlayer scene (that will take care of everything else)
			sceneManager.gotoScene({name: 'room'});

           
		}

	}

	update = function(_deltaTime){
		console.log('MainMenuScene: update Running');
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
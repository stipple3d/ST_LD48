class WinScene extends Scene{
	constructor(_name){
		//run super constructor (Scene base class)
		super(_name);
	}

	init = function(){

    
		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        console.log('KEY PRESSED: ' + e.key);
		
		if(e.key == 'm'){
			//MENU SELECTED
			sceneManager.gotoScene({name: 'menu'});
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
		context.font = '80px Arial';
		context.fillStyle = '#8ac80b';
		context.fillText('CONGRATULATIONS !!!', canvas.width /2, 200);

		context.beginPath();
		context.textAlign = 'center';
		context.font = '40px Arial';
		context.fillStyle = '#8ac80b';
		context.fillText('RETURN TO MAIN MENU [ M ]', canvas.width /2, 600);

		context.beginPath();
		// context.textAlign = 'left';
		context.fillStyle = '#dce0e3';
		context.font = '40px Arial';
		context.fillText('You have collected all FIVE of the containment', canvas.width /2, 300);
		context.fillText('elements and returned the ship to normal.', canvas.width /2, 370);

		

		//_____________________
		context.restore();
	}
}
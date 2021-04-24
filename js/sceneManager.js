class SceneManager{
	constructor(){

		this._currentSceneIndex = undefined;
		this._registeredScenes = [];

	}

	registerScene = function(_name, _className){
		this._registeredScenes.push(new _className(_name));
	}

	//method to end the current scene (if necessary) and 
	//initialize new one
	initSceneChange = function(_newIndex){
		//if there is an existing scene loaded, end it first
		if(this._currentSceneIndex != undefined){
			this._registeredScenes[this._currentSceneIndex].end();
		}

		this._currentSceneIndex = _newIndex;
		this._registeredScenes[this._currentSceneIndex].init();
	}

	//method REQUESTING a change of scene
	//(must be verified before the process is actually started)
	gotoScene = function({name = undefined, index = undefined} = {}){
		//console.log('gotoScene: ' + name);
		if(name != undefined){
			//name supplied, find the index of the scene with that name
			var ind = this.indexByName(name);
			if(ind != -1){
				//there was a scene with that name
				this.initSceneChange(ind);
			}
			else{
				//no matching scene to the name supplied
				if(index != undefined){
					//there is also an index supplied, load that scene
					this.initSceneChange(index);
				}
				else{
					//NO VALID SCENE TO LOAD
					return;
				}
			}
				
		}
		else if (index != undefined){
			//console.log('going to index: ' + index);
			
			//there was no name, but there was an index supplied
			this.initSceneChange(index);
		}
		else{
			//NO SPECIFICATION OF WHICH SCENE TO LOAD
			return;
		}
	}

	indexByName = function(_name){
		for(var s = 0; s < this._registeredScenes.length; s++){
			if(_name == this._registeredScenes[s].name)
				return s;
		}
		return -1;//NO INDEX WITH THIS NAME
	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		if(this._currentSceneIndex != undefined)
			this._registeredScenes[this._currentSceneIndex].update(_deltaTime);
	}

	render = () =>{
		if(this._currentSceneIndex != undefined)
			this._registeredScenes[this._currentSceneIndex].render();
	}
}
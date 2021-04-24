//base class for Scenes
class Scene{
	constructor(_name){
		this.name = _name;
		// this._gameObjects = [];

		this.clearOnRender = true;
	}

	/*getObjectAt = function(_index){
		if(this._gameObjects.length > _index)
			return this._gameObjects[_index];
		else
			return undefined;
	}*/

	//required methods (all should be overridden or they will do nothing)
	//(just re-implement them to override, no keyword needed)
	init = function(){}
	update = function(_deltaTime){}
	render = function(){}
	end = function(){}
}
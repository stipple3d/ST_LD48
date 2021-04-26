class KeyParticlesVisual{
	constructor(_kpi, _rmX, _rmY, _rmWidth, _rmHeight, _rmTLX, _rmTLY, _clr = 'purple'){
		
        this.keyPartIndex = _kpi;
        this.roomX = _rmX;
        this.roomY = _rmY;
        this.roomWidth = _rmWidth;
        this.roomHeight = _rmHeight;
        this.roomTL_x = _rmTLX;
        this.roomTL_y = _rmTLY;
        this.color = keyPartColors[this.keyPartIndex];

		this.vectorTowardsKeyPartFromRoom = new Vector2D(keyParts[this.keyPartIndex].x - this.roomX, keyParts[this.keyPartIndex].y - this.roomY);
		console.log('keypartVis ' + this.keyPartIndex + ' dist: ' + this.vectorTowardsKeyPartFromRoom.getMag() + ', color: ' + this.color + ', comps: ' + this.vectorTowardsKeyPartFromRoom.x + ', ' + this.vectorTowardsKeyPartFromRoom.y);
		this.normalizedDirection = this.vectorTowardsKeyPartFromRoom.getNormalized();
		//console.log('keypartVis ' + this.keyPartIndex + ', normVector: ' + this.normalizedDirection.x +', ' + this.normalizedDirection.y);

		//direction visual start point is room center
		this.startPt = new Vector2D(this.roomTL_x + (this.roomWidth /2), this.roomTL_y + (this.roomHeight /2));

		//end pt begins as a normalized vector of the vector from current room to keyPart room
		this.endPt = new Vector2D();
		this.endPt.x = this.normalizedDirection.x;
		this.endPt.y = this.normalizedDirection.y;

		//set magnitude of the line to a distance value
		this.endPt.setMag(100);

		//TODO: add the X/Y from the start point to that end value (to make it relative to room center point)
		this.endPt.x += this.startPt.x;
		this.endPt.y += this.startPt.y;


		
		this.numParticles = 10;
		this.particleSpeedFactor = 120;

		this.randomRange = 5;

		this.particles, this.pObj;
		this.particleRandomness = 0;

		this.resetParticles();

		
        //TODO: from center of the currently loaded room, what is the direction 
        //      TOWARD the relative x/y location of the room with the keyPart in it

        //TODO: convert that into a normalized vector from the center of the room
        //TODO: multiply the magnitude of the X/Y components of the vector to find a relative point just outside the room
        //TODO: multiply the magnitude again to find a point a certain distance inside the room (or from center?)
        //TODO: set up keyParticals to send particals from the outside point to the iside point


	}

	resetParticles = function(){

		this.particleRandomness = 0.2;

		this.particles = [];

		for(var p = 0; p < this.numParticles; p++){
			this.pObj = new Object();
			this.pObj.x = this.startPt.x;
			this.pObj.y = this.startPt.y;
			//pObj.randomness = 0.01;
			this.particles.push(this.pObj);
		}
	}

    update = function(_deltaTime){

		//console.log('MainMenuScene: update Running');

		let ranX, ranY;

		//update each partical by moving in direction and also modifying postition by a randomness factor
		for(var p = 0; p < this.particles.length; p++){
			console.log(this.particles[p].x + ', ' + this.particles[p].y);

			ranX = (    (Math.random() * this.randomRange) - (this.randomRange /2)    ) * this.particleRandomness;
			ranY = (    (Math.random() * this.randomRange) - (this.randomRange /2)    ) * this.particleRandomness;

			this.particles[p].x += ((this.normalizedDirection.x * _deltaTime * this.particleSpeedFactor) + ranX);
			this.particles[p].y += ((this.normalizedDirection.y * _deltaTime * this.particleSpeedFactor) + ranY);
		}

		this.particleRandomness *= 1.02;
		if(this.particleRandomness > 1.5)
			this.resetParticles();

	}

	render = function(){

		context.save();
		//_____________________
		//draw elements

		//draw particles

		for(var p = 0; p < this.particles.length; p++){
			context.beginPath();
			context.globalAlpha = 0.2;
			context.fillStyle = this.color;
			context.arc(this.particles[p].x, this.particles[p].y, this.particleRandomness *6, 0, Math.PI *2);
			context.fill();
		}

		// context.globalAlpha = 1;

		//draw line from current room center a [UNIT VECTOR * 100] dist in the 
		context.beginPath();
		
		context.strokeStyle = this.color;
		context.lineWidth = 2;
		context.moveTo(this.startPt.x, this.startPt.y);
		context.lineTo(this.endPt.x, this.endPt.y);
		context.stroke();


		//_____________________
		context.restore();
	}
}
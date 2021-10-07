/* ==================================================================================================================================*/
/*========================================================== Foe Actions==========================================================*/
/* ==================================================================================================================================*/

// TODO - This should go into a FoeFactory class. https://github.com/Seansuke/ZeldaJavascript/issues/10
/** This will reset every single foe within the array to a random type, position, with mild stat variation.*/
function resetFoes() {

	// The quantity of foes and the foe difficulty all depend on how far you are from the starting point.
	var maximumFoeOnScreen = MAX_FOES;
	var distanceFromStart = _mapX + _mapY;
	var minimumFoeDifficulty = 0;
	var maximumFoeDifficulty = ENEMY_NAME_ARRAY.length;
	if(Math.abs(distanceFromStart) < 3)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.25);
		maximumFoeDifficulty = 4;
	}
	else if(Math.abs(distanceFromStart) < 6)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.5);
		maximumFoeDifficulty = 7;
	}
	else if(Math.abs(distanceFromStart) < 9)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.75);
		minimumFoeDifficulty = 4;
		maximumFoeDifficulty = 9;
	}
	else if (Math.abs(distanceFromStart) < 14) {
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.75);
		minimumFoeDifficulty = 7;
		maximumFoeDifficulty = 13;
	}
	else {
		maximumFoeOnScreen = Math.floor(MAX_FOES);
		minimumFoeDifficulty = 10;
	}

	// Likely coming from a previous screen, so reset ALL foes to 0 HP as to not appear.
	for(var i = 0;i < MAX_FOES;i++) {
		_foeList[i].stat.hp = 0;
	}

	// Now let's actually spawn the foes.
	for (var i = 0; i < maximumFoeOnScreen; i++) {

		// Foe difficulty is really just "which type of foe will be on-screen" rather than actually scaling the foes.
		var foeDifficulty = minimumFoeDifficulty + Math.floor(Math.random() * (maximumFoeDifficulty - minimumFoeDifficulty));
		var newName = ENEMY_NAME_ARRAY[foeDifficulty];

		// Spawn in a random place.
		_foeList[i].pos = { x: 60 + Math.random() * 320, y: 60 + Math.random() * 360 };

		// Default to some partially random stats, but they will be overwritten by foe specific stats.
		_foeList[i].stat = { hp: 5 + Math.random() * 15, mhp: 15, attTime: 8, att: 5, time: 3, force: 12, cool: 10, effect: "none", speed: 2 };

		_foeList[i].dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none" };

		// Should separate this into graphic information and actual characters misc information.
		_foeList[i].misc = { name: newName, box: 8, subimg: 0, direction: "down", attacking: 0, imgSpd: 1 / 3, currentWpn: "none", team: "enemy", xp: 1, gfxRows: 4, foeDifficulty: foeDifficulty, foeIndex: i };

		// Foe spritesheet filename directly matches the foe name.
		_foeList[i].imgtag.src = "gfx/foe/" + _foeList[i].misc.name + ".png";

		// Foes should be 100% visible.
		_foeList[i].imgtag.style.opacity = "1";

		// Foe's attack element should be in -300 to not 
		_foeList[i].attackElem.pos.x = -300;

		// TODO - This should be a dictionary of foes to reference.  https://github.com/Seansuke/ZeldaJavascript/issues/9
		// Now change the stats of this foe depending on which foe it is.
		if(newName == "chuchu") {
			_foeList[i].stat.mhp = 1 + Math.random() * 1;
			_foeList[i].stat.att = 1 + Math.random() * 1;
			_foeList[i].stat.speed = 2;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "keese") {
			_foeList[i].stat.mhp = 1 + Math.random() * 2;
			_foeList[i].stat.att = 1 + Math.random() * 2;
			_foeList[i].stat.speed = 6;
		}
		if(newName == "rope") {
			_foeList[i].stat.mhp = 3 + Math.random() * 5;
			_foeList[i].stat.att = 2 + Math.random() * 2;
			_foeList[i].stat.speed = 5;
			_foeList[i].misc.xp = 2;
		}
		if(newName == "polsvoice") {
			_foeList[i].stat.mhp = 5 + Math.random() * 4;
			_foeList[i].stat.att = 5 + Math.random() * 1;
			_foeList[i].stat.speed = 3;
			_foeList[i].misc.xp = 4;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "peahat") {
			_foeList[i].stat.mhp = 8 + Math.random() * 3;
			_foeList[i].stat.att = 1 + Math.random() * 3;
			_foeList[i].stat.speed = 5;
			_foeList[i].misc.xp = 4;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "leever") {
			_foeList[i].stat.mhp = 5 + Math.random() * 2;
			_foeList[i].stat.att = 7 + Math.random() * 4;
			_foeList[i].stat.speed = 5;
			_foeList[i].misc.xp = 4;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "tektite") {
			_foeList[i].stat.mhp = 7 + Math.random() * 4;
			_foeList[i].stat.att = 7 + Math.random() * 1;
			_foeList[i].stat.speed = 3;
			_foeList[i].misc.xp = 4;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "ghini") {
			_foeList[i].stat.mhp = 8 + Math.random() * 8;
			_foeList[i].stat.att = 1 + Math.random() * 5;
			_foeList[i].stat.speed = 3;
			_foeList[i].misc.xp = 6;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "wallmaster") {
			_foeList[i].stat.mhp = 10 + Math.random() * 6;
			_foeList[i].stat.att = 5 + Math.random() * 1;
			_foeList[i].stat.speed = 2;
			_foeList[i].misc.xp = 6;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "moblin") {
			_foeList[i].stat.mhp = 10 + Math.random() * 5;
			_foeList[i].stat.att = 7 + Math.random() * 3;
			_foeList[i].misc.currentWpn = "wooden_boomerang";
			_foeList[i].misc.xp = 6;
		}
		if(newName == "stalfos") {
			_foeList[i].stat.mhp = 13 + Math.random() * 8;
			_foeList[i].stat.att = 3 + Math.random() * 3;
			_foeList[i].stat.speed = 3;
			_foeList[i].misc.xp = 7;
			_foeList[i].misc.currentWpn = "white_sword";
		}
		if(newName == "likelike") {
			_foeList[i].stat.mhp = 40 + Math.random() * 20;
			_foeList[i].stat.att = 20 + Math.random() * 10;
			_foeList[i].stat.speed = 1;
			_foeList[i].misc.xp = 10;
			_foeList[i].misc.gfxRows = 1;
		}
		if(newName == "gibdo") {
			_foeList[i].stat.mhp = 25 + Math.random() * 10;
			_foeList[i].stat.att = 6 + Math.random() * 4;
			_foeList[i].misc.xp = 10;
		}
		if(newName == "darknut") {
			_foeList[i].stat.mhp = 30 + Math.random() * 10;
			_foeList[i].stat.att = 12 + Math.random() * 8;
			_foeList[i].stat.speed = 3;
			_foeList[i].misc.xp = 14;
			_foeList[i].misc.currentWpn = "magic_sword";
		}
		if(newName == "wizzro") {
			_foeList[i].stat.mhp = 15 + Math.random() * 15;
			_foeList[i].stat.att = 15 + Math.random() * 15;
			_foeList[i].stat.speed = 4;
			_foeList[i].misc.xp = 18;
			_foeList[i].misc.currentWpn = "light_arrow";
		}

		_foeList[i].stat.mhp = Math.floor(_foeList[i].stat.mhp);
		_foeList[i].stat.att = Math.floor(_foeList[i].stat.att);
		_foeList[i].stat.hp = _foeList[i].stat.mhp;
		_foeList[i].ai.aggro = false;
	}	
}


/**This should go into the actual foe class as a function where you pass the current player.
Have a single foe run through it's life cycle*/
function foeAction(foe_obj) {
	// If the foe's life is <= 0, remove the foe from play
	if(foe_obj.stat.hp <= 0) {

		// x==-300 is an offscreen position to ensure the graphic is offscreen.  Made for slower devices.
		if(foe_obj.pos.x != -300) {
			_combatStrategy.createRandomDrop(foe_obj.pos.x, foe_obj.pos.y, foe_obj.misc.xp);
			foe_obj.pos.x = -300;
			foe_obj.attackElem.pos.x = -300; 
			foe_obj.attackElem.imgtag.src = "gfx/alpha.png"; 
			foe_obj.imgtag.src = "gfx/alpha.png";
			foe_obj.ai.aggro = false;
			return;
		}
	}

	// Just move around in random directions until aggro'd
	var randomAction = Math.floor(Math.random() * 8);
	reduceCooldownAndResetOutsideBoundaries(foe_obj);

	// Player is in sight, instantly aggro'd
	// TODO - make the aggro based on if the player is actually within eyeshot and not just generally near the foe. https://github.com/Seansuke/ZeldaJavascript/issues/7
	if(foe_obj.ai.aggro == false && Math.abs(_p1.pos.x - foe_obj.pos.x) < 64 && Math.abs(_p1.pos.y - foe_obj.pos.y) < 64) {
		foe_obj.ai.aggro = true;
	}

	// If the foe if hurt, then the foe is temporarily stunned
	if(foe_obj.dmg.time > 0) {
		combatantDamageState(foe_obj);
		randomAction = -1; 
		foe_obj.ai.aggro = true;
	} 

	var initiateAttackLogic = randomAction == 4 && foe_obj.misc.currentWpn != "none";
	if(foe_obj.stat.hp != foe_obj.stat.mhp && randomAction >= 4 && randomAction <= 6 && foe_obj.misc.currentWpn != "none")
	{
		// Attack far more frequently if you've taken damage.
		initiateAttackLogic = true;
	}

	if (foe_obj.misc.attacking > 0 && foe_obj.misc.currentWpn != "none") {
		// If the foe is attacking, follow through the attack
		actionPerformAttack(foe_obj);
		randomAction = -1;
	}
	else if (initiateAttackLogic) {
		// A random occurance:  Initiate an attack
		foe_obj.misc.attacking = 99;
		randomAction = -1;
	}
	else if (randomAction >= 0 && randomAction <= 3) {
		// A random occurance:  Move in "some" direction
		if (randomAction == 0) {
			foe_obj.misc.direction = "left";
		} 
		else if (randomAction == 1) { 
			foe_obj.misc.direction = "right";
		}
		else if (randomAction == 2) { 
			foe_obj.misc.direction = "up";
		}
		else if (randomAction == 3) { 
			foe_obj.misc.direction = "down";
		}

		if(foe_obj.ai.aggro) {
			// Override the move direction if the player has aggro'd the foe.
			var isPlayerXDistanceTooFar = Math.abs(_p1.pos.x - foe_obj.pos.x) > 8;
			var isPlayerYDistanceTooFar = Math.abs(_p1.pos.y - foe_obj.pos.y) > 8;
			var isPlayerToTheRight = _p1.pos.x > foe_obj.pos.x;
			var isPlayerBelow = _p1.pos.y > foe_obj.pos.y;
			if (!isPlayerToTheRight && isPlayerXDistanceTooFar) {
				foe_obj.misc.direction = "left";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
			else if (isPlayerToTheRight && isPlayerXDistanceTooFar) {
				foe_obj.misc.direction = "right";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
			if (!isPlayerBelow && isPlayerYDistanceTooFar) {
				foe_obj.misc.direction = "up";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
			else if (isPlayerBelow && isPlayerYDistanceTooFar) {
				foe_obj.misc.direction = "down";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
		}
		else {
			moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
		}
		foe_obj.misc.subimg++;
	}
	drawSprite(foe_obj.imgtag, foe_obj);
	drawSprite(foe_obj.attackElem.imgtag, foe_obj.attackElem);
}

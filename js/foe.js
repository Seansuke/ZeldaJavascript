/* ==================================================================================================================================*/
/*========================================================== Foe Actions==========================================================*/
/* ==================================================================================================================================*/

// This will reset every single foe within the array to a random type, position, with mild stat variation.
function resetFoes() {
	var enemyNameArray = Array('chuchu','keese','octo','rope','polsvoice','peahat','leever','tektite','wallmaster','ghini','moblin','stalfos','likelike','gibdo','darknut','wizzro');
	var maximumFoeOnScreen = MAX_FOES;
	var distanceFromStart = mapX + mapY;
	var minimumFoeDifficulty = 0;
	var maximumFoeDifficulty = enemyNameArray.length;
	if(Math.abs(distanceFromStart) < 2)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.25);
		minimumFoeDifficulty = 0;
		maximumFoeDifficulty = 4;
	}
	else if(Math.abs(distanceFromStart) < 4)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.5);
		minimumFoeDifficulty = 0;
		maximumFoeDifficulty = 7;
	}
	else if(Math.abs(distanceFromStart) < 5)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES * 0.75);
		minimumFoeDifficulty = 0;
		maximumFoeDifficulty = 7;
	}
	for(var i = 0;i < MAX_FOES;i++) {
		foes[i].stat.hp = 0;
	}
	for(var i = 0;i < maximumFoeOnScreen;i++) {
		newName = enemyNameArray[ minimumFoeDifficulty + Math.floor(Math.random() * maximumFoeDifficulty) ];
		foes[i].pos = { x: 60 + Math.random() * 320, y: 60 + Math.random() * 360 }; 
		foes[i].stat = { hp: 5 + Math.random() * 15, mhp: 15, attTime: 8,  att: 5, time: 3, force: 12, cool: 10, effect: "none", speed: 2};
		foes[i].dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
		foes[i].misc = { name: newName, box:8, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"enemy", xp:1, gfxRows:4 };
		foes[i].imgtag.src = "gfx/foe/" + foes[i].misc.name + ".png";
		foes[i].imgtag.style.opacity = "1";
		foes[i].attackElem.pos.x = -300;
		if(newName == "chuchu") {
			foes[i].stat.mhp = 1 + Math.random() * 1;
			foes[i].stat.att = 1 + Math.random() * 1;
			foes[i].stat.speed = 2;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "keese") {
			foes[i].stat.mhp = 1 + Math.random() * 2;
			foes[i].stat.att = 1 + Math.random() * 2;
			foes[i].stat.speed = 6;
		}
		if(newName == "rope") {
			foes[i].stat.mhp = 3 + Math.random() * 5;
			foes[i].stat.att = 2 + Math.random() * 2;
			foes[i].stat.speed = 5;
			foes[i].misc.xp = 2;
		}
		if(newName == "polsvoice") {
			foes[i].stat.mhp = 5 + Math.random() * 4;
			foes[i].stat.att = 5 + Math.random() * 1;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 3;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "peahat") {
			foes[i].stat.mhp = 8 + Math.random() * 3;
			foes[i].stat.att = 1 + Math.random() * 3;
			foes[i].stat.speed = 5;
			foes[i].misc.xp = 3;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "leever") {
			foes[i].stat.mhp = 5 + Math.random() * 2;
			foes[i].stat.att = 7 + Math.random() * 4;
			foes[i].stat.speed = 5;
			foes[i].misc.xp = 3;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "tektite") {
			foes[i].stat.mhp = 7 + Math.random() * 4;
			foes[i].stat.att = 7 + Math.random() * 1;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 4;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "ghini") {
			foes[i].stat.mhp = 8 + Math.random() * 8;
			foes[i].stat.att = 1 + Math.random() * 5;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 5;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "wallmaster") {
			foes[i].stat.mhp = 10 + Math.random() * 6;
			foes[i].stat.att = 5 + Math.random() * 1;
			foes[i].stat.speed = 2;
			foes[i].misc.xp = 5;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "moblin") {
			foes[i].stat.mhp = 10 + Math.random() * 5;
			foes[i].stat.att = 7 + Math.random() * 3;
			foes[i].misc.currentWpn = "wooden_boomerang";
			foes[i].misc.xp = 5;
		}
		if(newName == "stalfos") {
			foes[i].stat.mhp = 13 + Math.random() * 8;
			foes[i].stat.att = 3 + Math.random() * 3;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 6;
			foes[i].misc.currentWpn = "white_sword";
		}
		if(newName == "likelike") {
			foes[i].stat.mhp = 40 + Math.random() * 20;
			foes[i].stat.att = 20 + Math.random() * 10;
			foes[i].stat.speed = 1;
			foes[i].misc.xp = 6;
			foes[i].misc.gfxRows = 1;
		}
		if(newName == "gibdo") {
			foes[i].stat.mhp = 25 + Math.random() * 10;
			foes[i].stat.att = 6 + Math.random() * 4;
			foes[i].misc.xp = 7;
		}
		if(newName == "darknut") {
			foes[i].stat.mhp = 30 + Math.random() * 10;
			foes[i].stat.att = 12 + Math.random() * 8;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 10;
		}
		if(newName == "wizzro") {
			foes[i].stat.mhp = 10 + Math.random() * 15;
			foes[i].stat.att = 10 + Math.random() * 10;
			foes[i].stat.speed = 4;
			foes[i].misc.xp = 18;
			foes[i].misc.currentWpn = "light_arrow";
		}
		foes[i].stat.hp = foes[i].stat.mhp;
		foes[i].ai.aggro = false;
	}	
}


//Have a single foe run through it's life cycle
function foeAction(foe_obj) {
	// If the foe's life is <= 0, remove the foe from play
	if(foe_obj.stat.hp <= 0) {

		// x==-300 is an offscreen position to ensure the graphic is offscreen.  Made for slower devices.
		if(foe_obj.pos.x != -300) {
			randomDrop(foe_obj.pos.x, foe_obj.pos.y, foe_obj.misc.xp);
			foe_obj.pos.x = -300;
			foe_obj.attackElem.pos.x = -300; 
			foe_obj.attackElem.imgtag.src = "gfx/alpha.png"; 
			foe_obj.imgtag.src = "gfx/alpha.png";
			foe_obj.ai.aggro = false;
			return;
		}
	}
	var randomAction = Math.floor(Math.random() * 8);
	boundaryCheck(foe_obj);

	if(foe_obj.ai.aggro == false && Math.abs(p1.pos.x - foe_obj.pos.x) < 64 && Math.abs(p1.pos.y - foe_obj.pos.y) < 64)
	{
		foe_obj.ai.aggro = true;
	}

	// If the foe if hurt, then the foe is temporarily stunned
	if(foe_obj.dmg.time > 0) {
		objDmg(foe_obj);
		randomAction = -1; 
		if(foe_obj.ai.aggro == false)
		{
			foe_obj.ai.aggro = true;
		}
	} 

	var initiateAttackLogic = randomAction == 4 && foe_obj.misc.currentWpn != "none";
	if(foe_obj.stat.hp != foe_obj.stat.mhp && randomAction >= 4 && randomAction <= 6 && foe_obj.misc.currentWpn != "none")
	{
		// Attack far more frequently if you've taken damage.
		initiateAttackLogic = true;
	}

	// If the foe is attacking, follow through the attack
	if(foe_obj.misc.attacking > 0 && foe_obj.misc.currentWpn != "none") {
		actionPerformAttack(foe_obj);
		randomAction = -1;
	}

	// A random occurance:  Initiate an attack
	else if(initiateAttackLogic) {
		foe_obj.misc.attacking = 99;
		randomAction = -1;
	}

	// A random occurance:  Move in "some" direction
	else if(randomAction >= 0 && randomAction <= 3) {
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
		if(foe_obj.ai.aggro)
		{
			if(p1.pos.x < foe_obj.pos.x && Math.abs(p1.pos.x - foe_obj.pos.x) > 8)
			{
				foe_obj.misc.direction = "left";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
			else if(p1.pos.x > foe_obj.pos.x && Math.abs(p1.pos.x - foe_obj.pos.x) > 8)
			{
				foe_obj.misc.direction = "right";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
			if(p1.pos.y < foe_obj.pos.y && Math.abs(p1.pos.y - foe_obj.pos.y) > 8)
			{
				foe_obj.misc.direction = "up";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
			else if(p1.pos.y > foe_obj.pos.y && Math.abs(p1.pos.y - foe_obj.pos.y) > 8 	)
			{
				foe_obj.misc.direction = "down";
				moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
			}
		}
		else
		{
			moveImpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
		}
		foe_obj.misc.subimg++;
	}
	drawSprite(foe_obj.imgtag, foe_obj);
	drawSprite(foe_obj.attackElem.imgtag, foe_obj.attackElem);
}

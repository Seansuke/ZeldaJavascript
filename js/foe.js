/* ==================================================================================================================================*/
/*========================================================== Foe Actions==========================================================*/
/* ==================================================================================================================================*/

//Have a single foe run through it's life cycle
function foeAction(foe_obj) {

	// If the foe's life is <= 0, remove the foe from play
	if(foe_obj.stat.hp <= 0) {

		// x==-300 is an offscreen position to ensure the graphic is offscreen.  Made for slower devices.
		if(foe_obj.pos.x != -300) {
			randomDrop(foe_obj.pos.x, foe_obj.pos.y);
			foe_obj.pos.x = -300;
			foe_obj.attackElem.pos.x = -300; 
			foe_obj.attackElem.imgtag.src = "gfx/alpha.png"; 
			foe_obj.imgtag.src = "gfx/alpha.png";
			return;
		}
	}
	var randomAction = Math.floor(Math.random() * 9);
	boundaryCheck(foe_obj);

	// If the foe if hurt, then the foe is temporarily stunned
	if(foe_obj.dmg.time > 0) {
		objDmg(foe_obj);
		randomAction = -1; 
	} 

	// If the foe is attacking, follow through the attack
	if(foe_obj.misc.attacking > 0 && foe_obj.misc.currentWpn != "none") {
		actionPerformAttack(foe_obj);
		randomAction = -1;
	}

	// A random occurance:  Initiate an attack
	else if(randomAction == 4 && foe_obj.misc.currentWpn != "none") {
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
		moveUnpassable(foe_obj, foe_obj.misc.direction, foe_obj.stat.speed);
		foe_obj.misc.subimg++;
	}
	drawSprite(foe_obj.imgtag, foe_obj);
	drawSprite(foe_obj.attackElem.imgtag, foe_obj.attackElem);
}

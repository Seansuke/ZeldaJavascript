/* ==================================================================================================================================*/
/* ==========================================================Player functions========================================================== */
/* ==================================================================================================================================*/
// Determine if the player will decide to move
function playerWalk(player) {
	var isWalking = false;
	if( typeof wiiu === 'undefined' )
	{
		var stateu = {hold: 0};
		var state = {held: 0};
	}
	else
	{
		var stateu = wiiu.gamepad.update();
		var state = wiiu.remote.update(0);
	}
	
	// TODO - implement these as variables that can be changed.
	if (control[player.ctrl.left] == true || touchControls.left || stateu.hold & 0x00000800 || stateu.hold & 0x40000000 || state.held & 0x00000100) {
		isWalking = true;
		player.misc.direction = "left";
		moveObj(player, - player.stat.speed / 2 , 0); 
		moveObj(player, - player.stat.speed / 2 , 0); 
	}
	else if (control[player.ctrl.right] == true || touchControls.right  || stateu.hold & 0x00000400 || stateu.hold & 0x20000000  || state.held & 0x00000200) {
		isWalking = true;
		player.misc.direction = "right"; 	
		moveObj(player, player.stat.speed / 2 , 0);
		moveObj(player, player.stat.speed / 2 , 0);
	}
	if (control[player.ctrl.up] == true || touchControls.up  || stateu.hold & 0x00000200 || stateu.hold & 0x10000000  || state.held & 0x00000800) {
		isWalking = true;
		player.misc.direction = "up";
		moveObj(player, 0 , - player.stat.speed / 2);
		moveObj(player, 0 , - player.stat.speed / 2);
	}
	else if (control[player.ctrl.down] == true || touchControls.down  || stateu.hold & 0x00000100 || stateu.hold & 0x08000000  || state.held & 0x00000400) {
		isWalking = true;
		player.misc.direction = "down"; 
		moveObj(player, 0 , player.stat.speed / 2); 
		moveObj(player, 0 , player.stat.speed / 2); 
	}
	player.misc.subimg = Math.round(player.misc.subimg);

	// Reduce the temporary speed buff.
	if(player.stat.speed > 4)
	{
		player.stat.speed -= 0.005;
	}

	// Check all boundaries
	if(player.pos.x > 635) {
		player.pos.x = 10;
		p1.pos.x = player.pos.x;
		p1.pos.y = player.pos.y;
		if(p2 !== null)
		{
			p2.pos.x = player.pos.x;
			p2.pos.y = player.pos.y;
		}
		nextRoom(1,0);
		resetFoes();
	}
	else if(player.pos.x < 5) {
		player.pos.x = 630;
		p1.pos.x = player.pos.x;
		p1.pos.y = player.pos.y;
		if(p2 !== null)
		{
			p2.pos.x = player.pos.x;
			p2.pos.y = player.pos.y;
		}
		nextRoom(-1,0);
		resetFoes();
	}
	else if(player.pos.y > 475) {
		player.pos.y = 10;
		p1.pos.x = player.pos.x;
		p1.pos.y = player.pos.y;
		if(p2 !== null)
		{
			p2.pos.x = player.pos.x;
			p2.pos.y = player.pos.y;
		}
		nextRoom(0,1);
		resetFoes();
	}
	else if(player.pos.y < 5) {
		player.pos.y = 470;
		p1.pos.x = player.pos.x;
		p1.pos.y = player.pos.y;
		if(p2 !== null)
		{
			p2.pos.x = player.pos.x;
			p2.pos.y = player.pos.y;
		}
		nextRoom(0,-1);
		resetFoes();
	}
	return isWalking;
}

// Determine if the player wishes to initiate an attack
function playerAttack(player, isWalking) {
	if( typeof wiiu === 'undefined' )
	{
		var stateu = {hold: 0};
		var state = {held: 0};
	}
	else
	{
		var stateu = wiiu.gamepad.update();
		var state = wiiu.remote.update(0);
	}

	// Sword
	if (control[player.ctrl.attA] == true || touchControls.A || stateu.hold & 0x00008000 || state.held & 0x00000002) {
		player.misc.attackType = isWalking;
		player.misc.currentWpn = player.wpn.A; 
		player.misc.attacking = 99;
	}

	// Boomerang
	else if (control[player.ctrl.attB] == true || touchControls.B ||  stateu.hold & 0x00000080 || state.held & 0x00000001) { 
		player.misc.attackType = isWalking;
		player.misc.currentWpn = player.wpn.B; 
		player.misc.attacking = 99;
	}

	// Bomb
	else if (control[player.ctrl.attC] == true || touchControls.C ||  stateu.hold & 0x00040000 || state.held & 0x00000008) { 
		player.misc.attackType = isWalking;
		player.misc.currentWpn = player.wpn.C;
		player.misc.attacking = 99;
	} 

	// Arrow
	else if (control[player.ctrl.attD] == true || touchControls.D ||  stateu.hold & 0x00000040 || state.held & 0x00000004) {
		player.misc.attackType = isWalking;
		player.misc.currentWpn = player.wpn.D;
		player.misc.attacking = 99;
	} 
}

// The player's life cycle, from 
function playerAction(player) {
	if(player.stat.hp <= 0) {
		if(player.misc.respawnTimer < 0)
		{
			DisplayConsoleText("Game Over!  Respawning...");
			player.imgtag.src = "gfx/alpha.png";
			player.misc.respawnTimer = 60;
		}
		else if(player.misc.respawnTimer == 1)
		{
			resetGame(player);
			DisplayConsoleText("Respawned!");
		}
		player.misc.respawnTimer--;
		return;
	}
	boundaryCheck(player);

	// If the player takes damage, they are unable to move
	if(player.dmg.time > 0) { 
		objDmg(player); 
	}

	// If the player is not attacking, the player can walk or choose to initiate an attack.
	else if(player.misc.attacking <= 0) {
		var isWalking = playerWalk(player);
		playerAttack(player, isWalking);
	}

	// If the player is attacking, follow through.
	else if(player.misc.attacking > 0) {
		actionPerformAttack(player, player.misc.attackType);
	}
	drawSprite(player.imgtag, player);
	drawSprite(player.attackElem.imgtag, player.attackElem);
}

/* =============================================================================================================================== */
/* ====================================================Attack functions=========================================================== */
/* =============================================================================================================================== */
function actionSword(player) {

	// When player's attacking time == 99, initialize the attack, and set the REAL attacking time to the proper amount
	if(player.misc.attacking == 99) {
		player.stat.attTime = 8;
		var damage = 3 + Math.random() * 2;
		if(player.misc.attackType) {
			player.stat.attTime = 6;
			damage = 1 + Math.random() * 2;
		}
		// The magic_sword is stronger than the white_sword and in turn the wooden_sword
		if(player.attackElem.misc.currentWpn.search("white_") != -1) {
			damage = 7 + Math.random() * 3;
			if(player.misc.attackType) {
				player.stat.attTime = 6;
				damage = 5 + Math.random() * 2;
			}
		}
		else if(player.attackElem.misc.currentWpn.search("magic_") != -1) {
			damage = 10 + Math.random() * 5;
			if(player.misc.attackType) {
				player.stat.attTime = 6;
				damage = 7 + Math.random() * 3;
			}
		}
		player.misc.attacking = player.stat.attTime;

		// Creates a new attack with the following stats (player, DMG, TIME, FORCE, COOL, "effect")
		setAttack(player, damage , 3,12,8,  "none");

	}
	player.misc.attacking--;

	// Begin Sword Slash forward at time > 80%
	if(player.misc.attacking > Math.floor(player.stat.attTime * 0.8)) {
		movePassable(player.attackElem, 5);
		player.attackElem.imgtag.src = "gfx/wpn/" + player.attackElem.misc.currentWpn +  ".png";
	}

	// Hold Sword at time == 80%
	else if(player.misc.attacking == Math.floor(player.stat.attTime * 0.8)) { 
		movePassable(player.attackElem, 5); 
	}

	// Pull back weapon at time < 60%
	else if(player.misc.attacking == Math.floor(player.stat.attTime * 0.6)) { 
		movePassable(player.attackElem, 6);
	}

	// Remove weapon from the screen at time == 0%
	else if(player.misc.attacking == 0) {
		player.attackElem.pos.x = -300;
		player.attackElem.imgtag.src = "gfx/alpha.png";
	}
}

function actionBoomerang(player) {

	// When player's attacking time == 99, initialize the attack, and set the REAL attacking time to the proper amount
	if(player.misc.attacking == 99) {
		player.stat.attTime = 16;
		if(player.misc.attackType) {
			player.stat.attTime = 10;
		}
		player.misc.attacking = player.stat.attTime;

		//Creates a new attack with the following stats (player, DMG, TIME, FORCE, COOL, "effect")
		setAttack(player, 1 , player.stat.attTime,2,1,  "none");

		// The fire_boomerang is stronger than the magic_boomerang and in turn the wooden_boomerang
		if(player.attackElem.misc.currentWpn.search("magic_") != -1) {
			player.attackElem.stat.att = 3;
		}
		else if(player.attackElem.misc.currentWpn.search("fire_") != -1) {
			player.attackElem.stat.att = 4;
		}
	}
	player.attackElem.misc.subimg += 1;
	player.misc.attacking--;

	// Boomerang continues forward at time > 50%
	if(player.misc.attacking > Math.floor(player.stat.attTime * 0.5)) {
		movePassable(player.attackElem, 16);
		player.attackElem.imgtag.src = "gfx/wpn/" + player.attackElem.misc.currentWpn +  ".png";
	}

	// Boomerang comes back at time <= 50%
	else if(player.misc.attacking > 0) { 
		movePassable(player.attackElem, -16); 
	}

	// Remove weapon from the screen at time == 0%
	else if(player.misc.attacking == 0) {
		player.attackElem.pos.x = -300;
		player.attackElem.imgtag.src = "gfx/alpha.png";
	}
}

function actionBomb(player) {

	// When player's attacking time == 99, initialize the attack, and set the REAL attacking time to the proper amount
	if(player.misc.attacking == 99) {

		// This simulates the number of frames until bomb explodes
		player.stat.attTime = 7 * 3;
		player.misc.attacking = player.stat.attTime;

		//Creates a new attack with the following stats (player, DMG, TIME, FORCE, COOL, "effect")
		setAttack(player, 0 , 6*3,10,2,  "none");
		player.attackElem.pos.y += 16;
		movePassable(player.attackElem, 32);
		player.attackElem.imgtag.src = "gfx/wpn/" + player.attackElem.misc.currentWpn +  ".png";
	}
	player.attackElem.misc.subimg += 1;
	player.misc.attacking--;

	// The bomb does no damage until it actually explodes at time == 3
	if(player.misc.attacking == 3) {
		player.attackElem.stat.att = 10;

		// The black_bomb is stronger than the red_bomb and in turn the blue_bomb
		if(player.attackElem.misc.currentWpn.search("red_") != -1) {
			player.attackElem.stat.att = 15;
		}
		else if(player.attackElem.misc.currentWpn.search("black_") != -1) {
			player.attackElem.stat.att = 20;
		}
		player.attackElem.misc.box = 24;
	}

	// Remove weapon from the screen at time == 0%
	else if(player.misc.attacking == 0) {
		player.attackElem.pos.x = -300;
		player.attackElem.imgtag.src = "gfx/alpha.png";
	}
}

function actionArrow(player) {

	// When player's attacking time == 99, initialize the attack, and set the REAL attacking time to the proper amount
	if(player.misc.attacking == 99) {
		player.stat.attTime = 18;

		// The light_arrow is stronger than the silver_arrow and in turn the wooden_arrow
		if(player.attackElem.misc.currentWpn.search("silver_") != -1) {
			player.stat.attTime = 17;
		}
		else if(player.attackElem.misc.currentWpn.search("light_") != -1) {
			player.stat.attTime = 16;
		}

		player.misc.attacking = player.stat.attTime;
	}

	player.attackElem.misc.subimg += 1;
	player.misc.attacking--;

	if(player.misc.attacking == 13)
	{
		//Creates a new attack with the following stats (player, DMG, TIME, FORCE, COOL, "effect")
		setAttack(player, 1 , player.stat.attTime,0,2,  "none");
		player.attackElem.imgtag.src = "gfx/wpn/" + player.attackElem.misc.currentWpn +  ".png";

		// The light_arrow is stronger than the silver_arrow and in turn the wooden_arrow
		if(player.attackElem.misc.currentWpn.search("light_") != -1) {
			player.attackElem.stat.att = 2;
		}
	}
	// The arrow arches forward until removal time
	else if(player.misc.attacking > 7 && player.misc.attacking <= 12) { 
		moveImpassable(player.attackElem, player.misc.direction, 11); 
		moveImpassable(player.attackElem, player.misc.direction, 11); 
		if(player.misc.attackType) {
			moveImpassable(player.attackElem, player.misc.direction, 11); 
		}
	}


	// Remove weapon from the screen at time == 0%
	else if(player.misc.attacking <= 7) {
		player.attackElem.pos.x = -300;
		player.attackElem.imgtag.src = "gfx/alpha.png";
	}
}

// Initialize a strike based on the weapon that is currently "equipped"
function actionPerformAttack(player) {
	if(player.misc.currentWpn.search("_sword") != -1) { 
		actionSword(player); 
	}
	else if(player.misc.currentWpn.search("_boomerang") != -1) { 
		actionBoomerang(player); 
	}
	else if(player.misc.currentWpn.search("_bomb") != -1) { 
		actionBomb(player); 
	}
	else if(player.misc.currentWpn.search("_arrow") != -1) { 
		actionArrow(player); 
	}
	else { 
		player.misc.currentWpn = player.wpn.A;
		actionSword(player); 
	}
}

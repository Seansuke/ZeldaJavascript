/* ==================================================================================================================================*/
/* ==========================================================General Use ==========================================================*/
/* ==================================================================================================================================*/

// A generic way to quickly create an attack
function setAttack(player, newAtt, newTime, newForce, newCool, newEffect) {
	player.attackElem.stat.att = newAtt; 
	player.attackElem.stat.time = newTime; 
	player.attackElem.stat.force = newForce; 
	player.attackElem.stat.cool = newCool; 
	player.attackElem.stat.effect = newEffect; 
	player.attackElem.misc.currentWpn = player.misc.currentWpn; 
	player.attackElem.misc.direction = player.misc.direction; 
	player.attackElem.misc.team = player.misc.team;
	player.attackElem.misc.name = player.misc.currentWpn;
	player.attackElem.pos.x = player.pos.x; 
	player.attackElem.pos.y = player.pos.y; 
	player.attackElem.misc.box = 8;
	player.attackElem.misc.subimg = 0;
	player.attackElem.misc.imgSpd = 1/3;
}

// This will reset every single foe within the array to a random type, position, with mild stat variation.
function resetFoes() {
	for(var i = 0;i < MAX_FOES;i++) {
		newName = ( Array('keese','octo','moblin','stalfos','gibdo','darknut','rope') )[ Math.floor(Math.random() * 7) ];
		foes[i].pos = { x: Math.random() * 640, y: Math.random() * 480 }; 
		foes[i].stat = { hp: 5 + Math.random() * 15, mhp: 15, attTime: 8,  att: 5, time: 3, force: 12, cool: 10, effect: "none", speed: 2};
		foes[i].dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
		foes[i].misc = { name: newName, box:8, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"enemy", xp:1 };
		foes[i].imgtag.src = "gfx/foe/" + foes[i].misc.name + ".png";
		foes[i].imgtag.style.opacity = "1";
		foes[i].attackElem.pos.x = -300;
		if(newName == "moblin") {
			foes[i].stat.mhp = 10 + Math.random() * 5;
			foes[i].stat.att = 7 + Math.random() * 3;
			foes[i].misc.currentWpn = "wooden_boomerang";
			foes[i].misc.xp = 3;
		}
		if(newName == "keese") {
			foes[i].stat.mhp = 1 + Math.random() * 2;
			foes[i].stat.att = 1 + Math.random() * 2;
			foes[i].stat.speed = 6;
		}
		if(newName == "stalfos") {
			foes[i].stat.mhp = 13 + Math.random() * 8;
			foes[i].stat.att = 3 + Math.random() * 3;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 4;
			foes[i].misc.currentWpn = "white_sword";
		}
		if(newName == "gibdo") {
			foes[i].stat.mhp = 25 + Math.random() * 10;
			foes[i].stat.att = 6 + Math.random() * 4;
			foes[i].misc.xp = 4;
		}
		if(newName == "darknut") {
			foes[i].stat.mhp = 20 + Math.random() * 20;
			foes[i].stat.att = 15 + Math.random() * 5;
			foes[i].stat.speed = 3;
			foes[i].misc.xp = 5;
		}
		if(newName == "rope") {
			foes[i].stat.mhp = 3 + Math.random() * 5;
			foes[i].stat.att = 15 + Math.random() * 5;
			foes[i].stat.speed = 5;
		}
		foes[i].stat.hp = foes[i].stat.mhp;
	}	
}

// Determine if there is a collision between two objects based on their misc.box variable
function checkSingleCollision(a, b) { 
	if(Math.abs((a.pos.x + a.misc.box) - (b.pos.x + b.misc.box)) < a.misc.box + b.misc.box) {
		if(Math.abs(a.pos.y - b.pos.y) < a.misc.box + b.misc.box) {
			return true;
		}
	}
	return false;
}

//  Have object A take damage from object B
function setDmg(a, b) { 

	// Damage is done to object A if A is not taking damage or on the same team
	if(a.dmg.cool <= 0 && b.stat.att > 0 && a.misc.team != b.misc.team) {
		a.dmg.time = b.stat.time; 
		a.dmg.force = b.stat.force; 
		a.dmg.cool = b.stat.force;
		a.dmg.att = b.stat.att;

		// Push object A away from object B's direction
		if(Math.abs(a.pos.x - b.pos.x) > Math.abs(a.pos.y - b.pos.y)) {
			if(a.pos.x < b.pos.x) { 
				a.dmg.direction = "left"; 
			}
			else { 
				a.dmg.direction = "right"; 
			}
		}
		else {
			if(a.pos.y < b.pos.y) { 
				a.dmg.direction = "up"; 
			}
			else { 
				a.dmg.direction = "down"; 
			}
		}
	}
}

// A generic check for all possible collisions
function checkCollision() {
	for( var i = 0; i < MAX_FOES; i++) {

		// Check if player is colliding with any foe
		if( checkSingleCollision(p1, foes[i]) == true) {
			setDmg(p1, foes[i]);
		}

		// Check if player is colliding with any foe's attack
		if( checkSingleCollision(p1, foes[i].attackElem) == true) { 
			setDmg(p1, foes[i].attackElem); 
		}

		// Check if any foe is colliding with player's attack
		if( checkSingleCollision(foes[i], p1.attackElem) == true) { 
			setDmg(foes[i], p1.attackElem); 
		}

		// Expect p2 to exist before we compare damaging it
		if(p2 != 0) {
			// Check if player is colliding with any foe
			if( checkSingleCollision(p2, foes[i]) == true) {
				setDmg(p2, foes[i]);
			}

			// Check if player is colliding with any foe's attack
			if( checkSingleCollision(p2, foes[i].attackElem) == true) { 
				setDmg(p2, foes[i].attackElem); 
			}

			// Check if any foe is colliding with player's attack
			if( checkSingleCollision(foes[i], p2.attackElem) == true) { 
				setDmg(foes[i], p2.attackElem); 
			}
		}
	}

	// Check if player is colliding with an item
	if( checkSingleCollision(p1, itemDrop) == true ) {
		if(itemDrop.pos.x != 0) {
			if(itemDrop.type == "heart") {
				p1.stat.hp += itemDrop.amnt * 2;
			}
			else if(itemDrop.type == "rupee") {
				rupees += itemDrop.amnt;
			}
			else if(itemDrop.type == "speed") {
				p1.stat.speed += itemDrop.amnt * 0.05;
				if(p2 != 0) {p2.stat.speed += itemDrop.amnt * 0.05;}
			}
			redrawHearts();
			consoleTag.value = "Link gained " + itemDrop.amnt + " " + itemDrop.type + "(s)!";
			itemDrop.pos.x = 0;
			itemDrop.imgtag.src = "gfx/alpha.png";
		}
	}
}

// Have an object follow through it's damaged state
function objDmg(self) {

	// Transparency is used for a basic flashing animation.  50% visible
	if(self.dmg.time % 2 == 0) {
		self.imgtag.style.opacity = "0.5";
	}

	// 20% visible
	else if(self.dmg.time % 4 == 3) {
		self.imgtag.style.opacity = "0.2";
	}

	// 100% visible
	else {
		self.imgtag.style.opacity = "1";
	}

	// Reduce the time someone is damaged.
	self.dmg.time--;

	// Move the someone 
	moveUnpassable(self, self.dmg.direction, self.dmg.force);

	// HP is lost at the end of being pushed around rather than the beginning to prevent chaining
	if(self.dmg.time == 1) {
		if(self.dmg.att != 0 && self.stat.hp > 0) {
			self.stat.hp -= self.dmg.att;
			if(self.misc.name == "link") {
				consoleTag.value = "Link took " + Math.round(self.dmg.att) + " damage!";
				redrawHearts();
			}
			else {
				consoleTag.value = self.misc.name + " took " + Math.round(self.dmg.att) + " damage!";
			}
		}
	}
}

// Check if the object is not within it's graphic bounds or cooldown time bounds.
function boundaryCheck(self) {
	if(self.dmg.cool > 0) {
		self.dmg.cool--;
	}

	// If the object is "stuck" on a tile, randomly teleport elsewhere
	if(placeFree(self.pos.x, self.pos.y) == false && self.stat.hp > 0) {
		self.pos.x = Math.random() * 640;
		self.pos.y = Math.random() * 480;
	}
}

// Redraw the hearts on the screen
function redrawHearts() { 
	for(var i = 0;i * 10 < p1.stat.mhp;i++) {
		if(p1.stat.hp >= (i)*10 + 5) { 
			hearts[i].src = "gfx/gui/heart_full.png"; 
		}
		else if(p1.stat.hp >= (i)*10) { 
			hearts[i].src = "gfx/gui/heart_half.png"; 
		}
		else { 
			hearts[i].src = "gfx/gui/heart_empty.png"; 
		}
	}
}

// Have a random drop appear in the location (x, y)
function randomDrop(x,y) {
	itemDrop.pos.x = x;
	itemDrop.pos.y = y;
	itemDrop.type = ( Array('heart','rupee','speed') )[ Math.floor(Math.random() * 3) ];
	itemDrop.imgtag.src = "gfx/drop/" + itemDrop.type + ".png";
	itemDrop.amnt = Math.ceil(Math.random() * 5);
	drawSprite(itemDrop.imgtag, itemDrop);
}

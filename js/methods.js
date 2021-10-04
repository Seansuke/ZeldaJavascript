/* ==================================================================================================================================*/
/* ==========================================================GLOBAL FUNCTIONS ======================================================*/
/* ==================================================================================================================================*/

/** Returns whether a place on the board is completely free*/
function placeFree(x,y) { 

	// Check barriers
	if(x < 0 + 4 || x > 640 - 4 || y < 0 + 4 || y > 480 - 4) { 
		return false;
	}

	var passableTileList = [
		"0", "6", "", " "
	];

	// Check for Tiles
	var centerX = Math.round(x / 16);
	var leftX = Math.round((x - 4) / 16);
	var rightX = Math.round((x + 4) / 16);
	var centerY = Math.round(y / 16);
	var topY = Math.round((y - 4) / 16);
	var bottomY = Math.round((y + 4) / 16);
	var centerTile = tileSet[centerX][centerY].toString();
	var leftTopTile = tileSet[leftX][topY].toString();
	var rightTopTile = tileSet[rightX][topY].toString();
	var leftBottomTile = tileSet[leftX][bottomY].toString();
	var rightBottomTile = tileSet[rightX][bottomY].toString();

	// Actually check for the tiles.
	if(passableTileList.indexOf(centerTile) == -1) { 
		return false;
	}
	if(passableTileList.indexOf(leftTopTile) == -1) {
		return false;
	}
	if(passableTileList.indexOf(rightTopTile) == -1) {
		return false;
	}
	if(passableTileList.indexOf(leftBottomTile) == -1) {
		return false;
	}
	if(passableTileList.indexOf(rightBottomTile) == -1) {
		return false;
	}
	return true; 
}

/** Returns whether a place on the board is completely free*/
function placeFree_byElement(element, Xoffset, Yoffset) {
	return placeFree(element.pos.x + Xoffset, element.pos.y + Yoffset);
}

/** Moves an object if the location is free*/
function moveObj(self, addX, addY) {
	if(placeFree_byElement(self, addX, addY) == true) {
		self.pos.x += addX;
		self.pos.y += addY;
	}
	else if(placeFree_byElement(self, addX / 2, addY / 2) == true) {
		self.pos.x += addX / 2;
		self.pos.y += addY / 2;
	}
	else if(placeFree_byElement(self, addX / 4, addY / 4) == true) {
		self.pos.x += addX / 4;
		self.pos.y += addY / 4;
	}
	self.misc.subimg += 0.6;
}

/** Displays the proper sprite in the proper place on screen based on its width/height*/
function drawSprite(img,element) {

	//This entire function is custom coded to match the sprite sheets themselves
	var placeX = 0;
	var placeY = 0;

	// Link's attack sprite is on the 3rd column of the sheet
	if(element.misc.attacking > 0 && element.misc.name == "link") {
		placeX = 32;
	}

	// The sheet's 1st and 2nd columns are: step-right, step-left
	else {
		placeX = Math.floor((element.misc.subimg * element.misc.imgSpd) % 2) * 16;
	}

	// The sheet's row order match the direction a player is facing.  From top to bottom: up, right, down, left.
	if(element.misc.direction == "right") {
		placeY = 16;
	}
	else if(element.misc.direction == "down") { 
		placeY = 32; 
	}
	else if(element.misc.direction == "left") { 
		placeY = 48; 
	}

	if(element.misc.gfxRows == 1) {
		placeY = 0;
	}

	// A boomerang only has 4 animations on seperate columns but only 1 row
	if(element.misc.name.search("_boomerang") != -1) {
		placeX = 0;
		placeY = Math.floor((element.misc.subimg * element.misc.imgSpd) % 4) * 16;
	}

	// A sword has different direction animations but only 1 column.
	else if(element.misc.name.search("_sword") != -1) { 
		placeX = 0; 
	}

	// A bomb is the only graphic that has a 48x48 sprite size, therefore must be handled seperate from everything else.
	else if(element.misc.name.search("_bomb") != -1) {
		placeX = Math.floor((element.misc.subimg * element.misc.imgSpd) % 7) * 48;
		placeY = 0;
		var size = 48;

		// Rectangle Clip function: (top, right, bottom, left)
		img.style.clip = "rect(" + String(placeY) + "px," + String(placeX + size) + "px," + String(placeY + size) + "px," + String(placeX) + "px)"; 
		img.style.left = (element.pos.x - (size / 2) - placeX) + "px"; 
		img.style.top = (element.pos.y - size - placeY) + "px"; 
		return;
	}

	// An arrow has the same functionality as a sword
	else if(element.misc.name.search("_arrow") != -1) { 
		placeX = 0; 
	}

	// Rectangle Clip function: (top, right, bottom, left)
	img.style.clip = "rect(" + String(placeY) + "px," + String(placeX + 16) + "px," + String(placeY + 16) + "px," + String(placeX) + "px)";
	img.style.left = (element.pos.x - (16 / 2) - placeX) + "px"; 
	img.style.top = (element.pos.y - 16 - placeY) + "px"; 
}

/** Moves an object, can also define whether place checking occurs.
 * @param {Element} element The element must posses a [pos] object containing [x] and [y] fields.  The function will directly change the value in these fields.
 * @param {string} dir: Text stating the direction the element is looking to move.  Literally a string of either "up" "down" "left" or "right"
 * @param {integer} spd: The amount of pixels to move in one direction.
 * @param {boolean} pass: Set to true if the element does not need to check if the location is free to move.
*/
function move(element, dir, spd, pass) {
	if(dir == "up" && (placeFree(element.pos.x, element.pos.y - spd) == true || pass == true )) {
		element.pos.y -= spd;
	}
	else if(dir == "down" && (placeFree(element.pos.x, element.pos.y + spd) == true || pass == true )) {
		element.pos.y += spd;
	}
	else if(dir == "left" && (placeFree(element.pos.x - spd, element.pos.y) == true || pass == true )) {
		element.pos.x -= spd; 
	}
	else if(dir == "right" && (placeFree(element.pos.x + spd, element.pos.y) == true || pass == true )) {
		element.pos.x += spd; 
	}
}

/** Moves an object if the place is passable*/
function movePassable(element, spd) {
	return move(element, element.misc.direction, spd, true);
}

/** Move an object if the location is free*/
function moveImpassable(element, dir, spd) {
	return move(element, dir, spd, false);
}

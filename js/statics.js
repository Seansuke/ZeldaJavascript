/* ==================================================================================================================================*/
/* ==========================================================General Use ==========================================================*/
/* ==================================================================================================================================*/

/** A generic way to quickly create an attack*/
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

/** Determine if there is a collision between two objects based on their misc.box variable*/
function isColliding(a, b) { 
	if(Math.abs((a.pos.x + a.misc.box) - (b.pos.x + b.misc.box)) < a.misc.box + b.misc.box) {
		if(Math.abs(a.pos.y - b.pos.y) < a.misc.box + b.misc.box) {
			return true;
		}
	}
	return false;
}

/**  Have the receiver store damage from the giver.  Will handle how far receiver is pushed.
  * Stored damage is not applied until the force from the push ends.  
  * Actually deducting HP is not done in this method. */
function storeDamageAndPush(receiver, giver) { 
	
	// Damage is done to object A if A is not taking damage or on the same team
	if(receiver.dmg.cool <= 0 && giver.stat.att > 0 && receiver.misc.team != giver.misc.team) {
		receiver.dmg.time = giver.stat.time; 
		receiver.dmg.force = giver.stat.force; 
		receiver.dmg.cool = giver.stat.force;
		receiver.dmg.att = giver.stat.att;

		// Push object A away from object B's direction
		if(Math.abs(receiver.pos.x - giver.pos.x) > Math.abs(receiver.pos.y - giver.pos.y)) {
			if(receiver.pos.x < giver.pos.x) { 
				receiver.dmg.direction = "left"; 
			}
			else { 
				receiver.dmg.direction = "right"; 
			}
		}
		else {
			if(receiver.pos.y < giver.pos.y) { 
				receiver.dmg.direction = "up"; 
			}
			else { 
				receiver.dmg.direction = "down"; 
			}
		}
	}
}

/** A generic check for all possible collisions.  Will also trigger their reactions.  */
function checkAllCollisions() {
	for( var i = 0; i < MAX_FOES; i++) {

		// Check if player is colliding with any foe
		if(_foeList[i].dmg.time <= 0 && isColliding(_p1, _foeList[i]) == true) {
			storeDamageAndPush(_p1, _foeList[i]);
		}

		// Check if player is colliding with any foe's attack
		if( isColliding(_p1, _foeList[i].attackElem) == true) { 
			storeDamageAndPush(_p1, _foeList[i].attackElem); 
		}

		// Check if any foe is colliding with player's attack
		if( isColliding(_foeList[i], _p1.attackElem) == true) { 
			storeDamageAndPush(_foeList[i], _p1.attackElem); 
		}

		// Expect p2 to exist before we compare damaging it
		if(_p2 !== null) {
			// Check if player is colliding with any foe
			if( isColliding(_p2, _foeList[i]) == true) {
				storeDamageAndPush(_p2, _foeList[i]);
			}

			// Check if player is colliding with any foe's attack
			if( isColliding(_p2, _foeList[i].attackElem) == true) { 
				storeDamageAndPush(_p2, _foeList[i].attackElem); 
			}

			// Check if any foe is colliding with player's attack
			if( isColliding(_foeList[i], _p2.attackElem) == true) { 
				storeDamageAndPush(_foeList[i], _p2.attackElem); 
			}
		}
	}

	checkItemDropCollision();

	// Check if player is colliding with an nonplayercharacter
	didPlayer2Collide = false;
	if( _p2 !== null) {
		didPlayer2Collide = isColliding(_p2, _nonPlayerCharacter);
	}
	if( isColliding(_p1, _nonPlayerCharacter) == true || didPlayer2Collide) {
		if(_nonPlayerCharacter.equipment.upgradeFunction !== undefined) {
			_nonPlayerCharacter.equipment.upgradeFunction(_nonPlayerCharacter.equipment.rank, _nonPlayerCharacter.equipment.cost);
			_nonPlayerCharacter.pos.x = -999;
			_nonPlayerCharacter.imgtag.src = "gfx/alpha.png";
			_nonPlayerCharacter.productImgTag.src = "gfx/alpha.png";
		}
		if(_nonPlayerCharacter.text != "") {
			DisplayConsoleText(_nonPlayerCharacter.text);
		}
	}
}

/** Handles a reaction to touching an item if it happens and removes it from the global queue. */
function checkItemDropCollision() {
	var collidedItem = _itemDropList.find(itemDrop => isColliding(_p1, itemDrop));
	collidedItem = collidedItem === undefined ? _itemDropList.find(itemDrop => isColliding(_p1.attackElem, itemDrop)) : collidedItem;
	if (_p2 !== null) {
		collidedItem = collidedItem === undefined ? _itemDropList.find(itemDrop => isColliding(_p2, itemDrop)) : collidedItem;
		collidedItem = collidedItem === undefined ? _itemDropList.find(itemDrop => isColliding(_p2.attackElem, itemDrop)) : collidedItem;
	}
	if (collidedItem !== undefined) {
		if (collidedItem.pos.x != 0) {
			if (collidedItem.type == "heart") {
				// Do not pick up hearts if full
				if (_p1.stat.hp >= _p1.stat.mhp && (_p2 !== null ? _p2.stat.hp >= _p2.stat.mhp : true)) {
					DisplayConsoleText("Link's hearts are already full!");
					return;
                }

				// Pick up hearts
				_p1.misc.respawnTimer = 0;
				_p1.stat.hp = Math.min(_p1.stat.hp + collidedItem.amnt * 2, _p1.stat.hp);
				if (_p2 !== null) {
					_p2.misc.respawnTimer = 0;
					_p2.stat.hp = Math.min(_p2.stat.hp + collidedItem.amnt * 2, _p2.stat.mhp);
				}
			}
			else if (collidedItem.type == "rupee") {
				_rupees += collidedItem.amnt;
			}
			else if (collidedItem.type == "speed") {
				_p1.stat.speed += collidedItem.amnt * 0.2;
				refreshPlayer2Equipment();
			}

			redrawHearts();

			if (_p1.stat.lensOfTruth > 0) {
				DisplayConsoleText("Link gained " + collidedItem.amnt + " " + collidedItem.type + "(s)!");
			}
			else {
				DisplayConsoleText(`Link gained ${collidedItem.type}(s)!`);
			}

			collidedItem.imgtag.remove();
			_itemDropList.splice(_itemDropList.indexOf(collidedItem), 1);
		}
	}
}

/** Have an object follow through it's damaged state.  Handles graphic change, being pushed, invincibility frames, HP lost at the end of a forced push. */
function combatantDamageState(self) {

	if(self.dmg.time % 2 == 0) {
		// Transparency is used for a basic flashing animation.  50% visible
		self.imgtag.style.opacity = "0.5";
	}
	else if(self.dmg.time % 4 == 3) {
		// 20% visible
		self.imgtag.style.opacity = "0.2";
	}
	else {
		// 100% visible
		self.imgtag.style.opacity = "1";
	}

	// Reduce the time someone is damaged.
	self.dmg.time--;

	// Move the someone 
	moveImpassable(self, self.dmg.direction, self.dmg.force);
	
	// HP is lost at the end of being pushed around rather than the beginning to prevent chaining
	if(self.dmg.time == 1) {
		if(self.dmg.att != 0 && self.stat.hp > 0) {
			self.stat.hp = Math.max(self.stat.hp - self.dmg.att, 0);
			if(self.misc.name == "link") {
				if(_p1.stat.lensOfTruth > 0)
				{
					DisplayConsoleText(`Link took ${Math.round(self.dmg.att)} damage!  ${Math.floor(self.stat.hp)} / ${Math.floor(self.stat.mhp)} Health Remains.`);
				}
				else
				{
					DisplayConsoleText("Link took damage!");
				}
				redrawHearts();
			}
			else {
				if (_p1.stat.lensOfTruth == 2) {
					if (self.stat.hp <= 0) {
						DisplayConsoleText(`${self.misc.name} took ${Math.round(self.dmg.att)} damage and was defeated!`);
					}
					else {
						DisplayConsoleText(`${self.misc.name} took ${Math.round(self.dmg.att)} damage!  ${Math.floor(self.stat.hp)} / ${Math.floor(self.stat.mhp)} Health Remains.`);
                    }
				}
				else if(_p1.stat.lensOfTruth == 1) {
					DisplayConsoleText(`${self.misc.name} took ${Math.round(self.dmg.att)} damage!`);
				}
				else {
					DisplayConsoleText(`${self.misc.name} took damage!`);
				}
				
			}
		}
	}
}

/**
 * Check if the object is not within it's graphic bounds or cooldown time bounds.
 */
function reduceCooldownAndResetOutsideBoundaries(self) {
	if(self.dmg.cool > 0) {
		self.dmg.cool--;
	}

	// If the object is "stuck" on a tile, randomly teleport elsewhere
	if(placeFree(self.pos.x, self.pos.y) == false && self.stat.hp > 0) {
		self.pos.x = 60 + Math.random() * 320
		self.pos.y = 60 + Math.random() * 360
	}
}

function TryParseInt(str, defaultValue) {
     var retValue = defaultValue;
     if(str !== null) {
         if(str.length > 0) {
             if (!isNaN(str)) {
                 retValue = parseInt(str);
             }
         }
     }
     return retValue;
}

// TODO - MAke more maps too.  https://github.com/Seansuke/ZeldaJavascript/issues/4
/** Request from the server an adjacent map to be drawn.*/
function nextRoom(mapXadd, mapYadd) {
	_mapX += mapXadd;
	_mapY += mapYadd;
	var mapFileName = "ajax/map_" + _mapX + "" + _mapY + ".txt";
	var fullMapFileName = mapFileName;
	simpleHttpRequest(fullMapFileName, setTiles);
}

/** Redraw the hearts on the screen*/
function redrawHearts() { 
	for(var i = 0;i * 10 < _p1.stat.mhp;i++) {
		if(_p1.stat.hp >= (i)*10 + 5) { 
			_heartList[i].src = "gfx/gui/heart_full.png"; 
		}
		else if(_p1.stat.hp >= (i)*10) { 
			_heartList[i].src = "gfx/gui/heart_half.png"; 
		}
		else { 
			_heartList[i].src = "gfx/gui/heart_empty.png"; 
		}
	}
	if(_p2 !== null)
	{
		for(var i = 0;i * 10 < _p2.stat.mhp;i++) {
			if(_p2.stat.hp >= (i)*10 + 5) { 
				_player2HeartList[i].src = "gfx/gui/heart_full.png"; 
			}
			else if(_p2.stat.hp >= (i)*10) { 
				_player2HeartList[i].src = "gfx/gui/heart_half.png"; 
			}
			else { 
				_player2HeartList[i].src = "gfx/gui/heart_empty.png"; 
			}
		}
	}
}

/** Request the player's life to be redrawn.*/
function redrawMaxHearts() {
	while(_heartList.length > 0)
	{
		_heartList.pop();
	}
	while(document.getElementsByClassName("heart").length > 0) { 
		document.getElementsByClassName("heart")[0].remove();
	3}
	var heartWrapperDivTag = document.getElementById('heartWrapper');
	for(var i = 0;i * 10 < _p1.stat.mhp;i++) {
		var newHeartImageTag = document.createElement('img');
		newHeartImageTag.classList.add("heart");
		newHeartImageTag.src = "gfx/gui/heart_full.png";
		var appendedHeartImageTag = heartWrapperDivTag.appendChild(newHeartImageTag);
		_heartList.push(appendedHeartImageTag);
	}
	if(_p2 !== null)
	{
		while(_player2HeartList.length > 0)
		{
			_player2HeartList.pop();
		}
		while(document.getElementsByClassName("heartP2").length > 0) { 
			document.getElementsByClassName("heartP2")[0].remove();
		}
		var heartWrapperP2DivTag = document.getElementById('heartWrapperP2');
		for(var i = 0;i * 10 < _p2.stat.mhp;i++) {
			var newHeartImageTag = document.createElement('img');
			newHeartImageTag.classList.add("heartP2");
			newHeartImageTag.src = "gfx/gui/heart_full.png";
			var appendedHeartImageTag = heartWrapperP2DivTag.appendChild(newHeartImageTag);
			_player2HeartList.push(appendedHeartImageTag);
		}

	}
}

/** Returns a request object depending on the browser used. */
function makeHttpObject() {
	try {
		return new XMLHttpRequest();
	}
	catch (error) {}
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (error) {}
	try {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	catch (error) {}
	throw new Error("Could not create HTTP request object.");
}

/**
 * Re-initializes the current tiles to be randomized, then sends a GET request and 
 * responds back to the callback function with the response body.
 * @param {string} url 
 * @param {CallableFunction} callbackFunction
 */
function simpleHttpRequest(url, callbackFunction) {

	// Generate random tiles first.
	setTiles("random"); 

	// Attempt to make the HTTP Object
	var request = makeHttpObject();

	// Assuming the creation of the request object succeeded, use it.
	if( request ) {

		// An invoked function 
		request.onreadystatechange = function()  {

			// Request finshed and response is ready
			if (request.readyState == 4)  {

				// The server responded with OK
				if (request.status == 200 || request.status == 0) { 

					// Setup the response data with the callback function
					callbackFunction(request.responseText, false); 
				}
			}
		}
 
		var useAsync = true;

		// Setup the request to the server
		request.open("GET", url, useAsync);

		// Send the request to the server
		request.send(null);
	}
}

/** Creates a sprite on tile location i, j on the screen. */
function addTile(i, j, tileNum) {
	_tileMatrix[i][j] = tileNum; 
	var tileNum = _tileMatrix[i][j];
	_tileTagList.push(document.getElementById("tiles").appendChild(document.createElement('img')));
	_tileTagList[_tileTagList.length - 1].src = "gfx/tileset.png";
	_tileTagList[_tileTagList.length - 1].style.left = (i * 16 - tileNum * 16 - 8) + "px";
	_tileTagList[_tileTagList.length - 1].style.top = (j * 16 - 16) + "px"; 

	//Rectangle Clip's parameters: (top, right, bottom, left)
	_tileTagList[_tileTagList.length - 1].style.clip = "rect(0px," + String( tileNum * 16 + 16 ) + "px, 16px," + String( tileNum * 16 ) + "px)"; 
}

/** Loads the current screen with the responseText of map data. */
function setTiles(responseText) {
	
	if(responseText == "")
	{
		return;
	}
	
	if(responseText == "random")
	{
		responseText = "";
	}

	// Ensure all the tiles have been removed from the tiles div tag
	while(_tileTagList.length > 0) { 

		// Remove them, one by one, off of the 2D Array
		document.getElementById("tiles").removeChild( _tileTagList.pop()); 
	} 

	if(responseText.length < _horizontalTileCount * _verticalTileCount) {
		// Create a random map if the length of the response does not match the intended tile count.
		for(var i = 0;i < _horizontalTileCount;i++) {
			for(var j = 0;j < _verticalTileCount;j++) {
				if(Math.random() < 0.15 
					&& i > 2 
					&& i < _horizontalTileCount - 2 
					&& j > 2 
					&& j < _verticalTileCount - 2
					) {
					addTile(i, j, Math.floor(Math.random() * 7)); 
				}
				else {
					addTile(i, j, 0); 
				}
			}
		}
	}
	else {
		// The file has been received, now to take the text and make turn each character into a tile.
		var i = 0;
		var j = 0;
		var openRootNode = `<root><![CDATA[`;
		var endRootNode = `]]></root>`;
		var carriageReturn = `\r`;
		var newline = `\n`;
		responseText = responseText.replace(openRootNode, "");
		responseText = responseText.replace(endRootNode, "");
		responseText = responseText.replace(carriageReturn, "");
		responseText = responseText.replace(newline, "");
		var characterToTileNumberBook = {
			" ": 0, // dirt  - passable
			"@": 1, // rock
			"W": 2, // water
			"T": 3, // tree
			"&": 4, // green rock
			"#": 5, // rock wall
			"_": 6, // grass  - passable
			"t": 7  // dying tree
		};
		RemoveNonPlayerCharacter();
		while(responseText.length > 0) {
			var currentTileCharacter = responseText.substring(0,1);
			var currentTileNumber = 0;
			currentTileNumber = TryParseInt(currentTileCharacter, -1)
			if(currentTileNumber == -1)
			{
				CreateNonPlayerCharacter(currentTileCharacter, i, j);
				currentTileNumber = characterToTileNumberBook[currentTileCharacter];
			}
			if(isNaN(currentTileNumber))
			{
				currentTileNumber = 0;
			}
			addTile(i, j, currentTileNumber);
			responseText = responseText.substring(1);
			i++;
			if(i > 640 / 16) {
				responseText = responseText.substring(2);
				i = 0;
				j++;
			}
		}
	}
}

function RemoveNonPlayerCharacter()
{
	_nonPlayerCharacter.pos = { x: -999, y: -999 };
	_nonPlayerCharacter.imgtag.src = "gfx/alpha.png";
	_nonPlayerCharacter.productImgTag.src = "gfx/alpha.png";
}

function CreateNonPlayerCharacter(currentTileCharacter, i, j)
{
	var spawned = false;

	var weaponUpdateArray = (new EquipmentList())[currentTileCharacter];
	if(weaponUpdateArray !== undefined)
	{
		_nonPlayerCharacter.productImgTag.src = weaponUpdateArray.gfx;
		_nonPlayerCharacter.equipment = weaponUpdateArray;
		_nonPlayerCharacter.text = "";
		spawned = true;
	}

	var dialogueText = (new DialogueList())[currentTileCharacter];
	if(dialogueText !== undefined)
	{
		_nonPlayerCharacter.productImgTag.src = "gfx/alpha.png";
		_nonPlayerCharacter.text = dialogueText;
		spawned = true;
	}

	if(spawned)
	{
		_nonPlayerCharacter.pos = { x: i*16, y: j*16 };
		_nonPlayerCharacter.imgtag.style.left = _nonPlayerCharacter.pos.x + "px";
		_nonPlayerCharacter.imgtag.style.top = _nonPlayerCharacter.pos.y + "px";
		_nonPlayerCharacter.productImgTag.style.left = _nonPlayerCharacter.pos.x + "px";
		_nonPlayerCharacter.productImgTag.style.top = _nonPlayerCharacter.pos.y + 16 + "px";
		_nonPlayerCharacter.productImgTag.style.clip = "rect(0px, 16px, 16px, 0px)";
		if(_nonPlayerCharacter.equipment.name !== undefined)
		{
			if(_nonPlayerCharacter.equipment.name.indexOf("bomb") != -1)
			{
				_nonPlayerCharacter.productImgTag.style.clip = "rect(16px, 32px, 32px, 16px)";
			}
		}
		_nonPlayerCharacter.productCode = currentTileCharacter;
		_nonPlayerCharacter.imgtag.src = "gfx/shopkeeper.png";
	}
}

/** Resets the game upon game over. */
function resetGame(player)
{
	// TODO - make a money bag/ e.g. bunch of rupees. - test  https://github.com/Seansuke/ZeldaJavascript/issues/5
	// TODO - make temples.   https://github.com/Seansuke/ZeldaJavascript/issues/13
	// TODO - make temple music.  https://github.com/Seansuke/ZeldaJavascript/issues/14
	// TODO - make bosses.  https://github.com/Seansuke/ZeldaJavascript/issues/15
	// TODO - shopkeepers need to have the item cost displayed.  https://github.com/Seansuke/ZeldaJavascript/issues/16
	// TODO - define save file name in advance.  https://github.com/Seansuke/ZeldaJavascript/issues/17
	// TODO - I bought red bombs for 10 rupees.  Something is WRONG. = test https://github.com/Seansuke/ZeldaJavascript/issues/18
	// TODO - bombs op, plz nerf - test  https://github.com/Seansuke/ZeldaJavascript/issues/19
	// TODO - bought white sword... i dont have it thoughl.. hwat? - test  https://github.com/Seansuke/ZeldaJavascript/issues/20
	// TODO - if p1 dies. then p2 gets a heart: respawn does not happen. - test  https://github.com/Seansuke/ZeldaJavascript/issues/21
	// TODO - Foes, while they are invincible, should not do damage to you! - test  https://github.com/Seansuke/ZeldaJavascript/issues/22
	// TODO - ally invincible time  https://github.com/Seansuke/ZeldaJavascript/issues/23
	// TODO - shopkeepers shouldnt disappear.  https://github.com/Seansuke/ZeldaJavascript/issues/25
	if(_p1.misc.checkpointPosX === undefined)
	{
		_p1.misc.checkpointPosX = 20;
		_p1.misc.checkpointPosY = 240;
		_p1.misc.checkpointMapX = 0;
		_p1.misc.checkpointMapY = 0;
	}
	player.pos = { x: _p1.misc.checkpointPosX, y: _p1.misc.checkpointPosY };
	_p1.pos.x = player.pos.x;
	_p1.pos.y = player.pos.y;
	if(_p2 !== null)
	{
		_p2.pos.x = player.pos.x;
		_p2.pos.y = player.pos.y;
	}

	player.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
	player.misc.attacking = 0;
	player.misc.imgSpd = 1/3;
	player.misc.currentWpn = "none";
	player.misc.respawnTimer = 0;

	// Reset player HP to max.
	_p1.stat.hp = _p1.stat.mhp;
	if(_p2 !== null)
	{
		_p2.stat.hp = _p2.stat.mhp;
	}

	player.imgtag.src = player.stat.imgSource;
	player.imgtag.style.opacity = "1";
	refreshPlayer2Equipment();
	redrawMaxHearts();
	redrawHearts();
	_mapX = _p1.misc.checkpointMapX;
	_mapY = _p1.misc.checkpointMapY;
	resetFoes();
	nextRoom(0, 0);
}

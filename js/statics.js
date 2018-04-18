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
	var maximumFoeOnScreen = MAX_FOES;
	var distanceFromStart = mapX + mapY;
	var minimumFoeDifficulty = 0;
	var maximumFoeDifficulty = 7;
	if(Math.abs(distanceFromStart) < 3)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES / 4);
		minimumFoeDifficulty = 0;
		maximumFoeDifficulty = 3;
	}
	else if(Math.abs(distanceFromStart) < 6)
	{
		maximumFoeOnScreen = Math.floor(MAX_FOES / 2);
		minimumFoeDifficulty = 0;
		maximumFoeDifficulty = 6;
	}
	for(var i = 0;i < MAX_FOES;i++) {
		foes[i].stat.hp = 0;
	}
	for(var i = 0;i < maximumFoeOnScreen;i++) {
		// TODO - add more foes.
		newName = ( Array('keese','octo','rope','moblin','stalfos','gibdo','darknut') )[ minimumFoeDifficulty + Math.floor(Math.random() * maximumFoeDifficulty) ];
		foes[i].pos = { x: 60 + Math.random() * 320, y: 60 + Math.random() * 360 }; 
		foes[i].stat = { hp: 5 + Math.random() * 15, mhp: 15, attTime: 8,  att: 5, time: 3, force: 12, cool: 10, effect: "none", speed: 2};
		foes[i].dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
		foes[i].misc = { name: newName, box:8, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"enemy", xp:1 };
		foes[i].imgtag.src = "gfx/foe/" + foes[i].misc.name + ".png";
		foes[i].imgtag.style.opacity = "1";
		foes[i].attackElem.pos.x = -300;
		if(newName == "keese") {
			foes[i].stat.mhp = 1 + Math.random() * 2;
			foes[i].stat.att = 1 + Math.random() * 2;
			foes[i].stat.speed = 6;
		}
		if(newName == "rope") {
			foes[i].stat.mhp = 3 + Math.random() * 5;
			foes[i].stat.att = 3 + Math.random() * 5;
			foes[i].stat.speed = 5;
		}
		if(newName == "moblin") {
			foes[i].stat.mhp = 10 + Math.random() * 5;
			foes[i].stat.att = 7 + Math.random() * 3;
			foes[i].misc.currentWpn = "wooden_boomerang";
			foes[i].misc.xp = 3;
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
		foes[i].stat.hp = foes[i].stat.mhp;
		foes[i].ai.aggro = false;
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
		if(p2 !== null) {
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
	var didPlayer2Collide = false;
	if( p2 !== null) {
		didPlayer2Collide = checkSingleCollision(p2, itemDrop);
	}
	if( checkSingleCollision(p1, itemDrop) == true || didPlayer2Collide) {
		if(itemDrop.pos.x != 0) {
			if(itemDrop.type == "heart") {
				p1.stat.hp += itemDrop.amnt * 2;
				if(p1.stat.hp > p1.stat.mhp) {
					p1.stat.hp = p1.stat.mhp;
				}
				if(p2 !== null) {
					p2.stat.hp += itemDrop.amnt * 2;
					
					if(p2.stat.hp > p2.stat.mhp) {
						p2.stat.hp = p2.stat.mhp;
					}
				}
			}
			else if(itemDrop.type == "rupee") {
				rupees += itemDrop.amnt;
			}
			else if(itemDrop.type == "speed") {
				p1.stat.speed += itemDrop.amnt * 0.2;
				refreshPlayer2Equipment();
			}
			redrawHearts();
			if(p1.stat.lensOfTruth > 0)
			{
				DisplayConsoleText("Link gained " + itemDrop.amnt + " " + itemDrop.type + "(s)!");
			}
			else
			{
				DisplayConsoleText(`Link gained ${itemDrop.type}(s)!`);
			}
			itemDrop.pos.x = 0;
			itemDrop.imgtag.src = "gfx/alpha.png";
		}
	}

	// Check if player is colliding with an item
	didPlayer2Collide = false;
	if( p2 !== null) {
		didPlayer2Collide = checkSingleCollision(p2, nonPlayerCharacter);
	}
	if( checkSingleCollision(p1, nonPlayerCharacter) == true || didPlayer2Collide) {
		if(nonPlayerCharacter.equipment.upgradeFunction !== undefined)
		{
			nonPlayerCharacter.equipment.upgradeFunction(nonPlayerCharacter.equipment.rank, nonPlayerCharacter.equipment.cost);
			nonPlayerCharacter.pos.x = -999;
			nonPlayerCharacter.imgtag.src = "gfx/alpha.png";
			nonPlayerCharacter.productImgTag.src = "gfx/alpha.png";
		}
		if(nonPlayerCharacter.text != "")
		{
			DisplayConsoleText(nonPlayerCharacter.text);
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
	moveImpassable(self, self.dmg.direction, self.dmg.force);

	// HP is lost at the end of being pushed around rather than the beginning to prevent chaining
	if(self.dmg.time == 1) {
		if(self.dmg.att != 0 && self.stat.hp > 0) {
			self.stat.hp -= self.dmg.att;
			if(self.misc.name == "link") {
				if(p1.stat.lensOfTruth > 0)
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
				if(p1.stat.lensOfTruth == 2)
				{
					DisplayConsoleText(`${self.misc.name} took ${Math.round(self.dmg.att)} damage!  ${Math.floor(self.stat.hp)} / ${Math.floor(self.stat.mhp)} Health Remains.`);
				}
				else if(p1.stat.lensOfTruth == 1)
				{
					DisplayConsoleText(`${self.misc.name} took ${Math.round(self.dmg.att)} damage!`);
				}
				else
				{
					DisplayConsoleText(`${self.misc.name} took damage!`);
				}
				
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
		self.pos.x = 60 + Math.random() * 320
		self.pos.y = 60 + Math.random() * 360
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

function TryParseInt(str,defaultValue) {
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

function isChrome() {
  var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

  if (isIOSChrome) {
    return true;
  } else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true;
  } else { 
    return false;
  }
}

// Request from the server an adjacent map to be drawn.
function nextRoom(mapXadd, mapYadd) {
	mapX += mapXadd;
	mapY += mapYadd;
	// TODO - make this work with maps on file for testing.
	var mapFileName = "ajax/map_" + mapX + "" + mapY + ".txt";
	var fullMapFileName = mapFileName;
	var currentFilePath = window.location.href;
	if(isChrome() && window.location.protocol == "file:")
	{
		//fullMapFileName = `http://seansuke.mygamesonline.com/zeldajs/${mapFileName}`;
		setTiles("random"); 
		return;
	}
	simpleHttpRequest(fullMapFileName, setTiles);
}

// Redraw the hearts on the screen
function redrawHearts() { 
	for(var i = 0;i * 10 < p1.stat.mhp;i++) {
		if(p1.stat.hp >= (i)*10 + 5) { 
			heartList[i].src = "gfx/gui/heart_full.png"; 
		}
		else if(p1.stat.hp >= (i)*10) { 
			heartList[i].src = "gfx/gui/heart_half.png"; 
		}
		else { 
			heartList[i].src = "gfx/gui/heart_empty.png"; 
		}
	}
	if(p2 !== null)
	{
		for(var i = 0;i * 10 < p2.stat.mhp;i++) {
			if(p2.stat.hp >= (i)*10 + 5) { 
				heartListP2[i].src = "gfx/gui/heart_full.png"; 
			}
			else if(p2.stat.hp >= (i)*10) { 
				heartListP2[i].src = "gfx/gui/heart_half.png"; 
			}
			else { 
				heartListP2[i].src = "gfx/gui/heart_empty.png"; 
			}
		}
	}
}

// Request the player's life to be redrawn.
function redrawMaxHearts() {
	while(heartList.length > 0)
	{
		heartList.pop();
	}
	while(document.getElementsByClassName("heart").length > 0) { 
		document.getElementsByClassName("heart")[0].remove();
	3}
	var heartWrapperDivTag = document.getElementById('heartWrapper');
	for(var i = 0;i * 10 < p1.stat.mhp;i++) {
		var newHeartImageTag = document.createElement('img');
		newHeartImageTag.classList.add("heart");
		newHeartImageTag.src = "gfx/gui/heart_full.png";
		var appendedHeartImageTag = heartWrapperDivTag.appendChild(newHeartImageTag);
		heartList.push(appendedHeartImageTag);
	}
	if(p2 !== null)
	{
		while(heartListP2.length > 0)
		{
			heartListP2.pop();
		}
		while(document.getElementsByClassName("heartP2").length > 0) { 
			document.getElementsByClassName("heartP2")[0].remove();
		}
		var heartWrapperP2DivTag = document.getElementById('heartWrapperP2');
		for(var i = 0;i * 10 < p2.stat.mhp;i++) {
			var newHeartImageTag = document.createElement('img');
			newHeartImageTag.classList.add("heartP2");
			newHeartImageTag.src = "gfx/gui/heart_full.png";
			var appendedHeartImageTag = heartWrapperP2DivTag.appendChild(newHeartImageTag);
			heartListP2.push(appendedHeartImageTag);
		}

	}
}

// Example code from Professor Johnson
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

// Example code from Professor Johnson
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

// A single addition of a tile will be made on position i,j.
function addTile(i, j, tileNum) {
	tileSet[i][j] = tileNum; 
	var tileNum = tileSet[i][j];
	tileTags.push(document.getElementById("tiles").appendChild(document.createElement('img')));
	tileTags[tileTags.length - 1].src = "gfx/tileset.png";
	tileTags[tileTags.length - 1].style.left = (i * 16 - tileNum * 16 - 8) + "px";
	tileTags[tileTags.length - 1].style.top = (j * 16 - 16) + "px"; 

	//Rectangle Clip's parameters: (top, right, bottom, left)
	tileTags[tileTags.length - 1].style.clip = "rect(0px," + String( tileNum * 16 + 16 ) + "px, 16px," + String( tileNum * 16 ) + "px)"; 
}

//Based on your options (and internet connectivity), a map will be loaded.
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
	while(tileTags.length > 0) { 

		// Remove them, one by one, off of the 2D Array
		document.getElementById("tiles").removeChild( tileTags.pop()); 
	} 

	if(responseText.length < horizontalTileCount * verticalTileCount) {
		// Create a random map if the length of the response does not match the intended tile count.
		for(var i = 0;i < horizontalTileCount;i++) {
			for(var j = 0;j < verticalTileCount;j++) {
				if(Math.random() < 0.15 
					&& i > 2 
					&& i < horizontalTileCount - 2 
					&& j > 2 
					&& j < verticalTileCount - 2
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
			"_": 6  // grass  - passable
		};
		RemoveNonPlayerCharacter();
		while(responseText.length > 0) {
			var currentTileCharacter = responseText.substring(0,1);
			var currentTileNumber = 0;
			currentTileNumber = TryParseInt(currentTileCharacter, -1)
			if(currentTileNumber == -1)
			{
				CreateNonPlayerCharacter(currentTileCharacter, i, j);0
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
	nonPlayerCharacter.pos = { x: -999, y: -999 };
	nonPlayerCharacter.imgtag.src = "gfx/alpha.png";
	nonPlayerCharacter.productImgTag.src = "gfx/alpha.png";
}

function CreateNonPlayerCharacter(currentTileCharacter, i, j)
{
	var spawned = false;

	var weaponUpdateArray = (new EquipmentList())[currentTileCharacter];
	if(weaponUpdateArray !== undefined)
	{
		nonPlayerCharacter.productImgTag.src = weaponUpdateArray.gfx;
		nonPlayerCharacter.equipment = weaponUpdateArray;
		nonPlayerCharacter.text = "";
		spawned = true;
	}

	var dialogueText = (new DialogueList())[currentTileCharacter];
	if(dialogueText !== undefined)
	{
		nonPlayerCharacter.productImgTag.src = "gfx/alpha.png";
		nonPlayerCharacter.text = dialogueText;
		spawned = true;
	}

	if(spawned)
	{
		nonPlayerCharacter.pos = { x: i*16, y: j*16 };
		nonPlayerCharacter.imgtag.style.left = nonPlayerCharacter.pos.x + "px";
		nonPlayerCharacter.imgtag.style.top = nonPlayerCharacter.pos.y + "px";
		nonPlayerCharacter.productImgTag.style.left = nonPlayerCharacter.pos.x + "px";
		nonPlayerCharacter.productImgTag.style.top = nonPlayerCharacter.pos.y + 16 + "px";
		nonPlayerCharacter.productImgTag.style.clip = "rect(0px, 16px, 16px, 0px)";
		if(nonPlayerCharacter.equipment.name !== undefined)
		{
			if(nonPlayerCharacter.equipment.name.indexOf("bomb") != -1)
			{
				nonPlayerCharacter.productImgTag.style.clip = "rect(16px, 32px, 32px, 16px)";
			}
		}
		nonPlayerCharacter.productCode = currentTileCharacter;
		nonPlayerCharacter.imgtag.src = "gfx/shopkeeper.png";
	}
}

// Resets the game upon game over.
function resetGame(player)
{
	// TODO - make multiple drops available.
	// TODO - do not pick up hearts if full. 
	// TODO - MAke more maps too.
	// POLS VOICE + 
	// MORE MAPS + 
	// CHU CHUS
	// make a money bag/ e.g. bunch of rupees.
	// make temples.
	// make temple music.
	// make bosses.
	// All shopkeepers have the "g" dialogue for some reason...
	// shopkeepers need to have the item cost displayed.
	// I bought red bombs for 10 rupees.  Something is WRONG.
	// define save file name in advance.
	// bombs op, plz nerf
	// we spent 10 rupees but did not get another max heart....
	// bought white sword... i dont have it thoughl.. hwat?
	// Checkpoint locations.
	// if p1 dies. then p2 gets a heart: respawn does not happen.
	player.pos = { x: 20, y: 240 };
	p1.pos.x = player.pos.x;
	p1.pos.y = player.pos.y;
	if(p2 !== null)
	{
		p2.pos.x = player.pos.x;
		p2.pos.y = player.pos.y;
	}

	player.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
	player.misc = { name: "link", box:6, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"player", respawnTimer: 0 };

	// Reset player HP to max.
	p1.stat.hp = p1.stat.mhp;
	if(p2 !== null)
	{
		p2.stat.hp = p2.stat.mhp;
	}

	player.imgtag.src = player.stat.imgSource;
	player.imgtag.style.opacity = "1";
	redrawMaxHearts();
	redrawHearts();
	resetFoes();
	mapX = 0;
	mapY = 0;
	nextRoom(0, 0);
}

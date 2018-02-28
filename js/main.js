/* ================================================================================================================================== */
/* ==========================================================MAIN==================================================================== */
/* ================================================================================================================================== */

// Request from the server an adjacent map to be drawn.
function nextRoom(mapXadd, mapYadd) {
	mapX += mapXadd;
	mapY += mapYadd;
	// TODO - make this work with maps on file for testing.
	simpleHttpRequest("ajax/map_" + mapX + "" + mapY + ".txt", setTiles);
}

// Request the player's life to be redrawn.
function redrawMaxHearts() {
	while(hearts.length > 0) { 
		document.body.removeChild(hearts.pop());
	}
	for(var i = 0;i * 10 < p1.stat.mhp;i++) {
		var newHeartImageTag = document.createElement('img');
		var heartDivTag = document.getElementById('heart');
		var appendedHeartImageTag = heartDivTag.appendChild(newHeartImageTag);
		hearts.push(appendedHeartImageTag);
		hearts[i].src = "gfx/gui/heart_full.png";
		hearts[i].style.left = (80 + i * 16) + "px";
		hearts[i].style.top = (-40) + "px"; 
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
	setTiles(""); 

	// Attempt to make the HTTP Object
	var request = makeHttpObject();

	// Assuming the creation of the request object succeeded, use it.
	if( request ) {

		// An invoked function 
		request.onreadystatechange = function()  {

			// Request finshed and response is ready
			if (request.readyState == 4)  {

				// The server responded with OK
				if (request.status == 200) { 

					// Setup the response data with the callback function
					callbackFunction(request.responseText, false); 
				}
			}
		}

		// Setup the request to the server
		request.open("GET", url, true);

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

	// Ensure all the tiles have been removed from the tiles div tag
	while(tileTags.length > 0) { 

		// Remove them, one by one, off of the 2D Array
		document.getElementById("tiles").removeChild( tileTags.pop()); 
	} 

	if(responseText.length < horizontalTileCount * verticalTileCount) {
		// Create a random map if the length of the response does not match the intended tile count.
		for(var i = 2;i < horizontalTileCount - 2;i++) {
			for(var j = 2;j < verticalTileCount - 2;j++) {
				if(Math.random() < 0.2) {
					addTile(i, j, 1 + Math.floor(Math.random() * 5)); 
				}
				else {
					tileSet[i][j] = 0; 
				}
			}
		}
	}
	else {
		// The file has been received, now to take the text and make turn each character into a tile.
		var i = 0;
		var j = 0;
		while(responseText.length > 0) {
			addTile(i, j, parseInt(responseText.substring(0,1)));
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

function changeTunic() {
	tunic = (tunic + 1) % 7;
	switch(tunic) {
		case 0: 
			p1.stat.imgSource = 'gfx/link/link.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
		case 1: 
			p1.stat.imgSource = 'gfx/link/blue.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
		case 2: 
			p1.stat.imgSource = 'gfx/link/red.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
		case 3: 
			p1.stat.imgSource = 'gfx/link/black.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
		case 4: 
			p1.stat.imgSource = 'gfx/link/purple.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
		case 5: 
			p1.stat.imgSource = 'gfx/link/pink.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
		case 6: 
			p1.stat.imgSource = 'gfx/link/classic.png';
			p1.imgtag.src = p1.stat.imgSource;
		break;
	}
}

function swordUpgrade() {
	if(rupees >= 9) {
		if(p1.wpn.A == 'wooden_sword') {
			rupees -= 9;
			p1.wpn.A = 'white_sword';
			DisplayConsoleText('Upgraded to White Sword!');
		}
		else if(p1.wpn.A == 'white_sword') {
			rupees -= 9;
			p1.wpn.A = 'magic_sword';
			DisplayConsoleText('Upgraded to Magic Sword!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}
}

function boomerangUpgrade() {
	if(rupees >= 2) {
		if(p1.wpn.B == 'None') {
			rupees -= 2;
			p1.wpn.B = 'wooden_boomerang';
			DisplayConsoleText('Upgraded to Wooden Boomerang!');
		}
		else if(p1.wpn.B == 'wooden_boomerang') {
			rupees -= 2;
			p1.wpn.B = 'magic_boomerang';
			DisplayConsoleText('Upgraded to Magic Boomerang!');
		}
		else if(p1.wpn.B == 'magic_boomerang') {
			rupees -= 2;
			p1.wpn.B = 'fire_boomerang';
			DisplayConsoleText('Upgraded to Fire Boomerang!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}
}

function arrowUpgrade() {
	if(rupees >= 6) {
		if(p1.wpn.D == 'None') {
			rupees -= 6;
			p1.wpn.D = 'wooden_arrow';
			DisplayConsoleText('Upgraded to Wooden Arrow!');
		}
		else if(p1.wpn.D == 'wooden_arrow') {
			rupees -= 6;
			p1.wpn.D = 'silver_arrow';
			DisplayConsoleText('Upgraded to Silver Boomerang!');
		}
		else if(p1.wpn.D == 'silver_arrow') {
			rupees -= 6;
			p1.wpn.D = 'light_arrow';
			DisplayConsoleText('Upgraded to Light Boomerang!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}
}

function bombUpgrade() {
	if(rupees >= 5) {
		if(p1.wpn.C == 'None') {
			rupees -= 5;
			p1.wpn.C = 'blue_bomb';
			DisplayConsoleText('Upgraded to Blue Bomb!');
		}
		else if(p1.wpn.C == 'blue_bomb') {
			rupees -= 5;
			p1.wpn.C = 'red_bomb';
			DisplayConsoleText('Upgraded to Red Bomb!');
		}
		else if(p1.wpn.C == 'red_bomb') {
			rupees -= 5;
			p1.wpn.C = 'black_bomb';
			DisplayConsoleText('Upgraded to Black Bomb!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}
}

function heartUpgrade() {
	if(rupees >= 9) {
		if(p1.stat.mhp < 100) {
			rupees -= 9;
			p1.stat.mhp += 10;
			p1.stat.hp += 10;
			redrawMaxHearts();
			redrawHearts();
			DisplayConsoleText('Upgraded Hearts!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}
}

function DisplayConsoleText(newConsoleText)
{
	consoleTag.value = newConsoleText;
}

// Resets the game upon game over.
function resetGame(player)
{
	// TODO - MAke more maps too.
	rupees /= 2;
	player.pos = { x: 20, y: 240 };
	player.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
	player.misc = { name: "link", box:6, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"player", respawnTimer: 0 };
	player.stat.hp = 30;
	player.imgtag.src = player.stat.imgSource;
	redrawHearts();
	resetFoes();
	mapX = 0;
	mapY = 0;
	nextRoom(0, 0);
}

// Calling this function once will initialize all the resources necessary for the game to run.
function init( ) {
	var backgroundMusicTag = document.getElementById("backgroundMusic");
	backgroundMusicTag.volume = 0.5;
	rupeeTag = document.getElementById("rupee");
	itemDrop = new Drop();
	consoleTag = document.getElementById("console");
	p1 = new Player();
	for(var i = 0; i < MAX_FOES; i++) {
		foes[i] = new Foe("random"); 
	}
	resetFoes();
	tileSet = new Array();
	for(var i = 0;i <= 640 / 16;i++) {
		tileSet[i] = new Array();
		for(var j = 0;j <= 480 / 16;j++) {
			tileSet[i][j] = 0;
		}
	}
	simpleHttpRequest("ajax/map_00.txt", setTiles);
	redrawMaxHearts();
	if( timer != null)
	{
		clearInterval(timer);
	}
	timer = setInterval("action()", spf);
	DisplayConsoleText("Enjoy your adventure!");
}

// This is the main game loop which will run once more every 50 milliseconds.
function action( ) {
	playerAction(p1);
	for(var i = 0; i < MAX_FOES; i++) { 
		foeAction(foes[i]); 
	}
	checkCollision();
}
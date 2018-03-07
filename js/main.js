/* ================================================================================================================================== */
/* ==========================================================MAIN==================================================================== */
/* ================================================================================================================================== */

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

	// Refresh all weapons
	if(p2 !== null) {
		p2.wpn.A = p1.wpn.A;
		p2.wpn.B = p1.wpn.B;
		p2.wpn.C = p1.wpn.C;
		p2.wpn.D = p1.wpn.D;
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

	// Refresh all weapons
	if(p2 !== null) {
		p2.wpn.A = p1.wpn.A;
		p2.wpn.B = p1.wpn.B;
		p2.wpn.C = p1.wpn.C;
		p2.wpn.D = p1.wpn.D;
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

	// Refresh all weapons
	if(p2 !== null) {
		p2.wpn.A = p1.wpn.A;
		p2.wpn.B = p1.wpn.B;
		p2.wpn.C = p1.wpn.C;
		p2.wpn.D = p1.wpn.D;
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

	// Refresh all weapons
	if(p2 !== null) {
		p2.wpn.A = p1.wpn.A;
		p2.wpn.B = p1.wpn.B;
		p2.wpn.C = p1.wpn.C;
		p2.wpn.D = p1.wpn.D;
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

	// Refresh all weapons
	if(p2 !== null) {
		p2.stat.mhp = p1.stat.mhp;
	}
}

function lensOfTruthUpgrade() {
	if(rupees >= 16) {
		if(p1.stat.lensOfTruth == 0) {
			rupees -= 16;
			p1.stat.lensOfTruth = 1;
			DisplayConsoleText('Upgraded to Lens Of Truth!');
		}
		else if(p1.stat.lensOfTruth == 1) {
			rupees -= 16;
			p1.stat.lensOfTruth = 2;
			DisplayConsoleText('Upgraded to Eye Of Truth!');
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
	consoleTag.innerText = newConsoleText;
}

function increaseGameSpeed()
{
	spf -= 5;
	clearInterval(timer);
	timer = setInterval('action()',spf);
	DisplayConsoleText('Increased game speed to ' + spf);
}

function decreaseGameSpeed()
{
	spf += 5;
	clearInterval(timer);
	timer = setInterval('action()',spf);
	DisplayConsoleText('Decreased game speed to ' + spf);
}

function optionsToggle()
{
	var optionsDiv = document.getElementById("options");
	if(optionsDiv.style.display == "none")
	{
		optionsDiv.style.display = "inline-block";
	}
	else
	{
		optionsDiv.style.display = "none";
	}
}

function addPlayer2(){
	if(p2 !== null)
	{
		DisplayConsoleText("Player 2 already spawned.");
		return;
	}

	p2 = new Player();
	p2.ctrl = { up: 101, right: 99, down: 98, left: 97, attA: 103, attB: 104, attC: 105, attD: 102 };	
	p2.pos.x = p1.pos.x;
	p2.pos.y = p1.pos.y;
	// TODO : setting p2's controls doesn't work properly on AttB and AttC
}

// Calling this function once will initialize all the resources necessary for the game to run.
function init( ) {
	var backgroundMusicTag = document.getElementById("backgroundMusic");
	backgroundMusicTag.volume = 0.5;
	rupeeTag = document.getElementById("rupee");
	itemDrop = new Drop();
	consoleTag = document.getElementById("console");
	p1 = new Player();
	p2 = null;
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
	nextRoom(0, 0);
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
	if(p2 !== null){
		playerAction(p2);
	}
}
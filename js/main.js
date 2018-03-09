/* ================================================================================================================================== */
/* ==========================================================MAIN==================================================================== */
/* ================================================================================================================================== */

// TODO - Add NPCs to add upgrades for them.
function changeTunic(playerNumber) {

	var tunicGfxList = [
		'gfx/link/link.png'
		, 'gfx/link/blue.png'
		, 'gfx/link/red.png'
		, 'gfx/link/black.png'
		, 'gfx/link/purple.png'
		, 'gfx/link/pink.png'
		, 'gfx/link/classic.png'
	];

	if(playerNumber == 1)
	{
		var tunicIndexP1 = tunicGfxList.indexOf(p1.stat.imgSource);
		tunicIndexP1 = (tunicIndexP1 + 1) % 7;
		p1.stat.imgSource = tunicGfxList[tunicIndexP1];
		p1.imgtag.src = p1.stat.imgSource;
	}
	if(playerNumber == 2)
	{
		if(p2 !== null)
		{
			var tunicIndexP2 = tunicGfxList.indexOf(p2.stat.imgSource);
			tunicIndexP2 = (tunicIndexP2 + 1) % 7;
			p2.stat.imgSource = tunicGfxList[tunicIndexP2];
			p2.imgtag.src = p2.stat.imgSource;
		}
		else
		{
			addPlayer2();
		}
	}

}

function refreshPlayer2Equipment()
{
	// Refresh all weapons
	if(p2 !== null) {
		p2.wpn.A = p1.wpn.A;
		p2.wpn.B = p1.wpn.B;
		p2.wpn.C = p1.wpn.C;
		p2.wpn.D = p1.wpn.D;
		p2.stat.mhp = p1.stat.mhp;
		p2.stat.lensOfTruth = p1.stat.lensOfTruth;
	}
}

function swordUpgrade() {
	if(rupees >= upgradeSwordCost) {
		if(p1.wpn.A == 'wooden_sword') {
			rupees -= upgradeSwordCost;
			p1.wpn.A = 'white_sword';
			DisplayConsoleText('Upgraded to White Sword!');
		}
		else if(p1.wpn.A == 'white_sword') {
			rupees -= upgradeSwordCost;
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

	refreshPlayer2Equipment();
}

function boomerangUpgrade() {
	if(rupees >= upgradeBoomerangCost) {
		if(p1.wpn.B == 'None') {
			rupees -= upgradeBoomerangCost;
			p1.wpn.B = 'wooden_boomerang';
			DisplayConsoleText('Upgraded to Wooden Boomerang!');
		}
		else if(p1.wpn.B == 'wooden_boomerang') {
			rupees -= upgradeBoomerangCost;
			p1.wpn.B = 'magic_boomerang';
			DisplayConsoleText('Upgraded to Magic Boomerang!');
		}
		else if(p1.wpn.B == 'magic_boomerang') {
			rupees -= upgradeBoomerangCost;
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

	refreshPlayer2Equipment();
}

function arrowUpgrade() {
	if(rupees >= upgradeArrowCost) {
		if(p1.wpn.D == 'None') {
			rupees -= upgradeArrowCost;
			p1.wpn.D = 'wooden_arrow';
			DisplayConsoleText('Upgraded to Wooden Arrow!');
		}
		else if(p1.wpn.D == 'wooden_arrow') {
			rupees -= upgradeArrowCost;
			p1.wpn.D = 'silver_arrow';
			DisplayConsoleText('Upgraded to Silver Arrow!');
		}
		else if(p1.wpn.D == 'silver_arrow') {
			rupees -= upgradeArrowCost;
			p1.wpn.D = 'light_arrow';
			DisplayConsoleText('Upgraded to Light Arrow!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}

	refreshPlayer2Equipment();
}

function bombUpgrade() {
	if(rupees >= upgradeBombCost) {
		if(p1.wpn.C == 'None') {
			rupees -= upgradeBombCost;
			p1.wpn.C = 'blue_bomb';
			DisplayConsoleText('Upgraded to Blue Bomb!');
		}
		else if(p1.wpn.C == 'blue_bomb') {
			rupees -= upgradeBombCost;
			p1.wpn.C = 'red_bomb';
			DisplayConsoleText('Upgraded to Red Bomb!');
		}
		else if(p1.wpn.C == 'red_bomb') {
			rupees -= upgradeBombCost;
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

	refreshPlayer2Equipment();
}

function heartUpgrade() {
	if(rupees >= upgradeHeartCost) {
		if(p1.stat.mhp < 100) {
			rupees -= upgradeHeartCost;
			p1.stat.mhp += 10;
			p1.stat.hp += 10;
			if(p2 !== null)
			{
				p2.stat.hp += 10;	
			}
			DisplayConsoleText('Upgraded Hearts!');
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText('You do not have enough rupees!');
	}

	refreshPlayer2Equipment();

	redrawMaxHearts();
	redrawHearts();
}

function lensOfTruthUpgrade() {
	if(rupees >= upgradeLensCost) {
		if(p1.stat.lensOfTruth == 0) {
			rupees -= upgradeLensCost;
			p1.stat.lensOfTruth = 1;
			DisplayConsoleText('Upgraded to Lens Of Truth!');
		}
		else if(p1.stat.lensOfTruth == 1) {
			rupees -= upgradeLensCost;
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

	refreshPlayer2Equipment();
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

	var heartWrapperP2Tag = document.getElementById("heartWrapperP2");
	heartWrapperP2Tag.style.display = "block";

	p2 = new Player();
	p2.ctrl = { up: 101, right: 99, down: 98, left: 97, attA: 103, attB: 104, attC: 105, attD: 102 };	
	p2.pos.x = p1.pos.x;
	p2.pos.y = p1.pos.y;

	redrawMaxHearts();
	redrawHearts()
}

  function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
				var resultText = e.target.result;;
				var data = JSON.parse(resultText);
				p1.wpn = data.p1.wpn;
				p1.ctrl = data.p1.ctrl;
				p1.stat = data.p1.stat;
				p1.imgtag.src = data.p1.stat.imgSource;
				if(data.p2 !== null)
				{
					addPlayer2();
					p2.wpn = data.p2.wpn;
					p2.ctrl = data.p2.ctrl;
					p2.stat = data.p2.stat;
					p2.imgtag.src = data.p2.stat.imgSource;
				}
				rupees = data.rupees;
				resetGame(p1);
				txt = "File Loaded!";
    DisplayConsoleText(txt);
      }
      r.readAsText(f);
    } else { 
      DisplayConsoleText("Failed to load file");
    }
  }

  document.getElementById('loadFileUpload').addEventListener('change', readSingleFile, false);


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("saveFile").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
	var fileInput = document.getElementById("saveFileUpload");
	var uploadButton = document.getElementById("saveFile");
	var dataObject = {p1: p1, p2: p2, rupees: rupees};
	var text = JSON.stringify(dataObject);
    var filename = "zelda js save.txt";
    
    download(filename, text);
}, false);

// Calling this function once will initialize all the resources necessary for the game to run.
function init( ) {
	var heartWrapperP2Tag = document.getElementById("heartWrapperP2");
	heartWrapperP2Tag.style.display = "none";
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

function cycleUpkeep() {
	// refresh rupees
	rupeeTag.innerText = rupees;
}

// This is the main game loop which will run once more every 50 milliseconds.
function action( ) {
	cycleUpkeep();
	playerAction(p1);
	for(var i = 0; i < MAX_FOES; i++) { 
		foeAction(foes[i]); 
	}
	checkCollision();
	if(p2 !== null){
		playerAction(p2);
	}
}
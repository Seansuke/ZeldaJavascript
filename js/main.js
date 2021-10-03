/* ================================================================================================================================== */
/* ==========================================================MAIN==================================================================== */
/* ================================================================================================================================== */

function changeTunic(playerNumber) {

	var tunicGfxList = [
		'gfx/link/link.png'
		, 'gfx/link/blue.png'
		, 'gfx/link/red.png'
		, 'gfx/link/black.png'
		, 'gfx/link/purple.png'
		, 'gfx/link/pink.png'
		, 'gfx/link/classic.png'
		, 'gfx/link/zelda.png'
	];

	if(playerNumber == 1)
	{
		var tunicIndexP1 = tunicGfxList.indexOf(p1.stat.imgSource);
		tunicIndexP1 = (tunicIndexP1 + 1) % tunicGfxList.length;
		p1.stat.imgSource = tunicGfxList[tunicIndexP1];
		p1.imgtag.src = p1.stat.imgSource;
	}
	if(playerNumber == 2)
	{
		if(p2 !== null)
		{
			var tunicIndexP2 = tunicGfxList.indexOf(p2.stat.imgSource);
			tunicIndexP2 = (tunicIndexP2 + 1) % tunicGfxList.length;
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
		p2.stat.speed = p1.stat.speed;
	}
}

function swordUpgrade(rank, cost) {
	if(rupees >= cost) {
		if(p1.wpn.A == 'wooden_sword' && rank == 1) {
			rupees -= cost;
			p1.wpn.A = 'white_sword';
			DisplayConsoleText(`Upgraded to White Sword for ${cost} rupees!`);
		}
		else if(p1.wpn.A == 'white_sword' && rank == 2) {
			rupees -= cost;
			p1.wpn.A = 'magic_sword';
			DisplayConsoleText(`Upgraded to Magic Sword for ${cost} rupees!`);
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	refreshPlayer2Equipment();
}

function boomerangUpgrade(rank, cost) {
	if(rupees >= cost) {
		if(p1.wpn.B == 'None' && rank == 0) {
			rupees -= cost;
			p1.wpn.B = 'wooden_boomerang';
			DisplayConsoleText(`Upgraded to Wooden Boomerang for ${cost} rupees!`);
		}
		else if(p1.wpn.B == 'wooden_boomerang' && rank == 1) {
			rupees -= cost;
			p1.wpn.B = 'magic_boomerang';
			DisplayConsoleText(`Upgraded to Magic Boomerang for ${cost} rupees!`);
		}
		else if(p1.wpn.B == 'magic_boomerang' && rank == 2) {
			rupees -= cost;
			p1.wpn.B = 'fire_boomerang';
			DisplayConsoleText(`Upgraded to Fire Boomerang for ${cost} rupees!`);
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	refreshPlayer2Equipment();
}

function arrowUpgrade(rank, cost) {
	if(rupees >= cost) {
		if(p1.wpn.D == 'None' && rank == 0) {
			rupees -= cost;
			p1.wpn.D = 'wooden_arrow';
			DisplayConsoleText(`Upgraded to Wooden Arrow for ${cost} rupees!`);
		}
		else if(p1.wpn.D == 'wooden_arrow' && rank == 1) {
			rupees -= cost;
			p1.wpn.D = 'silver_arrow';
			DisplayConsoleText(`Upgraded to Silver Arrow for ${cost} rupees!`);
		}
		else if(p1.wpn.D == 'silver_arrow' && rank == 2) {
			rupees -= cost;
			p1.wpn.D = 'light_arrow';
			DisplayConsoleText(`Upgraded to Light Arrow for ${cost} rupees!`);
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	refreshPlayer2Equipment();
}

function bombUpgrade(rank, cost) {
	if(rupees >= cost) {
		if(p1.wpn.C == 'None' && rank == 0) {
			rupees -= cost;
			p1.wpn.C = 'blue_bomb';
			DisplayConsoleText(`Upgraded to Blue Bomb for ${cost} rupees!`);
		}
		else if(p1.wpn.C == 'blue_bomb' && rank == 1) {
			rupees -= cost;
			p1.wpn.C = 'red_bomb';
			DisplayConsoleText(`Upgraded to Red Bomb! for ${cost} rupees!`);
		}
		else if(p1.wpn.C == 'red_bomb' && rank == 2) {
			rupees -= cost;
			p1.wpn.C = 'black_bomb';
			DisplayConsoleText(`Upgraded to Black Bomb! for ${cost} rupees!`);
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	refreshPlayer2Equipment();
}

function heartUpgrade(rank, cost) {
	if(rupees >= cost) {
		if(p1.stat.mhp < 100) {
			rupees -= cost;
			p1.stat.mhp += 10;
			p1.stat.hp += 10;
			if(p2 !== null)
			{
				p2.stat.hp += 10;	
			}
			DisplayConsoleText(`Upgraded Hearts for ${cost} rupees!`);
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	refreshPlayer2Equipment();

	redrawMaxHearts();
	redrawHearts();
}

function lensOfTruthUpgrade(rank, cost) {
	if(rupees >= cost) {
		if(p1.stat.lensOfTruth == 0 && rank == 0) {
			rupees -= cost;
			p1.stat.lensOfTruth = 1;
			DisplayConsoleText(`Upgraded to Lens Of Truth for ${cost} rupees!`);
		}
		else if(p1.stat.lensOfTruth == 1 && rank == 1) {
			rupees -= cost;
			p1.stat.lensOfTruth = 2;
			DisplayConsoleText(`Upgraded to Eye Of Truth! for ${cost} rupees`);
		}
		else {
			DisplayConsoleText('You cannot upgrade further!');
		}
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	refreshPlayer2Equipment();
}

function heal(cost) {
	if(rupees >= cost) {
		p1.stat.hp = p1.stat.mhp;
		if(p2 !== null)
		{
			p2.stat.hp = p2.stat.mhp;
		}
		rupees -= cost;
		p1.misc.checkpointMapX = mapX;
		p1.misc.checkpointMapY = mapY;
		p1.misc.checkpointPosX = p1.pos.x;
		p1.misc.checkpointPosY = p1.pos.y;
		DisplayConsoleText(`Healed for ${cost} rupees!  Checkpoint set!`);
	} 
	else {
		DisplayConsoleText(`You do not have enough rupees!  ${cost} required, but ${rupees} owned.`);
	}

	redrawHearts();
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
      r.onload = function(e) 
      { 
			var resultText = e.target.result;;
			var data = JSON.parse(resultText);
			p1.wpn = data.p1.wpn;
			p1.ctrl = data.p1.ctrl;
			p1.stat = data.p1.stat;
			p1.misc = data.p1.misc;
			p1.imgtag.src = data.p1.stat.imgSource;
			if(data.p2 !== null)
			{
				addPlayer2();
				p2.ctrl = data.p2.ctrl;
				p2.stat = data.p2.stat;
				p2.misc = data.p2.misc;
				p2.imgtag.src = data.p2.stat.imgSource;
				refreshPlayer2Equipment();
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

function decreaseConsole(){
	consoleLength -= 10;
	document.getElementById("gui").style.width = consoleLength + "%";
}

function increaseConsole(){
	consoleLength += 10;
	document.getElementById("gui").style.width = consoleLength + "%";
}

// Start file download.
document.getElementById("saveFile").addEventListener("click", function(){
	var fileInput = document.getElementById("saveFileUpload");
	var uploadButton = document.getElementById("saveFile");
	var dataObject = {p1: p1, p2: p2, rupees: rupees};
	var text = JSON.stringify(dataObject);
    var filename = "zelda js save.txt";
    
    download(filename, text);
}, false);

var startTouch = undefined;
window.addEventListener("touchmove",function(e){
	for(var i = 0;i < e.touches.length;i++) {
		var currentTouch = e.touches[i];
		var xDelta = currentTouch.clientX - startTouch.touches[i].clientX;
		var yDelta = currentTouch.clientY - startTouch.touches[i].clientY;
		var directionDegrees = (360 + (Math.atan2(-yDelta, -xDelta) * 180 / Math.PI) - 90) % 360;
		if(currentTouch.clientX < visualViewport.width / 2)
		{
			touchControls.up = 325 < directionDegrees || directionDegrees <= 55;
			touchControls.right = 35 < directionDegrees && directionDegrees <= 145;
			touchControls.down = 125 < directionDegrees && directionDegrees <= 235;
			touchControls.left = 215 < directionDegrees && directionDegrees <= 345;	
		}
		else
		{
			touchControls.A = 325 < directionDegrees || directionDegrees <= 55;
			touchControls.B = 35 < directionDegrees && directionDegrees <= 145;
			touchControls.C = 125 < directionDegrees && directionDegrees <= 235;
			touchControls.D = 215 < directionDegrees && directionDegrees <= 345;
		}
	}
});

window.addEventListener("touchcancel",function(e){
	startTouch = undefined;
	touchControls = { up: false, right: false, down: false, left: false, A: false, B: false, C: false, D: false};
});

window.addEventListener("touchend",function(e){
	startTouch = undefined;
	touchControls = { up: false, right: false, down: false, left: false, A: false, B: false, C: false, D: false};
});

window.addEventListener("touchstart",function(e){
	startTouch = e;
});

function nextSong() {
	var maxSongCount = songList.length;
	var randomSongIndex = Math.floor(Math.random() * maxSongCount);
	var songName = "bgm/" + songList[randomSongIndex];
	var oggName = songName + ".ogg";
	var mp3Name = songName + ".mp3";
	var wavName = songName + ".wav";
	document.getElementById("oggMusicSource").src = oggName;
	document.getElementById("mp3MusicSource").src = mp3Name;
	document.getElementById("bgmMusicSource").src = wavName;
	var parentNode = document.getElementById("backgroundMusic");
	parentNode.load();
	parentNode.play();
}

// Calling this function once will initialize all the resources necessary for the game to run.
function init( ) {
	gameStarted = true;
	var heartWrapperP2Tag = document.getElementById("heartWrapperP2");
	heartWrapperP2Tag.style.display = "none";
	var backgroundMusicTag = document.getElementById("backgroundMusic");
	backgroundMusicTag.volume = 0.5;
	rupeeTag = document.getElementById("rupee");
	itemDrop = new Drop();
	nonPlayerCharacter = new NonPlayerCharacter();
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

	nextSong();
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
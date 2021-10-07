/* =====================================================================================================================================
=============================================================CLASSES====================================================================
===================================================================================================================================== */

// TODO - This should go into it's own file and class.  It should inherit the Combatant class.  https://github.com/Seansuke/ZeldaJavascript/issues/11
function Player() {
	this.pos = { x: 20, y: 240 };
	this.wpn = { A: "wooden_sword", B: "None", C: "None", D: "None" };
	this.ctrl = { up: 87, right: 68, down: 83, left: 65, attA: 72 , attB: 74 , attC: 75 , attD: 76 };
	this.stat = { hp: 30, mhp: 30, attTime: 8, speed: 4, lensOfTruth: 0, imgSource: "gfx/link/link.png" };
	this.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none", invincible: 0};
	this.misc = { name: "link", box:6, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"player", respawnTimer: 0, gfxRows: 4,
		checkpointMapX: 0, checkpointMapY: 0, checkpointPosX: 20, checkpointPosY: 240, attackType: 0
	};
	this.imgtag = ( document.getElementById("players").appendChild( document.createElement( 'img' ) ) );
	this.imgtag.src = "gfx/link/link.png";
	this.attackElem = new Attack();
}

// TODO - This should go into its own class file.  https://github.com/Seansuke/ZeldaJavascript/issues/12
function Attack() {
	this.pos = { x: -999, y: -999 };
	this.stat = { att: 5, time: 3, force: 12, cool: 10, direction: "up", effect: "none", speed: 0};
	this.misc = { name: "wooden_sword", box:8, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"player", gfxRows: 4 };
	this.imgtag = ( document.getElementById("attacks").appendChild( document.createElement( 'img' ) ) ); 
	this.imgtag.src = "gfx/alpha.png";
	this.misc.attacking = 0;
}

// TODO - This should go into it's own file and class.  It should inherit the Combatant class. https://github.com/Seansuke/ZeldaJavascript/issues/11
function Foe(newName) {
	this.pos = { x: -300, y: 0 };
	this.wpn = { A: "None", B: "None", C: "None", D: "None" };
	this.stat = { hp: 0, mhp: 0, attTime: 8, speed: 4, lensOfTruth: 0, imgSource: "gfx/link/link.png" };
	this.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none", invincible: 0};
	this.misc = { name: "", box:6, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"enemy", respawnTimer: 0, gfxRows: 4, attackType: 0 };
	this.imgtag = ( document.getElementById("enemies").appendChild( document.createElement( 'img' ) ) ); 
	this.attackElem = new Attack(); 
	this.ai = { target: null, aggro: false}
}

// TODO - This should go into its own class file.  https://github.com/Seansuke/ZeldaJavascript/issues/12
function NonPlayerCharacter() {
	this.pos = { x: -999, y: -999 };
	this.misc = { name: "nonplayerCharacter", box:6, subimg:0, direction:"up", attacking:0, imgSpd: 0, currentWpn:"none", team:"itemDrop", gfxRows: 4 };
	this.cost = 0;
	this.productCode = "";
	this.text = "";
	this.imgtag = ( document.getElementById("drops").appendChild( document.createElement( 'img' ) ) );
	this.imgtag.src = "gfx/alpha.png";
	this.productImgTag = ( document.getElementById("drops").appendChild( document.createElement( 'img' ) ) );
	this.productImgTag.src = "gfx/alpha.png";
	this.equipment = new Equipment();
}

// TODO - This should go into its own class file.  https://github.com/Seansuke/ZeldaJavascript/issues/12
function SaveData() {
	this.version = 1;
	this.p1 = null;
	this.p2 = null;
	this.rupees = 0;
}

// TODO - This should go into its own class file.  https://github.com/Seansuke/ZeldaJavascript/issues/12
function EquipmentList() {
	this.h = new Equipment("heart", 0, "heal", "gfx/gui/heart_half.png", heal, 0);
	this.H = new Equipment("heartContainer", 1, "heartContainer", "gfx/gui/heart_full.png", heartUpgrade, UPGRADE_HEART_COST_FLAT_FEE + UPGRADE_HEART_COST_MULTIPLIER * _p1.stat.mhp);
	this.u = new Equipment("lensOfTruth", 0, "lensOfTruth", "gfx/wpn/lensOfTruth.png", lensOfTruthUpgrade, 8);
	this.U = new Equipment("lensOfTruth", 1, "eyeOfTruth", "gfx/wpn/lensOfTruth.png", lensOfTruthUpgrade, 16);
	this.woodenSword = new Equipment("sword", 0, "wooden_sword", "gfx/wpn/wooden_sword.png", swordUpgrade, 0);
	this.s = new Equipment("sword", 1, "white_sword", "gfx/wpn/white_sword.png", swordUpgrade, 200);
	this.S = new Equipment("sword", 2, "magic_sword", "gfx/wpn/magic_sword.png", swordUpgrade, 400);
	this.m = new Equipment("boomerang", 0, "wooden_boomerang", "gfx/wpn/wooden_boomerang.png", boomerangUpgrade, 10);
	this.N = new Equipment("boomerang", 1, "magic_boomerang", "gfx/wpn/magic_boomerang.png", boomerangUpgrade, 100);
	this.G = new Equipment("boomerang", 2, "fire_boomerang", "gfx/wpn/fire_boomerang.png", boomerangUpgrade, 200);
	this.b = new Equipment("bomb", 0, "blue_bomb", "gfx/wpn/blue_bomb.png", bombUpgrade, 10);
	this.B = new Equipment("bomb", 1, "red_bomb", "gfx/wpn/red_bomb.png", bombUpgrade, 120);
	this.O = new Equipment("bomb", 2, "black_bomb", "gfx/wpn/black_bomb.png", bombUpgrade, 250);
	this.a = new Equipment("arrow", 0, "wooden_arrow", "gfx/wpn/wooden_arrow.png", arrowUpgrade, 10);
	this.A = new Equipment("arrow", 1, "silver_arrow", "gfx/wpn/silver_arrow.png", arrowUpgrade, 150);
	this.R = new Equipment("arrow", 2, "light_arrow", "gfx/wpn/light_arrow.png", arrowUpgrade, 300);
}

// TODO - This should go into its own class file.  https://github.com/Seansuke/ZeldaJavascript/issues/12
function Equipment(parentName, rank, name, gfx, upgradeFunction, cost) {
	this.parentName = parentName;
	this.rank = rank;
	this.name = name;
	this.gfx = gfx;
	this.upgradeFunction = upgradeFunction;
	this.cost = cost;
}

// TODO - This should go into its own class file.  https://github.com/Seansuke/ZeldaJavascript/issues/12
function DialogueList() {
	this.g = `"You are very unlucky to land on this island."`;
	this.k = `"I already paid this month, please don't hurt me!"`;
	this.x = `"Quick to take taxes, but slow to deliver our rations as usual."`;
	this.v = `"I'm not going to be brought to the volcano, will I?"`;
	this.n = `"See that volcano over yonder?  Quite the eye-sore."`;
}
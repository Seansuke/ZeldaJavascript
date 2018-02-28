/* =====================================================================================================================================
=============================================================CLASSES====================================================================
===================================================================================================================================== */

function Player() {
	this.pos = { x: 20, y: 240 };
	this.wpn = { A: "wooden_sword", B: "None", C: "None", D: "None" };
	this.ctrl = { up: 87, right: 68, down: 83, left: 65, attA: 72 , attB: 74 , attC: 75 , attD: 76 };
	this.stat = { hp: 30, mhp: 30, attTime: 8, speed: 4, imgSource: "gfx/link/link.png" };
	this.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
	this.misc = { name: "link", box:6, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"player", respawnTimer: 0 };
	this.imgtag = ( document.getElementById("players").appendChild( document.createElement( 'img' ) ) );
	this.imgtag.src = "gfx/link/link.png";
	this.attackElem = new Attack();
}
function Attack() {
	this.pos = { x: 0, y: 0 };
	this.stat = { att: 5, time: 3, force: 12, cool: 10, direction: "up", effect: "none", speed: 0};
	this.misc = { name: "wooden_sword", box:8, subimg:0, direction:"down", attacking:0, imgSpd: 1/3, currentWpn:"none", team:"player" };
	this.imgtag = ( document.getElementById("attacks").appendChild( document.createElement( 'img' ) ) ); 
	this.imgtag.src = "gfx/alpha.png";
	this.misc.attacking = 0;
}
function Foe(newName) {
	this.imgtag = ( document.getElementById("enemies").appendChild( document.createElement( 'img' ) ) ); 
	this.attackElem = new Attack(); 
}
function Drop() {
	this.pos = { x: 0, y: 0 };
	this.misc = { name: "drop", box:6, subimg:0, direction:"up", attacking:0, imgSpd: 0, currentWpn:"none", team:"itemDrop" };
	this.dmg = { att: 0, time: 0, force: 0, cool: 0, direction: "up", effect: "none"};
	this.type = "";
	this.amnt = 0;
	this.imgtag = ( document.getElementById("drops").appendChild( document.createElement( 'img' ) ) );
	this.imgtag.src = "gfx/alpha.png";
}


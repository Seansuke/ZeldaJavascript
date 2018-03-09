/* =====================================================================================================================================
=============================================================GLOBAL VARIABLES===========================================================
===================================================================================================================================== */

// Constants
var horizontalTileCount = 40;
var verticalTileCount = 30;

// This section mostly contains GUI variables and DOM nodes.
var heartList = new Array();
var heartListP2 = new Array();
var itemDrop = 0;
var rupeeTag = 0;
var consoleTag = 0;
var rupees = 0;

// A Class instance in Javascript is just a var with Dictionary data in it
var p1 = 0;
var p2 = 0;
var foes = new Array();
var MAX_FOES = 15;

// Everything involving game map data: the tiles, the world position (world is a collection of maps), 
var mapX = 0;
var mapY = 0;
var tileSet;
var tileTags = new Array();
var timerSet = false;
var timer = null;
var spf = 50;
var control = new Array(512);
var currentKeyIndex = 0;
var keys = new Array("up","right","down","left","attA","attB","attC","attD","END");

// Costs
var upgradeSwordCost = 64;
var upgradeBoomerangCost = 24;
var upgradeBombCost = 32;
var upgradeArrowCost = 48;
var upgradeHeartCost = 64;
var upgradeLensCost = 8;
document.getElementById("swordUpgrade").innerText = document.getElementById("swordUpgrade").innerText.replace("[cost]", upgradeSwordCost);
document.getElementById("boomerangUpgrade").innerText = document.getElementById("boomerangUpgrade").innerText.replace("[cost]", upgradeBoomerangCost);
document.getElementById("bombUpgrade").innerText = document.getElementById("bombUpgrade").innerText.replace("[cost]", upgradeBombCost);
document.getElementById("arrowUpgrade").innerText = document.getElementById("arrowUpgrade").innerText.replace("[cost]", upgradeArrowCost);
document.getElementById("heartsUpgrade").innerText = document.getElementById("heartsUpgrade").innerText.replace("[cost]", upgradeHeartCost);
document.getElementById("lensOfTruthUpgrade").innerText = document.getElementById("lensOfTruthUpgrade").innerText.replace("[cost]", upgradeLensCost);
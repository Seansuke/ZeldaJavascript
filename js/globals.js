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
var nonPlayerCharacter = undefined;
var rupeeTag = 0;
var consoleTag = 0;
var rupees = 0;
var touchControls = { up: false, right: false, down: false, left: false, A: false, B: false, C: false, D: false};
var p1 = null;
var p2 = null;
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
var gameStarted = false;

// Costs
var healHealthCost = 10;
var upgradeHeartsCostFlatFee = 10;
var upgradeHeartCostMultiplier = 2;
var upgradeLensCost = 8;
var upgradeBlueBombCost = 10;
var upgradeRedBombCost = 120;
var upgradeBlackBombCost = 250;
var upgradeWoodenArrowCost = 10;
var upgradeSilverArrowCost = 150;
var upgradeLightArrowCost = 300;
var upgradeWoodenBoomerangCost = 10;
var upgradeMagicBoomerangCost = 100;
var upgradeFireBoomerangCost = 200;
var upgradeWhiteSwordCost = 200;
var upgradeMagicSwordCost = 400;
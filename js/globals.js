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
var consoleLength = 100;

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
var upgradeHeartsCostFlatFee = 20;
var upgradeHeartCostMultiplier = 2;

// Song List
var songList = ["Ballad of the Goddess", "Dragon Roost Island", "Fairies Woods", "Hyrule Castle BOTW", "Lorule Castle", "Mabe Village", "Minish Woods", "overworld", "Realm Overworld"];

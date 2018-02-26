/* =====================================================================================================================================
=============================================================GLOBAL VARIABLES===========================================================
===================================================================================================================================== */

// Constants
var horizontalTileCount = 40;
var verticalTileCount = 30;

// This section mostly contains GUI variables and DOM nodes.
var hearts = new Array();
var itemDrop = 0;
var rupees = 0;
var rupeeTag = 0;
var consoleTag = 0;

// A Class instance in Javascript is just a var with Dictionary data in it
var p1 = 0;
var p2 = 0;
var foes = new Array();
var MAX_FOES = 10;

// Everything involving game map data: the tiles, the world position (world is a collection of maps), 
var mapX = 0;
var mapY = 0;
var tileSet;
var tileTags = new Array();
var timerSet = false;
var timer = null;
var spf = 50;
var control = new Array(512);
var current = 0;
var tunic = 0;
var keys = new Array("up","right","down","left","attA","attB","attC","attD","END");
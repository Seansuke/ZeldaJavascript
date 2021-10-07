/* =====================================================================================================================================
=============================================================GLOBAL VARIABLES===========================================================
===================================================================================================================================== */

// Constants
var _horizontalTileCount = 40;
var _verticalTileCount = 30;

// This section mostly contains GUI variables and DOM nodes.
var _heartList = new Array();
var _player2HeartList = new Array();
var _itemDropList = new Array();
var _nonPlayerCharacter = undefined;
var _rupeeTag = 0;
var _consoleTag = 0;
var _rupees = 0;
var _touchControlList = { up: false, right: false, down: false, left: false, A: false, B: false, C: false, D: false};
var _p1 = null;
var _p2 = null;
var _foeList = new Array();
var MAX_FOES = 15;
var _consoleLength = 100;

// Everything involving game map data: the tiles, the world position (world is a collection of maps), 
var _mapX = 0;
var _mapY = 0;
var _tileMatrix;
var _tileTagList = new Array();
var _isTimerSet = false;
var _timer = null;
var _secondsPerFrame = 50;
var _controlList = new Array(512);
var _currentKeyIndex = 0;
var KEY_LIST = new Array("up","right","down","left","attA","attB","attC","attD","END");
var _gameStarted = false;
var ENEMY_NAME_ARRAY = new Array('chuchu', 'keese', 'octo', 'rope', 'polsvoice', 'peahat', 'leever', 'tektite', 'wallmaster', 'ghini', 'moblin', 'stalfos', 'likelike', 'gibdo', 'darknut', 'wizzro');
var _combatStrategy = new CombatStrategy();

// Costs
var UPGRADE_HEART_COST_FLAT_FEE = 20;
var UPGRADE_HEART_COST_MULTIPLIER = 2;

// Song List
var SONG_LIST = ["Ballad of the Goddess", "Dragon Roost Island", "Fairies Woods", "Hyrule Castle BOTW", "Lorule Castle", "Mabe Village", "Minish Woods", "overworld", "Realm Overworld"];

var MODE_TITLE = 0;
var MODE_INSTRUCTIONS = 1;
var mode = MODE_TITLE;
var TITLEBUTTONSIZE = 9;
var titleManifest =
[
	{ src: "title.jpg", id: "title" },
	{ src: "titleButtons.jpg", id: "titleButtons" }
];

var instructionManifest =
	[
			{ src: "instructions.png", id: "instructions" }
	];

var gameManifest =
	[
	{ src: "background.png", id: "background" },
	{ src: "gameover.png", id: "gameover" },
	{ src: "levelsign.png", id: "levelsign" }
	];
var FPS = 30;
var stage;
var titleQueue, titleScreen, playButton, menuButton;

var instructionQueue, instructionScreen;

var gameQueue, backgroundScreen, gameoverScreen, levelFrame;

function setUpCanvas()
{
	var canvas = document.getElementById( "game" );
	canvas.width = 800;
	canvas.height = 600;
	stage = new createjs.Stage( canvas );
	stage.enableMouseOver();
}

function startLoad()
{
	titleQueue = new createjs.LoadQueue( true, "assets/images/" );
	titleQueue.on( "complete", titleLoaded, this );
	titleQueue.loadManifest( titleManifest );
}

function titleLoaded()
{
	titleScreen = new createjs.Bitmap( titleQueue.getResult( "title" ) );

	var playButtonSheet = new createjs.SpriteSheet
		(
	{
		images: [titleQueue.getResult( "titleButtons" )],
		frames:
			{
				regX: 150 / 2,
				regY: 30 / 2,
				width: 150,
				height: 30,
				count: TITLEBUTTONSIZE
			},
		animations:
			{
				Neutral: [0, 0],
				Hover: [1, 1],
				Click: [2, 2]
			}
	}
		);

	playButton = new createjs.Sprite( playButtonSheet );

	var instructionsButtonSheet = new createjs.SpriteSheet
	(
{
	images: [titleQueue.getResult( "titleButtons" )],
	frames:
		{
			regX: 150 / 2,
			regY: 30 / 2,
			width: 150,
			height: 30,
			count: TITLEBUTTONSIZE
		},
	animations:
		{
			Neutral: [3, 3],
			Hover: [4, 4],
			Click: [5, 5]
		}
}
	);

	instructionsButton = new createjs.Sprite( instructionsButtonSheet );


	var menuButtonSheet = new createjs.SpriteSheet
(
{
	images: [titleQueue.getResult( "titleButtons" )],
	frames:
		{
			regX: 150 / 2,
			regY: 30 / 2,
			width: 150,
			height: 30,
			count: TITLEBUTTONSIZE
		},
	animations:
		{
			Neutral: [6, 6],
			Hover: [7, 7],
			Click: [8, 8]
		}
}
);

	menuButton = new createjs.Sprite( menuButtonSheet );

	instructionQueue = new createjs.LoadQueue( true, "assets/images/" );
	instructionQueue.on( "complete", instructionsLoaded, this );
	instructionQueue.loadManifest( instructionManifest );
}

function instructionsLoaded()
{
	instructionScreen = new createjs.Bitmap( instructionQueue.getResult( "instructions" ) );

	gameQueue = new createjs.LoadQueue( true, "assets/images/" );
	gameQueue.on( "complete", gameLoaded, this );
	gameQueue.loadManifest( gameManifest );
}

function gameLoaded()
{
	backgroundScreen = new createjs.Bitmap( gameQueue.getResult( "background" ) );
	gameoverScreen = new createjs.Bitmap( gameQueue.getResult( "gameover" ) );
	levelFrame = new createjs.Bitmap( gameQueue.getResult( "levelsign" ) );
}

function removeAll()
{
	if ( titleInitialized )
	{
		titleDelete();
	}
	if(instructionsInitialized)
	{
		instructionsDelete();
	}
}


//#region
var titleInitialized = false;
function titleInit()
{
	stage.addChild( titleScreen );
	stage.addChild( playButton );
	stage.addChild( instructionsButton );
	playButton.x = stage.canvas.width - ( 150 * 1.5 );
	playButton.y = stage.canvas.height - ( 30 / 2 );
	instructionsButton.x = stage.canvas.width - ( 150 * 0.5 );
	instructionsButton.y = stage.canvas.height - ( 30 / 2 );
	playButton.gotoAndPlay( "Neutral" );
	playButton.on( "mouseover", function playHover( evt ) { playButton.gotoAndPlay( "Neutral" ); }, this );
	playButton.on( "mouseout", function playHover( evt ) { playButton.gotoAndPlay( "Hover" ); }, this );
	playButton.on( "mousedown", function playHover( evt ) { playButton.gotoAndPlay( "Click" ); }, this );
	playButton.on( "click", function playHover( evt ) { playButton.gotoAndPlay( "Neutral" ); }, this );

	instructionsButton.gotoAndPlay( "Neutral" );
	instructionsButton.on( "mouseover", function playHover( evt ) { instructionsButton.gotoAndPlay( "Neutral" ); }, this );
	instructionsButton.on( "mouseout", function playHover( evt ) { instructionsButton.gotoAndPlay( "Hover" ); }, this );
	instructionsButton.on( "mousedown", function playHover( evt ) { instructionsButton.gotoAndPlay( "Click" );  }, this );
	instructionsButton.on( "click", function playHover( evt ) { instructionsButton.gotoAndPlay( "Neutral" ); mode = MODE_INSTRUCTIONS }, this );
	titleInitialized = true;
}
function titleDelete()
{
	stage.removeAllChildren();
	playButton.removeAllEventListeners();
	instructionsButton.removeAllEventListeners();
	titleInitialized = false;
}
function titleUpdate()
{
	if ( !titleInitialized )
	{
		removeAll();
		titleInit();
	}
}
//#endregion

//#region
var instructionsInitialized = false;
function instructionsInit()
{
	stage.addChild( instructionScreen );
	stage.addChild( menuButton );
	menuButton.x = stage.canvas.width - ( 150 * 0.5 );
	menuButton.y = stage.canvas.height - ( 30 / 2 );
	menuButton.gotoAndPlay( "Neutral" );
	menuButton.on( "mouseover", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); }, this );
	menuButton.on( "mouseout", function playHover( evt ) { menuButton.gotoAndPlay( "Hover" ); }, this );
	menuButton.on( "mousedown", function playHover( evt ) { menuButton.gotoAndPlay( "Click" ); }, this );
	menuButton.on( "click", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); mode = MODE_TITLE }, this );
	instructionsInitialized = true;
}

function instructionsDelete()
{
	stage.removeAllChildren();
	menuButton.removeAllEventListeners();
	instructionsInitialized = false;
}

function instructionsUpdate()
{
	if(!instructionsInitialized)
	{
		removeAll();
		instructionsInit();
	}
}
//#endregion

function loop()
{
	switch ( mode )
	{
		case ( MODE_TITLE ):
			{
				if(titleQueue != null && titleQueue.loaded) titleUpdate();
				break;
			}
		case(MODE_INSTRUCTIONS):
			{
				if(instructionQueue != null && instructionQueue.loaded)  instructionsUpdate();
				break;
			}
	}
	stage.update();
}

function main()
{
	setUpCanvas();
	startLoad();
	createjs.Ticker.addEventListener( "tick", loop );
	createjs.Ticker.setFPS( FPS );
}

if ( !!( window.addEventListener ) )
{
	window.addEventListener( "DOMContentLoaded", main );
}
else
{ //MSIE
	window.attachEvent( "onload", main );
}
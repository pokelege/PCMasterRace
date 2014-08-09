var MODE_TITLE = 0;
var MODE_INSTRUCTIONS = 1;
var MODE_GAME = 2;
var MODE_GAMEOVER = 3;
var mode = MODE_TITLE;
var TITLEBUTTONSIZE = 9;
var titleManifest =
[
	{ src: "title.jpg", id: "title" },
	{ src: "titleButtons.jpg", id: "titleButtons" }
];

var instructionManifest =
	[
			{ src: "instructions.jpg", id: "instructions" }
	];

var gameManifest =
	[
	{ src: "background.jpg", id: "background" },
	{ src: "gameover.jpg", id: "gameover" },
	{ src: "levelsign.png", id: "levelsign" }
	];
var FPS = 30;
var SPF = 1 / FPS;
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
	
	if(gameInitialized)
	{
		gameDelete();
	}

	if(gameOverInitialized)
	{
		gameOverDelete();
	}
}


//#region title
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
	playButton.on( "click", function playHover( evt ) { playButton.gotoAndPlay( "Neutral" ); mode = MODE_GAME; }, this );

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

//#region instructions
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

//#region game
var gameInitialized = false;
var score = 0;
var scoreDisplay, mouseXDisplay, mouseYDisplay;
var time = 0;

function mouseCoord(evt)
{
	mouseXDisplay.text = "Mouse X: " + Math.floor( evt.stageX );
	mouseYDisplay.text = "Mouse Y: " + Math.floor( evt.stageY );
}

function gameInit()
{
	stage.addChild(backgroundScreen);
	stage.addChild( menuButton );
	menuButton.x = stage.canvas.width - ( 150 * 0.5 );
	menuButton.y = stage.canvas.height - ( 30 / 2 );
	menuButton.gotoAndPlay( "Neutral" );
	menuButton.on( "mouseover", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); }, this );
	menuButton.on( "mouseout", function playHover( evt ) { menuButton.gotoAndPlay( "Hover" ); }, this );
	menuButton.on( "mousedown", function playHover( evt ) { menuButton.gotoAndPlay( "Click" ); }, this );
	menuButton.on( "click", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); mode = MODE_TITLE }, this );
	score = 0;
	
	scoreDisplay = new createjs.Text("Score: " + score, "16px Arial", "#000");
	scoreDisplay.x = 0;
	scoreDisplay.y = 0;
	stage.addChild( scoreDisplay );
	
	mouseXDisplay = new createjs.Text( "Mouse X: ", "16px Arial", "#000" );
	mouseXDisplay.y = scoreDisplay.getMeasuredHeight();
	stage.addChild( mouseXDisplay );

	mouseYDisplay = new createjs.Text( "Mouse Y: ", "16px Arial", "#000" );
	mouseYDisplay.y = scoreDisplay.getMeasuredHeight() + mouseYDisplay.getMeasuredHeight();
	stage.addChild( mouseYDisplay );

	time = 0;
	stage.on( "stagemousemove", mouseCoord );
	gameInitialized = true;
}

function gameDelete()
{
	stage.removeAllChildren();
	stage.removeAllEventListeners();
	menuButton.removeAllEventListeners();
	scoreDisplay = mouseXDisplay = mouseYDisplay = null;
	gameInitialized = false;
}

function gameUpdate()
{
	if(!gameInitialized)
	{
		removeAll();
		gameInit();
	}
	else
	{
		time += SPF;
		score = Math.floor(time * 10);
		scoreDisplay.text = "Score: " + score;
		if ( time >= 10 ) mode = MODE_GAMEOVER;
	}

}
//#endregion

//#region game over
var gameOverInitialized = false;
function gameOverInit()
{
	stage.addChild( gameoverScreen );
	stage.addChild( menuButton );
	menuButton.x = stage.canvas.width - ( 150 * 0.5 );
	menuButton.y = stage.canvas.height - ( 30 / 2 );
	menuButton.gotoAndPlay( "Neutral" );
	menuButton.on( "mouseover", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); }, this );
	menuButton.on( "mouseout", function playHover( evt ) { menuButton.gotoAndPlay( "Hover" ); }, this );
	menuButton.on( "mousedown", function playHover( evt ) { menuButton.gotoAndPlay( "Click" ); }, this );
	menuButton.on( "click", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); mode = MODE_TITLE }, this );

	scoreDisplay = new createjs.Text( "Final Score: " + score, "16px Arial", "#000" );
	scoreDisplay.regX = scoreDisplay.getMeasuredWidth() / 2;
	scoreDisplay.regY = scoreDisplay.getMeasuredHeight() / 2;

	scoreDisplay.x = stage.canvas.width / 2;
	scoreDisplay.y = stage.canvas.height / 2;
	stage.addChild( scoreDisplay );
	gameOverInitialized = true;
}

function gameOverDelete()
{
	stage.removeAllChildren();
	menuButton.removeAllEventListeners();
	scoreDisplay = null;
	gameOverInitialized = false;
}

function gameOverUpdate()
{
	if ( !gameOverInitialized )
	{
		removeAll();
		gameOverInit();
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
			case(MODE_GAME):
			{
				if(gameQueue != null && gameQueue.loaded) gameUpdate();
				break;
			}
		case ( MODE_GAMEOVER ):
			{
				if ( gameQueue != null && gameQueue.loaded ) gameOverUpdate();
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

var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var KEYCODE_A = 65;
var KEYCODE_W = 87;
var KEYCODE_D = 68;
var KEYCODE_S = 83;

var KEYCODE_SPACE = 32;

function handleKeyDown(evt)
{
	if ( !evt ) { var evt = window.event; }
	switch ( evt.keyCode )
	{
		case KEYCODE_LEFT:
			{
				console.log( "left key down" );
				break;
			}
		case KEYCODE_RIGHT:
			{
				console.log( "right key down" );
				break;
			}
		case KEYCODE_UP:
			{
				console.log( "up key down" );
				break;
			}
		case KEYCODE_DOWN:
			{
				console.log( "down key down" );
				break;
			}

		case KEYCODE_A:
			{
				console.log( "A key down" );
				break;
			}
		case KEYCODE_W:
			{
				console.log( "W key down" );
				break;
			}
		case KEYCODE_D:
			{
				console.log( "D key down" );
				break;
			}
		case KEYCODE_S:
			{
				console.log( "S key down" );
				break;
			}
		case KEYCODE_SPACE:
			{
				console.log( "Space key down" );
				break;
			}
		default:
			{
				console.log( "unknown key code " + evt.keyCode + " down" );
				break;
			}
	}
}

function handleKeyUp( evt )
{
	if ( !evt ) { var evt = window.event; }
	switch ( evt.keyCode )
	{
		case KEYCODE_LEFT:
			{
				console.log("left key up" );
				break;
			}
		case KEYCODE_RIGHT:
			{
				console.log( "right key up" );
				break;
			}
		case KEYCODE_UP:
			{
				console.log( "up key up" );
				break;
			}
		case KEYCODE_DOWN:
			{
				console.log( "down key up" );
				break;
			}
		case KEYCODE_A:
			{
				console.log( "A key up" );
				break;
			}
		case KEYCODE_W:
			{
				console.log( "W key up" );
				break;
			}
		case KEYCODE_D:
			{
				console.log( "D key up" );
				break;
			}
		case KEYCODE_S:
			{
				console.log( "S key up" );
				break;
			}
		case KEYCODE_SPACE:
			{
				console.log( "Space key up" );
				break;
			}
		default:
			{
				console.log( "unknown key code " + evt.keyCode + " up" );
				break;
			}
	}
}

if ( !!( window.addEventListener ) )
{
	window.addEventListener( "DOMContentLoaded", main );
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
}
else
{ //MSIE
	window.attachEvent( "onload", main );
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
}
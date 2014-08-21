var MODE_TITLE = "title";
var MODE_INSTRUCTIONS = "instructions";
var MODE_GAME = "game";
var MODE_GAMEOVER = "gameover";
var MODE_CREDITS = "credits";
var mode = MODE_TITLE;
var TITLEBUTTONSIZE = 12;
var AUDIOBUTTIONSIZE = 6;
var MAINFPS = 30;
var MAXFPS = 60;
var titleManifest =
[
	{ src: "images/title.jpg", id: "title" },
	{ src: "images/titleButtons.jpg", id: "titleButtons" },
	{ src: "images/audio.jpg", id: "audioButton" }
];

var instructionManifest =
	[
		{ src: "images/instructions.jpg", id: "instructions" },
		{ src: "images/credits.jpg", id: "credits" }
	];
var gameManifest =
	[
	{ src: "images/background.jpg", id: "background" },
	{ src: "images/gameover.jpg", id: "gameover" },
	{ src: "images/levelsign.png", id: "levelsign" },
	{ src: "audio/InGame.mp3", id: "music" },
	{ src: "images/character.png", id: "character" },
	{ src: "images/floor.png", id: "floor" },
	{ src: "images/enemy.png", id: "enemy" },
	{ src: "images/health.png", id: "health" },
	{ src: "images/fpsBar.png", id: "fpsBar" },
	{ src: "images/bullet.png", id: "bullet" },
	{ src: "images/hud.png", id: "hud" },
	{ src: "images/jamie.jpg", id: "jamie" },
	{ src: "audio/getHealth.mp3", id: "getHealth" },
	{ src: "audio/shoot.mp3", id: "shoot" },
	{ src: "audio/hitBad.mp3", id: "hitBad" },
	{ src: "audio/hitGood.mp3", id: "hitGood" }
	];
var stage;
var titleQueue, titleScreen, playButton, menuButton, creditsButton, audioButton;

var instructionQueue, instructionScreen, credits;

var gameQueue, backgroundScreen, gameoverScreen, levelFrame, music, getHealth, shoot, hitBad, hitGood, character, enemy, health, fpsBar, bullet, floor, hud, jamie;

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
	titleQueue = new createjs.LoadQueue( true, "assets/" );
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

	var creditsButtonSheet = new createjs.SpriteSheet
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
			Neutral: [9, 9],
			Hover: [10, 10],
			Click: [11, 11]
		}
}
);

	creditsButton = new createjs.Sprite( creditsButtonSheet );

	var audioButtonSheet = new createjs.SpriteSheet
(
{
	images: [titleQueue.getResult( "audioButton" )],
	frames:
		{
			regX: 30 / 2,
			regY: 30 / 2,
			width: 30,
			height: 30,
			count: AUDIOBUTTIONSIZE
		},
	animations:
		{
			OnNeutral:
			{
				frames: [0, 0],
			},
			OnHover:
			{
				frames: [1, 1],
			},
			OnClick:
			{
				frames: [2, 2],
			},
			OffNeutral:
			{
				frames: [3, 3],
			},
			OffHover:
			{
				frames: [4, 4],
			},
			OffClick:
			{
				frames: [5, 5],
			}
		}
}
);

	audioButton = new createjs.Sprite( audioButtonSheet );

	instructionQueue = new createjs.LoadQueue( true, "assets/" );
	instructionQueue.on( "complete", instructionsLoaded, this );
	instructionQueue.loadManifest( instructionManifest );
}

function instructionsLoaded()
{
	instructionScreen = new createjs.Bitmap( instructionQueue.getResult( "instructions" ) );
	credits = new createjs.Bitmap( instructionQueue.getResult( "credits" ) );

	gameQueue = new createjs.LoadQueue( true, "assets/" );
	createjs.Sound.alternateExtensions = ["mp3"];
	gameQueue.installPlugin( createjs.Sound );
	gameQueue.on( "complete", gameLoaded, this );
	gameQueue.loadManifest( gameManifest );
}

function gameLoaded()
{

	var characterSheet = new createjs.SpriteSheet
	(
		{
			images: [gameQueue.getResult( "character" )],
			frames:
				[[0, 0, 54, 222, 0, 15.450000000000003, 130.55], [54, 0, 81, 221, 0, 35.45, 128.55], [135, 0, 99, 221, 0, 40.45, 129.55], [234, 0, 109, 202, 0, 47.45, 115.55000000000001], [343, 0, 133, 197, 0, 53.45, 109.55000000000001], [476, 0, 141, 192, 0, 56.45, 104.55000000000001], [617, 0, 129, 192, 0, 50.45, 109.55000000000001], [746, 0, 115, 201, 0, 45.45, 111.55000000000001], [861, 0, 103, 202, 0, 34.45, 111.55000000000001], [0, 222, 93, 202, 0, 22.450000000000003, 111.55000000000001], [93, 222, 90, 206, 0, 18.450000000000003, 114.55000000000001], [183, 222, 106, 204, 0, 35.45, 111.55000000000001], [289, 222, 109, 203, 0, 40.45, 111.55000000000001], [398, 222, 117, 198, 0, 47.45, 111.55000000000001], [515, 222, 132, 197, 0, 53.45, 109.55000000000001], [647, 222, 141, 192, 0, 56.45, 104.55000000000001], [788, 222, 129, 192, 0, 50.45, 109.55000000000001], [0, 428, 115, 201, 0, 45.45, 111.55000000000001], [115, 428, 103, 202, 0, 34.45, 111.55000000000001], [218, 428, 93, 202, 0, 22.450000000000003, 111.55000000000001], [311, 428, 90, 206, 0, 18.450000000000003, 114.55000000000001], [401, 428, 106, 204, 0, 35.45, 111.55000000000001], [507, 428, 109, 203, 0, 40.45, 111.55000000000001], [616, 428, 117, 198, 0, 47.45, 111.55000000000001], [733, 428, 132, 197, 0, 53.45, 109.55000000000001]],
			animations:
				{
					NeutralFront:[0, 0, "NeutralFront"],
					Run:[1,4,"RunLoop"],
					RunLoop: [5,24, "RunLoop"]
				}
		}
	);
	character = new createjs.Sprite( characterSheet, "NeutralFront" );
	character.scaleY = 0.5;
	character.scaleX = 0.5;

	var enemySheet = new createjs.SpriteSheet
		(
		{
			images: [gameQueue.getResult( "enemy" )],
			frames:
				{
					regX: 173/2,
					regY: 134/2,
					width: 173,
					height: 134
				},
			animations:
				{
					Neutral:[0, 0]
				}
		}
		);
	enemy = new createjs.Sprite( enemySheet, "Neutral" );

	var healthSheet = new createjs.SpriteSheet
	(
		{
			images: [gameQueue.getResult( "health" )],
			frames:
			{
				regX: 50,
				regY: 50,
				width: 100,
				height: 100,
			},
			animations:
			{
				Neutral:[0, 8, "Neutral"]
			}
		}
	);
	health = new createjs.Sprite(healthSheet, "Neutral");
	var fpsBarSheet = new createjs.SpriteSheet
		(
		{
			images: [gameQueue.getResult( "fpsBar" )],
			frames:
				{
					regX: 0,
					regY: 0,
					width: 100,
					height: 100,
					count: 1
				},
			animations:
				{
					Good:
						{
							frames: [0, 0]
						}
				}
		}
		);
	fpsBar = new createjs.Sprite( fpsBarSheet, "Good" );
	fpsBar.scaleY = 0.1;
	fpsBar.regY = 100 * 0.1 * 0.5;


	var bulletSheet = new createjs.SpriteSheet
		(
		{
			images: [gameQueue.getResult( "bullet" )],
			frames:
				{
					regX: 0,
					regY: 0,
					width: 100,
					height: 100,
					count: 1
				},
			animations:
				{
					Normal:
						{
							frames: [0, 0]
						}
				}
		}
		);
	bullet = new createjs.Sprite( bulletSheet, "Normal" );
	bullet.scaleY = 0.1;
	bullet.regY = 100 * 0.1 * 0.5;

	jamie = new createjs.Bitmap( gameQueue.getResult( "jamie" ) );
	jamie.regX = jamie.getBounds().width;
	jamie.x = stage.canvas.width;

	hud = new createjs.Bitmap( gameQueue.getResult( "hud" ) );
	backgroundScreen = new createjs.Bitmap( gameQueue.getResult( "background" ) );
	gameoverScreen = new createjs.Bitmap( gameQueue.getResult( "gameover" ) );
	levelFrame = new createjs.Bitmap( gameQueue.getResult( "levelsign" ) );
	music = new createjs.Sound.createInstance( "music" );
	music.setVolume(0.50);
	getHealth = new createjs.Sound.createInstance( "getHealth" );
	shoot = new createjs.Sound.createInstance( "shoot" );
	hitBad = new createjs.Sound.createInstance( "hitBad" );
	hitGood = new createjs.Sound.createInstance( "hitGood" );
	floor = new createjs.Bitmap( gameQueue.getResult( "floor" ) );
	floor.regX = 0;
	floor.regY = 100;
	floor.scaleX = 0.5;
	floor.scaleY = 0.5;
}

function removeAll()
{
	createjs.Ticker.setFPS( 30 );
	if ( titleInitialized )
	{
		titleDelete();
	}
	if ( instructionsInitialized )
	{
		instructionsDelete();
	}

	if ( creditsInitialized )
	{
		creditsDelete();
	}

	if ( gameInitialized )
	{
		gameDelete();
	}

	if ( gameOverInitialized )
	{
		gameOverDelete();
	}

	if ( loadingInitialized )
	{
		loadingDelete();
	}
}


//#region title
var titleInitialized = false;
function titleInit()
{
	stage.addChild( titleScreen );
	stage.addChild( playButton );
	stage.addChild( instructionsButton );
	stage.addChild( creditsButton );
	playButton.x = stage.canvas.width - ( 150 * 2.5 );
	playButton.y = stage.canvas.height - ( 30 / 2 );
	instructionsButton.x = stage.canvas.width - ( 150 * 1.5 );
	instructionsButton.y = stage.canvas.height - ( 30 / 2 );
	creditsButton.x = stage.canvas.width - ( 150 * 0.5 );
	creditsButton.y = stage.canvas.height - ( 30 / 2 );
	playButton.gotoAndPlay( "Neutral" );
	playButton.on( "mouseout", function playHover( evt ) { playButton.gotoAndPlay( "Neutral" ); }, this );
	playButton.on( "mouseover", function playHover( evt ) { playButton.gotoAndPlay( "Hover" ); }, this );
	playButton.on( "mousedown", function playHover( evt ) { playButton.gotoAndPlay( "Click" ); }, this );
	playButton.on( "click", function playHover( evt ) { playButton.gotoAndPlay( "Neutral" ); mode = MODE_GAME; }, this );

	instructionsButton.gotoAndPlay( "Neutral" );
	instructionsButton.on( "mouseout", function playHover( evt ) { instructionsButton.gotoAndPlay( "Neutral" ); }, this );
	instructionsButton.on( "mouseover", function playHover( evt ) { instructionsButton.gotoAndPlay( "Hover" ); }, this );
	instructionsButton.on( "mousedown", function playHover( evt ) { instructionsButton.gotoAndPlay( "Click" ); }, this );
	instructionsButton.on( "click", function playHover( evt ) { instructionsButton.gotoAndPlay( "Neutral" ); mode = MODE_INSTRUCTIONS }, this );

	creditsButton.gotoAndPlay( "Neutral" );
	creditsButton.on( "mouseout", function playHover( evt ) { creditsButton.gotoAndPlay( "Neutral" ); }, this );
	creditsButton.on( "mouseover", function playHover( evt ) { creditsButton.gotoAndPlay( "Hover" ); }, this );
	creditsButton.on( "mousedown", function playHover( evt ) { creditsButton.gotoAndPlay( "Click" ); }, this );
	creditsButton.on( "click", function playHover( evt ) { creditsButton.gotoAndPlay( "Neutral" ); mode = MODE_CREDITS }, this );

	stage.addChild( audioButton );
	audioButton.x = ( 30 * 0.5 );
	audioButton.y = stage.canvas.height - ( 30 * 0.5 );
	if ( mute ) audioButton.gotoAndPlay( "OffNeutral" );
	else audioButton.gotoAndPlay( "OnNeutral" );
	audioButton.on( "mouseout", function playHover( evt ) { if ( mute ) audioButton.gotoAndPlay( "OffNeutral" ); else audioButton.gotoAndPlay( "OnNeutral" ); }, this );
	audioButton.on( "mouseover", function playHover( evt ) { if ( mute ) audioButton.gotoAndPlay( "OffHover" ); else audioButton.gotoAndPlay( "OnHover" ); }, this );
	audioButton.on( "mousedown", function playHover( evt ) { if ( mute ) audioButton.gotoAndPlay( "OffClick" ); else audioButton.gotoAndPlay( "OnClick" ); }, this );
	audioButton.on( "click", function playHover( evt ) { mute = mute == false; if ( mute ) audioButton.gotoAndPlay( "OffNeutral" ); else audioButton.gotoAndPlay( "OnNeutral" ); }, this );

	titleInitialized = true;
}
function titleDelete()
{
	stage.removeAllChildren();
	playButton.removeAllEventListeners();
	instructionsButton.removeAllEventListeners();
	creditsButton.removeAllEventListeners();
	audioButton.removeAllEventListeners();
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

//#region credits
var creditsInitialized = false;
function creditsInit()
{
	stage.addChild( credits );
	stage.addChild( menuButton );
	menuButton.x = stage.canvas.width - ( 150 * 0.5 );
	menuButton.y = stage.canvas.height - ( 30 / 2 );
	menuButton.gotoAndPlay( "Neutral" );
	menuButton.on( "mouseout", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); }, this );
	menuButton.on( "mouseover", function playHover( evt ) { menuButton.gotoAndPlay( "Hover" ); }, this );
	menuButton.on( "mousedown", function playHover( evt ) { menuButton.gotoAndPlay( "Click" ); }, this );
	menuButton.on( "click", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); mode = MODE_TITLE }, this );
	creditsInitialized = true;
}

function creditsDelete()
{
	stage.removeAllChildren();
	menuButton.removeAllEventListeners();
	creditsInitialized = false;
}

function creditsUpdate()
{
	if ( !creditsInitialized )
	{
		removeAll();
		creditsInit();
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
	menuButton.on( "mouseout", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); }, this );
	menuButton.on( "mouseover", function playHover( evt ) { menuButton.gotoAndPlay( "Hover" ); }, this );
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
	if ( !instructionsInitialized )
	{
		removeAll();
		instructionsInit();
	}
}
//#endregion

//#region game
var gameInitialized = false;
var GRAVITY = 200;
var life = 30;
var scoreDisplay, lifeDisplay, levelFrameText, levelFrameStaticText;
var levelFrameContainer;
var animated = false;
var levelFrameAnimator;
var mute = false;
var highScore = 0;
var floorArray;
var distance;
var distanceBoundary;
var score;
var lastDistance =
	{
		distance: 0,
		index: 0
	};
var enemyArray;

var healthArray;
var jamieMode;
function BulletInstance( bulletSprite )
{
	this.direction = 1;
	this.sprite = bulletSprite;
};

var bulletArray;

function levelFrameAniFinished( tween )
{
	levelFrameContainer.alpha = 1;
	levelFrameContainer.visible = false;
	levelFrameAnimator = null;
	animated = true;
}

function showLevelFrame()
{
	levelFrameText.text = Math.floor( highScore );
	levelFrameContainer.visible = true;
	levelFrameAnimator = new createjs.Tween.get( levelFrameContainer, { loop: false } )
	.wait( 2000 )
	.to( { alpha: 0 }, 1000, createjs.Ease.sineIn )
	.call( levelFrameAniFinished );
	animated = false;
}

function gameInit()
{
	stage.addChild( backgroundScreen );
	lastKey = 0;

	jamieHold = false;
	jamieMode = false;
	life = 30;
	scrollspeed = 50;
	time = 0;
	music.play( { loop: -1 } );


	floorArray = new Array();
	floorArray.push( floor.clone() );
	floorArray[0].y = stage.canvas.height / 2;
	lastDistance.distance = ( floorArray[0].getBounds().width * floorArray[0].scaleX );
	lastDistance.index = 0;
	stage.addChild( floorArray[0] );
	for ( i = 1; i < 5; i++ )
	{
		floorArray.push( floor.clone() );
		floorArray[i].x = ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) + floorArray[lastDistance.index].x;
		var generatedDistance = ( ( stage.canvas.height - ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY ) ) * Math.random() ) + ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY );
		if ( generatedDistance < floorArray[lastDistance.index].y - character.getBounds().height ) generatedDistance = floorArray[lastDistance.index].y - character.getBounds().height;
		//var generatedDistance = ( ( Math.random() * 2 ) - 1 ) * character.getBounds().height;
		//generatedDistance += floorArray[lastDistance.index].y;

		//if ( generatedDistance > stage.canvas.height ) generatedDistance = stage.canvas.height;
		//else if ( generatedDistance < 2 * floorArray[i].getBounds().height * floorArray[i].scaleY ) generatedDistance = 2 * floorArray[i].getBounds().height * floorArray[i].scaleY;
		floorArray[i].y = generatedDistance;
		//floorArray[i].y = ( ( stage.canvas.height - ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY ) ) * Math.random() ) + ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY );
		lastDistance.distance += ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x;
		lastDistance.index = i;
		stage.addChild( floorArray[i] );
	}

	frontFace = true;
	velocity = new vec2();
	character.x = 100;
	character.y = stage.canvas.height / 4;
	stage.addChild( character );

	enemyArray = new Array();
	for ( i = 0; i < 20; i++ )
	{
		enemyArray.push( enemy.clone() );
		enemyArray[i].visible = false;
		stage.addChild( enemyArray[i] );
	}

	healthArray = new Array();
	for ( i = 0; i < 10; i++ )
	{
		healthArray.push( health.clone() );
		healthArray[i].visible = false;
		stage.addChild( healthArray[i] );
	}
	bulletArray = new Array();
	for ( i = 0; i < 3; i++ )
	{
		bulletArray.push( new BulletInstance( bullet.clone() ) );
		bulletArray[i].sprite.visible = false;
		stage.addChild( bulletArray[i].sprite );
	}

	stage.addChild( menuButton );
	menuButton.x = stage.canvas.width - ( 150 * 0.5 );
	menuButton.y = stage.canvas.height - ( 30 / 2 );
	menuButton.gotoAndPlay( "Neutral" );
	menuButton.on( "mouseout", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); }, this );
	menuButton.on( "mouseover", function playHover( evt ) { menuButton.gotoAndPlay( "Hover" ); }, this );
	menuButton.on( "mousedown", function playHover( evt ) { menuButton.gotoAndPlay( "Click" ); }, this );
	menuButton.on( "click", function playHover( evt ) { menuButton.gotoAndPlay( "Neutral" ); mode = MODE_TITLE }, this );

	stage.addChild( audioButton );
	audioButton.x = ( 30 * 0.5 );
	audioButton.y = stage.canvas.height - ( 30 * 0.5 );
	if ( mute ) audioButton.gotoAndPlay( "OffNeutral" );
	else audioButton.gotoAndPlay( "OnNeutral" );
	audioButton.on( "mouseout", function playHover( evt ) { if ( mute ) audioButton.gotoAndPlay( "OffNeutral" ); else audioButton.gotoAndPlay( "OnNeutral" ); }, this );
	audioButton.on( "mouseover", function playHover( evt ) { if ( mute ) audioButton.gotoAndPlay( "OffHover" ); else audioButton.gotoAndPlay( "OnHover" ); }, this );
	audioButton.on( "mousedown", function playHover( evt ) { if ( mute ) audioButton.gotoAndPlay( "OffClick" ); else audioButton.gotoAndPlay( "OnClick" ); }, this );
	audioButton.on( "click", function playHover( evt ) { mute = mute == false; if ( mute ) audioButton.gotoAndPlay( "OffNeutral" ); else audioButton.gotoAndPlay( "OnNeutral" ); }, this );

	score = 0;
	distance = 0;
	distanceBoundary = character.x;


	stage.addChild( hud );

	lifeDisplay = new createjs.Text( "FPS: ", "16px Comic Sans MS", "#000" );
	stage.addChild( lifeDisplay );

	fpsBar.x = lifeDisplay.getBounds().width;
	fpsBar.y = lifeDisplay.getMeasuredHeight() / 2;
	fpsBar.scaleX = life / 30;
	stage.addChild( fpsBar );

	scoreDisplay = new createjs.Text( "Score: " + distance, "16px Comic Sans MS", "#000" );
	scoreDisplay.x = 0;
	scoreDisplay.y = lifeDisplay.getMeasuredHeight();
	stage.addChild( scoreDisplay );
	hud.scaleX = 3;
	hud.scaleY = ( ( lifeDisplay.getMeasuredHeight() + scoreDisplay.getMeasuredHeight() ) / 100 ) + 0.05;

	lastSpawnEnemyDistance = 0;
	lastSpawnHealthDistance = 0;

	jamie.visible = jamieMode;
	stage.addChild( jamie );

	levelFrameStaticText = new createjs.Text( "High Score", "80px Comic Sans MS", "#FFF" );
	levelFrameStaticText.regX = levelFrameStaticText.getMeasuredWidth() / 2;
	levelFrameStaticText.regY = levelFrameStaticText.getMeasuredHeight();
	levelFrameStaticText.x = levelFrame.image.width / 2;
	levelFrameStaticText.y = levelFrame.image.height / 2;

	levelFrameText = new createjs.Text( Math.floor( highScore ), "80px Comic Sans MS", "#FFF" );
	levelFrameText.regX = levelFrameText.getMeasuredWidth() / 2;
	levelFrameText.regY = 0;
	levelFrameText.x = levelFrame.image.width / 2;
	levelFrameText.y = levelFrame.image.height / 2;

	levelFrameContainer = new createjs.Container();
	levelFrameContainer.addChild( levelFrame, levelFrameText, levelFrameStaticText );
	levelFrameContainer.alpha = 1;
	levelFrameContainer.visible = false;
	stage.addChild( levelFrameContainer );

	gameInitialized = true;
}

function gameDelete()
{
	stage.removeAllChildren();
	stage.removeAllEventListeners();
	music.stop();
	getHealth.stop();
	shoot.stop();
	menuButton.removeAllEventListeners();
	audioButton.removeAllEventListeners();
	createjs.Tween.removeAllTweens();
	scoreDisplay = lifeDisplay = levelFrameText = levelFrameStaticText = levelFrameContainer = levelFrameAnimator = floorArray = enemyArray = healthArray = null;
	gameInitialized = false;
}

var jamieHold = false;
function jamieToggle()
{
	if ( !jamieHold && jamiePressed )
	{
		jamieMode = jamieMode == false;
		jamieHold = true;
	}
	else if ( jamieHold && !jamiePressed ) jamieHold = false;
}

var lastKey;
function vec2()
{
	this.X = 0;
	this.Y = 0;
}
var velocity;
var damping = 0.1;
var lastSpawnEnemyDistance;
var lastSpawnHealthDistance;
var SCROLLACCELERATION = 5;
function gameUpdate()
{
	if ( !gameInitialized )
	{
		removeAll();
		gameInit();
		showLevelFrame();
	}
	else
	{
		jamieToggle();
		jamie.visible = jamieMode;
		if ( jamieMode )
		{

			music.setMute( mute );
			if ( character.y - 75 >= stage.canvas.height || life < 1 )
			{
				mode = MODE_GAMEOVER;
			}
			else if ( animated )
			{
				if ( Math.random() <= 0.25 ) spawnHealth();
				//enemySpawn -= ( 1 / createjs.Ticker.getFPS() );
				if ( Math.floor( distance * 0.001 ) > lastSpawnEnemyDistance )
				{
					if ( Math.random() <= 0.5 ) spawnEnemy();
					lastSpawnEnemyDistance = Math.floor( distance * 0.001 );
					//enemySpawn = enemySpawnInterval;
				}
				processMovement();
				processCollisions();

				if ( character.x - distanceBoundary > distance )
				{
					distance = character.x - distanceBoundary;
				}

				scoreDisplay.text = "Score: " + Math.floor(( distance / 100 ) + score );
				fpsBar.scaleX = life / 30;
				scrollspeed += SCROLLACCELERATION * ( 1 / life );
				if ( scrollspeed > 500 ) scrollspeed = 500;
			}
			createjs.Ticker.setFPS( 30 );
		}
		else
		{
			music.setMute( mute );
			if ( character.y - 75 >= stage.canvas.height || life < 1 )
			{
				mode = MODE_GAMEOVER;
			}
			else if ( animated )
			{
				//healthSpawn -= ( 1 / createjs.Ticker.getFPS() );
				if ( Math.floor( distance * 0.0025 ) > lastSpawnHealthDistance )
				{
					if ( Math.random() <= 0.5 ) spawnHealth();
					lastSpawnHealthDistance = Math.floor( distance * 0.0025 );
					//healthSpawn = healthSpawnInterval;
				}
				//enemySpawn -= ( 1 / createjs.Ticker.getFPS() );
				if ( Math.floor( distance * 0.005 ) > lastSpawnEnemyDistance )
				{
					if ( Math.random() <= 0.6 ) spawnEnemy();
					lastSpawnEnemyDistance = Math.floor( distance * 0.005 );
					//enemySpawn = enemySpawnInterval;
				}
				processMovement();
				processCollisions();

				if ( character.x - distanceBoundary > distance )
				{
					distance = character.x - distanceBoundary;
				}

				scoreDisplay.text = "Score: " + Math.floor(( distance / 100 ) + score );
				fpsBar.scaleX = life / 30;
				scrollspeed += SCROLLACCELERATION * ( 1 / createjs.Ticker.getFPS() );
			}
			createjs.Ticker.setFPS( life );
		}
	}
}
var ACCELERATION = 10;
var scrollspeed;
var shot = false;
var bulletVelocity = 5;
var frontFace = true;
function processMovement()
{
	if ( leftPressed )
	{
		velocity.X -= ( ACCELERATION * scrollspeed ) * ( 1 / createjs.Ticker.getFPS() );
		frontFace = false;
		character.scaleX = -0.5;
		if ( character.currentAnimation == "NeutralFront" ) character.gotoAndPlay( "Run" );
	}
	else if ( rightPressed )
	{
		frontFace = true;
		velocity.X += ( ACCELERATION * scrollspeed ) * ( 1 / createjs.Ticker.getFPS() );
		character.scaleX = 0.5;
		if ( character.currentAnimation == "NeutralFront" ) character.gotoAndPlay( "Run" );
	}
	else
	{
		character.gotoAndPlay( "NeutralFront" );
	}
	if ( downPressed )
	{
		velocity.Y += ( ACCELERATION * scrollspeed ) * ( 1 / createjs.Ticker.getFPS() );
	}

	if ( firePressed && !shot )
	{
		for ( i = 0; i < bulletArray.length; i++ )
		{
			if ( !bulletArray[i].sprite.visible )
			{
				if ( frontFace )
				{
					bulletArray[i].sprite.x = character.x + ( character.getBounds().width / 2 );
					bulletArray[i].sprite.y = character.y;
					bulletArray[i].direction = 1;
				}
				else
				{
					bulletArray[i].sprite.x = character.x - ( character.getBounds().width / 2 ) - bulletArray[i].sprite.getBounds().width;
					bulletArray[i].sprite.y = character.y;
					bulletArray[i].direction = -1;
				}
				shoot.stop();
				shoot.play();
				bulletArray[i].sprite.visible = true;
				shot = true;
				break;
			}
		}
	}
	else if ( !firePressed && shot ) shot = false;
	for ( i = 0; i < floorArray.length; i++ )
	{
		floorArray[i].x -= scrollspeed * ( 1 / createjs.Ticker.getFPS() );

		if ( ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x <= 0 )
		{
			floorArray[i].x = ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) + floorArray[lastDistance.index].x;
			if ( jamieMode ) floorArray[i].y = stage.canvas.height;
			else
			{
				var generatedDistance = ( ( stage.canvas.height - ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY ) ) * Math.random() ) + ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY );
				if ( generatedDistance < floorArray[lastDistance.index].y - character.getBounds().height ) generatedDistance = floorArray[lastDistance.index].y - character.getBounds().height;
				//var generatedDistance = ( ( Math.random() * 2 ) - 1 ) * character.getBounds().height;
				//generatedDistance += floorArray[lastDistance.index].y;
				//if ( generatedDistance > stage.canvas.height ) generatedDistance = stage.canvas.height;
				//else if ( generatedDistance < 2 * floorArray[i].getBounds().height * floorArray[i].scaleY ) generatedDistance = 2 * floorArray[i].getBounds().height * floorArray[i].scaleY;
				floorArray[i].y = generatedDistance;
				//floorArray[i].y = ( ( stage.canvas.height - ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY ) ) * Math.random() ) + ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY );
			}
			lastDistance.distance += ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x;
			lastDistance.index = i;
		}
		floorArray[i].alpha = ( ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x ) / ( floorArray[i].getBounds().width * floorArray[i].scaleX );
	}
	for ( i = 0; i < enemyArray.length; i++ )
	{
		if ( enemyArray[i].visible )
		{
			enemyArray[i].x -= scrollspeed * ( 1 / createjs.Ticker.getFPS() );
			if ( ( enemyArray[i].getBounds().width * enemyArray[i].scaleX ) + enemyArray[i].x <= 0 )
			{
				enemyArray[i].visible = false;
			}
		}
	}

	for ( i = 0; i < healthArray.length; i++ )
	{
		if ( healthArray[i].visible )
		{
			healthArray[i].x -= scrollspeed * ( 1 / createjs.Ticker.getFPS() );
			if ( ( healthArray[i].getBounds().width * healthArray[i].scaleX ) + healthArray[i].x <= 0 )
			{
				healthArray[i].visible = false;
			}
		}
	}
	for ( i = 0; i < bulletArray.length; i++ )
	{
		if ( bulletArray[i].sprite.visible )
		{
			bulletArray[i].sprite.x -= ( scrollspeed * ( 1 / createjs.Ticker.getFPS() ) ) - ( bulletArray[i].direction * scrollspeed * bulletVelocity * ( 1 / createjs.Ticker.getFPS() ) );
			if ( ( bulletArray[i].sprite.getBounds().width * bulletArray[i].sprite.scaleX ) + bulletArray[i].sprite.x <= 0 || bulletArray[i].sprite.x >= stage.canvas.width )
			{
				bulletArray[i].sprite.visible = false;
			}
		}
	}

	if ( !jamieMode ) character.x -= scrollspeed * ( 1 / createjs.Ticker.getFPS() );
	velocity.Y += ( GRAVITY * ( 1 / createjs.Ticker.getFPS() ) );
	velocity.X *= Math.pow( damping, ( 1 / createjs.Ticker.getFPS() ) );
	character.x += velocity.X * ( 1 / createjs.Ticker.getFPS() );
	character.y += velocity.Y * ( 1 / createjs.Ticker.getFPS() );
	if ( character.x > stage.canvas.width )
	{
		character.x -= character.x - stage.canvas.width;
		velocity.X = 0;
	}
	distanceBoundary -= scrollspeed * ( 1 / createjs.Ticker.getFPS() );
}

function processCollisions()
{
	for ( i = 0; i < floorArray.length; i++ )
	{
		var collided = ndgmr.checkRectCollision( character, floorArray[i] );
		if ( collided )
		{
			character.y -= collided.height;
			if ( jumpPressed ) velocity.Y = -250;
			else velocity.Y = 0;
		}

		for ( j = 0; j < healthArray.length; j++ )
		{
			if ( healthArray[j].visible )
			{

				var healthFloorCollision = ndgmr.checkRectCollision( healthArray[j], floorArray[i] );
				if ( healthFloorCollision )
				{
					healthArray[j].y -= healthFloorCollision.height;
				}
			}
		}

		for ( j = 0; j < enemyArray.length; j++ )
		{
			if ( enemyArray[j].visible )
			{
				var enemyFloorCollision = ndgmr.checkRectCollision( enemyArray[j], floorArray[i] );
				if ( enemyFloorCollision )
				{
					enemyArray[j].y -= enemyFloorCollision.height;
				}
			}
		}
	}

	for ( i = 0; i < healthArray.length; i++ )
	{
		if ( healthArray[i].visible )
		{
			if ( healthArray[i].visible )
			{
				var playerHitHealth = ndgmr.checkRectCollision( character, healthArray[i] );
				if ( playerHitHealth )
				{
					getHealth.stop();
					getHealth.play();
					score += 5;
					if ( life < MAXFPS ) life += 1;
					healthArray[i].visible = false;
				}
			}
		}
	}

	for ( i = 0; i < enemyArray.length; i++ )
	{
		if ( enemyArray[i].visible )
		{
			var playerHitEnemy = ndgmr.checkPixelCollision( character, enemyArray[i], 0 );
			if ( playerHitEnemy )
			{
				if ( !jamieMode )
				{
					hitBad.stop();
					hitBad.play();
					life -= 2;
					score -= 5;
				}
				enemyArray[i].visible = false;
			}
			else
			{
				for ( j = 0; j < bulletArray.length; j++ )
				{
					if ( bulletArray[j].sprite.visible )
					{
						var bulletHitEnemy = ndgmr.checkPixelCollision( bulletArray[j].sprite, enemyArray[i], 0 );
						if ( bulletHitEnemy )
						{
							hitGood.stop();
							hitGood.play();
							score += 10;
							enemyArray[i].visible = false;
							bulletArray[j].sprite.visible = false;
						}
					}
				}
			}
		}

	}
}

function spawnHealth()
{
	for ( i = 0; i < healthArray.length; i++ )
	{
		if ( !healthArray[i].visible )
		{
			healthArray[i].x = ( stage.canvas.width * 1.1 ) + ( healthArray[i].getBounds().width * healthArray[i].scaleX );
			healthArray[i].y = ( ( stage.canvas.height - ( 2 * healthArray[i].getBounds().height * healthArray[i].scaleY ) ) * Math.random() ) + ( 2 * healthArray[i].getBounds().height * healthArray[i].scaleY );
			healthArray[i].visible = true;
			break;
		}
	}
}

function spawnEnemy()
{
	for ( i = 0; i < enemyArray.length; i++ )
	{
		if ( !enemyArray[i].visible )
		{
			enemyArray[i].x = ( stage.canvas.width * 1.1 ) + ( enemyArray[i].getBounds().width * enemyArray[i].scaleX );
			enemyArray[i].y = ( ( stage.canvas.height - ( 2 * enemyArray[i].getBounds().height * enemyArray[i].scaleY ) ) * Math.random() ) + ( 2 * enemyArray[i].getBounds().height * enemyArray[i].scaleY );
			enemyArray[i].visible = true;
			break;
		}
	}
}

//#endregion

//#region game over
var gameOverInitialized = false;
var resultsContainer, finalScore, realScore, distanceTraveled;

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


	realScore = new createjs.Text( "Raw Score: " + score, "16px Comic Sans MS", "#FFF" );
	distanceTraveled = new createjs.Text( "Distance Traveled: " + Math.floor(( distance / 100 ) ) + " * 100 px", "16px Comic Sans MS", "#FFF" );

	if ( highScore < ( distance / 100 ) + score ) highScore = ( distance / 100 ) + score;

	finalScore = new createjs.Text( "Final Score: " + Math.floor(( distance / 100 ) + score ), "16px Comic Sans MS", "#FFF" );

	realScore.regX = realScore.getMeasuredWidth() / 2;
	realScore.x = 0;

	distanceTraveled.regX = distanceTraveled.getMeasuredWidth() / 2;
	distanceTraveled.x = 0;
	distanceTraveled.y = realScore.getMeasuredHeight();

	finalScore.regX = finalScore.getMeasuredWidth() / 2;
	finalScore.x = 0;
	finalScore.y = distanceTraveled.y + distanceTraveled.getMeasuredHeight();

	resultsContainer = new createjs.Container();
	resultsContainer.addChild( finalScore, realScore, distanceTraveled );
	resultsContainer.regY = ( finalScore.y + finalScore.getMeasuredHeight() ) / 2;
	resultsContainer.x = stage.canvas.width / 2;
	resultsContainer.y = stage.canvas.height / 2;
	stage.addChild( resultsContainer );
	gameOverInitialized = true;
}

function gameOverDelete()
{
	stage.removeAllChildren();
	menuButton.removeAllEventListeners();
	finalScore = realScore = distanceTraveled = resultsContainer = null;
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

//#region loading
var loadingInitialized = false;
var barBorder, progressBar, loadingText, backgroundColor;
var loadingTextWidth;
function loadingInit()
{
	backgroundColor = new createjs.Shape();
	backgroundColor.graphics.beginFill( "#000" ).drawRect( 0, 0, stage.canvas.width, stage.canvas.height );
	backgroundColor.x = 0;
	backgroundColor.y = 0;
	stage.addChild( backgroundColor );


	loadingText = new createjs.Text( "Loading", "80px Comic Sans MS", "#FFF" );
	loadingTextWidth = loadingText.getMeasuredWidth();
	var loadingTextHeight = loadingText.getMeasuredHeight();
	loadingText.regX = loadingTextWidth / 2;
	loadingText.regY = loadingTextHeight;
	loadingText.x = stage.canvas.width / 2;
	loadingText.y = stage.canvas.height / 2;
	stage.addChild( loadingText );



	barBorder = new createjs.Shape();
	barBorder.graphics.beginStroke( "#FFF" ).drawRect( 0, 0, loadingTextWidth, 10 );
	barBorder.x = ( stage.canvas.width / 2 ) - ( loadingTextWidth / 2 );
	barBorder.y = ( stage.canvas.height / 2 ) + ( loadingTextHeight / 2 );
	stage.addChild( barBorder );

	progressBar = new createjs.Shape();
	progressBar.graphics.beginFill( "#FFF" ).drawRect( 0, 0, 0, 10 );
	progressBar.x = ( stage.canvas.width / 2 ) - ( loadingTextWidth / 2 );
	progressBar.y = ( stage.canvas.height / 2 ) + ( loadingTextHeight / 2 );
	stage.addChild( progressBar );

	loadingInitialized = true;
}

function loadingDelete()
{
	stage.removeAllChildren();
	backgroundColor = loadingText = barBorder = progressBar = null;
	loadingInitialized = false;
}

function loadingUpdate( queue )
{
	if ( !loadingInitialized )
	{
		removeAll();
		loadingInit();
	}
	else
	{
		if ( queue == null ) progressBar.graphics.beginFill( "#FFF" ).drawRect( 0, 0, 0, 10 );
		else progressBar.graphics.beginFill( "#FFF" ).drawRect( 0, 0, loadingTextWidth * queue.progress, 10 );

	}
}
//#endregion

gamestate =
	{
		"title":
			function ()
			{
				if ( titleQueue != null && titleQueue.loaded ) titleUpdate();
				else loadingUpdate( titleQueue );
			},
		"instructions":
			function ()
			{
				if ( instructionQueue != null && instructionQueue.loaded ) instructionsUpdate();
				else loadingUpdate( instructionQueue );
			},
		"credits":
			function ()
			{
				if ( instructionQueue != null && instructionQueue.loaded ) creditsUpdate();
				else loadingUpdate( instructionQueue );
			},
		"game":
			function ()
			{
				if ( gameQueue != null && gameQueue.loaded ) gameUpdate();
				else loadingUpdate( gameQueue );
			},
		"gameover":
			function ()
			{
				if ( gameQueue != null && gameQueue.loaded ) gameOverUpdate();
				else loadingUpdate( gameQueue );
			}
	}

function loop()
{
	gamestate[mode]();
	stage.update();
}

function main()
{
	setUpCanvas();
	startLoad();
	createjs.Ticker.addEventListener( "tick", loop );
	createjs.Ticker.setFPS( MAINFPS );
}

var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var KEYCODE_A = 65;
var KEYCODE_W = 87;
var KEYCODE_D = 68;
var KEYCODE_S = 83;
var KEYCODE_J = 74;
var KEYCODE_SPACE = 32;


var leftPressed = false;
var rightPressed = false;
var jumpPressed = false;
var downPressed = false;
var firePressed = false;
var jamiePressed = false;
function handleKeyDown( evt )
{
	if ( !evt ) { var evt = window.event; }
	switch ( evt.keyCode )
	{
		case KEYCODE_LEFT:
			{
				leftPressed = true;
				console.log( "left key down" );
				break;
			}
		case KEYCODE_RIGHT:
			{
				rightPressed = true;
				console.log( "right key down" );
				break;
			}
		case KEYCODE_UP:
			{
				jumpPressed = true;
				console.log( "up key down" );
				break;
			}
		case KEYCODE_DOWN:
			{
				downPressed = true;
				console.log( "down key down" );
				break;
			}

		case KEYCODE_A:
			{
				leftPressed = true;
				console.log( "A key down" );
				break;
			}
		case KEYCODE_W:
			{
				jumpPressed = true;
				console.log( "W key down" );
				break;
			}
		case KEYCODE_D:
			{
				rightPressed = true;
				console.log( "D key down" );
				break;
			}
		case KEYCODE_S:
			{
				downPressed = true;
				console.log( "S key down" );
				break;
			}
		case KEYCODE_J:
			{
				jamiePressed = true;
				console.log( "J key down" );
				break;
			}
		case KEYCODE_SPACE:
			{
				firePressed = true;
				console.log( "Space key down" );
				break;
			}
		default:
			{
				console.log( "unknown key code " + evt.keyCode + " down" );
				break;
			}
	}
	lastKey = evt.keyCode;
}

function handleKeyUp( evt )
{
	if ( !evt ) { var evt = window.event; }
	switch ( evt.keyCode )
	{
		case KEYCODE_LEFT:
			{
				leftPressed = false;
				console.log( "left key up" );
				break;
			}
		case KEYCODE_RIGHT:
			{
				rightPressed = false;
				console.log( "right key up" );
				break;
			}
		case KEYCODE_UP:
			{
				jumpPressed = false;
				console.log( "up key up" );
				break;
			}
		case KEYCODE_DOWN:
			{
				downPressed = false;
				console.log( "down key up" );
				break;
			}
		case KEYCODE_A:
			{
				leftPressed = false;
				console.log( "A key up" );
				break;
			}
		case KEYCODE_W:
			{
				jumpPressed = false;
				console.log( "W key up" );
				break;
			}
		case KEYCODE_D:
			{
				rightPressed = false;
				console.log( "D key up" );
				break;
			}
		case KEYCODE_S:
			{
				downPressed = false;
				console.log( "S key up" );
				break;
			}
		case KEYCODE_J:
			{
				jamiePressed = false;
				console.log( "J key up" );
				break;
			}
		case KEYCODE_SPACE:
			{
				firePressed = false;
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
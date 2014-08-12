var MODE_TITLE = "title";
var MODE_INSTRUCTIONS = "instructions";
var MODE_GAME = "game";
var MODE_GAMEOVER = "gameover";
var mode = MODE_TITLE;
var TITLEBUTTONSIZE = 9;
var AUDIOBUTTIONSIZE = 6;
var MAINFPS = 30;

var titleManifest =
[
	{ src: "images/title.jpg", id: "title" },
	{ src: "images/titleButtons.jpg", id: "titleButtons" }
];

var instructionManifest =
	[
		{ src: "images/instructions.jpg", id: "instructions" }
	];
var gameManifest =
	[
	{ src: "images/background.jpg", id: "background" },
	{ src: "images/gameover.jpg", id: "gameover" },
	{ src: "images/levelsign.png", id: "levelsign" },
	{ src: "images/audio.jpg", id: "audioButton" },
	{ src: "audio/InGame.mp3", id: "music" },
	{ src: "images/character.png", id: "character" },
	{ src: "images/floor.png", id: "floor" },
	{ src: "images/enemy.png", id: "enemy" },
	{src: "images/health.png", id: "health"}
	];
var stage;
var titleQueue, titleScreen, playButton, menuButton, audioButton;

var instructionQueue, instructionScreen;

var gameQueue, backgroundScreen, gameoverScreen, levelFrame, music, character, enemy, health, floor;

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

	instructionQueue = new createjs.LoadQueue( true, "assets/" );
	instructionQueue.on( "complete", instructionsLoaded, this );
	instructionQueue.loadManifest( instructionManifest );
}

function instructionsLoaded()
{
	instructionScreen = new createjs.Bitmap( instructionQueue.getResult( "instructions" ) );

	gameQueue = new createjs.LoadQueue( true, "assets/" );
	createjs.Sound.alternateExtensions = ["mp3"];
	gameQueue.installPlugin( createjs.Sound );
	gameQueue.on( "complete", gameLoaded, this );
	gameQueue.loadManifest( gameManifest );
}

function gameLoaded()
{

	var audioButtonSheet = new createjs.SpriteSheet
(
{
	images: [gameQueue.getResult( "audioButton" )],
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

	var characterSheet = new createjs.SpriteSheet
	(
		{
			images: [gameQueue.getResult( "character" )],
			frames:
				{
					regX: 75 / 2,
					regY: 150 / 2,
					width: 75,
					height: 150,
					count: 1
				},
			animations:
				{
					NeutralFront:
						{
							frames: [0, 0]
						}
				}
		}
	);
	character = new createjs.Sprite( characterSheet, "NeutralFront" );


	var enemySheet = new createjs.SpriteSheet
		(
		{
			images: [gameQueue.getResult( "enemy" )],
			frames:
				{
					regX: 50,
					regY: 50,
					width: 100,
					height: 100,
					count: 1
				},
			animations:
				{
					Neutral:
						{
							frames: [0, 0]
						}
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
					count: 1
				},
			animations:
				{
					Neutral:
						{
							frames:[0,0]
						}
				}
		}
	);
	health = new createjs.Sprite( healthSheet, "Neutral" );

	backgroundScreen = new createjs.Bitmap( gameQueue.getResult( "background" ) );
	gameoverScreen = new createjs.Bitmap( gameQueue.getResult( "gameover" ) );
	levelFrame = new createjs.Bitmap( gameQueue.getResult( "levelsign" ) );
	music = new createjs.Sound.createInstance( "music" );
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
	playButton.x = stage.canvas.width - ( 150 * 1.5 );
	playButton.y = stage.canvas.height - ( 30 / 2 );
	instructionsButton.x = stage.canvas.width - ( 150 * 0.5 );
	instructionsButton.y = stage.canvas.height - ( 30 / 2 );
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
var score = 0;
var life = 30;
var scoreDisplay, lifeDisplay, levelFrameText;
var level = 1;
var levelFrameContainer;
var animated = false;
var levelFrameAnimator;
var mute = false;

var floorArray;
var lastDistance =
	{
		distance: 0,
		index:0
	};
var enemyArray;
var lastEnemySpawn =
	{
		index:0
	};

var healthArray;
var lastHealthSpawn =
	{
		index:0
	}

function levelFrameAniFinished( tween )
{
	levelFrameContainer.x = levelFrame.image.width / -2;
	levelFrameContainer.y = stage.canvas.height / 2;
	levelFrameContainer.scaleX = 1;
	levelFrameContainer.scaleY = 1;
	levelFrameContainer.visible = false;
	levelFrameAnimator = null;
	animated = true;
}

function showLevelFrame()
{
	levelFrameText.text = level;
	levelFrameContainer.visible = true;
	levelFrameAnimator = new createjs.Tween.get( levelFrameContainer, { loop: false } )
	.to( { x: stage.canvas.width / 2, y: stage.canvas.height / 2, rotation: 0 }, 1000, createjs.Ease.bounceOut )
	.wait( 2000 )
	.to( { x: stage.canvas.width + ( levelFrame.image.width / 2 ), y: ( levelFrame.image.height / -2 ), scaleX: 0, scaleY: 0 }, 1000, createjs.Ease.sineIn )
	.call( levelFrameAniFinished );
	animated = false;
}

function gameInit()
{
	stage.addChild( backgroundScreen );
	lastKey = 0;


	score = 0;
	life = 30;
	scrollspeed = 10;
	time = 0;
	music.play( { loop: -1 } );

	velocity.X = 0;
	velocity.Y = 0;
	character.x = 100;
	character.y = stage.canvas.height / 2;
	stage.addChild( character );

	floorArray = new Array();
	floorArray.push( floor.clone() );
	floorArray[0].y = stage.canvas.height;
	lastDistance.distance = ( floorArray[0].getBounds().width * floorArray[0].scaleX );
	lastDistance.index = 0;
	stage.addChild( floorArray[0] );
	enemyArray = new Array();
	healthArray = new Array();
	for ( i = 1; i < 10; i++ )
	{
		floorArray.push( floor.clone() );
		floorArray[i].x = ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX) + floorArray[lastDistance.index].x;
		floorArray[i].y = ( ( stage.canvas.height - ( floorArray[i].getBounds().height * floorArray[i].scaleY ) ) * Math.random() ) + ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY );
		lastDistance.distance += ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x;
		lastDistance.index = i;
		stage.addChild( floorArray[i] );
		enemyArray.push( enemy.clone() );
		enemyArray[i - 1].x = ( ( floorArray[i].getBounds().width * floorArray[i].scaleX ) * Math.random() ) + floorArray[i].x;
		enemyArray[i - 1].y = ( ( stage.canvas.height - ( enemyArray[i - 1].getBounds().height * enemyArray[i - 1].scaleY ) ) * Math.random() ) + ( 2 * enemyArray[i - 1].getBounds().height * enemyArray[i - 1].scaleY );
		stage.addChild( enemyArray[i - 1] );
		lastEnemySpawn.index = i - 1;
		healthArray.push( health.clone() );
		healthArray[i - 1].x = ( ( floorArray[i].getBounds().width * floorArray[i].scaleX ) * Math.random() ) + floorArray[i].x;
		healthArray[i - 1].y = ( ( stage.canvas.height - ( healthArray[i - 1].getBounds().height * healthArray[i - 1].scaleY ) ) * Math.random() ) + ( 2 * healthArray[i - 1].getBounds().height * healthArray[i - 1].scaleY );
		stage.addChild( healthArray[i - 1] );
		lastHealthSpawn.index = i - 1;
	}

	levelFrameText = new createjs.Text( level, "80px Comic Sans MS", "#FFF" );
	levelFrameText.regX = levelFrameText.getMeasuredWidth() / 2;
	levelFrameText.regY = levelFrameText.getMeasuredHeight() / 2;
	levelFrameText.x = levelFrame.image.width / 2;
	levelFrameText.y = levelFrame.image.height / 2;

	levelFrameContainer = new createjs.Container();
	levelFrameContainer.addChild( levelFrame, levelFrameText );
	levelFrameContainer.regX = levelFrame.image.width / 2;
	levelFrameContainer.regY = levelFrame.image.height / 2;
	levelFrameContainer.x = levelFrame.image.width / -2;
	levelFrameContainer.y = stage.canvas.height / 2;
	levelFrameContainer.scaleX = 1;
	levelFrameContainer.scaleY = 1;
	levelFrameContainer.visible = false;
	stage.addChild( levelFrameContainer );

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

	scoreDisplay = new createjs.Text( "Score: " + score, "16px Arial", "#000" );
	scoreDisplay.x = 0;
	scoreDisplay.y = 0;
	stage.addChild( scoreDisplay );

	lifeDisplay = new createjs.Text( "Life: ", "16px Arial", "#000" );
	lifeDisplay.y = lifeDisplay.getMeasuredHeight();
	stage.addChild( lifeDisplay );
	gameInitialized = true;
}

function gameDelete()
{
	stage.removeAllChildren();
	stage.removeAllEventListeners();
	music.stop();
	menuButton.removeAllEventListeners();
	audioButton.removeAllEventListeners();
	createjs.Tween.removeAllTweens();
	scoreDisplay = lifeDisplay = levelFrameText = levelFrameContainer = levelFrameAnimator = floorArray = enemyArray = healthArray = null;
	gameInitialized = false;
}

var lastKey;
var velocity = { X: 0, Y: 0 };
var damping = 0.9;
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
		createjs.Ticker.setFPS( life );
		music.setMute( mute );
		if ( character.y - 75 >= stage.canvas.height || life < 1 ) mode = MODE_GAMEOVER;
		else if ( animated )
		{
			score += ( 10 / life );
			processMovement();
			velocity.X *= damping;
			velocity.Y += ( GRAVITY * ( 1 / life ) );
			character.x += velocity.X * ( 1 / life );
			character.y += velocity.Y * ( 1 / life );
			processCollisions();
			scoreDisplay.text = "Score: " + score;
			lifeDisplay.text = "Life: " + Math.floor( life ) + " fps";
			scrollspeed += 0.1;
		}
	}

}
var ACCELERATION = 10;
var scrollspeed;
function processMovement()
{
	if(leftPressed)
	{
		velocity.X -= (ACCELERATION* scrollspeed) * ( 1 / life );
	}
	if(rightPressed)
	{
		velocity.X += (ACCELERATION* scrollspeed) * ( 1 / life );
	}
	for ( i = 0; i < floorArray.length; i++ )
	{
		
		floorArray[i].x -= scrollspeed * ( 1 / life );

		if(( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x <= 0)
		{
			floorArray[i].x = ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) + floorArray[lastDistance.index].x;
			floorArray[i].y = ( ( stage.canvas.height - ( floorArray[i].getBounds().height * floorArray[i].scaleY ) ) * Math.random() ) + ( 2 * floorArray[i].getBounds().height * floorArray[i].scaleY );
			lastDistance.distance += ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x;
			lastDistance.index = i;
		}
		floorArray[i].alpha = ( ( floorArray[i].getBounds().width * floorArray[i].scaleX ) + floorArray[i].x ) / ( floorArray[i].getBounds().width * floorArray[i].scaleX );
	}
	for ( i = 0; i < enemyArray.length; i++ )
	{
		enemyArray[i].x -= scrollspeed * ( 1 / life );
		if(( enemyArray[i].getBounds().width * enemyArray[i].scaleX ) + enemyArray[i].x <= 0)
		{
			enemyArray[i].x = ( ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) * Math.random() ) + floorArray[lastDistance.index].x;
			enemyArray[i].y = ( ( stage.canvas.height - ( enemyArray[i].getBounds().height * enemyArray[i].scaleY ) ) * Math.random() ) + ( 2 * enemyArray[i].getBounds().height * enemyArray[i].scaleY );
			lastEnemySpawn.index = i;
		}
	}

	for ( i = 0; i < healthArray.length; i++ )
	{
		healthArray[i].x -= scrollspeed * ( 1 / life );
		if ( ( healthArray[i].getBounds().width * healthArray[i].scaleX ) + healthArray[i].x <= 0 )
		{
			healthArray[i].x = ( ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) * Math.random() ) + floorArray[lastDistance.index].x;
			healthArray[i].y = ( ( stage.canvas.height - ( healthArray[i].getBounds().height * healthArray[i].scaleY ) ) * Math.random() ) + ( 2 * healthArray[i].getBounds().height * healthArray[i].scaleY );
			lastHealthSpawn.index = i;
		}
	}
	character.x -= scrollspeed * ( 1 / life );
}

function processCollisions()
{
	for ( i = 0; i < floorArray.length; i++ )
	{
		var collided = ndgmr.checkRectCollision( character, floorArray[i] );
		if ( collided )
		{
			character.y -= collided.height;
			if ( jumpPressed ) velocity.Y = -300;
			else velocity.Y = 0;
		}

		for ( j = 0; j < healthArray.length; j++ )
		{
			var healthFloorCollision = ndgmr.checkRectCollision( healthArray[j], floorArray[i] );
			if ( healthFloorCollision )
			{
				healthArray[j].y -= healthFloorCollision.height;
			}

			var playerHitHealth = ndgmr.checkRectCollision( character, healthArray[j] );
			if ( playerHitHealth )
			{
				life += 1;
				healthArray[j].x = ( ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) * Math.random() ) + floorArray[lastDistance.index].x;
				healthArray[j].y = ( ( stage.canvas.height - ( healthArray[j].getBounds().height * healthArray[j].scaleY ) ) * Math.random() ) + ( 2 * healthArray[j].getBounds().height * healthArray[j].scaleY );
				lastHealthSpawn.index = j;
			}
		}

		for(j = 0; j < enemyArray.length; j++)
		{
			var enemyFloorCollision = ndgmr.checkRectCollision( enemyArray[j], floorArray[i] );
			if(enemyFloorCollision)
			{
				enemyArray[j].y -= enemyFloorCollision.height;
			}

			var playerHitEnemy = ndgmr.checkRectCollision( character, enemyArray[j] );
			if(playerHitEnemy)
			{
				life -= 1;
				enemyArray[j].x = ( ( floorArray[lastDistance.index].getBounds().width * floorArray[lastDistance.index].scaleX ) * Math.random() ) + floorArray[lastDistance.index].x;
				enemyArray[j].y = ( ( stage.canvas.height - ( enemyArray[j].getBounds().height * enemyArray[j].scaleY ) ) * Math.random() ) + ( 2 * enemyArray[j].getBounds().height * enemyArray[j].scaleY );
				lastEnemySpawn.index = j;
			}
		}
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

var KEYCODE_SPACE = 32;


var leftPressed = false;
var rightPressed = false;
var jumpPressed = false;
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
				console.log( "S key down" );
				break;
			}
		case KEYCODE_SPACE:
			{
				jumpPressed = true;
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
				console.log( "S key up" );
				break;
			}
		case KEYCODE_SPACE:
			{
				jumpPressed = false;
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
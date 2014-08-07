
var manifest =
[
	{src:"title.png", id:"title"},
	{src:"background.png", id:"background"},
	{src:"instructions.png", id:"instructions"},
	{src:"gameover.png", id:"gameover"},
	{src:"levelsign.png", id:"levelsign"}
];
var FPS = 30;
var stage;
var canvas;
var queue;
var titleScreen;
var backgroundScreen;
var instructionScreen;
var gameoverScreen;
var levelFrame;

function setUpCanvas()
{
	canvas = document.getElementById("game");
	canvas.width = 800;
	canvas.height = 600;
	stage = new createjs.Stage(canvas);
}

function loadFiles()
{
	queue = new createjs.LoadQueue(true, "assets/images/");
	queue.on("complete", loadComplete, this);
	queue.loadManifest( manifest );
}

function loadComplete()
{
	titleScreen = new createjs.Bitmap(queue.getResult("title"));
    backgroundScreen = new createjs.Bitmap(queue.getResult("background"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
    gameoverScreen = new createjs.Bitmap(queue.getResult("gameover"));
    levelFrame = new createjs.Bitmap(queue.getResult("levelsign"));
}

function titleUpdate()
{
	
}

function loop()
{
	titleUpdate();
	stage.update();
}

function main()
{
	loadFiles();
	setUpCanvas();
	createjs.Ticker.addEventListener("tick", loop);
	createjs.Ticker.setFPS(FPS);
}

if( !!(window.addEventListener))
{
    window.addEventListener ("DOMContentLoaded", main);
}
else
{ //MSIE
    window.attachEvent("onload", main);
}
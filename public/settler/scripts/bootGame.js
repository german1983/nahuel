var game;

window.onload = function () {
  const gameConfig = {
    width: gameOptions.width,
    height: gameOptions.height,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: 0xecf0f1,
    scene: [bootGame, createMap]
  };
 
  game = new Phaser.Game(gameConfig);
  window.focus();
  resizeGame();
  window.addEventListener("resize", resizeGame);
}

function resizeGame() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}

class bootGame extends Phaser.Scene {
  constructor() {
    super("BootGame");
  }
  preload() {
    this.load.bitmapFont("font", "/settler/assets/fonts/font.png", "/settler/assets/fonts/font.fnt");
    this.load.image(tileNames.green, "/settler/assets/hexagon-green-50.png");
    this.load.image(tileNames.mountain, "/settler/assets/hexagon-mountain-50.png");
  }
  create() {
    console.log("game is booting...");
    this.scene.start("CreateMap");
  }
}
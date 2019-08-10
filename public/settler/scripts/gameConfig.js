var gameOptions = {
  width: 800,
  height: 800,
  hexSize: 50,
  mapRadius: 3,

  tweenSpeed: 50,
  swipeMaxTime: 1000,
  swipeMinDistance: 20,
  swipeMinNormal: 0.85,
  aspectRatio: 16/9,
  localStorageName: "topscore4096"
}

const tileNames = {
  green: "green50",
  mountain: "mountain50"
}

tileNamesArray = Object.keys(tileNames);

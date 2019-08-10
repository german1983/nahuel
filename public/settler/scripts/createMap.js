class createMap extends Phaser.Scene {
  constructor() {
    super("CreateMap");
    this.myMap = {};
  }
 

  create() {
    console.log("Map is creating...");
   
    var layout = new Layout(Layout.pointy, new Phaser.Geom.Point(gameOptions.hexSize, gameOptions.hexSize), new Phaser.Geom.Point(game.config.width / 2, game.config.height / 2));
    this.myMap = this.createHexagonMap(layout);
  
    const {myMap} = this;
    // this.input.on('pointermove', function (pointer) {
    //   console.log(pointer.x, pointer.y);
    //   myMap.Nodes.forEach(node => {
    //     if (Phaser.Geom.Circle.ContainsPoint(node.circle, pointer)) {
    //       console.log(JSON.stringify(node));
    //     }
    //   })
    // });

     this.input.on('pointerdown', function (pointer) {
      console.log(pointer.x, pointer.y);
      myMap.Nodes.forEach(node => {
        if (Phaser.Geom.Circle.ContainsPoint(node.circle, pointer)) {
          console.log(JSON.stringify(node));
        }
      })
    });

    // this.createHexes(myMap.Hexes);
    this.addTextToHexes(myMap.Hexes);
    this.createNodes(myMap.Nodes);
    this.createEdges(myMap.Edges);
   
    console.log("Map is created... Enjoy the game!");
  }

  addTextToHexes(hexes) {
    hexes.forEach(hex => {
      const center = this.myMap.Layout.hexToPixel(hex);
      hex.text = this.add.bitmapText(center.x, center.y, "font", hex.q + ", " + hex.r);
    });
  }

  createHexagonMap(layout) {
    const map = new Map(layout);
    const map_radius = gameOptions.mapRadius;
    for (let q = -map_radius; q <= map_radius; q++) {
      let r1 = Math.max(-map_radius, -q - map_radius);
      let r2 = Math.min(map_radius, -q + map_radius);
      for (let r = r1; r <= r2; r++) {
        const hex = new Hex(q, r);
        const hexNode = new HexNode(hex, layout);
        map.createNode(hexNode);
      }
    }
    return map;
  }

  createHexes(hexes) {
    hexes.forEach(hex => {
      const center = this.myMap.Layout.hexToPixel(hex);
      var i1 = this.add.image(center.x, center.y, tileNames[Phaser.Utils.Array.GetRandom(tileNamesArray)]); //
      i1.setInteractive();
      i1.on('pointerdown', this.clickHandler, hex);
    })
  }
  createNodes(nodes) {
    nodes.forEach(node => {
      // var circle = new Phaser.Geom.Circle(node.Point.x, node.Point.y, 8);
      // node.circle = circle;
      // // var graphics2 = this.add.graphics({ lineStyle: { width: 1, color: 0xff0000 }}); //, fillStyle: { color: 0xff0000 }
      // graphics.lineStyle(1, 0xff0000);
      // // graphics.fillStyle(0xff0000);
      // graphics.strokeCircleShape(circle);
      const { x, y } = node.Point;
      const radius = 8;
      const startAngle = 0;
      const endAngle = 360;
      // var c1 = this.add.circle(node.Point.x + 4, node.Point.y + 4, 8);
      var c1 = this.add.arc(x + radius/2, y + radius/2, radius, startAngle, endAngle, false, 0xff0000);
      // var c1 = new Phaser.GameObjects.Arc(this, x, y, radius, startAngle, endAngle, false, 0xff0000);
      // c1.geom = new Phaser.Geom.Circle(node.Point.x, node.Point.y, 8);
      c1.setInteractive();
      // c1.z = 5;
      // this.add.arc(c1);
      node.circle = c1;
      c1.setStrokeStyle(2, 0xefc53f);
      c1.on('pointerdown', this.clickHandler, node);
      console.log(c1);
      // var points = circle.getPoints(12);
      // for (var i = 0; i < points.length; i++)
      // {
      //     var p = points[i];
      //     graphics.fillRect(p.x - 2, p.y - 2, 2, 2);
      // }
    })
  }
  createEdges(edges) {
    edges.forEach(edge => {
      const graphics = this.add.graphics();
      graphics.lineStyle(6, 0xff00cc);
      // graphics.fillStyle(0x0000aa);

      var line = new Phaser.Geom.Line(edge.From.Point.x, edge.From.Point.y, edge.To.Point.x, edge.To.Point.y);
      Phaser.Geom.Line.Extend(line, -10);
      graphics.strokeLineShape(line);

    })
  }
  
  clickHandler(mouse){
    console.log("Here we are at: ", mouse.x, " - ", mouse.y);
    console.log("Circle located at: ", this.circle.x, " - ", this.circle.y);
    console.log(this);
  }
}

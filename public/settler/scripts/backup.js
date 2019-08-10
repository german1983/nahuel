createHexes(hexes) {
  hexes.forEach(hex => {
    const conrners = this.myMap.Layout.polygonCorners(hex);
    const center = this.myMap.Layout.hexToPixel(hex);
    // graphics.moveTo(corner[0].Point.x, corner[0].Point.y);

    // for (var i = 1; i < corner.length; i++) {
    //   graphics.lineTo(corner[i].Point.x, corner[i].Point.y);
    // }

    // graphics.closePath();
    // graphics.strokePath();
    // var colors = [0x00aaff, 0x00aadd, 0xaaaaaa];
    // var polygon = new Phaser.Geom.Polygon(corner.map(c => c.Point));
    // graphics.fillStyle(Phaser.Utils.Array.GetRandom(colors));
    // graphics.fillPoints(polygon.points, true);
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
    var c1 = this.add.circle(node.Point.x + 4, node.Point.y + 4, 8);
    node.circle = c1;
    c1.setStrokeStyle(2, 0xefc53f);
    c1.on('pointerdown', this.clickHandler, node);
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
    // var rect = new Phaser.Geom.Rectangle(edge.From.Point.x, edge.From.Point.y, edge.To.Point.x, edge.To.Point.y);
    //graphics.strokeRectShape(rect);

    // graphics.lineStyle(3, 0xff00cc);

    // graphics.moveTo(edge.From.Point.x, edge.From.Point.y);
    // graphics.lineTo(edge.To.Point.x, edge.To.Point.y);
    // graphics.closePath();
    // graphics.strokePath();
    var graphics = this.add.graphics();

    graphics.lineStyle(6, 0xff00cc);
    // graphics.fillStyle(0x0000aa);

    var line = new Phaser.Geom.Line(edge.From.Point.x, edge.From.Point.y, edge.To.Point.x, edge.To.Point.y);
    Phaser.Geom.Line.Extend(line, -10);
    // var points = Phaser.Geom.Line.BresenhamPoints(line, 50);
    
    // for(var i = 0; i < points.length; i++)
    //   {
    //       graphics.fillPointShape(points[i], 50);
    //   }
    graphics.strokeLineShape(line);

  })
}

    // this.input.on('pointermove', function (pointer) {
    //   console.log(pointer.x, pointer.y);
    //   myMap.Nodes.forEach(node => {
    //     if (Phaser.Geom.Circle.ContainsPoint(node.circle, pointer)) {
    //       console.log(JSON.stringify(node));
    //     }
    //   })
    // });
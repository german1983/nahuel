class Hex {
  constructor(q, r) {
    this.q = q;
    this.r = r;
    this.s = -q - r;
  }

  add(b) {
    return new Hex(this.q + b.q, this.r + b.r);
  }

  subtract(b) {
    return new Hex(this.q - b.q, this.r - b.r);
  }

  scale(k) {
    return new Hex(this.q * k, this.r * k);
  }

  len() {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance(b) {
    return this.subtract(b).len();
  }
  static direction(direction) {
    return Hex.directions[(6 + (direction % 6)) % 6];
  }
  neighbor(direction) {
    return this.add(Hex.direction(direction));
  }
  lerp(b, t) {
    return new Hex(this.q * (1.0 - t) + b.q * t, this.r * (1.0 - t) + b.r * t);
  }
  linedraw(b) {
    var N = this.distance(b);
    var a_nudge = new Hex(this.q + 0.000001, this.r + 0.000001);
    var b_nudge = new Hex(b.q + 0.000001, b.r + 0.000001);
    var results = [];
    var step = 1.0 / Math.max(N, 1);
    for (var i = 0; i <= N; i++) {
      results.push(a_nudge.lerp(b_nudge, step * i).round());
    }
    return results;
  }
}
Hex.directions = [new Hex(1, 0), new Hex(1, -1), new Hex(0, -1), new Hex(-1, 0), new Hex(-1, 1), new Hex(0, 1)];


class HexNode {
  constructor(hex, layout) {
    this._hex = hex;
    this.center = layout.hexToPixel(hex);
    this.corners = layout.polygonCorners(hex);
    this.q = hex.q;
    this.r = hex.r;
  }

  get Hex() {
    return this._hex;
  }
}

class Orientation {
  constructor(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
      this.f0 = f0;
      this.f1 = f1;
      this.f2 = f2;
      this.f3 = f3;
      this.b0 = b0;
      this.b1 = b1;
      this.b2 = b2;
      this.b3 = b3;
      this.start_angle = start_angle;
  }
}

class Layout {
  constructor(orientation, size, origin) {
    this.orientation = orientation;
    this.size = size;
    this.origin = origin;
  }

  hexToPixel(hex) {
    var M = this.orientation;
    var size = this.size;
    var origin = this.origin;
    var x = (M.f0 * hex.q + M.f1 * hex.r) * size.x;
    var y = (M.f2 * hex.q + M.f3 * hex.r) * size.y;
    return new Phaser.Geom.Point(x + origin.x, y + origin.y);
  }

  pixelToHex(point) {
    var M = this.orientation;
    var size = this.size;
    var origin = this.origin;
    var pt = new Phaser.Geom.Point((point.x - origin.x) / size.x, (point.y - origin.y) / size.y);
    var q = M.b0 * pt.x + M.b1 * pt.y;
    var r = M.b2 * pt.x + M.b3 * pt.y;
    return new Hex(q, r, -q - r);
  }
  hexCornerOffset(cornerNumber) {
    var M = this.orientation;
    var size = this.size;
    var angle = 2.0 * Math.PI * (M.start_angle - cornerNumber) / 6.0;
    return new Phaser.Geom.Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }
  polygonCorners(h) {
    var corners = [];
    var center = this.hexToPixel(h);
    for (var i = 0; i < 6; i++) {
      var offset = this.hexCornerOffset(i);
      corners.push(new HexCorner(new Phaser.Geom.Point(center.x + offset.x, center.y + offset.y), h));
    }
    return corners;
  }
}

class HexCorner {
  constructor(point, hex) {
    this._point = point;
    this._hex = hex;
  }

  get Point() {
    return this._point;
  }

  get Hex() {
    return this._hex;
  }

  set RouteNode(value) {
    this._routeNode = value;
  }

  get RouteNode() {
    return this._routeNode;
  }
}

Layout.pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
Layout.flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

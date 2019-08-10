const EPSILON = 0.01;

class Map {
  constructor(layout) {
    this._layout = layout;
    this._hexes = [];
    this._routes = {
      nodes: [],
      edges: [],
    };
  }

  createNode(node) {
    this._hexes.push(node);
    if (node.corners && Array.isArray(node.corners)) {
      node.corners.forEach(hexCorner => {
        const routeNode = this.addRouteNodeAt(hexCorner);
        routeNode.addHex(node.Hex);
      });
      this.addRouteEdges(node);
    }
  }

  addRouteNodeAt(hexCorner) {
    const { Point: point } = hexCorner;
    const routeNode = this.findRouteNode(point);
    let resultNode;
    if (routeNode === undefined) {
      resultNode = new RouteNode(point);
      this._routes.nodes.push(resultNode);
    } else {
      resultNode = routeNode;
    }
    
    hexCorner.RouteNode = resultNode;
    return resultNode;
  }

  addRouteEdges(node) {
    const { Hex: hex, corners } = node;
    for (let i = 0; i < 6; i++) {
      let { RouteNode: routeNodeFrom } = corners[i];
      let { RouteNode: routeNodeTo } = corners[(i + 1) % 6];
      let routeEdge = this.findRouteEdge(routeNodeFrom, routeNodeTo);
      if (routeEdge === undefined) {
        let newRouteEdge = new RouteEdge(routeNodeFrom, routeNodeTo, hex);
        this._routes.edges.push(newRouteEdge);
      } else {
        routeEdge.addHex(hex);
      }
    }
  }

  findRouteNode(point) {
    return this._routes.nodes.find(n => this.isTheSamePoint(n.Point, point));
  }

  findRouteEdge(routeNode1, routeNode2) {
    return this._routes.edges.find(e => e.hasSameNodes(routeNode1, routeNode2));
  }

  isTheSamePoint(point1, point2) {
    if (point1 && point2) {
      return (Math.abs(point1.x - point2.x) < EPSILON) && (Math.abs(point1.y - point2.y) < EPSILON);
    } else {
      return false;
    }
  }

  get Layout() {
    return this._layout;
  }
  get Hexes() {
    return this._hexes;
  }
  get Nodes() {
    return this._routes.nodes;
  }
  get Edges() {
    return this._routes.edges;
  }
}


class RouteNode {
  constructor(point) {
    this._point = point;
    this._hexes = [];
  }

  addHex(hex) {
    if (this._hexes.find(h => h === hex) === undefined) {
      this._hexes.push(hex);
    }
  }

  get Point() {
    return this._point;
  }

  get Hexes() {
    return this._hexes;
  }
}

class RouteEdge {
  constructor(routeNode1, routeNode2, hex) {
    this._routeNode1 = routeNode1;
    this._routeNode2 = routeNode2;
    this._hexes = [hex];
  }

  addHex(hex) {
    if (this._hexes.find(h => h === hex) === undefined) {
      this._hexes.push(hex);
    }
  }

  hasSameNodes(rn1, rn2) {
    return (
      this._routeNode1 === rn1 && this._routeNode2 === rn2 ||
      this._routeNode2 === rn1 && this._routeNode1 === rn2
    );
  }

  get From() {
    return this._routeNode1;
  }

  get To() {
    return this._routeNode2;
  }
}

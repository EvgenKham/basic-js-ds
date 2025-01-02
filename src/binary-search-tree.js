const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
    }

    this._addChild(this.rootNode, newNode);
  }

  _addChild(currentNode, newNode) {
    if (newNode.data < currentNode.data) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this._addChild(currentNode.left, newNode);
      }
    }

    if (newNode.data > currentNode.data) {
      if (currentNode.right === null) {
        currentNode.right = newNode;
      } else {
        this._addChild(currentNode.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data, node = this.rootNode) {
    if (node === null) {
      return null;
    }

    if (node.data === data) {
      return node;
    }

    if (node.data > data) {
      return this.find (data, node.left);
    }

    if (node.data < data) {
      return this.find (data, node.right);
    }
  }

  remove(data) {
      this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {

      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const minRight = this._findMin(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (this.rootNode === null)  {
      return null;
    }
    return this._findMin(this.rootNode).data;
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    return this._findMax(this.rootNode).data;
  }

  _findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  // remove(data) {
  //   return this._removeNode(data, this);
  // }

  // _removeNode(data, node) {
  //   if (node === null) {
  //     return null;
  //   }

  //   if (data < node.data) {
  //     node.left = this._removeNode(data, node.left);
  //     return node;
  //   }

  //   if (data > node.data) {
  //     node.right = this._removeNode(data, node.right);
  //     return node;
  //   }

  //   if (data === node.data) {
  //     if (node.left === null && node.right === null) {
  //       node = null;
  //       return node;
  //     }

  //     if (node.left === null) {
  //       node = node.right;
  //       return node;
  //     }

  //     if (node.right === null) {
  //       node = node.left;
  //       return node;
  //     }

  //     if (node.left !== null && node.right !== null) {
  //       const newNode = this.min();
  //       node.data = newNode.data;
  //       node.right = this._removeNode(newNode.data, node.right);
  //       return node;
  //     }
  //   }
  // }

  // min() {
  //   let minValue = this.rootNode;
  //   while (minValue.left) {
  //     minValue = minValue.left;
  //   }
  //   return minValue.data;
  // }

  // max() {
  //   let maxValue = this.rootNode;
  //   while (maxValue.right) {
  //     maxValue = maxValue.right;
  //   }
  //   return maxValue.data;
  // }
}

module.exports = {
  BinarySearchTree
};
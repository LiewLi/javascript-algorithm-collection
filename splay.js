function Node(data) {
  this.data = data
  this.parent = null
  this.left = null
  this.right = null
}

function SplayTree() {
  this.root = null
}

SplayTree.prototype.maximum = function(node) {
  while (node.right) node = node.right
  return node
}

SplayTree.prototype.leftRotate = function(node) {
  const n = node.right
  node.right = n.left
  if (n.left) n.left.parent = node
  n.parent = node.parent
  if (node.parent == null) this.root = n
  else if (node.parent.left == node) node.parent.left = n
  else node.parent.right = n
  n.left = node
  node.parent = n
}

SplayTree.prototype.rightRotate = function(node) {
  const n = node.left
  node.left = n.right
  if (n.right) n.right.parent = node
  n.parent = node.parent
  if (node.parent == null) this.root = n
  else if (node.parent.right == node) node.parent.right = n
  else node.parent.left = n

  n.right = node
  node.parent = n
}

SplayTree.prototype.splay = function(node) {
  while (node.parent) {
    if (node.parent == this.root) {
      if (node == node.parent.left) this.rightRotate(node.parent)
      else this.leftRotate(node.parent)
    }
    else {
      const p = node.parent
      const g = p.parent
      if (node.parent.left == node && p.parent.left == p) {
        this.rightRotate(g)
        this.rightRotate(p)
      } else if (node.parent.right == node && p.parent.right == p) {
        this.leftRotate(g)
        this.leftRotate(p)
      } else if (node.parent.right == node && p.parent.left == p) {
        this.leftRotate(p)
        this.rightRotate(g)
      } else if (node.parent.left == node && p.parent.right == p) {
        this.rightRotate(p)
        this.leftRotate(g);
      }
    }
  }
}

SplayTree.prototype.insert = function(node) {
  let p = null
  let tmp = this.root
  while (tmp) {
    p = tmp
    if (node.data < tmp.data) {
      tmp = tmp.left
    } else tmp = tmp.right
  }
  node.parent = p
  if (p == null) {
    this.root = node
  } else if (node.data < p.data) {
    p.left = node
  } else p.right = node

  this.splay(node)
}

SplayTree.prototype.search = function(node, data) {
  if (node.data == data) {
    this.splay(node)
    return node
  }else if (data < node.data) {
    return this.search(node.left, data)
  } else if (data > node.data) {
    return this.search(node.right, data)
  } else return null
}

SplayTree.prototype.delete = function(node) {
  this.splay(node)

  const left = new SplayTree()
  left.root = this.root.left
  if (left.root) left.root.parent = null

  const right = new SplayTree()
  right.root = this.root.right
  if (right.root) right.root.parent = null

  if (left.root) {
    const n = left.maximum(left.root)
    left.splay(n)
    left.root.right = right.root
    this.root = left.root
  } else {
    this.root = right.root
  }
}

SplayTree.prototype.inorder = function(node, cb) {
  if (node) {
    this.inorder(node.left, cb)
    cb && cb(node)
    this.inorder(node.right, cb)
  }
}

module.exports = {SplayTree, Node}




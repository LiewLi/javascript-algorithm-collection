function Tree(val) {
  this.val = val
  this.left = null
  this.right = null
}


function preorder(node, cb) {
  if (!node) return
  const stack = [node]
  while(stack.length) {
    const node = stack.pop()
    cb(node)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
}

function inorder(node, cb) {
  const stack = []
  while (stack.length || node) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      const n = stack.pop()
      cb(n)
      node = n.right
    }
  }
}


function postorder(node, cb) {
  const stack = []
  let lastVisitNode = null
  while(stack.length || node) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      let n = stack[stack.length - 1]
      if (n.right && n.right !== lastVisitNode) {
        node = n.right
      } else {
        lastVisitNode = stack.pop()
        cb(lastVisitNode)
      }
    }
  }
}


const node0 = new Tree(0)
const node1 = new Tree(1)
const node2 = new Tree(2)
const node3 = new Tree(3)
const node4 = new Tree(4)
node0.left = node1
node0.right = node2
node1.left = node3
node1.right = node4

preorder(node0, n => console.log(n.val))
inorder(node0, n => console.log(n.val))
postorder(node0, n => console.log(n.val))

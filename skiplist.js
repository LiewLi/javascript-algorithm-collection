const Stack = require('./stack')

function coinFlip() {
    return Math.random() <= 0.5
}

class DataNode {
    constructor(key, data) {
        this.key = key
        this.data = data
        this.next = null
        this.down = null
    }
}

class SkipList {
    constructor() {
        this.head = null
    }

    insertItem(key, data) {
        const stack = new Stack()
        let curNode = this.head
        
        while (curNode) {
            const nexNode = curNode.next
            if (nexNode) {
                if (nexNode.key > key) {
                    stack.push(curNode)
                    curNode = curNode.down
                } else{
                    curNode = nexNode
                }
            } else {
                stack.push(curNode)
                curNode = curNode.down
            }
        }
        const itemLayer = stack.pop()
        const node = new DataNode(key, data)
        node.next = itemLayer.next
        itemLayer.next = node
        
        curNode = node

        while (!stack.isEmpty) {
            const topNode = stack.pop()
            const newNode = new DataNode(key, data)
            newNode.down = curNode
            newNode.next = topNode.next
            topNode.next = newNode
            curNode = newNode
        }
        while(coinFlip()) {
            const newHead = new DataNode()
            const node = new DataNode(key, data)
            node.down = curNode
            newHead.next = node
            newHead.down = this.head
            curNode = node
            this.head = newHead
        }
    }

    bootstrapBaseLayer(key, data) {
        this.head = new DataNode()
        let node = new DataNode(key, data)

        this.head.next = node

        while(coinFlip()) {
            const newHead = new DataNode()
            const topNode = new DataNode(key, data)
            topNode.down = node
            newHead.next = topNode
            node = topNode
            this.head = newHead
        }
    }

    insert(key, data) {
        if (this.head) {
            const node = this.findNode(key)
            if (node) {
                let curNode = node.next
                while (curNode && curNode.key === key) {
                    curNode.data = data
                    curNode = curNode.down
                }
            } else {
                this.insertItem(key, data)
            }
        } else {
            this.bootstrapBaseLayer(key, data)
        } 
    }

    findNode(key) {
        let curNode = this.head

        while (curNode) {
            const nextNode = curNode.next
            if (nextNode) {
                if (nextNode.key === key) {
                    return curNode
                } else if (nextNode.key > key) {
                    curNode = curNode.down
                } else {
                    curNode = curNode.next
                }
            } else {
                curNode = curNode.down
            }
        }

        return null
    }

    search(key) {
        const node = this.findNode(key)
        if (!node) return null
        return node.next.data
    }

    get(key) {
        return this.search(key)
    }

    remove(key) {
        let curNode = this.findNode(key)
        if (!curNode) return
        while (curNode) {
            const node = curNode.next
            if (node.key != key) {
                curNode = node
                continue
            }
            const nextNode = node.next
            curNode.next = nextNode
            curNode = curNode.down
        }
    }

    print() {
        console.log('---------------------------------------')
        let curHead = this.head
        while(curHead) {
            let node = curHead.next
            let layer = ''
            while (node) {
                layer += `-> [${node.key}:${node.data}]`
                node = node.next
            }
            console.log(layer)
            curHead = curHead.down
        }
    }
}


const skiplist = new SkipList()
skiplist.insert(1, 'hello')
skiplist.insert(2, 'world')
skiplist.insert(3, 'chris')
skiplist.insert(4, 'liuliu')
skiplist.print()
console.log(skiplist.get(1))
console.log(skiplist.get(2))

skiplist.remove(2)
skiplist.print()

skiplist.insert(1, 'hi')
skiplist.insert(9, 'bar')
skiplist.insert(6, 'foo')
skiplist.print()
function LinkedList() {
    this.head = null
    this.tail = null
}

function Node(val) {
    this.prev = null
    this.next = null
    this.val = val
}

LinkedList.prototype.insertAfter = function(node, nextNode) {
    if (!node || !nextNode) return
    const q = node.next
    nextNode.prev = node
    nextNode.next = q
    node.next = nextNode
    if (q) q.prev = nextNode
    if (node == this.tail) {
        this.tail = nextNode
    }
}

LinkedList.prototype.insertBefore = function(node, prevNode) {
    if (!node || !prevNode) return
    const p = node.prev
    if (p) p.next = prevNode
    prevNode.prev = p
    prevNode.next = node
    node.prev = prevNode

    if (node == this.head) {
        this.head = prevNode
    }
}

LinkedList.prototype.remove = function(node) {
    if (!node) return
    const p = node.prev
    const q = node.next
    if (p) p.next = q
    if (q) q.prev = p
    if (node == this.head) {
        this.head = q
    }
    if (node == this.tail) {
        this.tail = p
    }

    return node
}

LinkedList.prototype.insertHead = function(node) {
    if (!this.head) {
        this.head = node
    } else {
        node.next = this.head
        this.head.prev = node
        this.head = node
    }

    if (!this.tail) {
        this.tail = node
    }
}

LinkedList.prototype.insertTail = function(node) {
    if (!this.tail) {
        this.tail = node
    } else {
        node.prev = this.tail
        this.tail.next = node
        this.tail = node
    }

    if (!this.head) {
        this.head = node
    }
}

LinkedList.prototype[Symbol.iterator] = function* () {
    let p = this.head
    while(p) {
        yield p.val
        p = p.next
    }
}

LinkedList.prototype.print = function() {
    let p = this.head
    let chain = ''
    for (const val of this) {
        chain += '->' + val.toString()
    }
    console.log(chain)
}


LinkedList.prototype.unshfit = function(val) {
    const node = new Node(val)
    this.insertHead(node)
}

LinkedList.prototype.shift = function() {
    if (!this.head) return
    this.remove(this.head)
}

LinkedList.prototype.push = function(val) {
    const node = new Node(val)
    this.insertTail(node)
}

LinkedList.prototype.pop = function() {
    if (!this.tail) return
    this.remove(this.tail)
}

Object.defineProperty(LinkedList.prototype, 'length', {
    get() {
        let cnt = 0
        for (let a of this) cnt++
        return cnt
    }
})

LinkedList.prototype.filter = function(cb) {
    const ret = []
    let idx = 0
    for (let a of this) {
        if (cb(a, idx++, this)) ret.push(a)
    }
    return ret
}

LinkedList.prototype.map = function(cb) {
    const ret = []
    let idx = 0
    for (let a of this) {
        ret.push(cb(a, idx++, this))
    }
    return ret
}


LinkedList.prototype.toArray = function() {
    const ret = []
    for (let a of this) {
        ret.push(a)
    }
    return ret
}

LinkedList.prototype.reduce = function(cb, initval) {
    let acc = initval
    let idx = 0
    for (let a of this) {
        acc = cb(acc, a, idx++, this)
    }
    return acc
}


LinkedList.prototype.reduceRight = function(cb, initval) {
    let acc = initval
    let p = this.tail
    let idx = this.length
    while (p) {
        acc = cb(acc, p.val, idx, this)
        p = p.prev
        idx--
    }
    return acc
}


LinkedList.prototype.indexOf = function(val) {
    let ret = -1
    let idx = 0 
    for (let a of this) {
        if (a === val) return idx
        idx++
    }
    return ret
}

LinkedList.prototype.includes = function(val) {
    return this.indexOf(val) >= 0
}

LinkedList.prototype.some = function(cb) {
    let idx = 0
    for (let a of this) {
        if (cb(a, idx, this)) return true
        idx++
    }

    return false
}

LinkedList.prototype.every = function(cb) {
    return !this.some(function(e, idx, list) {
       return !cb(e, idx, list) 
    })
}

LinkedList.prototype.forEach = function(cb) {
    let idx = 0
    for (let a of this) {
        cb(a, idx, this)
        idx++
    }
}


LinkedList.prototype.reverse = function() {
    let p = this.head
    let t = null
    while (p) {
        const q = p.next
        if (t) {
            t.prev = p
        }
        p.next = t
        p.prev = null
        t = p
        p  = q
    }

    p = this.tail
    this.tail = this.head
    this.head = p
    return this
}

/*
*test
*/

const list = new LinkedList()
list.push(1)
list.unshfit(2)
list.push(3)
list.unshfit(4)
list.unshfit(9)
list.push(10)
list.print()
list.reverse().print()
console.log(list.length)

console.log(list.filter((e, idx) => {
    return e % 2 == 0 && idx % 2 == 1
}))

console.log(list.map(e => {
    return e ** 2
}))

console.log(list.toArray())

console.log(list.reduce((acc, e) => {
    return acc + e
}, 0))

console.log(list.reduceRight((acc, e) => {
    return acc + e
}, 0))

console.log(list.indexOf(1))

console.log(list.includes(5))

console.log(list.some(e => e === 9))

console.log(list.every(e => e < 3))

list.forEach(e => {
    console.log(e)
})

class Stack {
    constructor() {
        this.array = []
    }

    get isEmpty() {
        return this.array.length <= 0
    }

    get count() {
        return this.array.length
    }

    pop(e) {
        return this.array.pop()
    }

    push(e) {
        this.array.push(e)
    }
    
    peek() {
        return this.array[this.array.length - 1]
    }
}


module.exports = Stack
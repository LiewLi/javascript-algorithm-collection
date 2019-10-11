function Test() {
    this.arr = [4, 2, 1]
}

Test.prototype.foo = function() {
    const size = this.arr.length
    const idx = 1
    [this.arr[size-1], this.arr[idx]] = [this.arr[idx], this.arr[size-1]]
    console.log(this.arr)
}

const t = new Test()
t.foo()
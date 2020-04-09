const {SplayTree, Node} = require("../splay")

test('splay tree test', () => {
const t = new SplayTree();

const a = new Node(10);
const b = new Node(20);
const c = new Node(30);
const d = new Node(100);
const e = new Node(90);
const f = new Node(40);
const g = new Node(50);
const h = new Node(60);
const i = new Node(70);
const j = new Node(80);
const k = new Node(150);
const l = new Node(110);
const m = new Node(120);

t.insert(a);
t.insert(b);
t.insert(c);

expect(t.root).toEqual(c)

t.insert(d);
t.insert(e);
t.insert(f);
t.insert(g);
t.insert(h);

expect(t.root).toEqual(h)

t.insert(i);
t.insert(j);
t.insert(k);
t.insert(l);
t.insert(m);

expect(t.root).toEqual(m)

t.delete(a);
t.delete(m);

let idx = 0
t.inorder(t.root, (n) => {
  if (idx == 0) expect(n.data).toEqual(b.data)
  idx++
});
})

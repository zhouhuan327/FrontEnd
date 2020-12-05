// 顺序存储的完全二叉树
// 左节点为i*2=1，有节点为i*2+2

const completeBinTree = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const traverse = (tree, fn) => {
  const t = (tree, i, fn) => {
    if (!tree[i]) return;
    t(tree, i * 2 + 1, fn);
    fn(tree[i]);
    t(tree, i * 2 + 2, fn);
  };
  t(tree, 0, fn);
};
const res = [];
traverse(completeBinTree, (a) => res.push(a));
console.log(res);

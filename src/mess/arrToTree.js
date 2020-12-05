const array = [
  { id: 9, name: "前端基础设施组", parent: 8 },
  { id: 10, name: "前端业务组", parent: 8 },
  { id: 7, name: "后端开发部门", parent: 5 },
  { id: 8, name: "前端开发部门", parent: 5 },
  { id: 1, name: "CEO", parent: null },
  { id: 2, name: "运营部", parent: 1 },
  { id: 3, name: "财务部", parent: 1 },
  { id: 4, name: "人事部", parent: 1 },
  { id: 5, name: "技术部", parent: 1 },
  { id: 6, name: "产品部", parent: 1 },
]; // 试试把顺序打乱，看看影响结果不

const array2tree = (arr) => {
  const tree = {};
  const queue = [...arr]; // 浅拷贝一下，防止不小心篡改输入数据
  while (queue.length > 0) {
    const item = queue.shift(); // 弹出一个节点
    if (insert(tree, item)) {
      // 尝试插入
      console.log(`插入成功 ${item.name}`);
    } else {
      console.log(`插入失败，放到队尾 ${item.name}，继续看下一个`);
      queue.push(item);
      // 如果数据有问题，这里可能会有死循环
    }
  }
  return tree;
};
const insert = (tree, item) => {
  if (tree.parent === null) {
    const head = createNode(item);
    Object.assign(tree, head);
    return true;
  }
  const parentNode = findNodeById(tree, item.parent);
  if (parentNode) {
    parentNode.children.push(createNode(item));
    return true;
  } else {
    return false;
  }
};
const findNodeById = (tree, id) => {
  if (tree.id === id) {
    return tree;
  }
  if (tree.children) {
    tree.children.forEach((node) => {
      const res = findNodeById(node, id);
      if (res) return true;
    });
    return null;
  } else {
    return null;
  }
};
const createNode = (item) => {
  return {
    ...item,
    children: [],
  };
};

console.log(array2tree(array));

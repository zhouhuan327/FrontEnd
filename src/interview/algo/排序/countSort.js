// 计数排序
// 时间复杂度 O(n + max)

const countSort = (arr) => {
  if (arr.length <= 1) return arr;
  const table = {};
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    table[item] = table[item] === undefined ? 1 : table[item] + 1;
    if (item > max) max = item;
  }
  const res = [];
  for (let i = 0; i <= max; i++) {
    if (table[i] !== undefined) {
      // i 为存在的值，k为出现的次数
      for (let k = 0; k < table[i]; k++) {
        res.push(i);
      }
    }
  }
  return res;
};

require("./sortTest").testSort(countSort);

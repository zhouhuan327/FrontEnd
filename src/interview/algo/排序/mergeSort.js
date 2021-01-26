// 归并排序
const merge = (left, right) => {
  let i = 0,
    j = 0;
  let res = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i++]);
    } else {
      res.push(right[j++]);
    }
  }
  if (i === left.length) {
    res = res.concat(right.slice(j));
  } else {
    res = res.concat(left.slice(i));
  }
  return res;
};
const sort = (arr) => {
  if (arr.length <= 1) return arr;
  const middle = arr.length / 2;
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(sort(left), sort(right));
};

require("./sortTest").testSort(sort);

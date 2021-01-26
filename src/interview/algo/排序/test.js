var readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
var inputs = [];
rl.on("line", function (line) {
  //trim()去除字符串两边的空白,line表示一行输入，最终得到的inputs数组的每一个元素表示一行输入。
  inputs.push(line.trim());
  if (inputs[1]) {
    const arr = inputs[1].split(" ").map((item) => parseInt(item, 10));
    console.log(quickSort(arr).join(" "));
  }
});
var t1 = process.uptime() * 1000;
// 快速排序
const _quickSort = (arr, left, right) => {
  if (left >= right) return arr;
  // 基准值取中间
  const pivot = arr[(left + right) >> 1];
  let i = left - 1,
    j = right + 1;
  while (i < j) {
    // 这里用不用while是因为如果出现两个相同的值会死循环
    while (arr[++i] < pivot);
    while (arr[--j] > pivot);
    if (i < j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  _quickSort(arr, left, j);
  _quickSort(arr, j + 1, right);
  return arr;
};
const quickSort = (arr) => _quickSort(arr, 0, arr.length - 1);

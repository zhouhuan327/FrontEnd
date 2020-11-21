// 快速排序
const swap = (arr, a, b) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};
const handlePivot = (arr, start, end) => {
  if (end - start <= 0) return -1;
  if (end - start == 1) return 0;
  // 随机找一个基准值，与start交换位置
  const ramdomIndex = parseInt(Math.random() * (end - start) + start);
  swap(arr[start], arr[ramdomIndex]);
  let pivot = arr[start];
  let smallEnd = start;
  let bigStart = end;
  let i = start + 1;
  while (bigStart - smallEnd > 1) {
    if (arr[i] >= pivot) {
      bigStart--;
      swap(arr, i, bigStart);
      // 把大于基准的数弄到大数组的最后
    } else {
      smallEnd++;
      swap(arr, i, smallEnd);
      i++;
    }
  }
  //交换基准和小数组的最后一位n这样基准的左边都比他小，右边都比他大
  swap(arr, start, smallEnd);
  return smallEnd;
};
const _quickSort = (arr, start, end) => {
  if (end - start <= 1) return arr;
  const pivot = handlePivot(arr, start, end);
  _quickSort(arr, start, pivot);
  _quickSort(arr, pivot + 1, end);
  return arr;
};
const quickSort = (arr) => _quickSort(arr, 0, arr.length);

console.log(quickSort([1, 2, 9, 4, 10, 20, 12]));
// [1, 2, 4, 9, 10, 12, 20]
console.log(quickSort([11, 2, 39, 24, 1, 2, 9]));
//  [1, 2, 2, 9, 11, 24, 39]
console.log(quickSort([]));
// []
console.log(quickSort([1, 1, 1, 1, 1]));
// [1, 1, 1, 1, 1]

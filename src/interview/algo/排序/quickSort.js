// 快速排序
const _quickSort = (arr, left, right) => {
  if (left >= right) return arr;
  // 基准值取中间
  const pivot = arr[(left + right) >> 1];
  let i = left - 1,
    j = right + 1;
  while (i < j) {
    // 这里用不用while是因为如果出现两个相同的值会死循环
    do { i++ } while (arr[i] < pivot);
    do { j-- } while (arr[j] > pivot);
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

require("./sortTest").testSort(quickSort);

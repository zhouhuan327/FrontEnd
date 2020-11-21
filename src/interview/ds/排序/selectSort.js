// 选择排序
const selectSort = (arr) => {
  if (arr.length <= 1) return arr;
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    // const temp = arr[minIndex];
    // arr[minIndex] = arr[i];
    // arr[i] = temp;
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};
console.log(selectSort([]));

console.log(selectSort([2, 1, 7, 3, 4, 5, 4]));

console.log(selectSort([11, 11, 11]));

// 二分 查找
const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = parseInt((end - start) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (target < arr[mid]) {
      end = mid - 1;
    } else if (target > arr[mid]) {
      start = mid + 1;
    }
  }
  return -1;
};

console.log(binarySearch([1, 2, 3, 4, 5], 1));

// 插入排序
const insertSort = (arr) => {
  if (arr.length <= 1) return arr;
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      // 往前找比temp大的数字，往后挪
      if (arr[j] > temp) {
        arr[j + 1] = arr[j];
      } else if (arr[j] <= temp) {
        break;
      }
    }
    arr[j + 1] = temp;
  }
  return arr;
};

require("./sortTest").testSort(insertSort);

const unique = (arr) => {
  let map = new Map();
  let ans = [];
  arr.forEach((item, index) => {
    if (!map.has(item)) {
      map.set(item, index);
      ans.push(item);
    }
  });
  return ans;
};
// filter
const unique2 = (arr) =>
  arr.filter((item, index, array) => array.indexOf(item) === index);

//set
const unique3 = (arr) => [...new Set(arr)];
let unique4 = (arr) =>
  arr.reduce((pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]), []);
var array = [
  1,
  1,
  '1',
  '1',
  null,
  null,
  undefined,
  undefined,
  new String('1'),
  new String('1'),
  /a/,
  /a/,
  NaN,
  NaN,
];
console.log(unique4(array));

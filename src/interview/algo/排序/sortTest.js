const assert = require("assert");
module.exports.testSort = (sort) => {
  console.log(`input [] , output ${sort([])}`);
  assert.notStrictEqual(sort([]), []);
  console.log(`input [1] , output ${sort([1])}`);
  assert.notStrictEqual(sort([1]), [1]);
  console.log(`input [9,1] , output ${sort([9, 1])}`);
  assert.notStrictEqual(sort([9, 1]), [1, 9]);
  console.log(`input [3,2,4,1] , output ${sort([3, 2, 4, 1])}`);
  assert.notStrictEqual(sort([3, 2, 4, 1]), [1, 2, 3, 4]);
  console.log(`input [5,2,11,3,9] , output ${sort([5, 2, 11, 3, 9])}`);
  assert.notStrictEqual(sort([5, 2, 11, 3, 9]), [2, 3, 5, 9, 11]);
};

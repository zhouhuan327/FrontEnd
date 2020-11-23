// 1 1 2 3 5 8
// 递归的方式
function fib(n) {
  return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
}

// 优化1 - 缓存
function memorize(f) {
  const cache = {};
  return function (first, ...args) {
    if (!(first in cache)) {
      cache[first] = f(first, ...args);
    }
    return cache[first];
  };
}
// const memo_fib = memorize(fib);
// console.log(fib(5));
//console.log(memo_fib(43));
// 优化2 - 尾递归
function fib2(n, a1, a2) {
  return n === 0 ? a1 : fib2(n - 1, a2, a1 + a2);
}
// console.log(fib2(5, 1, 1));
// F(5,1,1)=F(4,1,2)=F(3,2,3)=F(2,3,5)=F(1,5,8)=F(0,8,13)

// 当柯里化后的函数接收到足够的参数后，就会开始执行原函数。
//而如果接收到的参数不足的话，就会返回一个新的函数，用来接收余下的参数
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
const add = (a, b) => a + b;
const curriedAdd = curry(add);
console.log(curriedAdd(1));
console.log(curriedAdd(1)(2));

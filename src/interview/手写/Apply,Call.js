Function.prototype.myApply = function (...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let [context, params] = args;
  context = context || window;
  context.fn = this;
  const result = params ? context.fn(...params) : context.fn();
  delete context.fn;
  return result;
};
Function.prototype.myCall = function (...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let [context, ...params] = args;
  context = context || window;
  context.fn = this;
  const result = context.fn(...params);
  delete context.fn;
  return result;
};

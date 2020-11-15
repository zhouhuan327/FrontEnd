function compose(...funcs) {
  return function (x) {
    return funcs.reduce((acc, fn) => {
      return fn(acc);
    }, x);
  };
}

function upperCase(input) {
  return input && typeof input === "string" ? input.toUpperCase() : input;
}

function trim(input) {
  return typeof input === "string" ? input.trim() : input;
}

const composedFunc = compose(trim, upperCase);

console.log(composedFunc("  a b cdf   df  "));

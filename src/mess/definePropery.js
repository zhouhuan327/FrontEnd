var obj = {
  a: 1,
  b: 2,
  c: 3,
};

Object.defineProperty(obj, "a", {
  get() {
    console.log("get");
  },
  set(newv) {
    return newv;
  },
});
obj.a = "f";
for (let key in obj) {
  console.log(obj[key]);
}

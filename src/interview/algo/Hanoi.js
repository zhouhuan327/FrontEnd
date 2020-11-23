function Hanoi(n, from, cache, to) {
  if (n === 1) {
    return `${from}${to}`;
  } else {
    return (
      Hanoi(n - 1, from, to, cache) +
      "," +
      `${from}${to},` +
      Hanoi(n - 1, cache, from, to)
    );
  }
}
console.log(Hanoi(4, "A", "B", "C"));

function myinstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while (true) {
        if (left === null || left === undefined) {
            return false
        }
        if (left === prototype) {
            return true
        }
        left = left.__proto__
    }
}
console.log(myinstanceof([], Array))

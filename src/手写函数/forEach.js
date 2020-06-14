function myForEach(callback) {
    var arr = this
    for (let i = 0; i < arr.length; i++) {
        callback.call(arr, arr[i], i)
    }
}
Array.prototype.myForEach = myForEach

const arr = [1, 2, 3];
arr.myForEach(function () { console.log(this) })
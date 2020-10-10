// 数组扁平化


const flat1 = arr => {
    return arr.reduce((acc,val) => {
        if(Array.isArray(val)) {
            return acc.concat(flat1(val))
        } else {
            return acc.concat(val)
        }
    },[])
}

const flat2 = arr => arr.reduce((acc,val) => acc.concat(Array.isArray(val) ? flat(val) : val),[])



const flat3 = arr => {
    let res = []
    arr.forEach(item => {
        if(Array.isArray(item)) {
            res = res.concat(flat3(item))
        } else {
            res.push(item)
        }
    })
    return res 
}

var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
console.log(flat3(arr1))
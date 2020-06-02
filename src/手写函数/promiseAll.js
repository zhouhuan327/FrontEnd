function promiseAll(list) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(list)) {
            reject('arguments must be array')
        }
        let count = 0
        let res = []
        list.forEach(p => {
            Promise.resolve(p).then(value => {
                res.push(value)
                count++
                if (count === list.length) {
                    resolve(res)
                }
            }).catch(error => reject(error))
        })
    })
}

promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then(res => {
    console.log(res)
})



// open hide 
var hideBar = document.querySelectorAll('.hide-div')
hideBar.forEach(item => item.style.display = 'block')

var clickList = document.querySelectorAll('.res-row-open-enable')
const res = Array.from(clickList).filter(item => {
    const filename = item.querySelector('.res-name').innerHTML
    const compelete = item.querySelector('span[data-is-drag="N"]')
    if (filename.includes('.mp4') && compelete) return true
    return false
})
async function fn() {
    const close = document.querySelector('.close-window')
    for (let i = 0; i < res.length; i++) {
        await new Promise(resolve => {
            res[i].click()
            const watchTo = document.querySelector('.video-watch-to')
            const currentTime = document.querySelector('.video-current-time')
            const call = () => {
                console.log(watchTo.style.width)
                if (currentTime.style.width === `100%` || watchTo.style.width === `100%`) {
                    close.click()
                    resolve()
                }
                else {
                    setTimeout(call, 1000)
                }
            }
            setTimeout(call, 1000)
        })
    }
}
fn()

// 视频
// const pause = document.querySelector('.mejs__controls button[title="Play"]')
// pause.click()
// const watchTo = document.querySelector('.video-watch-to')
// const ct = document.querySelector('.video-current-time')
// watchTo.style.width = `100%`
// ct.style.width = `100%`
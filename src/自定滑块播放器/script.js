const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const tiemstamp = document.getElementById('timestamp')

//点击播放
const toggleVides = () => {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}
//图标更新
const updatePlayIcon = () => {
    if (video.paused) {
        play.innerHTML = '<i class = "fa fa-play fa-1x"></i>'
    } else {
        play.innerHTML = '<i class = "fa fa-pause fa-1x"></i>'
    }
}
// 更新进度条
const updateProgress = () => {
    const currentTime = video.currentTime
    console.log(currentTime)
    const duration = video.duration
    progress.value = (currentTime / duration) * 100
    // 获取分钟数
    let mins = Math.floor(currentTime / 60)
    if (mins < 10) {
        mins = "0" + String(mins)
    }
    let secs = Math.floor(currentTime % 60)
    if (secs < 10) {
        secs = "0" + String(secs)
    }
    tiemstamp.innerHTML = `${mins}:${secs}`
}
// 停止视频 还原
const stopVideo = () => {
    video.currentTime = 0
    video.pause
}
const setProgress = () => {
    video.currentTime = +progress.value * video.duration / 100
}
video.addEventListener('click', toggleVides)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVides)
stop.addEventListener('click', stopVideo)
progress.addEventListener('change', setProgress)

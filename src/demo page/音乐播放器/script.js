// 获取节点
const musicContainer = document.getElementById("container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ['hey', 'summer', 'ukulele']

//歌曲下标
let songIndex = 1;

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `./assets/${song}.mp3`
    cover.src = `./assets/${song}.jpg`
}

playBtn.addEventListener('click', e => {
    if (musicContainer.classList.contains('play')) {
        pauseSong()
    } else {
        playSong()
    }

})
prevBtn.addEventListener('click', e => prevSong())
nextBtn.addEventListener('click', e => nextSong())
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}


// 进度条
audio.addEventListener('timeupdate', updateProgress)

function updateProgress(e) {
    // 总时长 和 当前时间
    const { duration, currentTime } = e.target
    const progressPrecent = (currentTime / duration) * 100
    progress.style.width = `${progressPrecent}%`
}

progressContainer.addEventListener('click', e => {
    const width = e.target.clientWidth
    const clickWidth = e.offsetX
    const duration = audio.duration
    console.log(width, clickWidth, duration)
    audio.currentTime = (clickWidth / width) * duration
})

//播放结束 自动切换
audio.addEventListener('ended', nextSong)
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let score = 0


//小球
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4, //移动速度
    dx: 4,
    dy: -4
}
//挡板
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 8,
    dx: 0
}
// 单个方块
const brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}
const bricks = []
for (let i = 0; i < 9; i++) {
    bricks[i] = []
    for (let j = 0; j < 5; j++) {
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = { x, y, ...brickInfo }
    }
}



draw()

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

// 绘制小球
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = "#0095dd"
    ctx.fill()
    ctx.closePath()
}
// 绘制挡板
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.fillStyle = "#0095dd"
    ctx.fill()
    ctx.closePath()
}
// 绘制得分
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`得分${score}`, canvas.width - 100, 30)
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.width, brick.height)
            ctx.fillStyle = brick.visible ? '#0095dd' : "transparent"
            ctx.fill()
            ctx.closePath()
        })
    })
}
//移动挡板动画
function movePaddle() {
    paddle.x += paddle.dx
    //设置边界
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width
    }
    if (paddle.x < 0) {
        paddle.x = 0
    }
    //事件监听
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            paddle.dx = paddle.speed
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            paddle.dx = -paddle.speed
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            paddle.dx = 0
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            paddle.dx = 0
        }
    })
}
// 移动小球
function moveBall() {
    ball.x += ball.dx
    ball.y += ball.dy

    //撞击左右边界
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }
    //撞击上下
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    //撞击挡板
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.width &&
        ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed
    }

    //撞击砖块
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x && //左侧
                    ball.x + ball.size < brick.x + brick.width &&//右侧
                    ball.y + ball.size > brick.y &&//顶部
                    ball.y - ball.size < brick.y + brick.height //底部
                ) {
                    ball.dy *= -1
                    brick.visible = false
                    increaseSource()
                }
            }
        })
    })
    if (ball.y + ball.size > canvas.height) {
        bricks.forEach(column => {
            column.forEach(brick => {
                brick.visible = true
            })
        })
        score = 0
    }
}

function increaseSource() {
    score++
    if (score % (5 * 9) === 0) {
        bricks.forEach(column => {
            column.forEach(brick => {
                brick.visible = true
            })
        })
        score = 0
    }

}
//绘制动画
function update() {

    movePaddle()
    moveBall()

    draw()

    requestAnimationFrame(update)

}

update()
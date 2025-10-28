let isAnimating = false
const BALLS_INIT_SIZE = 100
const BALLS_INIT_COLOR = 'red'

function onBallClick(elBall, maxDiameter) {
    if (isAnimating) return
    isAnimating = true

    var currSize = parseInt(getComputedStyle(elBall).width)
    var randomSize = getRandomNumInclusive(20, 60)
    var randomColor = getRandomColor()

    currSize += randomSize

    if (currSize >= maxDiameter) currSize = BALLS_INIT_SIZE

    elBall.style.width = currSize + 'px'
    elBall.style.height = currSize + 'px'
    elBall.style.backgroundColor = randomColor

    elBall.textContent = currSize

    setTimeout(() => {
        isAnimating = false
    }, 500)
}

function onSwapBallsProperties() {
    var elBalls = document.querySelectorAll('.balls > .ball')
    var ball1 = elBalls[0]
    var ball2 = elBalls[1]
    var ball1Size = parseInt(getComputedStyle(ball1).width)
    var ball1Color = ball1.style.backgroundColor

    ball1.style.width = parseInt(getComputedStyle(ball2).width) + 'px'
    ball1.style.height = parseInt(getComputedStyle(ball2).width) + 'px'
    ball2.style.width = ball1Size + 'px'
    ball2.style.height = ball1Size + 'px'

    ball1.style.backgroundColor = ball2.style.backgroundColor
    ball2.style.backgroundColor = ball1Color
    ball1.innerText = parseInt(ball1.style.width)
    ball2.innerText = ball1Size
}

function onChangeBGColor() {
    var randomColor = getRandomColor()
    document.body.style.backgroundColor = randomColor
}

function onReduceBallsDiameter() {
    if (isAnimating) return
    isAnimating = true

    var elBalls = document.querySelectorAll('.balls > .ball')

    elBalls.forEach((ball) => {
        var currSize = parseInt(getComputedStyle(ball).width)
        var reduceBy = getRandomNumInclusive(20, 60)
        var newSize = Math.max(BALLS_INIT_SIZE, currSize - reduceBy)
        ball.style.width = newSize + 'px'
        ball.style.height = newSize + 'px'
        ball.innerText = newSize
    })
    setTimeout(() => {
        isAnimating = false
    }, 500)
}

function onResetGame() {
    var elBalls = document.querySelectorAll('.balls > .ball')

    elBalls.forEach((ball) => {
        ball.style.width = BALLS_INIT_SIZE + 'px'
        ball.style.height = BALLS_INIT_SIZE + 'px'
        ball.style.backgroundColor = BALLS_INIT_COLOR
        ball.innerText = BALLS_INIT_SIZE
    })
}

let isAnimating = false

function onBallClick(elBall, maxDiameter) {
    if (isAnimating) return
    isAnimating = true

    var currSize = parseInt(getComputedStyle(elBall).width)
    var randomSize = getRandomNumInclusive(20, 60)
    var randomColor = getRandomColor()

    currSize += randomSize

    if (currSize >= maxDiameter) currSize = 100

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

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

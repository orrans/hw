let isAnimating = false

function onBallClick(elBall) {
    if (isAnimating) return
    isAnimating = true

    var currSize = parseInt(getComputedStyle(elBall).width)
    // currSize = currSize >= 400 ? 100 : currSize + 50
    var randomSize = getRandomNumInclusive(20, 60)
    var randomColor = getRandomColor()

    currSize += randomSize

    if (currSize >= 400) currSize = 100

    elBall.style.width = currSize + 'px'
    elBall.style.height = currSize + 'px'
    elBall.style.backgroundColor = randomColor

    elBall.textContent = currSize
    

    setTimeout(() => {
        isAnimating = false
    }, 500)
}

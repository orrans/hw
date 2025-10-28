let isAnimating = false

function onBallClick(elBall) {
    if (isAnimating) return
    isAnimating = true

    var currSize = parseInt(getComputedStyle(elBall).width)
    currSize = currSize >= 400 ? 100 : currSize + 50

    elBall.style.width = currSize + 'px'
    elBall.style.height = currSize + 'px'

    elBall.textContent = currSize

    setTimeout(() => {
        isAnimating = false
    }, 500)
}

function onBallClick(elBall) {
    var currSize = parseInt(getComputedStyle(elBall).width)
    currSize += 50

    elBall.style.width = currSize + 'px'
    elBall.style.height = currSize + 'px'

    elBall.textContent = currSize
}

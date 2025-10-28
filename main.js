let isAnimating = false
let hoverTimer
let autoClickInterval
let undoArray = []
let redoArray = []
let actionsCounter
var gTimerInterval
let elTimer = document.querySelector('.timer')

const BALLS_INIT_SIZE = 100
const BALLS_INIT_COLOR = 'red'
const gElBall1 = document.querySelector('.ball1')
const gElBall2 = document.querySelector('.ball2')
const gElBody = document.body
const gElUndoBtn = document.querySelector('.undo')
const gElRedoBtn = document.querySelector('.redo')

function onInit() {
    actionsCounter = 0
    cancelAnimationFrame(gTimerInterval)

    document.title = `Moves: ${actionsCounter}`
    gElBall1.style.width = BALLS_INIT_SIZE + 'px'
    gElBall1.style.height = BALLS_INIT_SIZE + 'px'
    gElBall1.style.backgroundColor = BALLS_INIT_COLOR
    gElBall1.innerText = BALLS_INIT_SIZE

    gElBall2.style.width = BALLS_INIT_SIZE + 'px'
    gElBall2.style.height = BALLS_INIT_SIZE + 'px'
    gElBall2.style.backgroundColor = BALLS_INIT_COLOR
    gElBall2.innerText = BALLS_INIT_SIZE

    saveState(true)
}

function onBallClick(elBall, maxDiameter) {
    if (!gTimerInterval) StartTimer()
    if (isAnimating) return

    actionsCounter++
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

    saveState()

    setTimeout(() => {
        isAnimating = false
    }, 500)
}

function onSwapBallsProperties() {
    if (!gTimerInterval) StartTimer()
    actionsCounter++

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

    saveState()
}

function onChangeBGColor() {
    if (!gTimerInterval) StartTimer()
    actionsCounter++

    var randomColor = getRandomColor()
    document.body.style.backgroundColor = randomColor

    saveState()
}

function onReduceBallsDiameter() {
    if (!gTimerInterval) StartTimer()
    if (isAnimating) return

    actionsCounter++
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

    saveState()

    setTimeout(() => {
        isAnimating = false
    }, 500)
}

function onResetGame() {
    actionsCounter++

    var elBalls = document.querySelectorAll('.balls > .ball')

    elBalls.forEach((ball) => {
        ball.style.width = BALLS_INIT_SIZE + 'px'
        ball.style.height = BALLS_INIT_SIZE + 'px'
        ball.style.backgroundColor = BALLS_INIT_COLOR
        ball.innerText = BALLS_INIT_SIZE
    })
    saveState()
}

function onBall6HoverStart() {
    var elBall = document.querySelector('.ball6')

    hoverTimer = setTimeout(() => {
        elBall.style.backgroundColor = 'white'
        elBall.style.color = 'black'
        autoClickInterval = setInterval(() => {
            const balls = document.querySelectorAll('.balls > .ball')
            if (!gTimerInterval) StartTimer()

            onBallClick(balls[0], 400)
            actionsCounter++

            setTimeout(() => {
                actionsCounter++
                onBallClick(balls[1], 500)
            }, 500)

            setTimeout(() => {
                actionsCounter++
                onSwapBallsProperties()
            }, 1000)

            setTimeout(() => {
                actionsCounter++
                onReduceBallsDiameter()
            }, 1500)
        }, 2000)
    }, 2000)
}

function onBall6HoverEnd() {
    var elBall = document.querySelector('.ball6')

    clearTimeout(hoverTimer)
    clearInterval(autoClickInterval)
    elBall.style.backgroundColor = 'rgb(11, 146, 164)'
    elBall.style.color = 'white'
}

function getGameState() {
    return {
        ball1: {
            backgroundColor: gElBall1.style.backgroundColor,
            text: gElBall1.innerText, // will use it also for the size
        },
        ball2: {
            backgroundColor: gElBall2.style.backgroundColor,
            text: gElBall2.innerText, // will use it also for the size
        },
        body: {
            backgroundColor: gElBody.style.backgroundColor,
        },
    }
}

function applyState(state) {
    gElBall1.style.width = state.ball1.text + 'px'
    gElBall1.style.height = state.ball1.text + 'px'
    gElBall1.style.backgroundColor = state.ball1.backgroundColor
    gElBall1.innerText = state.ball1.text

    gElBall2.style.width = state.ball2.text + 'px'
    gElBall2.style.height = state.ball2.text + 'px'
    gElBall2.style.backgroundColor = state.ball2.backgroundColor
    gElBall2.innerText = state.ball2.text

    gElBody.style.backgroundColor = state.body.backgroundColor
}

function updateButtonStates() {
    gElUndoBtn.disabled = undoArray.length <= 1
    gElRedoBtn.disabled = redoArray.length === 0
}

function saveState(isInit = false) {
    if (!isInit) redoArray = []

    const currentState = getGameState()
    undoArray.push(currentState)

    updateButtonStates()
}

function onUndo() {
    actionsCounter++

    if (undoArray.length <= 1) return

    const currentState = undoArray.pop()
    redoArray.push(currentState)

    const prevState = undoArray[undoArray.length - 1]

    applyState(prevState)
    updateButtonStates()
}

function onRedo() {
    actionsCounter++

    if (redoArray.length === 0) return

    const nextState = redoArray.pop()

    applyState(nextState)

    undoArray.push(nextState)
    updateButtonStates()
}

function StartTimer() {
    const startTime = performance.now()

    function updateTimer(currentTime) {
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000 + 1)
        elTimer.innerText = elapsedSeconds
        document.title = `Moves: ${actionsCounter}`

        gTimerInterval = requestAnimationFrame(updateTimer)
    }

    gTimerInterval = requestAnimationFrame(updateTimer)
}

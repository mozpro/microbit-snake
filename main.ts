let index4 = 0
let checkY = 0
let checkX = 0
let fStop = false
let score = 0
let py = 0
let px = 0
let preDy = 0
let preDx = 0
let isSouth = false
let isNorth = false
let isWest = false
let isEast = false
let acc_y = 0
let acc_x = 0
let dx = 0
let snakeY: number[] = []
let snakeX: number[] = []
snakeX.insertAt(0, 2)
snakeY.insertAt(0, 4)
let foodX = randint(0, 4)
let foodY = randint(0, 4)
led.plotBrightness(foodX, foodY, 21)
let dy = -1
let timeDelayGame = 800
let levelGame = 1
basic.showNumber(levelGame)
basic.forever(function () {
    let index: number;
let index2: number;
let index3: number;
if (snakeX.length == 20) {
        basic.pause(2000)
        snakeX = [2]
        snakeY = [4]
        foodX = randint(0, 4)
        foodY = randint(0, 4)
        dx = 0
        dy = -1
        timeDelayGame = timeDelayGame - 200
        if (timeDelayGame < 200) {
            timeDelayGame = 200
        }
        levelGame = levelGame + 1
        basic.showNumber(levelGame)
        basic.clearScreen()
    }
    acc_x = input.acceleration(Dimension.X)
    acc_y = input.acceleration(Dimension.Y)
    isEast = acc_x > 256
    isWest = acc_x < -256
    isNorth = acc_y < -256
    isSouth = acc_y > 256
    preDx = dx
    preDy = dy
    if (isEast) {
        dx = 1
        dy = 0
    } else if (isNorth) {
        dx = 0
        dy = -1
    } else if (isSouth) {
        dx = 0
        dy = 1
    } else if (isWest) {
        dx = -1
        dy = 0
    }
    px = snakeX[snakeX.length - 1] + dx
    py = snakeY[snakeX.length - 1] + dy
    if (snakeX.length > 1) {
        if (px == snakeX[snakeX.length - 2] && py == snakeY[snakeY.length - 2]) {
            px = snakeX[snakeX.length - 1] + preDx
            py = snakeY[snakeX.length - 1] + preDy
        }
    }
    if (px == foodX && py == foodY) {
        score = score + 1
        game.setScore(score)
        snakeX.insertAt(snakeX.length, foodX)
        snakeY.insertAt(snakeY.length, foodY)
        // while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
        // foodY = Math.random(5)
        led.plotBrightness(foodX, foodY, 255)
        fStop = false
        while (fStop == false) {
            foodX = randint(0, 4)
            foodY = randint(0, 4)
            fStop = true
            index = 0
            while (index <= snakeX.length - 1) {
                checkX = snakeX[index]
                checkY = snakeY[index]
                if (checkX == foodX && checkY == foodY) {
                    fStop = false
                }
                index += 1
            }
        }
    } else {
        if (px < 0 || px > 4 || (py < 0 || py > 4)) {
            game.gameOver()
        }
        index2 = 0
        while (index2 <= snakeX.length - 2) {
            if (px == snakeX[index2] && py == snakeY[index2]) {
                game.gameOver()
            }
            index2 += 1
        }
        index3 = 0
        while (index3 <= snakeX.length - 2) {
            snakeX[index3] = snakeX[index3 + 1]
            snakeY[index3] = snakeY[index3 + 1]
            index3 += 1
        }
        snakeX[snakeX.length - 1] = px
        snakeY[snakeX.length - 1] = py
    }
    basic.clearScreen()
    while (index4 <= snakeX.length - 1) {
        led.plot(snakeX[index4], snakeY[index4])
        index4 += 1
    }
    // while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
    // foodY = Math.random(5)
    led.plotBrightness(foodX, foodY, 21)
    basic.pause(timeDelayGame)
})

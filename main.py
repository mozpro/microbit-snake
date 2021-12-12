checkY = 0
checkX = 0
fStop = False
score = 0
py = 0
px = 0
preDy = 0
preDx = 0
isSouth = False
isNorth = False
isWest = False
isEast = False
acc_y = 0
acc_x = 0
dx = 0
snakeY: List[number] = []
snakeX: List[number] = []
snakeX.insert_at(0, 2)
snakeY.insert_at(0, 4)
foodX = randint(0, 4)
foodY = randint(0, 4)
led.plot_brightness(foodX, foodY, 21)
dy = -1
timeDelayGame = 800
levelGame = 1
basic.show_number(levelGame)

def on_forever():
    global snakeX, snakeY, foodX, foodY, dx, dy, timeDelayGame, levelGame, acc_x, acc_y, isEast, isWest, isNorth, isSouth, preDx, preDy, px, py, score, fStop, checkX, checkY
    if len(snakeX) == 20:
        basic.pause(2000)
        snakeX = [2]
        snakeY = [4]
        foodX = randint(0, 4)
        foodY = randint(0, 4)
        dx = 0
        dy = -1
        timeDelayGame = timeDelayGame - 200
        if timeDelayGame < 200:
            timeDelayGame = 200
        levelGame = levelGame + 1
        basic.show_number(levelGame)
        basic.clear_screen()
    acc_x = input.acceleration(Dimension.X)
    acc_y = input.acceleration(Dimension.Y)
    isEast = acc_x > 256
    isWest = acc_x < -256
    isNorth = acc_y < -256
    isSouth = acc_y > 256
    preDx = dx
    preDy = dy
    if isEast:
        dx = 1
        dy = 0
    elif isNorth:
        dx = 0
        dy = -1
    elif isSouth:
        dx = 0
        dy = 1
    elif isWest:
        dx = -1
        dy = 0
    px = snakeX[len(snakeX) - 1] + dx
    py = snakeY[len(snakeX) - 1] + dy
    if len(snakeX) > 1:
        if px == snakeX[len(snakeX) - 2] and py == snakeY[len(snakeY) - 2]:
            px = snakeX[len(snakeX) - 1] + preDx
            py = snakeY[len(snakeX) - 1] + preDy
    if px == foodX and py == foodY:
        score = score + 1
        game.set_score(score)
        snakeX.insert_at(len(snakeX), foodX)
        snakeY.insert_at(len(snakeY), foodY)
        # while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
        # foodY = Math.random(5)
        led.plot_brightness(foodX, foodY, 255)
        fStop = False
        while fStop == False:
            foodX = randint(0, 4)
            foodY = randint(0, 4)
            fStop = True
            index = 0
            while index <= len(snakeX) - 1:
                checkX = snakeX[index]
                checkY = snakeY[index]
                if checkX == foodX and checkY == foodY:
                    fStop = False
                index += 1
    else:
        if px < 0 or px > 4 or (py < 0 or py > 4):
            game.game_over()
        index2 = 0
        while index2 <= len(snakeX) - 2:
            if px == snakeX[index2] and py == snakeY[index2]:
                game.game_over()
            index2 += 1
        index3 = 0
        while index3 <= len(snakeX) - 2:
            snakeX[index3] = snakeX[index3 + 1]
            snakeY[index3] = snakeY[index3 + 1]
            index3 += 1
        snakeX[len(snakeX) - 1] = px
        snakeY[len(snakeX) - 1] = py
    basic.clear_screen()
    index4 = 0
    while index4 <= len(snakeX) - 1:
        led.plot(snakeX[index4], snakeY[index4])
        index4 += 1
    # while (1) { foodX = Math.random(5) foodY = Math.random(5) let fStop = false for (let index2 = 0; index2 <= snakeX.length - 1; index2++) { if (foodX != snakeX[index2] && foodY != snakeY[index2]) { fStop = true; break; } if (fStop == true) break; } }foodX = Math.random(5)
    # foodY = Math.random(5)
    led.plot_brightness(foodX, foodY, 21)
    basic.pause(timeDelayGame)
basic.forever(on_forever)

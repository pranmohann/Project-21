var ground, ivisibleGround, groundImage, boy, boy_running, coins, coinsImage;
var jumpSound, dieSound, gameover, gameoverImage, swords, swordsImage;
var score, PLAY = 1, END = 0, gameState = PLAY;

function preload() {
    boy_running = loadAnimation("runner1.png", "runner2.png", "runner3.png", "runner4.png");
    jumpSound = loadSound("jump.wav");
    dieSound = loadSound("die.wav");
    groundImage = loadImage("background.jpg");
    coinsImage = loadImage("coins.png");
    swordsImage = loadImage("sword.png");
    gameoverImage = loadImage("gameOver.png");
}

function setup() {

    // to create canvas
    createCanvas(windowWidth, windowHeight);

    // to create ground
    ground = createSprite(windowWidth / 2, windowHeight / 2, 400, 20);
    ground.addImage(groundImage);
    ground.visible = true;
    ground.velocityX = -10;

    // to make invisible ground
    ivisibleGround = createSprite(20, 580, 400, 20);
    ivisibleGround.visible = false;
    boy = createSprite(50, 580, 20, 50);
    boy.addAnimation("running", boy_running);
    boy.scale = 0.8;
    score = 0;

    // to make gameover
    gameover = createSprite(windowWidth / 2, windowHeight / 2, 20, 20);
    gameover.addImage(gameoverImage);
    gameover.visible = false;

    // to create groups
    coinsGroup = new Group();
    swordsGroup = new Group();
}


function draw() {
    background("white");
    drawSprites();
    textSize(50);
    text("Score:" + score, windowWidth / 2, 50);
    if (gameState === PLAY) {

        // to stop boy from falling down
        boy.collide(ivisibleGround)
        coinsGroup.velocityX = -(4 + 3 * score / 50);
        swordsGroup.setVelocityXEach = -(4 + 3 * score / 200);
        if (keyDown("space")) {
            boy.velocityY = -10;
        }

        // to add gravity
        boy.velocityY = boy.velocityY + 0.5;

        // code to reset the background
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        if (coinsGroup.isTouching(boy)) {
            coinsGroup.destroyEach();
            jumpSound.play();
            score = score + 10;
        }
        if (swordsGroup.isTouching(boy)) {
            dieSound.play();
            ground.velocityX = 0;
            gameState = END;
            boy.destroy();
            coinsGroup.destroyEach();
            swordsGroup.destroyEach();
        }
    } else if (gameState === END) {
        gameover.visible = true;
        coins.destroy();
        coinsGroup.setLifetimeEach(-1);
        swords.destroy();
        swordsGroup.setLifetimeEach(-1);
    }
    spawnCoins();
    spawnSwords();
    
}

function spawnCoins() {
    if (frameCount % 200 === 0) {
        coins = createSprite(windowWidth - 100, 580, 20, 20);
        coins.addImage(coinsImage);
        coinsGroup.add(coins);
        coins.scale = 0.08;
        coins.velocityX = -10;
        coins.y = Math.round(random(400, 580));
    }

}

function spawnSwords() {
    if (frameCount % 300 === 0) {
        swords = createSprite(windowWidth - 100, 580, 20, 20);
        swords.addImage(swordsImage);
        swordsGroup.add(swords);
        swords.scale = 0.1;
        swords.velocityX = -10;
        swords.y = Math.round(random(400, 580));
    }
}

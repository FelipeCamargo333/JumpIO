const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

//Constants
//Dimensions
const width = 1024
const height = 576

//Key detection
const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    e: {
        pressed: false,
    }
}

//Background (Sprite object)
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./images/background.png",
})

//Player object
const player = new Player({
    collisionBlocks: [],
    imageSrc: "./images/toby/idleRight.png",
    frameRate: 8,
    animations: {
        idleRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./images/toby/idleRight.png",
        },
        idleLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./images/toby/idleLeft.png",
        },
        walkRight: {
            frameRate: 8,
            frameBuffer: 3,
            loop: true,
            imageSrc: "./images/toby/walkRight.png",
        },
        walkLeft: {
            frameRate: 8,
            frameBuffer: 3,
            loop: true,
            imageSrc: "./images/toby/walkLeft.png",
        },
        static: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: "./images/toby/character.png",
        },
    },
})

//Manage game loops
let currentLoop
let animationFrameId;
let wasEPressed = false;

//Grid object & collison
const grid = new Grid({width, height})
let collisionBlocks
let gameObjects

async function main() {
    //Aspect Ratio (16X9)
    canvas.width = width
    canvas.height = height

    await loadGridFromServer(grid)
    collisionBlocks = grid.addCollisionBlocks()
    gameObjects = grid.addObjects()
    //saveGridToServer(grid.getRows())

    //Update player
    player.updateCollisions(collisionBlocks)

    //Initial loop
    startLoop(gameLoop)
}

//Game loop
function gameLoop() {
    animationFrameId = window.requestAnimationFrame(currentLoop)

    //Background
    background.draw()

    //Game objects
    gameObjects.forEach((gameObject) => {
        gameObject.draw()
    })

    //Collision
    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.draw()
    // })

    //Player move
    player.velocity.x = 0
    if (keys.d.pressed) {
        player.switchSprite("walkRight")
        player.velocity.x = 5
        player.lastDirection = "right"
    } else if (keys.a.pressed) {
        player.switchSprite("walkLeft")
        player.velocity.x = -5
        player.lastDirection = "left"
    } else {
        if (player.lastDirection === "right") {
            player.switchSprite("idleRight")
        } else {
            player.switchSprite("idleLeft")
        }
    }

    //Player jump
    if(keys.w.pressed && (player.grounded || player.graceTime < player.graceTimeMax)) {
        player.velocity.y = -20
        player.graceTime = player.graceTimeMax;
    }
    player.grounded = false

    //Player
    player.draw()
    player.update()


    //Change loop
    if (keys.e.pressed && !wasEPressed) {
        console.log(player.frameRate)
        console.log("out of game loop")
        startLoop(editLoop)
    }
    wasEPressed = keys.e.pressed
}

function editLoop() {
    animationFrameId = window.requestAnimationFrame(currentLoop)

    //Background
    background.draw()

    //Game objects
    gameObjects.forEach((gameObject) => {
        gameObject.draw()
    })

    //Player
    player.switchSprite("static")
    player.draw()

    //Change loop
    if (keys.e.pressed && !wasEPressed) {
        console.log("out of edit loop")
        startLoop(gameLoop)
    }
    wasEPressed = keys.e.pressed

}

//Start the active loop
function startLoop(loopFunction) {

    //Cancel the previous animation frame to prevent overlap
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }

    //Set the current loop and start the next frame
    currentLoop = loopFunction;
    window.requestAnimationFrame(currentLoop);
}

function saveGridToServer(grid) {
    fetch("/save-grid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grid }),
    })
    .then(response => response.text())
    .then(data => {
        console.log("Save response: ", data)
    })
    .catch(error => {
        console.error("Error saving grid: ", grid)
    })
}

async function loadGridFromServer(grid) {
    try {
        const response = await fetch("/load-grid");
        const data = await response.json();

        const loadedGrid = data.grid;
        console.log("Loaded grid: ", loadedGrid);
        grid.writeRows(loadedGrid);

    } catch (error) {
        console.error("Error loading grid: ", error);
    }
}

main()
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const parsedCollisions = collisionLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectFrom2D()

const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    imageSrc: './img/backgroundLevel1.png'
})

const player = new Player({ 
    collisionBlocks, 
    imageSrc: './img/king/idle.png', 
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            imageSrc: './img/king/idle.png',
            image: new Image()
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            imageSrc: './img/king/idleLeft.png',
            image: new Image()
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            imageSrc: './img/king/runRight.png',
            image: new Image()
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            imageSrc: './img/king/runLeft.png',
            image: new Image()
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            imageSrc: './img/king/enterDoor.png',
            image: new Image(),
            loop: false
        }
    }
})

const doors = [
    new Sprite({
        position: {
            x: 767,
            y: 270
        },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false
    })
]

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    
    backgroundLevel1.draw()
    
    collisionBlocks.forEach(block => {
        block.draw()
    })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)

    player.draw()
    player.update()
}

animate()
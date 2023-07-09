const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const player = new Player({ 
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
            loop: false,
            onComplete: () => {
                console.log('completed animation');
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (level == 4) level = 1

                        levels[level].init()

                        player.switchSprite('idleRight')
                        player.preventInput = false

                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    }
                })
                
            }
        }
    }
})

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

const overlay = {
    opacity: 0
}

let parsedCollisions, collisionBlocks, background, doors

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D()
            player.collisionBlocks = collisionBlocks
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                }, 
                imageSrc: './img/backgroundLevel1.png'
            })

            doors = [
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
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D()
            
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                }, 
                imageSrc: './img/backgroundLevel2.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 770,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D()
            
            player.collisionBlocks = collisionBlocks
            player.position.x = 767
            player.position.y = 212

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                }, 
                imageSrc: './img/backgroundLevel3.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    
    background.draw()
    
    // collisionBlocks.forEach(block => {
    //     block.draw()
    // })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)

    player.draw()
    player.update()

    c.save()
    c.globalAlpha = 0
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()
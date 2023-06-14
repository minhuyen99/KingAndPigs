const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64*16 // 1024
canvas.height = 64*9 // 576

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

// -------------- sprite -------------- //
class Sprite{
	constructor({position, imageSrc}){
		this.position = position;
		this.image = new Image()
		this.image.onload = () => {
			this.loaded = true
		}
		this.image.src = imageSrc

		this.loaded = false;
	}
	draw(){
		if (!this.loaded) return
		c.drawImage(this.image, this.position.x, this.position.y)
	}
}

const backgroundLevel1 = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: './img/backgroundLevel1.png'
})
// -------------- sprite -------------- //






// -------------- collision blocks -------------- //
const collisionsLevel1 = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,292,292,292,292,292,292,292,292,292,292,292,292,292,292,0,
    0,292,0,0,0,0,0,0,0,0,0,0,0,0,292,0,
    0,292,0,0,0,0,0,0,0,0,0,0,0,0,292,0,
    0,292,292,0,0,0,0,0,0,0,0,0,0,0,292,0,
    0,292,292,292,292,292,292,292,292,292,292,292,292,292,292,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]

Array.prototype.parse2D = function (){
    const rows = []
    for (let i = 0; i < this.length; i+=16){
        rows.push(this.slice(i, i+16))
    }
    return rows;
}

Array.prototype.createObjectsFrom2D = function(){
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol == 292){
                // push a new collision into collisionblocks array
                objects.push(new CollisionBlock({
                    position: {
                        x: x*64,
                        y: y*64
                    }
                }))
            }
        })
    });

    return objects;
}

class CollisionBlock{
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()
// -------------- collision blocks -------------- //

// -------------- player -------------- //
class Player {
	constructor({collisionBlocks = []}){
		this.position = { x: 200, y: 200 }
		this.velocity = { x: 0, y: 0 }
		this.width = 25
		this.height = 25
		this.sides = {
			bottom: this.position.y + this.height
		}
		this.gravity = 1

		this.collisionBlocks = collisionBlocks
	}

	draw(){
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}


	checkForHorizontalCollisions(){
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionBlock = this.collisionBlocks[i];
			
			// if the collision exists
			if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
				this.position.x + this.width >= collisionBlock.position.x &&
				this.position.y + this.height >= collisionBlock.position.y &&
				this.position.y <= collisionBlock.position.y + collisionBlock.height
				){
					// collision on x axis going to the left
					if (this.velocity.x < 0){
						this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
						break
					}

					if (this.velocity.x > 0){
						this.position.x = collisionBlock.position.x - this.width - 0.01
						break
					}
			}
		}
	}

	applyGravity(){
		this.velocity.y += this.gravity
		this.position.y += this.velocity.y
	}

	checkForVerticalCollisions(){
		for (let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionBlock = this.collisionBlocks[i];
			
			// if the collision exists
			if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
				this.position.x + this.width >= collisionBlock.position.x &&
				this.position.y + this.height >= collisionBlock.position.y &&
				this.position.y <= collisionBlock.position.y + collisionBlock.height
				){
					// collision on x axis going to the left
					if (this.velocity.y < 0){
						this.velocity.y = 0
						this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
						break
					}

					if (this.velocity.y > 0){
						this.velocity.y = 0
						this.position.y = collisionBlock.position.y - this.height - 0.01
						break
					}
			}
		}
	}

	update(){
		this.position.x += this.velocity.x
		
		// check for horzontal collisions
		this.checkForHorizontalCollisions()

		// apply gravity
		this.applyGravity()

		// check for vertical collisions
		this.checkForVerticalCollisions()
	}
}

const player = new Player({
	collisionBlocks
})
// -------------- player -------------- //

function animate(){
	requestAnimationFrame(animate)

	backgroundLevel1.draw()

	collisionBlocks.forEach(collision => {
		collision.draw()
	})

	player.velocity.x = 0
	if (keys.d.pressed) player.velocity.x = 5
	else if (keys.a.pressed) player.velocity.x = -5

	player.draw()
	player.update()
}

addEventListener('keydown', (event) => {
	switch (event.key){
		case 'w':
		case 'ArrowUp':
			if (player.velocity.y == 0) player.velocity.y = -25
			break
		case 'a':
		case 'ArrowLeft':
			keys.a.pressed = true
			break
		case 'd':
		case 'ArrowRight':
			keys.d.pressed = true
			break
	}
})

addEventListener('keyup', (event) => {
	switch (event.key){
		case 'a':
		case 'ArrowLeft':
			keys.a.pressed = false
			break
		case 'd':
		case 'ArrowRight':
			keys.d.pressed = false
			break
	}
})

animate()

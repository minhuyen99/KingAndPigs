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



// -------------- player -------------- //
class Player {
	constructor(){
		this.position = { x: 100, y: 100 }
		this.velocity = { x: 0, y: 0 }
		this.width = 100
		this.height = 100
		this.sides = {
			bottom: this.position.y + this.height
		}
		this.gravity = 1
	}

	draw(){
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update(){
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x
		this.sides.bottom = this.position.y + this.height

		if (this.sides.bottom + this.velocity.y < canvas.height){
			this.velocity.y += this.gravity
		}
		else this.velocity.y = 0
	}
}

const player = new Player()
// -------------- player -------------- //


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

function animate(){
	requestAnimationFrame(animate)

	backgroundLevel1.draw()

	collisionBlocks.forEach(collision => {
		collision.draw()
	})

	player.velocity.x = 0
	if (keys.d.pressed) player.velocity.x = 1
	else if (keys.a.pressed) player.velocity.x = -1

	player.draw()
	player.update()
}

addEventListener('keydown', (event) => {
	switch (event.key){
		case 'w':
		case 'ArrowUp':
			if (player.velocity.y == 0) player.velocity.y = -20
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

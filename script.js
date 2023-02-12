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

function animate(){
	requestAnimationFrame(animate)
	c.fillStyle = 'white'
	c.fillRect(0, 0, canvas.width, canvas.height)

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

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64*16 // 1024
canvas.height = 64*9 // 576

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
		if (this.sides.bottom + this.velocity.y < canvas.height){
			this.velocity.y += this.gravity
			this.sides.bottom = this.position.y + this.height
		}
		else this.velocity.y = 0
	}
}

const player = new Player()

function animate(){
	requestAnimationFrame(animate)
	c.fillStyle = 'white'
	c.fillRect(0, 0, canvas.width, canvas.height)

	player.draw()
	player.update()
}

animate()

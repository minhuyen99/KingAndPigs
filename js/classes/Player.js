class Player extends Sprite{
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations }){
        super({ imageSrc, frameRate, animations })

        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
    }

    checkForHorizontalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];

            // if a collision exists
            if (this.hitbox.position.x <= block.position.x + block.width &&
                this.hitbox.position.x + this.hitbox.width >= block.position.x &&
                this.hitbox.position.y + this.hitbox.height >= block.position.y &&
                this.hitbox.position.y <= block.position.y + block.height){
                    if (this.velocity.x < 0){
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = block.position.x + block.width - offset + 0.01
                        break
                    }

                    if (this.velocity.x > 0){
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = block.position.x - offset - 0.01
                        break
                    }
            }
        }
    }

    checkForVerticalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];

            // if a collision exists
            if (this.hitbox.position.x <= block.position.x + block.width &&
                this.hitbox.position.x + this.hitbox.width >= block.position.x &&
                this.hitbox.position.y + this.hitbox.height >= block.position.y &&
                this.hitbox.position.y <= block.position.y + block.height){
                    if (this.velocity.y < 0){
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = block.position.y + block.height - offset + 0.01
                        break
                    }

                    if (this.velocity.y > 0){
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = block.position.y - offset - 0.01
                        break
                    }
            }
            
        }
    }

    applyGravity(){
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 50
        }
        // c.fillRect(
        //     this.hitbox.position.x, 
        //     this.hitbox.position.y, 
        //     this.hitbox.width, 
        //     this.hitbox.height
        // )

    }

    switchSprite(name){
        if (this.image == this.animations[name].image) return

        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }

    update(){
        // this is the blue box
        // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.x += this.velocity.x
        
        this.updateHitbox()
        // check for horizontal collisions
        this.checkForHorizontalCollisions()

        // apply gravity
        this.applyGravity()

        this.updateHitbox()
        // check for vertical collisions
        this.checkForVerticalCollisions()
    }
}
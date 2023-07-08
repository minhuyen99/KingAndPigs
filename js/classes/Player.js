class Player extends Sprite{
    constructor({ collisionBlocks = [], imageSrc, frameRate }){
        super({ imageSrc, frameRate })

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
            if (this.position.x <= block.position.x + block.width &&
                this.position.x + this.width >= block.position.x &&
                this.position.y + this.height >= block.position.y &&
                this.position.y <= block.position.y + block.height){
                    if (this.velocity.x < 0){
                        this.position.x = block.position.x + block.width + 0.01
                        break
                    }

                    if (this.velocity.x > 0){
                        this.position.x = block.position.x - this.width - 0.01
                        break
                    }
            }
        }
    }

    checkForVerticalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const block = this.collisionBlocks[i];

            // if a collision exists
            if (this.position.x <= block.position.x + block.width &&
                this.position.x + this.width >= block.position.x &&
                this.position.y + this.height >= block.position.y &&
                this.position.y <= block.position.y + block.height){
                    if (this.velocity.y < 0){
                        this.velocity.y = 0
                        this.position.y = block.position.y + block.height + 0.01
                        break
                    }

                    if (this.velocity.y > 0){
                        this.velocity.y = 0
                        this.position.y = block.position.y - this.height - 0.01
                        break
                    }
            }
            
        }
    }

    applyGravity(){
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    update(){
        // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.x += this.velocity.x
        // check for horizontal collisions
        this.checkForHorizontalCollisions()

        // apply gravity
        this.applyGravity()

        // check for vertical collisions
        this.checkForVerticalCollisions()
    }
}
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
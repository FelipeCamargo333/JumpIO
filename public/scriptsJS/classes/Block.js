class Block {

    constructor ({position}) {
        this.position = position
        this.width = 64
        this.height = 64
        this.type = "Block"
    }

    draw() {
        context.fillStyle = "orange"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
 
}
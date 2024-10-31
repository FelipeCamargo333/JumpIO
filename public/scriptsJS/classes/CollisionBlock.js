class CollisionBlock {

    constructor ({position, width, height, harmful}) {
        this.position = position
        this.width = width
        this.height = height
        this.harmful = harmful
    }

    //debug
    draw() {
        context.fillStyle = "rgba(255, 0, 0, .5)"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
 
}
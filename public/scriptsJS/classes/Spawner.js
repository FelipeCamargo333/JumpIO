class Spawner {

    constructor ({position}) {
        this.position = position
        this.width = 64
        this.height = 64
        this.type = "Spawner"
    }

    //debug
    draw() {
        context.fillStyle = "gray"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
 
}
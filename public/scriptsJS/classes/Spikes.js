class Spikes extends Sprite{

    constructor ({position, imageSrc}) {

        //Call sprite class
        super({ imageSrc})

        this.position = position
        this.width = 64
        this.height = 64
        this.type = "Spikes"
    }
 
}
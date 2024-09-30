class Sprite {
    
    //Sprite properties
    constructor({ position, imageSrc, frameRate = 1, animations }) {

        this.position = position
        
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate //Divide by number of frames
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.loaded = false

        //Frame crop (dynamic) & control
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 4

        //Animations
        this.animations = animations

        //If exists, add image object to all animation objects
        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
        }

    }

    draw() {
        //Make sure image is fully loaded
        if (!this.loaded) {
            return
        }

        //Cropbox determines animation frame
        const cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height,
        }
        context.drawImage(this.image, 
                            cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height,
                            this.position.x, this.position.y, this.width, this.height)
        
        //Change animation frame
        this.updateFrames()
    }

    updateFrames() {
        
        //Accurate frame counter
        this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0) {
            
            //Increase actual aniamtion frame
            this.currentFrame++

            //Loop back to first frame
            if (this.currentFrame >= this.frameRate) {
                this.currentFrame = 0
                this.elapsedFrames = 0
            }
        }
        
    }

}
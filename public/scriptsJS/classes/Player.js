class Player extends Sprite {

    //Player properties
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
        
        //Call sprite class
        super({ imageSrc, frameRate, animations })
        
        this.position = {
            x: 100,
            y: 100,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        //Jump and gravity
        this.gravity = 1
        this.grounded = false
        this.graceTime = 0
        this.graceTimeMax = 5; // Maximum frames the player can jump after falling

        this.collisionBlocks = collisionBlocks

        //States
        this.lastDirection = "right"
        this.died = false
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }

    update() {

        // Update coyote time if player is not grounded
        if (!this.grounded) {
            this.graceTime++;
        } else {
            this.graceTime = 0; // Reset when the player is grounded
        }

        //Horizontal movement
        this.position.x += this.velocity.x
        this.updateHitbox()

        //Check for horizontal collison
        this.checkForHorizontalCollisions()

        //Vertical movement (gravity/jump)
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
        this.updateHitbox()
        
        //render hitbox (debug)
        // context.fillStyle = "rgba(0, 0, 255, .25)"
        // context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        //Check for vertical collision
        this.checkForVerticalCollision()
    }

    updateCollisions(newCollisions) {
        this.collisionBlocks = newCollisions
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 12.5,
                y: this.position.y + 4,
            },
            width: 39,
            height: 60,
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i += 1) {
            const collisionBlock = this.collisionBlocks[i]
            
            //Collision exists
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    
                    //Check if collision is harmful
                    if (collisionBlock.harmful) {
                        this.died = true
                    }
                    
                    //Right collision
                    if (this.velocity.x < 0) {
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                    //Left collision
                    } else if (this.velocity.x > 0) {
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = collisionBlock.position.x - offset - 0.01
                        break
                    }
            }
        }
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i += 1) {
            const collisionBlock = this.collisionBlocks[i]
            
            //Collision exists
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    
                    //Check if collision is harmful
                    if (collisionBlock.harmful) {
                        console.log("DEAD")
                        this.died = true
                    }
                    
                    //Up collision
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                        break
                    //Down collision
                    } else if (this.velocity.y > 0) {
                        this.grounded = true
                        this.velocity.y = 0
                        this.graceTime = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }
            }
        }
    }
}
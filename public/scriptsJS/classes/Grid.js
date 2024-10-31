class Grid {

    //value 0 => empty space
    //value 1+ => collision
    constructor({width, height}) {
        this.width = width / 64
        this.height = height / 64
        this.rows = []
        for (let i = 0; i < this.height; i += 1) {
            this.rows.push(new Array(this.width).fill(0))   
        }
    }

    fillBorder() {
        this.rows[0].fill(6)
        this.rows[this.height - 1].fill(6)
        for (let i = 1; i < this.height - 1; i += 1) {
            this.rows[i][0] = 6
            this.rows[i][this.width - 1] = 6
        }
    }

    addCollisionBlocks() {
        let currentCollisionBlocks = []
        this.rows.forEach((row, y) => {
            row.forEach((symbol, x) => {
                switch (symbol) {
                    
                    //Border & Block
                    case 6:
                    case 7:
                        currentCollisionBlocks.push(
                            new CollisionBlock({
                                position : {
                                    x: x * 64,
                                    y: y * 64,
                                },
                                width: 64,
                                height: 64,
                                harmful: false,
                            })
                        )
                        break
                    
                    //Spikes (Floor)
                    case 8:
                        currentCollisionBlocks.push(
                            new CollisionBlock({
                                position : {
                                    x: x * 64 + 6,
                                    y: y * 64 + 34,
                                },
                                width: 52,
                                height: 30,
                                harmful: true,
                            })
                        )
                        break
                }
            })
        })
        return currentCollisionBlocks
    }

    addObjects() {
        let currentObjects = []
        this.rows.forEach((row, y) => {
            row.forEach((symbol, x) => {
                switch (symbol) {
                    
                    //Spawner
                    case 1:
                        currentObjects.push(
                            new Spawner({
                                position : {
                                    x: x * 64,
                                    y: y * 64,
                                },
                            })
                        )
                        break

                    //Block
                    case 7:
                        currentObjects.push(
                            new Block({
                                position : {
                                    x: x * 64,
                                    y: y * 64,
                                },
                            })
                        )
                        break
                    
                    //Spikes (Floor)
                    case 8:
                        currentObjects.push(
                            new Spikes({
                                position : {
                                    x: x * 64,
                                    y: y * 64,
                                },
                                imageSrc: "./images/spikes.png",
                            })
                        )
                        break
                }
            })
        })
        return currentObjects
    }

    getRows() {
        return this.rows
    }

    //Implement check for dimensions
    writeRows(rows) {
        this.rows = rows
    }

    get({row, col}) {
        return this.rows[row][col]
    }

    write({row, col, val}) {
        this.rows[row][col] = val
    }

    erase({row, col}) {
        this.rows[row][col] = 0
    }

    print() {
        console.log(this.rows)
    }

    
}

//Legend
// * No HitBox * 
// 0 -> nothing
// 1 -> player spawner
// 2 ->
// 3 -> 
// 4 ->
// 5 ->
// * Hit Box *
// 6 -> hitbox (no sprite)
// 7 -> block
// 8 -> spikes (Floor)
// 9 ->
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
        this.rows[0].fill(1)
        this.rows[this.height - 1].fill(1)
        for (let i = 1; i < this.height - 1; i += 1) {
            this.rows[i][0] = 1
            this.rows[i][this.width - 1] = 1
        }
    }

    addCollisionBlocks() {
        let currentCollisionBlocks = []
        this.rows.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol > 0) {
                    currentCollisionBlocks.push(
                        new CollisionBlock({
                            position : {
                                x: x * 64,
                                y: y * 64,
                            },
                        })
                    )
                }
            })
        })
        return currentCollisionBlocks
    }

    addObjects() {
        let currentObjects = []
        this.rows.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol == 2) {
                    currentObjects.push(
                        new Block({
                            position : {
                                x: x * 64,
                                y: y * 64,
                            },
                        })
                    )
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

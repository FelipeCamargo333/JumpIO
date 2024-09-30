const express = require("express")
const fs = require("fs")
const path = require("path")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

//Middleware for serving static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")))

//Middleware to parse JSON bodies
app.use(bodyParser.json())


function saveToFile(grid, name) {
    const data = grid.map(row => row.join(" ")).join("\n")
    fs.writeFileSync(name, data)
}

function loadFromFile(name) {
    const data = fs.readFileSync(name, "utf-8")
    const lines = data.split("\n")
    return lines.map(line => line.split(" ").map(Number))
}


//API to save grid to a file
app.post("/save-grid", (req, res) =>{
    
    //Get raw data from request
    const gridData = req.body.grid

    //If no data was found
    if (!gridData) {
        return res.status(400).send("No grid data provided")
    }

    //Save grid to file (As JSON string)
    saveToFile(gridData, path.join(__dirname, "../data/grid.txt"))
    res.send("Grid saved successfully")
})

//API to load grid from a file
app.get("/load-grid", (req, res) => {
    
    //Read grid from file
    const grid = loadFromFile(path.join(__dirname, "../data/grid.txt"))
    res.json({ grid })

})

//Start the server
app.listen(port, () => {
    console.log("server running on http://localhost:${port}")
})
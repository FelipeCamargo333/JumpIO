//Key Down
window.addEventListener("keydown", (event) => {
    switch (event.key)  {
        
        //Jump
        case "w":
        case " ":
        case "ArrowUp":
            keys.w.pressed = true
            break

        //Player to the left
        case "a":
        case "ArrowLeft":
            keys.a.pressed = true
            break

        //Player to the right
        case "d":
        case "ArrowRight":
            keys.d.pressed = true
            break

        case "e":
            keys.e.pressed = true
            break
    }
}) 

//Key Up
window.addEventListener("keyup", (event) => {
    switch (event.key)  {

        //Jump
        case "w":
        case " ":
        case "ArrowUp":
            keys.w.pressed = false
            break
        
        //Player stop
        case "a":
        case "ArrowLeft":
            keys.a.pressed = false
            break

        //Player stop
        case "d":
        case "ArrowRight":
            keys.d.pressed = false
            break

        case "e":
            keys.e.pressed = false
            break

    }
}) 
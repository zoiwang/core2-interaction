let container = document.querySelector(".grid-container");

let clearDrawing = document.querySelector("#clearDrawing");


let isPainting = false;

// Repeat 16*16 times, for each pixel in our grid
for (let i = 0; i < 16 * 16; i++) {

    // Create a new div for our "pixel"
    let newDiv = document.createElement("div");
    newDiv.classList.add("pixel");

    // Detect when the mouse is down over this pixel
    newDiv.addEventListener("mousedown", function() {
        // Set us up in "painting mode", we are drawing a stroke
        isPainting = true;
        // Turn this pixel black
        newDiv.style.backgroundColor = "black";
    });


    // Detect when the mouse is entering this pixel
    // NOTE: you could also use "mouseover" here instead
    newDiv.addEventListener("mouseenter", function() {

        // If we are mid-stroke, (i.e. in painting mode), turn this pixel black
        if (isPainting) {
            newDiv.style.backgroundColor = "black";
        }

    });

    // Detect when mouse is first down but then lifts up on this pixel 
    newDiv.addEventListener("mouseup", function() {
        // Set our painting mode to false
        isPainting = false;
    });

    // When clear drawing button is clicked, set every pixel to white
    clearDrawing.addEventListener("click", function() {
        newDiv.style.background = "white";
    })


    // Append this pixel to the canvas
    container.appendChild(newDiv);
}
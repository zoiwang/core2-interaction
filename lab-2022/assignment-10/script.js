let x = 0;

function myFunction() {
    document.getElementById("demo").innerHTML = x += 1;
}


let myCursor = document.querySelector("#customCursor");

// Detect when the mousemoved anywhere in our webpage window
window.addEventListener("mousemove", function(event) {

    // Print out the mousemove event details
    console.log(event);

    // Print out the x position of the mouse - gives # of pixels from top left corner of page
    console.log("X: ");
    console.log(event.pageX);

    // Print out the y position of the mouse - gives # of pixels from top left corner of page
    console.log("Y: ")
    console.log(event.pageY);

    // Change the top and left properties of the black to the pixel location of the mouse
    myCursor.style.top = (event.pageY - 20) + "px";
    myCursor.style.left = (event.pageX - 20) + "px";
});
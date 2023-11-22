/*
document

listen to User events (subscribe to User events)
addListener
*/

const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "grey";
canvas.width = 500; // means 500px
canvas.height = 500;   // means 500px

// get context to do someting with 2D graphic


const context = canvas.getContext("2d")
// 180 =  Math.PI; 0 - 3.14 * 2
// 360 = Math.PI * 2;
context.beginPath()
context.arc(100, 75, 50, 0, Math.PI * 2)
context.fill()

context.beginPath()
context.arc(400, 75, 50, 0, Math.PI )
context.fill()

document.addEventListener("mousemove", function(event) {
    context.beginPath()
    context.arc(400, 75, 50, 0, Math.PI )
    context.fill()
})
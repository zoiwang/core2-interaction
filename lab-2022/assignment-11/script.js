// source: https://codepen.io/franksLaboratory/pen/VwKEeqR

// The interaction with hovering over the letters for the liquified and changeable cool effect is extremely compelling and powerful that it draws my attention immediately. 
// Since I thought myself to be poor in technical aspects with the javascript, I would like to make a challenge this time by looking at this complicated code. 
// Eventually, I hope I am able to learn from this amazing code by understanding and exploring a deeper and a more complex relationship of coding language within the "hover" effect and the "javascript". 

//This section stipulates the display container/screen size
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
let particleArray = [];
let adjustX = -10;
let adjustY = 3;

//Defines the position of the mouse
let mouse = {
    x: null,
    y: null,
    radius: 150
}

//Defines the position of the mouse's moving and activated area on the container
let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener('mousemove',
    function(e) {
        mouse.x = e.x - canvasPosition.left;
        mouse.y = e.y - canvasPosition.top;
    });

ctx.font = 'bold 16px Verdana';
ctx.fillText('LIQUID', 5, 30);
const data = ctx.getImageData(0, 0, canvas.width, 100);

//Random math to create the liquid effect 
class Particle {
    constructor(x, y) {
        this.x = x + 200,
            this.y = y - 100,
            this.size = 8,
            this.baseX = this.x,
            this.baseY = this.y,
            this.density = ((Math.random() * 30) + 1);
    }

    //Hover and drawing triggers the effect
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // check mouse position/particle position
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;

        if (force < 0) force = 0;

        let directionX = (forceDirectionX * force * this.density)
        let directionY = (forceDirectionY * force * this.density);

        if (distance < mouse.radius + this.size) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}
// generates the liquid particle around the letters randomly
function init() {
    particleArray = [];

    for (var y = 0, y2 = data.height; y < y2; y++) {
        for (var x = 0, x2 = data.width; x < x2; x++) {
            if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 15, positionY * 15));
            }
        }
    }

}

// scatters or enlarges the letters, change the form
function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}
init();
animate();

// the inner yellow ripple effect
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) +
                ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < 3600) {
                opacityValue = 1 - (distance / 3600);
                let dx = mouse.x - particleArray[a].x;
                let dy = mouse.y - particleArray[a].y;
                let mouseDistance = Math.sqrt(dx * dx + dy * dy);
                // JS random math again
                if (mouseDistance < mouse.radius / 2) {
                    particleArray[a].size = 25;
                    ctx.strokeStyle = 'rgba(255,255,150,' + opacityValue + ')';
                } else if (mouseDistance < mouse.radius - 50) {
                    particleArray[a].size = 20;
                    ctx.strokeStyle = 'rgba(255,255,180,' + opacityValue + ')';
                } else if (mouseDistance < mouse.radius + 20) {
                    particleArray[a].size = 15;
                    ctx.strokeStyle = 'rgba(255,255,210,' + opacityValue + ')';
                } else {
                    particleArray[a].size = 8;
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                }
                ctx.lineWidth = 20;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', function() {
    canvasPosition = canvas.getBoundingClientRect();
});
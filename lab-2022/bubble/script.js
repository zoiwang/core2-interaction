let bubbles = document.querySelectorAll('.bubble');
let container = document.querySelector('#container');

for (let i = 0; i < 50; i++) {
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    container.appendChild(bubble);
}

bubbles.forEach(function(bubble) {
    bubble.style.left = (100 * Math.random()) + '%';
    bubble.style.top = (100 * Math.random()) + '%';
});

container.addEventListener('click', function(event) {
    if (event.target.classList.contains('bubble')) {
        event.target.remove();
    }
});

function clicked() {
    var circle = new ProgressBar.Circle('#progress', {
        color: '#F0A32F',
        trailColor: '#eee',
        strokeWidth: 10,
        duration: 1000,
        easing: 'easeInOut'
    });

    circle.set(0.25);
    var content = document.getElementById("content");
    content.style.display = "none";
}



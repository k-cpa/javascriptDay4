const countdown = document.getElementById('countdown');
let seconds = 5;


setInterval(function() {
    if (seconds > 0) {
        countdown.textContent = seconds;
        seconds--;
    } else {
        countdown.textContent = 'GO';
    }
}, 1000)
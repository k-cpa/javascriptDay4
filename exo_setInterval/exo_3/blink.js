const blink = document.getElementById('blink');



setInterval(function() {
    
    if (blink.style.display === 'none') {
        blink.textContent = 'Clignotant ...';
        blink.style.display = 'block';
    } else {
        blink.style.display = 'none';
    }
}, 500)

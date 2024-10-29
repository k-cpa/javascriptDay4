const clock = document.getElementById('clock');


setInterval(function() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clock.textContent = hours + " heures, " + minutes + " minutes et " + seconds + " seconds";
},1000)



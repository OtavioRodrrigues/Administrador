document.querySelectorAll('.nav-buttons').forEach(function (link) {
    link.onclick = function (event) {
        event.preventDefault();

        document.querySelectorAll('.nav-buttons').forEach(function (link) {
            link.classList.remove('active');
        });

        this.classList.add('active');

        document.querySelectorAll('.overlay').forEach(function (overlay) {
            overlay.style.display = 'none';
        });

        var targetOverlay = this.getAttribute('data-target');
        document.getElementById(targetOverlay).style.display = 'block';
    }
});
document.getElementById('overlay1').style.display = 'block';
document.querySelector('.nav-buttons[data-target="overlay1"]').classList.add('active');

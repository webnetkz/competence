window.onload = (() => {
    // Загрузка содержимого header.html
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    // Загрузка содержимого footer.html
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML += data;
        });
})();
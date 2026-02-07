document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        window.location.href = '/itmo-web-y26/MainPages/fondBook.html';
    } else {
        alert('Неверный логин или пароль');
    }
});


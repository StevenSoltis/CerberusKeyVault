const sqlite3 = require('sqlite3').verbose();

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLoginFormSubmit);
});

function handleLoginFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    console.log('Username:', username);
    console.log('Password:', password);

  
}
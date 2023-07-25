const sqlite3 = require('sqlite3').verbose();

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLoginFormSubmit);
});

function handleLoginFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For demonstration purposes, we're just logging the credentials in the console.
    console.log('Username:', username);
    console.log('Password:', password);

    // Here you can add the code to validate the credentials and perform the login process.
}
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; 

// Create and connect to the SQLite database
const db = new sqlite3.Database('cerberusDB.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Parse incoming JSON data
app.use(bodyParser.json());

// Create new users
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      // Insert user data into the "users" table
      const sql = 'INSERT INTO users (firstName, lastName, email, password, phone) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [firstName, lastName, email, hashedPassword, phone], (err) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Failed to register user' });
        } else {
          console.log('User registered successfully');
          res.status(200).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Fetch user data from the database based on email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Failed to process login' });
    } else if (!user) {
      // No user found with the provided email
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      // Compare the hashed password with the input password
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          res.status(500).json({ error: 'Failed to process login' });
        } else if (isMatch) {
          // Passwords match, user successfully logged in
          console.log('User logged in successfully');
          res.status(200).json({ message: 'User logged in successfully' });
        } else {
          // Passwords don't match, invalid credentials
          res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
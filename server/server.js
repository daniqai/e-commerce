// server/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key'; // Use a more secure key in production

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Simulated user database (in-memory)
const users = [];

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Signup route to register new users
app.post('/signup', (req, res) => {
  const { username, password, email  } = req.body;

  // Check if the user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user and store in the array
  const newUser = { id: uuidv4(), username, password, email };
  users.push(newUser);

  // Generate a JWT token for the new user
  const accessToken = jwt.sign({ id: newUser.id, username: newUser.username, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ accessToken });
});

// Login route to authenticate users and issue JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate a token
    const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ accessToken ,user});
  } else {
    res.status(401).send('Username or password is incorrect');
  }
});

// Protected route: Example of accessing protected data
app.get('/profile', authenticateJWT, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

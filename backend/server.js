// Import libraries
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // To serve the React frontend in production
require('dotenv').config(); // To manage different environment variables

// Set the port number for the server
const PORT = process.env.PORT || 5000;

// Create an express application
const app = express();

// Middleware
app.use(cors()); // Allow CORS
app.use(express.json()); // Parse incoming request bodies as JSON

// Define Google Books API key
const API_KEY = process.env.BOOKS_API_KEY || 'AIzaSyDm74oNqKRuQZuwFZ0ctpi9cI5QLTZL8sw';

// API Routes

// Route to fetch books from Google Books API
app.get('/api/books', (req, res) => {
  const query = req.query.query || 'javascript'; // Use the user's search query or default to 'javascript'

  // Fetch data from Google Books API
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    .then((response) => {
      // Send the fetched data back to the frontend
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data from Google Books API:', error);
      res.status(500).send('Error fetching data');
    });
});

// Route to handle feedback
app.post('/api/feedback', (req, res) => {
  const { bookId, feedback } = req.body;
  console.log(`Received feedback for book ID: ${bookId}, Feedback: ${feedback}`);

  // Send a response back
  res.send(`Feedback received for book ID: ${bookId}, Feedback: ${feedback}`);
});

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Catch-all route to serve the React frontend
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  // Define a simple route for testing the server when not in production
  app.get('/', (req, res) => {
    res.send('Backend is running!');
  });
}

// Start the server and listen on the specific port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

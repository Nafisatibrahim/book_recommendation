	
// Import libraries
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // To manage different environment variables
// Create an express application
const app = express();

// Allow cors to allow requests from all origin
app.use(cors());

// Define Google Books API key
const API_KEY = process.env.BOOKS_API_KEY || 'AIzaSyDm74oNqKRuQZuwFZ0ctpi9cI5QLTZL8sw';

// Example route to fetch books from Google Books API
app.get('/books', (req, res) => {
	const query = req.query.query || 'javascript'; // Use the user's search query or default to 'javascript'

	// Fetch data
	axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
	.then(response => {
		// Send the fetched data back to the frontend
		res.json(response.data);
	})
	.catch(error => {
		console.error('Error fetching data from Google Books API:', error);
		res.status(500).send('Error fetching data');	
	});

})

// Set the port number for the server
const PORT = 5005;

// Define a route for the URL ('/) of the server
app.get('/',(req, res) => {
	// Send a text response when the URL is visited
	res.send('Backend is running!');
});

// Start the server and listen on the specific port
app.listen(PORT,() => {
	// Log a message in the console when the server starts
	console.log(`Server is running on http://localhost:${PORT}`);
    console.log('')
});

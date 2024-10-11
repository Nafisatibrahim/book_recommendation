	
	// Import libraries
	const express = require('express');
	const cors = require('cors');

	// Allow cors to allow requests from all origin
	app.use(cors());

	// Create an express application
	const app = express();

	// Set the port number for the server
	const PORT = 5005;

	// Define a route for the rool URL ('/) of the server
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

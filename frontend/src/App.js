// Import React libraries
// useEffect used to perform side effects (like fetching data) and useState used to manage state in a functional component
import React, {useEffect, useState} from 'react';

// Define the app component
function App() {
    // Declare a state variale 'searchQuery' to store the user's input and a function 'setSearchQuery' to update it
    const [searchQuery, setSearchQuery] = useState('');
    // Declare a state variale 'sbooks' to store the user's input and a function 'setBooks' to update it
    const [books, setBooks] = useState([]); // State to store the fetched books

    // Creat a function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // Precents the page from reloading when the form is submitted

      // Make a request to the backend APT (Express server) with the use's search query
      fetch(`http://localhost:5005/books?query=${searchQuery}`)
      // Convert the response to Json
        .then((response) => response.json())
        // Once the data is received, update the state variable 'books' with the fetched data
        .then((data) => {
          setBooks(data.items || []); // If the books are found, update the 'books' state with the data from the backend
        })
        .catch((error) => {
          console.error('Error fetching data:', error); // Log an error if the data cannot be fetched
        });
  };

  // Function to hangle thumbs up feedback
  const handleThumbsUp = (bookId) => {
    fetch(`http://localhost:5005/feedback`, { // Make a request to the backend API
      method: 'POST', // Send a POST request to the backend
      headers: { 'Content-Type': 'application/json'}, // Set the content type of the request
      body: JSON.stringify({ bookId: bookId, feedback: 'thumbs_up'})
    })
    .then(() => {
      console.log(`Thumbs up sent for book ID: ${bookId}`); // Log a message if the feedback is sent successfully
    })
    .catch((error) => {
      console.error('Error sending feedback:', error); 
    });
  };

  // Function to hangle thumbs up feedback
  const handleThumbsDown = (bookId) => {
    fetch(`http://localhost:5005/feedback`, { // Make a request to the backend API
      method: 'POST', // Send a POST request to the backend
      headers: { 'Content-Type': 'application/json'}, // Set the content type of the request
      body: JSON.stringify({ bookId: bookId, feedback: 'thumbs_down'})
    })
    .then(() => {
      console.log(`Thumbs up sent for book ID: ${bookId}`); // Log a message if the feedback is sent successfully
    })
    .catch((error) => {
      console.error('Error sending feedback:', error); 
    });
  };


  // Render the component's UI
  return (
    <div className = "App">
      {/* Display a heading */}
      <h1>Book Search</h1>

      {/* Create a form to capture the user's search input */}
      <form onSubmit = {handleSubmit}> {/* When the form is submitted, call handleSubmit */} 
        <input
          type="text" // The input field where the user types their search term
          value={searchQuery} // Bind the value of the input to the 'searchQuery' state
          onChange={(e) => setSearchQuery(e.target.value)} // Update 'searchQuery' state when the user types
          placeholder="Search for books by title, author, or genre" // Placeholder text in the input field
        />
        <button type="submit">Search</button> {/* Button to submit the form */}
      </form>

      {/* Check if any books were fetched and display them */}
      {books.length > 0 && ( //Only show this section if there are books in the 'books' state
        <div> 
          <h2>Search Results</h2>
          <ul>
            {/* Map over the books arrray and create a list item for each book */}
            {books.map((book) => (
              <li key={book.id}> {/* Use 'book.id' as a unique key for each list item */}
              <h3>{book.volumeInfo.title}</h3> {/* Display the book title */}
              <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(',') : 'Unknown author'}</p> {/* Display authors, or 'Unknown author' if not available */}
              <p>{book.volumeInfo.description ? book.volumeInfo.description : 'No description available'}</p>  {/* Display the book's description, or a fallback message */}

              {/* Thumbs Up/ Down Buttons*/}
              <button onClick={() => handleThumbsUp(book.id)}>👍 Thumbs Up</button>
              <button onClick={() => handleThumbsDown(book.id)}>👎 Thumbs Down</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Export the App component so it can be used in other parts of the application
export default App;







/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
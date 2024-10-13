// Import React libraries
import React, { useEffect, useState } from 'react';
import './App.css'; // Importing the App.css for styling
import bookImage from './images/books.jpg'; // Make sure this path is correct

// Define the app component
function App() {
  // Declare state variables
  const [searchQuery, setSearchQuery] = useState(''); // To store the user's search input
  const [books, setBooks] = useState([]); // To store the fetched book results
  const [bookOfTheDay, setBookOfTheDay] = useState(null); // To store the book of the day data
  const [categories] = useState(['Fiction', 'Non-fiction', 'Romance', 'Adventure', 'Horror']); // Predefined categories
  const [popularBooks, setPopularBooks] = useState([]); // To store random popular books
  const [loading, setLoading] = useState(false); // To manage loading state
  const [noResults, setNoResults] = useState(false); // To manage no results state
  const [searched, setSearched] = useState(false); // New state to track when the search button is clicked

  // Fetch random books for popular books and book of the day on component mount
  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = () => {
    // Fetch a random book for 'Book of the Day' and other popular books
    fetch(`http://localhost:5005/books?query=romance`)
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.items.length); // Pick a random index
        setBookOfTheDay(data.items[randomIndex]); // First book is the book of the day
        setPopularBooks(data.items.slice(1, 6)); // Select 5 books for 'Popular Books'
      })
      .catch((error) => console.error('Error fetching random books:', error));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    setLoading(true); // Show loading
    setNoResults(false); // Reset no results
    setSearched(true); // Mark that a search has been initiated

    // Fetch books based on user's search query
    fetch(`http://localhost:5005/books?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items || []); // Update books state with search results
        setLoading(false); // Stop loading
        if (!data.items || data.items.length === 0) {
          setNoResults(true); // Show 'no results' message if no books are found
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  };

  // Handle thumbs up feedback
  const handleThumbsUp = (bookId) => {
    fetch(`http://localhost:5005/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId: bookId, feedback: 'thumbs_up' }),
    })
      .then(() => console.log(`Thumbs up sent for book ID: ${bookId}`))
      .catch((error) => console.error('Error sending feedback:', error));
  };

  // Handle thumbs down feedback
  const handleThumbsDown = (bookId) => {
    fetch(`http://localhost:5005/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId: bookId, feedback: 'thumbs_down' }),
    })
      .then(() => console.log(`Thumbs down sent for book ID: ${bookId}`))
      .catch((error) => console.error('Error sending feedback:', error));
  };

  // Fetch books based on selected category
  const handleCategoryClick = (category) => {
    setLoading(true);
    setNoResults(false);
    setSearched(true);

    // Fetch books based on the selected category
    fetch(`http://localhost:5005/books?query=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items || []);
        setLoading(false);
        if (!data.items || data.items.length === 0) {
          setNoResults(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching category books:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      {/* Header Section with Title and Menu Bar */}
      <header className="header">
        <div className="header-left">
          <h1>Book Recommendation</h1> {/* Main Title */}
        </div>
        <div className="header-right">
          <ul className="menu-bar">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </header>

      {/* New Banner with Two Images */}
      <div className="banner">
        <div className="banner-left">
          <img src={bookImage} alt="Left Banner Image" />
        </div>
        <div className="banner-right">
          <img src={bookImage} alt="Right Banner Image" />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="call-to-action">
        <h2>Discover Your Next Favorite Book!</h2> {/* Enhanced title */}
        <p>Explore the world of books and find the next one to immerse yourself in.</p>
      </div>

      {/* Book of the Day */}
      {bookOfTheDay && (
        <div className="book-of-the-day">
          <h2>Book of the Day</h2>
          <div className="book-details">
            <a href={bookOfTheDay.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
              <img
                src={bookOfTheDay.volumeInfo.imageLinks?.thumbnail}
                alt={bookOfTheDay.volumeInfo.title}
                className="book-thumbnail"
              />
            </a>
            <div>
              <h3>{bookOfTheDay.volumeInfo.title}</h3>
              <p>{bookOfTheDay.volumeInfo.authors?.join(', ') || 'Unknown author'}</p>
              <p>{bookOfTheDay.volumeInfo.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books by title, author, or genre"
        />
        <button type="submit">Search</button>
      </form>

      {/* Recommended Categories */}
      <div className="categories">
        <h2>Recommended Categories</h2>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className="category-button"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Books Carousel */}
      {!searched && (
        <div className="popular-books">
          <h2>Popular Books</h2>
          <div className="carousel">
            {popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <div key={book.id} className="carousel-book">
                  <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={book.volumeInfo.title}
                      className="carousel-book-image"
                    />
                  </a>
                  <h3>{book.volumeInfo.title}</h3>
                  <p>{book.volumeInfo.authors?.join(', ') || 'Unknown author'}</p>
                </div>
              ))
            ) : (
              <p>Loading popular books...</p>
            )}
          </div>
        </div>
      )}

      {/* Search Results */}
      {loading ? (
        <p>Loading...</p>
      ) : noResults ? (
        <p>No results found for your search.</p>
      ) : books.length > 0 ? (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <div className="book-details">
                  <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={book.volumeInfo.title}
                      className="book-thumbnail"
                    />
                  </a>
                  <div>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors?.join(', ') || 'Unknown author'}</p>
                    <p>{book.volumeInfo.description || 'No description available'}</p>
                  </div>
                </div>
                {/* Thumbs Up/Down Buttons */}
                <button onClick={() => handleThumbsUp(book.id)}>👍 Like</button>
                <button onClick={() => handleThumbsDown(book.id)}>👎 Dislike</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Footer with Credit */}
      <footer className="footer">
        <p>Created by Nafisat Ibrahim</p> {/* Your name here */}
      </footer>
    </div>
  );
}

// Export the App component
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
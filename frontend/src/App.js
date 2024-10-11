// Import React livraries
// useEffect used to perform side effects (like fetching data) and useState used to manage state in a functional component
import React, {useEffect, useState} from 'react';

// Define the app component
function App(){
    // Declare a state variale 'message' and a function 'setMessage' to update it
    const [message, setMessage] = useState('');

    // Use the useEffect hook to fetch data from the server
    useEffect(() => {
      // Fetch data fron the backend API running on port
      fetch('http://localhost:5005/')
      // Convert the response to plain text
      .then((res) => res.text())
      // Once the data is received, update the state variabe 'message' with the fetched data
      .then((data) => setMessage(data));

}, []); // Empty dependency array [] means that this effect will only run once the component is mounted

// Render the component's UI
// Display the 'message' state inside an <h1> tag
  return (
    <div className="App">
      <h1>{message}</h1> {/* Display the fetched message */}
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
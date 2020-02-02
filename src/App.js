import React from 'react';
import Quiz from './components/Quiz';

import './App.css';

function App() {
  return (
    <div className="container">
      <Quiz />
      <footer className="footer">
        Questions source:{' '}
        <a
          className="App-link"
          href="https://opentdb.com/"
          target="_blank"
          rel="noopener noreferrer">
          Open Trivia Database
        </a>
      </footer>
    </div>
  );
}

export default App;

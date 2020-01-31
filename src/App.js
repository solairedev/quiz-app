import React from 'react';
// import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className="container">
      <div className="quiz">
        <div className="quiz__wrap">
          <div className="quiz__header">
            <p className="quiz__title">
              Which property is used to change the background color?
            </p>

            <p className="quiz__meta">
              Question 1/10
            </p>
          </div>
          <div className="quiz__answer-list">
            <button className="quiz__answer btn">
              color
            </button>
            <button className="quiz__answer btn">
              bgcolor
            </button>
            <button className="quiz__answer quiz__answer--danger btn">
              background-color
            </button>
            <button className="quiz__answer quiz__answer--success btn">
              bgColor
            </button>
          </div>
          <div className="quiz__action">
            <button className="btn quiz__action-btn btn--accent">Next</button>
          </div>
        </div>
      </div>
      <footer className="footer">
        Questions source: <a className="App-link" href="https://opentdb.com/" target="_blank" rel="noopener noreferrer" >Open Trivia Database</a>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import Quiz from './components/Quiz';
import Settings from './components/Setting';
import QuizDetailedResult from './components/QuizDetailedResult';
import {HashRouter as Switch, Route} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/" component={Settings} exact />
        <Route path="/start" component={Quiz} />
        <Route path="/detailed-result" component={QuizDetailedResult} />
      </Switch>

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

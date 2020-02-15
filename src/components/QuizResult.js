import React, {Component} from 'react';
import {withRouter} from 'react-router';

class QuizResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsResult: this.props.questionsResult,
      modalState: this.props.modalState,
      amount: this.props.amount,
    };

    this.handleClick = this.handleClick.bind(this);
    this.redirectToSettingsPage = this.redirectToSettingsPage.bind(this);
    this.redirectToDetailedResult = this.redirectToDetailedResult.bind(this);
  }
  handleClick() {
    this.props.playAgainAction();
  }
  redirectToSettingsPage() {
    this.props.history.push({
      pathname: '/',
      state: {title: 'Settings'},
    });
  }
  redirectToDetailedResult(){
    this.props.redirectToDetailedResultAction()
  }
  render() {
    const {amount, questionsResult} = this.state;
    const modalState = this.state.modalState ? 'modal--active' : '';
    var score = 0;
    questionsResult.forEach((item, key) => {
      if (item.correct_answer === item.userAnswer) {
        score += 1;
      }
    });
    const percentScore = Math.trunc((score / amount) * 100);

    return (
      <div className={'modal ' + modalState}>
        <div className="modal__content">
          <p className="modal__title">Result</p>
          <p className="text-center">
            Score: {score} / {amount}
          </p>
          <p className="text-center">
            Percent Score: {percentScore}%
          </p>
          <div className="modal__action">
            <button
              onClick={this.handleClick}
              className="btn modal__action-btn btn--accent">
              Play again
            </button>

            <button
              onClick={this.redirectToSettingsPage}
              className="modal__action-btn btn">
              Settings
            </button>

            <button
              onClick={this.redirectToDetailedResult}
              className="modal__action-btn btn">
              Detailed result
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const QuizResultWithRouter = withRouter(QuizResult);

export default QuizResultWithRouter;

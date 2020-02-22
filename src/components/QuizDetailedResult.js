import React, {Component} from 'react';
import {withRouter} from 'react-router';
import QuizAnswer from './QuizAnswer';
import decode_text from './../utilities/decode';
import idToCategoryName from './../utilities/idToCategoryName';
import {connect} from 'react-redux';

class QuizDetailedResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.playAgain = this.playAgain.bind(this);
    this.redirectToSettingsPage = this.redirectToSettingsPage.bind(this);
  }
  playAgain() {
    this.props.history.push('/start/');
  }
  redirectToSettingsPage() {
    this.props.history.push({
      pathname: '/',
      state: {title: 'Settings'},
    });
  }
  render() {
    const {amount, category, difficulty} = this.props.settings;
    var score = 0;

    const questions = this.props.questions.questions;

    questions.forEach((item, key) => {
      if (item.correct_answer === item.userAnswer) {
        score += 1;
      }
    });
    const percentScore = Math.trunc((score / amount) * 100);

    return (
      <div>
        <div className="quiz">
          <div className="quiz__wrap">
            <div className="quiz__header">
              <p className="quiz__title">Detailed Result</p>
              <div className="quiz__meta-list">
                <p className="quiz__meta quiz__meta-list-item quiz__meta--mb">
                  Category: &laquo;{idToCategoryName(category)}&raquo;
                </p>
                <p className="quiz__meta quiz__meta-list-item quiz__meta--mb">
                  Difficulty: {difficulty}
                </p>
                <p className="quiz__meta quiz__meta-list-item quiz__meta--mb">
                  Score: {score} / {amount}
                </p>
                <p className="quiz__meta">Percent Score: {percentScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {questions.map(question => (
          <div key={question.question} className="quiz quiz--mt-sm">
            <div className="quiz__wrap">
              <div className="quiz__header quiz__header--result">
                <p className="quiz__title">{decode_text(question.question)}</p>
              </div>
              <div className="quiz__answer-list">
                {question.incorrect_answers.map(el => (
                  <QuizAnswer
                    text={el}
                    status={
                      el === question.userAnswer
                        ? el === question.correct_answer
                          ? 'quiz__answer--success'
                          : 'quiz__answer--danger'
                        : 'quiz__answer--unknown'
                    }
                    key={el + question.question}
                    isDisabled={true}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={this.playAgain}
            className="btn btn--margin btn--accent">
            Play again
          </button>

          <button
            onClick={this.redirectToSettingsPage}
            className="btn btn--margin">
            Settings
          </button>
        </div>
      </div>
    );
  }
}

const QuizDetailedResultWithRouter = withRouter(QuizDetailedResult);

const mapStateToProps = store => {
  return {
    settings: store.settings,
    questions: store.questions,
  };
};

export default connect(
  mapStateToProps,
  null,
)(QuizDetailedResultWithRouter);

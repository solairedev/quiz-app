import React, {Component} from 'react';
import {withRouter} from 'react-router';
import QuizAnswer from './QuizAnswer';
import decode_text from './../utilities/decode';
import idToCategoryName from './../utilities/idToCategoryName'

class QuizDetailedResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.location.state
        ? this.props.location.state.amount
          ? this.props.location.state.amount
          : null
        : null,
      category: this.props.location.state
        ? this.props.location.state.category
          ? this.props.location.state.category
          : null
        : null,
      difficulty: this.props.location.state
        ? this.props.location.state.difficulty
          ? this.props.location.state.difficulty
          : null
        : null,
      questionsResult: this.props.location.state
        ? this.props.location.state.questionsResult
          ? this.props.location.state.questionsResult
          : null
        : null,
    };

    this.playAgain = this.playAgain.bind(this)
    this.redirectToSettingsPage = this.redirectToSettingsPage.bind(this)
  }
  playAgain(){
    this.props.history.push(
      '/start/' +
        this.state.difficulty +
        '/' +
        this.state.category +
        '/' +
        this.state.amount,
    );
  }
  redirectToSettingsPage(){
    this.props.history.push({
      pathname: '/',
      state: {title: 'Settings'},
    });
  }
  render() {
    const {amount, category, difficulty} = this.state;
    var score = 0;
    this.state.questionsResult.forEach((item, key) => {
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
              <div class="quiz__meta-list">
                <p className="quiz__meta quiz__meta-list-item quiz__meta--mb">
                  Category: 	&laquo;{idToCategoryName(category)}&raquo;
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

        {this.state.questionsResult.map(question => (
          <div className="quiz quiz--mt-sm">
            <div className="quiz__wrap">
              <div className="quiz__header quiz__header--result">
                <p className="quiz__title">{decode_text(question.question)}</p>
                {/* <p className="quiz__meta"> */}
                {/*   Your answer is valid  */}
                {/* </p> */}
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

        <div class="text-center">
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

export default QuizDetailedResultWithRouter;

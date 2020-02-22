import React, {Component} from 'react';
import decode_text from './../utilities/decode';
import QuizAnswer from './QuizAnswer';
import QuizResult from './QuizResult';
import {connect} from 'react-redux';
import {
  fetchQuestionList,
  setQuestionsList,
  nextQuestion,
  resetGame,
} from './../actions/questions';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewResult: false,
    };

    this.nextStep = this.nextStep.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.redirectToDetailedResult = this.redirectToDetailedResult.bind(this);
  }
  componentDidMount() {
    this.startQuiz();
  }
  startQuiz() {
    this.props.resetGameAction();
    this.props.fetchQuestionListAction();
  }
  nextStep() {
    if (
      this.props.questions.currentQuestionNumber <
      this.props.questions.questions.length - 1
    ) {
      this.props.nextQuestionAction(
        this.props.questions.currentQuestionNumber + 1,
      );
    } else {
      this.setState({
        viewResult: true,
      });
    }
  }
  redirectToDetailedResult() {
    this.props.history.push({
      pathname: '/detailed-result',
    });
  }
  playAgain() {
    this.setState(
      {
        viewResult: false,
      },
      () => {
        this.startQuiz();
      },
    );
  }
  render() {
    const isLoading = this.props.questions.questions.length > 1 ? false : true;

    if (isLoading) {
      return (
        <div className="quiz">
          <div className="quiz__wrap">
            <div className="quiz__header quiz__header">
              <p className="quiz__title quiz__title--loading">Loading</p>
            </div>
          </div>
        </div>
      );
    }

    const {viewResult} = this.state;

    const amount = this.props.questions.questions.length;

    const questionsList = this.props.questions.questions;

    const {currentQuestionNumber} = this.props.questions;

    const userQuestionNumber = currentQuestionNumber + 1;

    const answers = questionsList[currentQuestionNumber].incorrect_answers;

    const question = decode_text(questionsList[currentQuestionNumber].question);

    const answerIsSelected = questionsList[currentQuestionNumber].userAnswer
      ? true
      : false;

    return (
      <div>
        <div className="quiz">
          <div className="quiz__wrap">
            <div className="quiz__header quiz__header">
              <p className="quiz__title">{question}</p>

              <p className="quiz__meta">
                Question {userQuestionNumber}/{amount}
              </p>
            </div>
            <div className="quiz__answer-list">
              {answers.map(el => (
                <QuizAnswer
                  key={el + currentQuestionNumber}
                  text={el}
                  isDisabled={false}
                />
              ))}
            </div>
            {answerIsSelected && (
              <div className="text-center">
                <button
                  onClick={this.nextStep}
                  className="btn quiz__action-btn btn--accent">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        {viewResult && (
          <QuizResult
            playAgainAction={this.playAgain}
            questionsResult={questionsList}
            modalState={viewResult}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    settings: store.settings,
    questions: store.questions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestionListAction: () => dispatch(fetchQuestionList()),
    resetGameAction: () => dispatch(resetGame()),
    nextQuestionAction: questionNumber =>
      dispatch(nextQuestion(questionNumber)),
    setQuestionsListAction: list => dispatch(setQuestionsList(list)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);

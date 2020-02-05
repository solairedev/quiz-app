import React, {Component} from 'react';
import shuffle from './../utilities/array';
import decode_text from './../utilities/decode';
import QuizAnswer from './QuizAnswer';
import QuizResult from './QuizResult';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionNumber: 0,
      questionsList: null,
      isLoading: true,
      answerIsSelected: false,
      userErrorCount: 0,
      viewResult: false,

      amount: this.props.match.params.amount
        ? this.props.match.params.amount
        : 10,
      category: this.props.match.params.category
        ? this.props.match.params.category
        : null,
      difficulty: this.props.match.params.difficulty
        ? this.props.match.params.difficulty
        : null,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }
  componentDidMount() {
    this.startQuiz();
  }
  startQuiz() {
    let url = '?amount=' + this.state.amount;
    if (this.state.category !== 'any') {
      url += '&category=' + this.state.category;
    }
    if (this.state.difficulty !== 'any') {
      url += '&difficulty=' + this.state.difficulty;
    }

    fetch('https://opentdb.com/api.php' + url)
      .then(response => response.json())
      .then(response => {
        this.setState({questionsList: response.results, isLoading: false});
      });
  }
  selectAnswer(valid, e) {
    if (!this.state.answerIsSelected) {
      this.setState({
        answerIsSelected: true,
        userErrorCount: valid
          ? this.state.userErrorCount
          : this.state.userErrorCount + 1,
      });
    }
  }
  nextStep() {
    const questionCountFromNull = this.state.amount - 1;
    if (this.state.currentQuestionNumber < questionCountFromNull) {
      this.setState({
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
        answerIsSelected: false,
      });
    } else {
      this.setState({
        viewResult: true,
      });
    }
  }
  playAgain() {
    this.setState(
      {
        currentQuestionNumber: 0,
        questionsList: null,
        isLoading: true,
        answerIsSelected: false,
        userErrorCount: 0,
        viewResult: false,
      },
      () => {
        this.startQuiz();
      },
    );
  }
  render() {
    const {
      questionsList,
      currentQuestionNumber,
      isLoading,
      answerIsSelected,
      userErrorCount,
      viewResult,
      amount,
    } = this.state;

    const userQuestionNumber = currentQuestionNumber + 1;

    const incorrect_answers = isLoading
      ? []
      : questionsList[currentQuestionNumber].incorrect_answers;
    const correct_answer = isLoading
      ? null
      : questionsList[currentQuestionNumber].correct_answer;

    if (!isLoading && !answerIsSelected) {
      incorrect_answers.push(correct_answer);
      shuffle(incorrect_answers);
    }

    const anwers = isLoading ? [] : incorrect_answers;
    const question = isLoading
      ? null
      : decode_text(questionsList[currentQuestionNumber].question);

    return (
      <>
        <div className="quiz">
          <div className="quiz__wrap">
            <div className="quiz__header">
              {isLoading ? (
                <p className="quiz__title quiz__title--loading">Loading</p>
              ) : (
                <>
                  <p className="quiz__title">{question}</p>

                  <p className="quiz__meta">
                    Question {userQuestionNumber}/{amount}
                  </p>
                </>
              )}
            </div>
            {!isLoading && (
              <div className="quiz__answer-list">
                {anwers.map(el => (
                  <QuizAnswer
                    selectAnswerAction={this.selectAnswer}
                    text={el}
                    valid={correct_answer}
                    isSelected={answerIsSelected}
                    key={el + currentQuestionNumber}
                  />
                ))}
              </div>
            )}
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
            modalState={viewResult}
            errorsCount={userErrorCount}
            playAgainAction={this.playAgain}
            amount={amount}
          />
        )}
      </>
    );
  }
}
export default Quiz;

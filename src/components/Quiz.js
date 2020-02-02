import React, {Component} from 'react';
import shuffle from './../utilities/array';
import decode_text from './../utilities/decode';
import QuizAnswer from './QuizAnswer';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionNumber: 0,
      questionsList: null,
      isLoading: true,
      answerIsSelected: false,
      userErrorCount: 0,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }
  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(response => {
        this.setState({questionsList: response.results, isLoading: false});
      });
  }
  selectAnswer(valid, e) {
    if (!this.state.answerIsSelected) {
      this.setState({
        answerIsSelected: true,
        userErrorCount : valid ? this.state.userErrorCount : this.state.userErrorCount - 1
      });
    }
  }
  nextStep(){
    if (this.state.currentQuestionNumber < 9) {
      this.setState({
         currentQuestionNumber: this.state.currentQuestionNumber + 1,
         answerIsSelected : false,
      });
    }
  }
  render() {
    const {
      questionsList,
      currentQuestionNumber,
      isLoading,
      answerIsSelected,
    } = this.state;

    const userQuestionNumber = currentQuestionNumber + 1

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
      <div className="quiz">
        <div className="quiz__wrap">
          <div className="quiz__header">
            {isLoading ? (
              <p className="quiz__title quiz__title--loading">Loading</p>
            ) : (
              <>
                <p className="quiz__title">{question}</p>

                <p className="quiz__meta">
                  Question {userQuestionNumber}/10
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
            <div className="quiz__action">
              <button onClick={this.nextStep} className="btn quiz__action-btn btn--accent">Next</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;

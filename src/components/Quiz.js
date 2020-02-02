import React, {Component} from 'react';
import shuffle from './../utilities/array';
import decode_text from './../utilities/decode';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionNumber: 0,
      questionsList: null,
      isLoading: true,
      answerIsSelected: false,
    };
  }
  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(response => {
        this.setState({questionsList: response.results, isLoading: false});
      });
  }
  render() {
    const {
      questionsList,
      currentQuestionNumber,
      isLoading,
      answerIsSelected,
    } = this.state;
    const incorrect_answers = isLoading
      ? []
      : questionsList[currentQuestionNumber].incorrect_answers;
    const correct_answer = isLoading
      ? null
      : questionsList[currentQuestionNumber].correct_answer;

    if (!isLoading) {
      incorrect_answers.push(correct_answer);
    }

    const anwears = isLoading ? [] : shuffle(incorrect_answers);
    const question = isLoading
      ? null
      : decode_text(questionsList[currentQuestionNumber].question);

    return (
      <div className="quiz">
        <div className="quiz__wrap">
          <div className="quiz__header">
            <p className="quiz__title">{!isLoading && question}</p>

            <p className="quiz__meta">Question {currentQuestionNumber}/10</p>
          </div>
          <div className="quiz__answer-list">
            {!isLoading &&
              anwears.map(el => (
                <button key={el} className="quiz__answer btn">
                  {el}
                </button>
              ))}

            {/* <button className="quiz__answer quiz__answer--danger btn"> */}
            {/*   background-color */}
            {/* </button> */}
            {/* <button className="quiz__answer quiz__answer--success btn"> */}
            {/*   bgColor */}
            {/* </button> */}
          </div>
          {answerIsSelected && (
            <div className="quiz__action">
              <button className="btn quiz__action-btn btn--accent">Next</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;

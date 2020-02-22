import React, {Component} from 'react';
import decode_text from './../utilities/decode';
import { addUserAnswerToQuestoion } from '../actions/questions';
import {connect} from 'react-redux';

class QuizAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: this.props.status
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const currentQuestion = this.props.questions.questions[this.props.questions.currentQuestionNumber]
    const userAnswer = currentQuestion.userAnswer

    if (!this.props.isDisabled && !userAnswer) {
      this.props.addUserAnswerToQuestoionAction(this.props.text)
    }
  }
  componentDidUpdate(nextProps) {
   const { questions, isDisabled } = this.props
   if (nextProps.questions.questions !== questions.questions) { 
    const currentQuestion = this.props.questions.questions[this.props.questions.currentQuestionNumber]
    const userAnswer = currentQuestion.userAnswer
    if (userAnswer && !isDisabled) {
      if (userAnswer === this.props.text) {
        let newClassList;
        if (currentQuestion.correct_answer === this.props.text ) {
          newClassList = 'quiz__answer--success'
        } 
        else{
          newClassList = 'quiz__answer--danger'
        }
        this.setState({
          classList: newClassList
        });
      } 
    }
   }
  }
  render() {
    const {classList} = this.state;
    const { isDisabled } = this.props
    return (
      <button
        onClick={this.handleClick}
        disabled={isDisabled}
        className={'quiz__answer btn ' + classList}>
        {decode_text(this.props.text)}
      </button>
    );
  }
}

const mapStateToProps = store => {
  return {
    questions: store.questions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUserAnswerToQuestoionAction: answer => dispatch(addUserAnswerToQuestoion(answer)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizAnswer);

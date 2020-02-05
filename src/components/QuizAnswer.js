import React, {Component} from 'react';
import decode_text from './../utilities/decode';

class QuizAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    if (!this.props.isSelected) {
      var isValid = this.props.text === this.props.valid ? true : false
      this.setState({
        classList : isValid ? 'quiz__answer--success' : 'quiz__answer--danger'
      }, () => {
        this.props.selectAnswerAction(isValid)
      });
    }
  }
  render() {
    const { classList } = this.state
    return (
      <button onClick={this.handleClick} className={'quiz__answer btn ' + classList}>
        {decode_text(this.props.text)}
      </button>
    );
  }
}
export default QuizAnswer;

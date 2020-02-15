import React, {Component} from 'react';
import decode_text from './../utilities/decode';

class QuizAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: this.props.status
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.props.isDisabled) {
      this.props.selectAnswerAction(this.props.text);
    }
  }
  componentDidUpdate(nextProps) {
   const { status } = this.props
   if (nextProps.status !== status) {
    this.setState({
      classList : status
    });
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
export default QuizAnswer;

import React, {Component} from 'react';

class QuizResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: this.props.modalState,
      errorsCount: this.props.errorsCount,
      amount: this.props.amount,
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.playAgainAction();
  }
  render() {
    const {errorsCount, amount} = this.state;
    const modalState = this.state.modalState ? 'modal--active' : '';
    const score = amount - errorsCount;
    return (
      <div className={'modal ' + modalState}>
        <div className="modal__content">
          <p className="modal__title">Result</p>
          <p className="text-center">Score: {score} / {amount}</p>
          <div className="modal__action">
            <button onClick={this.handleClick} className="btn btn--accent">
              Play again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizResult;

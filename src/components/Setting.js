import React, {Component} from 'react';
import {withRouter} from 'react-router';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : 'Welcome!',
      amount: 10,
      category: 'any',
      difficulty: 'any',
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  formSubmit() {
    this.props.history.push('/start/'+ this.state.difficulty + '/' + this.state.category + '/' + this.state.amount );
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    const {title} = this.state;
    return (
      <div className="paper">
        <p className="paper__title">{title}</p>
        <p>Set up a quiz before starting the game or use default settings.</p>

        <form onSubmit={this.formSubmit}>
          <label htmlFor="trivia_amount">Number of Questions:</label>
          <input
            type="number"
            id="trivia_amount"
            min="1"
            max="50"
            name="amount"
            value={this.state.amount}
            onChange={this.handleInputChange}
          />

          <label htmlFor="trivia_category">Select Category: </label>
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleInputChange}>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>

          <label htmlFor="trivia_difficulty">Select Difficulty: </label>
          <select
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleInputChange}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="text-center">
            <button className="btn btn--accent">Start game</button>
          </div>
        </form>

        <br />
      </div>
    );
  }
}

const SettingsWithRouter = withRouter(Settings);

export default SettingsWithRouter;

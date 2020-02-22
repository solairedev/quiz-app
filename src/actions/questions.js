import shuffle from './../utilities/array';

export function setQuestionsList(list) {
  return {
    type: 'SET_QUESTIONS_LIST',
    payload: list,
  };
}

export function resetGame(){
  return {
    type: 'RESET_GAME'
  };
};

export function addUserAnswerToQuestoion(userAnswer){
  return {
    type: "ADD_USER_ANSWER_TO_QUESTOION",
    payload: userAnswer
  };
};

export function nextQuestion(questionNumber){
  return {
    type: 'NEXT_QUESTION',
    payload: questionNumber
  };
};


export function fetchQuestionList() {
  return (dispatch, getState) => {
    const {amount, difficulty, category} = getState().settings;
    let url = '?amount=' + amount;
    if (category !== 'any') {
      url += '&category=' + category;
    }
    if (difficulty !== 'any') {
      url += '&difficulty=' + difficulty;
    }

    return fetch('https://opentdb.com/api.php' + url)
      .then(response => response.json())
      .then(response => {
        // Added right answer in answer list and shuffle it
        response.results.forEach(el => {
          // safely copies deeply nested objects/arrays!
          // let answers = JSON.parse(JSON.stringify(el.incorrect_answers));
          let answers = el.incorrect_answers.slice();
          answers.push(el.correct_answer);
          el.incorrect_answers = shuffle(answers);
        });
        return dispatch(setQuestionsList(response.results));
      });
  };
}

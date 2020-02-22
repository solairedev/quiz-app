export const initialState = {
  questions: [],
  currentQuestionNumber: 0,
};

export function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUESTIONS_LIST':
      return {...state, questions: action.payload};
    case 'ADD_USER_ANSWER_TO_QUESTOION':
      const {questions, currentQuestionNumber} = state;
      const questionsCopy = questions.slice();
      questionsCopy[currentQuestionNumber].userAnswer = action.payload;
      return {...state, questions: questionsCopy};
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionNumber: action.payload,
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

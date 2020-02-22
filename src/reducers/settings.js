export const initialState = {
  amount: 10,
  category: 'any',
  difficulty: 'any',
}

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SETTINGS': 
      return action.payload
    // case 'SET_AMOUNT':
    //   return { ...state, amount: action.payload}
    // case 'SET_CATEGORY':
    //   return { ...state, category: action.payload}
    // case 'SET_DIFFICULTY':
    //   return { ...state, difficulty: action.payload }
    default:
      return state
  }
}

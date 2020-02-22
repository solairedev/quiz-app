import { combineReducers } from 'redux'
import { settingsReducer } from './settings'
import { questionsReducer } from './questions'

const rootReducer = combineReducers({
  settings: settingsReducer,
  questions: questionsReducer,
})

export default  rootReducer

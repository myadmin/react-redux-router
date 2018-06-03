import { combineReducers } from 'redux'
import { todoApp } from './redux'
import { reader } from './read.redux'

export default combineReducers({todoApp, reader})

import account from './auth/accountReducers'
import todos from './todos/todosReducers'
import { reducer as notificationsReducer } from 'reapop'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    notifications: notificationsReducer(),
    account,
    todos
})

export default rootReducer;


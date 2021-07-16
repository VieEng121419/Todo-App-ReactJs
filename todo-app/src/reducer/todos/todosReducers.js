import * as _state from '../../store/todosStates'
import { SET_LIST, ADD_TASK, DELETE_TASK, UPDATE_TASK, FILTER_TASK, FILTER_NAME, LOADING, GET_COUNT } from '../../constants/todosConstants'
const loginReducer = (state = _state.todosStates, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_COUNT: {
            return {
                ...state,
                count: action.payload
            }
        }
        case SET_LIST:
            return {
                ...state,
                todos: action.payload.reverse(),
                loading: false
            }
        case ADD_TASK: {
            let cloneCount = state.count;
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                loading: false,
                count: cloneCount += 1
            }
        }
        case DELETE_TASK: {
            let cloneCount = state.count;
            return {
                ...state,
                todos: [...state.todos.filter(todo => todo._id !== action.payload)],
                loading: false,
                count: cloneCount -= 1
            }
        }
        case UPDATE_TASK: {
            const newArr = [...state.todos]
            const index = state.todos.findIndex(todo => todo._id === action.payload._id)
            newArr.splice(index, 1, action.payload)
            return {
                ...state,
                todos: newArr,
                loading: false
            }
        }
        case FILTER_TASK: {
            return {
                ...state,
                todos: action.payload.reverse(),
                loading: false
            }
        }
        case FILTER_NAME: {
            return {
                ...state,
                filter: action.payload,
                loading: false
            }
        }
        default:
            return state
    }
}
export default loginReducer
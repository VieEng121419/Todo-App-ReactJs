import * as _state from '../../store/authState'
import { SET_USER, RESET_STATE, SET_TOKEN, LOADING_ACC, IMG_URL, LOADED_ACC, ERROR, RESET_ERROR, RESET_ERROR_IMG, ERROR_IMG, ALERT_AVATAR, ALERT_UPDATE, ALERT_LOGOUT, RESET_ALERT } from '../../constants/accountConstants'
const loginReducer = (state = _state.authState, action) => {
    switch (action.type) {
        case LOADING_ACC: {
            return {
                ...state,
                loading: true
            }
        }
        case LOADED_ACC: {
            return {
                ...state,
                loading: false
            }
        }
        case SET_USER:
            return {
                ...state,
                userInfo: action.payload,
                loggedIn: true,
                loading: false
            }
        case SET_TOKEN: {
            return {
                ...state,
                token: action.payload,
            }
        }
        case IMG_URL: {
            return {
                ...state,
                urlImg: action.payload,
                loading: false
            }
        }
        case RESET_STATE: {
            return {
                ...state,
                token: '',
                userInfo: '',
                urlImg: '',
                loggedIn: false,
                loading: false
            }
        }
        case ERROR: {
            return {
                ...state,
                errorStt: action.payload.status,
                errorData: action.payload.data
            }
        } case ERROR_IMG: {
            return {
                ...state,
                errorImg: action.payload.data.error
            }
        }
        case RESET_ERROR: {
            return {
                ...state,
                errorStt: '',
                errorData: ''
            }
        }
        case RESET_ERROR_IMG: {
            return {
                ...state,
                errorImg: '',
            }
        }
        case ALERT_UPDATE: {
            return {
                ...state,
                alertUpdate: true
            }
        }
        case ALERT_LOGOUT: {
            return {
                ...state,
                alertLogout: true
            }
        }
        case ALERT_AVATAR: {
            return {
                ...state,
                alertAvatar: true
            }
        }
        case RESET_ALERT: {
            return {
                ...state,
                alertUpdate: false,
                alertAvatar: false,
                alertLogout: false
            }
        }
        default:
            return state
    }
}
export default loginReducer
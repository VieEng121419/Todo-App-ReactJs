import api from '../../apis/api'
import { SET_USER, RESET_STATE, SET_TOKEN, LOADING_ACC, IMG_URL, LOADED_ACC, ERROR, RESET_ERROR, ERROR_IMG, RESET_ERROR_IMG, ALERT_UPDATE, ALERT_LOGOUT, ALERT_AVATAR, RESET_ALERT } from '../../constants/accountConstants'


export const login = (data) => async (dispatch) => {
    dispatch({ type: LOADING_ACC })
    dispatch({ type: RESET_ERROR })
    try {
        const res = await api.post("user/login",
            { email: data.email, password: data.password })
        dispatch({ type: SET_USER, payload: res.data.user })
        dispatch({ type: SET_TOKEN, payload: res.data.token })
    }
    catch (e) {
        dispatch({ type: LOADED_ACC })
        dispatch({ type: ERROR, payload: e.response })
    }
}

export const signUp = (data) => async dispatch => {
    dispatch({ type: LOADING_ACC })
    dispatch({ type: RESET_ERROR })
    try {
        const res = await api.post('user/register', {
            name: data.name,
            email: data.email,
            password: data.password,
            age: data.age
        })
        dispatch({ type: SET_USER, payload: res.data.user })
        dispatch({ type: SET_TOKEN, payload: res.data.token })
    }
    catch (e) {
        dispatch({ type: LOADED_ACC })
        dispatch({ type: ERROR, payload: e.response })
    }
}

export const logout = () => async dispatch => {
    dispatch({ type: LOADING_ACC })
    dispatch({ type: RESET_ERROR })
    try {
        await api.post('user/logout')
        dispatch({
            type: RESET_STATE,
        })
        dispatch({ type: ALERT_LOGOUT })
    }
    catch (e) {
        dispatch({ type: LOADED_ACC })
        dispatch({ type: ERROR, payload: e.response })
    }
    finally {
        dispatch({ type: RESET_ALERT })
    }
}

export const edit = (data) => async dispatch => {
    dispatch({ type: LOADING_ACC })
    dispatch({ type: RESET_ERROR })
    try {
        const res = await api.put('user/me', {
            name: data.name,
            age: data.age
        })
        dispatch({ type: SET_USER, payload: res.data.data })
        dispatch({ type: ALERT_UPDATE })
    }
    catch (e) {
        dispatch({ type: LOADED_ACC })
        dispatch({ type: ERROR, payload: e.response })
    }
    finally {
        dispatch({ type: RESET_ALERT })
    }
}
export const getImg = (data) => async dispatch => {
    dispatch({ type: LOADING_ACC })
    dispatch({ type: RESET_ERROR })
    try {
        const res = await api.get(`user/${data}/avatar`)
        dispatch({ type: IMG_URL, payload: res.config.url })
    }
    catch (e) {
        dispatch({ type: LOADED_ACC })
    }
}
export const uploadImg = (data) => async dispatch => {
    const formData = new FormData()
    formData.append('avatar', data)
    dispatch({ type: LOADING_ACC })
    dispatch({ type: RESET_ERROR_IMG })
    try {
        await api({
            method: 'post',
            url: `user/me/avatar`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        dispatch({ type: ALERT_AVATAR })
    }
    catch (e) {
        dispatch({ type: LOADED_ACC })
        dispatch({ type: ERROR_IMG, payload: e.response })
    }
    finally {
        dispatch({ type: RESET_ALERT })
    }
}


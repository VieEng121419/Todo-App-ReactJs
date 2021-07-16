import api from '../../apis/api'
import { SET_LIST, ADD_TASK, DELETE_TASK, UPDATE_TASK, FILTER_NAME, FILTER_TASK, LOADING, GET_COUNT } from '../../constants/todosConstants'

export const getAllTasks = (data) => async (dispatch) => {
    try {
        const res = await api.get("task")
        dispatch({ type: GET_COUNT, payload: res.data.count })
    }
    catch (e) {
        console.log(e);
    }
}
export const getTasks = (data) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        const res = await api.get(`task?limit=${data.limit}&skip=${data.skip}`)
        dispatch({ type: SET_LIST, payload: res.data.data })
        dispatch({ type: FILTER_NAME, payload: data.filter })
    }
    catch (e) {
        console.log(e);
    }
}
export const addTask = (data) => async dispatch => {
    dispatch({ type: LOADING })
    try {
        const res = await api.post('task', data)
        dispatch({
            type: ADD_TASK, payload: res.data.data
        })
    }
    catch (e) {
        console.log(e)
    }
}
export const deleteTask = (data) => async dispatch => {
    dispatch({ type: LOADING })
    try {
        await api.delete(`task/${data.id}`)
        dispatch({
            type: DELETE_TASK, payload: data.id
        })
    }
    catch (e) {
        console.log(e)
    }
}
export const updateTask = (data) => async dispatch => {
    dispatch({ type: LOADING })
    try {
        const res = await api.put(`task/${data.id}`, { completed: data.completed, description: data.description })
        dispatch({
            type: UPDATE_TASK, payload: res.data.data
        })
    }
    catch (e) {
        console.log(e)
    }
}
export const filterTask = (data) => async dispatch => {
    dispatch({ type: LOADING })
    try {
        const res = await api.get(`task?completed=${data.stt}`)
        dispatch({
            type: FILTER_TASK, payload: res.data.data
        })
        dispatch({
            type: FILTER_NAME, payload: data.filter
        })
    }
    catch (e) {
        console.log(e)
    }
}
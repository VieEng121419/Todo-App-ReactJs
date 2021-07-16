import Axios from 'axios'

const baseURL = "https://api-nodejs-todolist.herokuapp.com";
const api = Axios.create({ baseURL })

api.interceptors.request.use(config => {
    const token = (JSON.parse(JSON.parse(localStorage.getItem('persist:root')).account).token)
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export default api
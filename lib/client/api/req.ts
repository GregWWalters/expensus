import axios from 'axios'

const req = axios
req.defaults.baseURL = process.env.API_BASE_URL
req.defaults.headers.post['Content-Type'] = 'application/json'
req.defaults.headers.common.Authorization = 'Bearer '

export default req

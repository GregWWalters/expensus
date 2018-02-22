import axios from 'axios'

// TODO: identify what more we can standardize in here
const req = axios.create({
  baseURL: process.env.API_BASE_URL,
})

export default req

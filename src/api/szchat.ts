import axios from 'axios'

const szAPI = axios.create({
  baseURL: 'https://interas.sz.chat/api/v4'
})

export { szAPI }

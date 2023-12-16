import axios, { isAxiosError } from 'axios'
const request = axios.create({
  baseURL: 'https://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    let errorMessage = ''

    if (isAxiosError(error)) {
      if (error.response) {
        errorMessage = `${error.response.data.message}`
      } else if (error.request) {
        errorMessage = `${error.request.data.message}`
      } else {
        errorMessage = `An error occurred while processing the request`
      }
    } else {
      errorMessage = error.message
    }
    return Promise.reject(errorMessage)
  },
)

export default request;
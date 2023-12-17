import request from '../config/request'

export const setAuthorizationHeader = (token: string) => {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// 封装本地存储及读取数据
export const SET_ACCESS_TOKEN = (token: string) => {
  localStorage.setItem('ACCESS_TOKEN', token)
}

export const SET_REFRESH_TOKEN = (token: string) => {
  localStorage.setItem('REFRESH_TOKEN', token)
}

export const GET_ACCESS_TOKEN = () => {
  return localStorage.getItem('ACCESS_TOKEN')
}

export const GET_REFRESH_TOKEN = () => {
  return localStorage.getItem('REFRESH_TOKEN')
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('ACCESS_TOKEN')
  localStorage.removeItem('REFRESH_TOKEN')
}

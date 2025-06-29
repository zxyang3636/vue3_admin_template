// 封装本地存储及读取数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('Authorization', token)
}

export const GET_TOKEN = () => {
  return localStorage.getItem('Authorization')
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('Authorization')
}

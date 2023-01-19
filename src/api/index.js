import requests from './request'

export const reqLogin = (data) => {
  return requests({
    url: '/user/login',
    method: 'post',
    data: data
  })
};

export const reqUserInfo = () => {
  return requests({
    url: '/user/getUserFromToken',
    method: 'get'
  })
}

export const reqUpUserPwd = (data) => {
  return requests({
    url: '/user/loginUserChangePassword',
    method: 'put',
    data: data
  })
}

//对于axios进行二次封装
import axios from 'axios';

import store from '@/store'

const requests = axios.create({
  baseURL: '/api',
  timeout: 50000,
});

requests.interceptors.request.use((config) => {

  //每次发送请求需要获取本机id
  //添加token

  return config;
})

requests.interceptors.response.use(
  (res) => {

    return res.data;
  },
  (error) => {
    console.log("request err:",error);
    return Promise.reject(new Error('faile'));
  }
)

//对外暴露
export default requests;
import {reqLogin,reqUserInfo} from '@/api/index'
import { roleRel } from '@/utils/roleRel';
const actions = {
  async login({commit},data){
    let result = await reqLogin(data);
    console.log(result);
    if(result.code == 200){
      commit('LOGIN',true);
    }else{
      return Promise.reject(new Error("login failed"))
    }
  },

  async getUserInfo({commit},data){
    let result = await reqUserInfo();
    if(result.code == 200){
      commit('USERINFO',result.data);
    }else{
      return Promise.reject(new Error("get userinfo failed"))
    }
  }
}

const mutations  = {
  LOGIN(state, loginStatus){
    state.loginStatus = loginStatus;
  },
  USERINFO(state, userinfo){
    state.loginStatus = true;
    state.userinfo = userinfo;
  }
}

const state = {
  loginStatus: false,
  userinfo: {}
}

const getters = {
  getRoleName(state){
    console.log(Date.now());
    return roleRel(state.userinfo.role)
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
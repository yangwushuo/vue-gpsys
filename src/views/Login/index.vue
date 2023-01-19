<template>
  <div class="login-wrapper" ref="vantaRef">
    <div class="container" :class="{ active: loginStatus }">
      <div class="form-container sign-up-container">
        <div class="form">
          <h2>注册</h2>
          <input type="text" name="username" id="username" placeholder="学号" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="密码"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="确认密码"
          />
          <button class="signUp" @click="register">注册</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="form">
          <span style="height: 30px; color: #ff0b00">{{
            loginInfo.loginErr ? "登录失败" : ""
          }}</span>
          <h2>登录</h2>
          <input
            type="text"
            name="account"
            id="account"
            placeholder="学号"
            v-model="loginInfo.account"
            @change="accountInput"
            :class="{ 'input-err': loginInfo.accoutErr }"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="密码"
            v-model="loginInfo.password"
            @change="passwordInput"
            :class="{ 'input-err': loginInfo.passwordErr }"
          />
          <a href="#" class="forget-password">忘记密码</a>
          <button class="signIn" @click="login">登录</button>
        </div>
      </div>
      <div class="overlay_container">
        <div class="overlay">
          <!-- overlay left -->
          <div class="overlay_panel overlay_left_container">
            <h2>欢迎回来!</h2>
            <p>为了与我们保持联系，请使用您的个人信息登录</p>
            <button id="sign-in" @click="toSignIn">登录</button>
          </div>
          <div class="overlay_panel overlay_right_container">
            <h2>你好同学!</h2>
            <p>输入您的个人详细信息并开始我们的旅程</p>
            <!-- <button id="sign-up" @click="toSignUp">注册</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { react } from "@babel/types";
import { reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import store from "@/store";
import _ from 'lodash'
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loginStatus = ref(false);

    var loginInfo = reactive({
      account: "",
      password: "",
      accoutErr: false,
      passwordErr: false,
      loginErr: false,
    });

    function login() {
      //校验学号密码
      if (!(loginInfo.account && loginInfo.password)) {
        //提示
        if (!loginInfo.account) {
          loginInfo.accoutErr = true;
        }

        if (!loginInfo.password) {
          loginInfo.passwordErr = true;
        }

        return;
      }

      //请求登录
      store
        .dispatch("userstore/login", {
          account: loginInfo.account,
          password: loginInfo.password
        })
        .then(() => {
          //登录成功 获取用户信息
          return store.dispatch("userstore/getUserInfo", {});
        })
        .then(() => {
          //登录成功跳转
          loginInfo.loginErr = false;
          if (route.query.redirect) {
            router.push({
              name: route.query.redirect,
              query: _.omit(route.query, ['redirect'])
            });
          } else {
            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err.message);
          loginInfo.loginErr = true;
        });
    }

    function register() {
      //校验学号，两次密码
      //请求注册
      //注册成功跳转
      //注册失败提示
    }

    function toSignIn() {
      loginStatus.value = false;
    }

    function toSignUp() {
      loginStatus.value = true;
    }

    function accountInput() {
      if (loginInfo.account) {
        loginInfo.accoutErr = false;
      }
    }

    function passwordInput() {
      if (loginInfo.password) {
        loginInfo.passwordErr = false;
      }
    }

    return {
      loginInfo,
      loginStatus,
      login,
      register,
      toSignIn,
      toSignUp,
      accountInput,
      passwordInput,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-wrapper {
  height: 80vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

h2 {
  margin-bottom: 10px;
  font-size: 32px;
  text-transform: capitalize;
}

.container {
  position: relative;
  width: 768px;
  height: 480px;
  background-color: white;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 10px;
  overflow: hidden;
}

.form-container {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: white;
  transition: all 0.6s ease-in-out;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 50px;
}

input {
  width: 100%;
  margin: 8px 0;
  padding: 12px;
  background-color: #eee;
  border: none;
  outline: none;
}

.input-err {
  box-shadow: rgba(237, 28, 36, 1) 0px 0px 0px 2px;
}

.forget-password {
  display: inline-block;
  height: 20px;
  text-decoration: none;
  color: #bbb;
  text-transform: capitalize;
  font-size: 12px;
}

.forget-password:hover {
  color: lightslategray;
  border-bottom: 2px solid $bc1;
}

button {
  background: $bc1;
  padding: 10px 50px;
  border: 1px solid transparent;
  border-radius: 20px;
  text-transform: uppercase;
  color: white;
  margin-top: 10px;
  outline: none;
  transition: transform 80;
}

button:active {
  transform: scale(0.95);
}

.overlay_container {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 100;
  right: 0;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
}

.overlay {
  position: absolute;
  width: 200%;
  height: 100%;
  left: -100%;
  background-color: $bc1;
}

.overlay_panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  color: white;
  padding: 0 40px;
  text-align: center;
}

.overlay_panel button {
  background-color: transparent;
  border: 1px solid white;
}

.overlay_panel p {
  font-size: 12px;
  margin: 10px 0 15px 0;
}

.overlay_right_container {
  right: 0;
}

.container.active .sign-up-container {
  transform: translateX(100%);
  z-index: 5;
}

.container.active .sign-in-container {
  transform: translateX(100%);
}

.container.active .overlay_container {
  transform: translateX(-100%);
}

.container.active .overlay {
  transform: translateX(50%);
}
</style>
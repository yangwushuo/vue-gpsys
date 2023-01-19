<template>
  <div class="header-wrapper">
    <div class="left-wrapper">
      <div class="project-title">
        <span id="title">GPSYS</span>
        <span class="material-symbols-sharp">timeline</span>
      </div>
    </div>
    <div class="right-wrapper">
      <div v-if="userinfo.name" class="isLogin">
        <div class="btns">
          <span class="material-symbols-sharp">notifications</span>
        </div>
        <div class="portrait">
          <a-dropdown trigger="hover">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <template #content>
              <a-doption @click="toUserCenter">
                <template #icon>
                  <span class="material-symbols-sharp">person</span>
                </template>
                <template #default>个人中心</template>
              </a-doption>
              <a-doption @click="logout">
                <template #icon>
                  <span class="material-symbols-sharp" style="color: #eb2226"
                    >logout</span
                  >
                </template>
                <template #default>退出登录</template>
              </a-doption>
            </template>
          </a-dropdown>
        </div>
        <div class="nickname">
          {{ userinfo.roleName + ":" }}{{ userinfo.name }}
        </div>
      </div>
      <div class="login" v-if="!userinfo.name">
        <a-button type="primary" shape="round"
          ><template #icon> <IconExport/> </template
          ><template #default>登录</template></a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import store from "@/store/index";
import { useRoute, useRouter } from "vue-router";
import { IconExport } from '@arco-design/web-vue/es/icon';
export default {
  name: "Header",
  components: {IconExport},
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const userstore = store.state.userstore;

    const userinfo = computed(() => {
      return {
        ...userstore.userinfo,
        roleName: store.getters["userstore/getRoleName"],
      };
    });

    function toUserCenter() {
      router.push("/userc");
    }

    function logout() {
      console.log("退出登录");
      document.cookie =
        "satoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      //重新刷新页面
      router.go(0);
    }

    return {
      userinfo,
      toUserCenter,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.header-wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & .left-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;

    & .project-title {
      font-size: 1.2rem;
      font-family: "Chillax-Bold";
      display: flex;
      align-items: center;
    }
  }

  & .right-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    & .isLogin {
      display: flex;
      flex-direction: row;
      align-items: center;

      & .btns {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
      }

      & .portrait {
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .el-avatar {
          box-shadow: rgba(0, 0, 0, 0.02) 0px 3px 3px 0px,
            rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        }
      }

      & .nickname {
        color: $fontc1;
        font-size: 16px;
        font-family: "微软雅黑";
        font-weight: bold;
        padding: 0 10px;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    & .login {
      padding: 0 10px;

      & .login-text {
        display: flex;
        align-items: center;
        color: white;
      }
    }
  }
}
</style>
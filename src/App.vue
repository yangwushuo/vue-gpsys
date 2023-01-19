<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <Aside :navData="navData" />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <div class="main-wrapper">
            <!-- <el-skeleton :rows="10" animated /> -->
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside/";
import { computed } from "@vue/runtime-core";
import store from "@/store/index";

export default {
  name: "App",
  components: {
    Aside,
  },
  setup() {
    const userstore = store.state.userstore;

    const navData = computed(() => {
      if (userstore.userinfo.role == 3) {
        return require("@/menus/stumenu.json");
      } else if (userstore.userinfo.role == 1) {
        return require("@/menus/adminmenu.json");
      }
    });

    return {
      navData,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
@import "@/assets/font/chillax/css/chillax.css";
.common-layout {
  & .el-container {
    min-height: 100vh;

    & .el-aside {
      width: auto;
    }

    & .el-container {
      & .el-header {
        height: 5vh;
        padding: 0;
      }

      .el-main {
        overflow: auto;
        background-color: $bc2;

        & .main-wrapper {
        }
      }
    }
  }
}
</style>

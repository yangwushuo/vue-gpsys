<template>
  <div class="userc-wrapper">
    <BSSubHeader
      icon="person"
      iconClass="material-symbols-sharp"
      title="用户中心"
    >
    </BSSubHeader>
    <BSCard>
      <template #content>
        <div class="info-show">
          <div class="portrait">
            <el-avatar
              :size="120"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <div class="info">
            <a-descriptions
              style="margin-top: 20px"
              :data="userinfo"
              :size="medium"
              title="用户信息"
              :column="2"
            />
          </div>
        </div>
      </template>
    </BSCard>
    <BSSubHeader
      icon="security"
      iconClass="material-symbols-sharp"
      title="安全信息"
    >
    </BSSubHeader>
    <BSCard>
      <template #content>
        <div class="security" style="height: 900px">
          <div>
            <a-list size="large" :bordered="false" :split="true">
              <a-list-item>
                <ListItem icon="password" title="密码服务">
                  <template #content>
                    <a-button
                      type="primary"
                      size="large"
                      status="success"
                      shape="round"
                      @click="openPwdModal"
                      >修改密码</a-button
                    >
                    <a-modal
                      :visible="pwdModalVisible"
                      @cancel="pwdModalCancel"
                      :footer="false"
                      :unmount-on-close="true"
                    >
                      <template #title>
                        <span class="material-symbols-sharp">password</span>
                        <span>修改密码</span>
                      </template>
                      <div class="pwd-modal-content">
                        <a-form
                          :model="pwdForm"
                          ref="pwdFormRef"
                          @submit="pwdFormSubmit"
                        >
                          <a-form-item
                            :show-colon="true"
                            field="oldPwd"
                            label="旧密码"
                            :rules="[
                              pwdFormRule.pwdRule,
                              { required: true, message: '不能为空' },
                            ]"
                            :validate-trigger="['change']"
                          >
                            <a-input-password
                              v-model="pwdForm.oldPwd"
                              placeholder="旧密码"
                              clear
                            />
                          </a-form-item>
                          <a-form-item
                            :show-colon="true"
                            field="newPwd"
                            label="新密码"
                            :rules="[
                              pwdFormRule.pwdRule,
                              { required: true, message: '不能为空' },
                            ]"
                            :validate-trigger="['change']"
                          >
                            <a-input-password
                              v-model="pwdForm.newPwd"
                              placeholder="新密码"
                            />
                          </a-form-item>
                          <a-form-item
                            :show-colon="true"
                            field="confirmNewPwd"
                            label="确认密码"
                            :rules="[
                              { required: true, message: '不能为空' },
                              pwdFormRule.pwdRule,
                              pwdFormRule.confirmPwdRule,
                            ]"
                            :validate-trigger="['change']"
                          >
                            <a-input-password
                              v-model="pwdForm.confirmNewPwd"
                              placeholder="确认密码"
                            />
                          </a-form-item>
                          <a-form-item>
                            <div class="pwd-modal-btns">
                              <a-button-group>
                                <a-button
                                  html-type="submit"
                                  type="primary"
                                  shape="round"
                                  :loading="pwdForm.upPwdLoading"
                                >
                                  确认
                                </a-button>
                                <a-button
                                  type="outline"
                                  shape="round"
                                  @click="pwdModalCancel"
                                >
                                  取消
                                </a-button>
                              </a-button-group>
                            </div>
                          </a-form-item>
                        </a-form>
                      </div>
                    </a-modal>
                  </template>
                </ListItem>
              </a-list-item>
              <a-list-item></a-list-item>
            </a-list>
          </div>
        </div>
      </template>
    </BSCard>
  </div>
</template>

<script>
import { reactive, ref, computed } from "@vue/reactivity";
import ListItem from "@/components/ListItem";
import { NotificationSuccess, NotificationError } from "@/common/Notification";
import { reqUpUserPwd } from "@/api/index";
import store from "@/store/index";
export default {
  name: "UserCenter",
  components: {
    ListItem,
  },
  setup() {
    const userstore = store.state.userstore;
    var pwdModalVisible = ref(false);
    const pwdFormRef = ref(null);
    const pwdForm = reactive({
      oldPwd: "",
      newPwd: "",
      confirmNewPwd: "",
      upPwdLoading: false,
    });
    const pwdFormRule = {
      pwdRule: {
        validator: (value, cb) => {
          return new Promise((resolve, reject) => {
            console.log(value);
            if (value?.length < 6 || value?.length > 24) {
              cb("密码长度错误,6-24位");
            }
            resolve();
          });
        },
      },
      confirmPwdRule: {
        validator: (value, cb) => {
          return new Promise((resolve, reject) => {
            if (pwdForm.newPwd != pwdForm.confirmNewPwd) {
              cb("两次密码不一致");
            }
            resolve();
          });
        },
      },
    };

    function openPwdModal() {
      pwdModalVisible.value = true;
    }

    function pwdModalCancel() {
      pwdForm.oldPwd = "";
      pwdForm.newPwd = "";
      pwdForm.confirmNewPwd = "";
      pwdModalVisible.value = false;
    }

    function pwdFormSubmit(res) {
      //判断一下有没有校验错误
      if (res.errors) return;
      //按钮加载状态
      pwdForm.upPwdLoading = true;

      reqUpUserPwd({
        oldPwd: pwdForm.oldPwd,
        newPwd: pwdForm.newPwd,
      })
        .then((res) => {
          if (res.code == 200) {
            NotificationSuccess({
              title: "密码修改成功",
            });
            pwdForm.upPwdLoading = false;
            pwdModalCancel();
          } else {
            pwdFormRef.value.setFields({
              oldPwd: {
                status: "error",
                message: "旧密码错误",
              },
            });
            pwdForm.upPwdLoading = false;
          }
        })
        .catch((err) => {
          NotificationError({
            title: "密码修改失败",
          });
          pwdForm.upPwdLoading = false;
          pwdModalCancel();
        });
    }

    const userinfo = computed(() => {
      let data = userstore.userinfo;
      return [
        {
          label: "角色",
          value: store.getters["userstore/getRoleName"],
        },
        {
          label: "账号",
          value: data.account,
        },
        {
          label: "姓名",
          value: data.name,
        },
        {
          label: "创户时间",
          value: `${data.createTime[0]}-${data.createTime[1]}-${data.createTime[2]} ${data.createTime[3]}:${data.createTime[4]}:${data.createTime[5]}`,
        },
        {
          label: "最近一次登录",
          value: `${data.updateTime[0]}-${data.updateTime[1]}-${data.updateTime[2]} ${data.updateTime[3]}:${data.updateTime[4]}:${data.updateTime[5]}`,
        },
      ];
    });

    return {
      pwdModalVisible,
      pwdFormRef,
      pwdForm,
      pwdFormRule,
      openPwdModal,
      pwdModalCancel,
      pwdFormSubmit,
      userinfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
.el-divider {
  margin: 1rem 0;
}
.userc-wrapper {
  width: 100%;

  & .title {
    text-align: left;
    font-size: 1.5rem;
    box-sizing: border-box;
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }

  & .info-show {
    display: flex;
    flex-direction: row;

    & .portrait {
      padding: 0 1rem;
    }
    & .info {
      padding: 0 1rem;
    }
  }
}

.pwd-modal-btns {
  width: 100%;
  text-align: end;
}
</style>
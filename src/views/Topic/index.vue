<template>
  <div class="topic-wrapper">
    <BSSubHeader
      icon="short_text"
      iconClass="material-symbols-sharp"
      title="课题信息"
    >
      <template #other>
        <div class="search">
          <a-input-search
            :style="{ width: '500px' }"
            placeholder="课题/导师"
            search-button
            @search="search"
          >
            <template #prepend>
              <a-select
                :style="{ width: '80px' }"
                :default-value="selectTopicConfig.defaultValue"
                placeholder="选项"
                v-model="selectTopicConfig.value"
                :allow-search="selectTopicConfig.allowSearch"
                :options="selectTopicConfig.options"
              >
              </a-select>
            </template>
            <template #button-icon>
              <div class="icon-search">
                <span class="material-symbols-sharp">search</span>
              </div>
            </template>
            <template #button-default> <span>搜索</span> </template>
          </a-input-search>
        </div>
        <div class="btns">
          <a-button-group>
            <a-button type="primary" @click="sumbit"> 提交 </a-button>
            <a-button type="outline" @click="reset"> 重置 </a-button>
          </a-button-group>
        </div>
      </template>
    </BSSubHeader>
    <BSCard>
      <template #content>
        <div class="topic">
          <div class="box" v-for="item in 30" :key="item" @click="showDetail">
            <a-card class="card-1" hoverable>
              <template #title>
                <span class="topic-title">{{
                  "基于springboot基于springboot基于springboot基于springboot基于springboot基于springboot"
                }}</span>
              </template>
              <template #actions>
                <span
                  v-if="!(selectTopicId == item)"
                  class="material-symbols-sharp"
                  @click.stop="addTopic(item)"
                  >add</span
                >
                <span
                  v-if="selectTopicId == item"
                  class="material-symbols-sharp"
                  @click.stop="delTopic"
                  >delete</span
                >
              </template>
              <template #extra>
                <div
                  v-if="item == selectTopicId"
                  style="
                    width: 20px;
                    height: 20px;
                    background-color: #2baf2b;
                    border-radius: 50%;
                  "
                ></div>
              </template>
              <a-card-meta>
                <template #title>
                  <div></div>
                </template>
                <template #description>
                  <span class="des">
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                    晋太元中，武陵人捕鱼为业。缘溪行，忘路
                  </span>
                </template>
                <template #avatar> 导师:杨武硕 </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </template>
    </BSCard>
    <BSCard>
      <template #content>
        <div class="page">
          <div>
            <a-pagination
              :total="pageConfig.total"
              v-model:current="pageConfig.current"
              v-model:page-size="pageConfig.pageSize"
              show-page-size
              @change="changePageNum"
              @page-size-change="changePageSize"
            />
          </div>
        </div>
      </template>
    </BSCard>

    <div class="drawer">
      <a-drawer
        :width="700"
        :visible="visible"
        @ok="drawerOk"
        @cancel="drawerCancel"
        unmountOnClose
      >
        <template #title> Title </template>
        <div>
          You can customize modal body text by the current situation. This modal
          will be closed immediately once you press the OK button.
        </div>
      </a-drawer>
    </div>

  </div>
</template>

<script>
import { MessageWarning } from "@/common/Message";
import { reactive, ref } from "@vue/reactivity";
export default {
  name: "Topic",
  setup() {
    const selectTopicConfig = reactive({
      value: "",
      allowSearch: false,
      options: ["课题", "导师"],
      defaultValue: "课题",
    });

    const pageConfig = reactive({
      total: 200,
      current: 1,
      pageSize: 10,
    });

    var visible = ref(false);
    var selectTopicId = ref(null);

    function search(value) {
      let searchObj = {
        type: selectTopicConfig.value,
        content: value,
      };
      console.log(searchObj);
    }

    function sumbit() {
      if(selectTopicId.value == null){
        MessageWarning({
          content: '请选择课题,再提交'
        });
        return ;
      }
    }

    function reset() {
      selectTopicId.value = null;
    }

    function addTopic(id) {
      console.log("添加:", id);
      selectTopicId.value = id;
    }

    function delTopic() {
      selectTopicId.value = null;
    }

    function showDetail(id) {
      visible.value = true;
    }

    function drawerOk() {
      visible.value = false;
    }

    function drawerCancel() {
      visible.value = false;
    }

    function changePageNum() {}

    function changePageSize() {}

    return {
      selectTopicConfig,
      pageConfig,
      selectTopicId,
      visible,
      search,
      sumbit,
      reset,
      addTopic,
      delTopic,
      showDetail,
      drawerOk,
      drawerCancel,
      changePageNum,
      changePageSize,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
.common-title {
  font-family: "微软雅黑";
  color: $fontc1;
  font-size: 22px;
  display: flex;
  padding: 0 1rem 1rem 1rem;
  align-items: center;
}


.topic-wrapper {

  & .search {
    padding: 0 1rem;
  }
  & .icon-search {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .btns {
    padding: 0 1rem;
    box-sizing: border-box;
  }


  & .topic {
    display: flex;
    flex-wrap: wrap;

    & .box {
      padding: 5px;
      width: 300px;
      flex-grow: 1;
      cursor: pointer;
      & .card-1 {
        transition-property: all;

        & .des {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        & .topic-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      & .card-1:hover {
        transform: translateY(-4px);
      }
    }
  }
}

.page {
  display: flex;
  justify-content: center;
}
</style>
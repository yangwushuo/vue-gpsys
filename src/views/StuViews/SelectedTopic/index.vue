<template>
  <div class="selected-topic-wrapper">
    <BSSubHeader
      icon="select_check_box"
      iconClass="material-symbols-sharp"
      title="已选择课题"
    ></BSSubHeader>
    <BSCard>
      <template #content>
        <a-table
          :bordered="false"
          stripe
          :pagination="false"
          :columns="columns"
          :data="data"
          :scroll="{ y: 200 }"
        >
          <template #optional>
            <a-button-group>
              <a-button type="primary" shape="round">详情</a-button>
              <a-popconfirm
                content="确认删除?"
                type="warning"
                position="bottom"
              >
                <a-button type="outline" shape="round">删除</a-button>
              </a-popconfirm>
            </a-button-group>
          </template>
        </a-table>
      </template>
    </BSCard>
    <BSSubHeader
      icon="details"
      iconClass="material-symbols-sharp"
      title="详情"
    ></BSSubHeader>
    <BSCard>
      <template #content>
        <div class="detail">
          <div>
            <a-descriptions
              :data="data1"
              size="medium"
              title="User Info"
              :column="1"
            />
          </div>
        </div>
      </template>
    </BSCard>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  name: "SelectedTopic",
  setup() {
    const tableConfig = reactive({});
    const columns = [
      {
        title: "状态",
        dataIndex: "name",
      },
      {
        title: "任务书",
        dataIndex: "taskBook",
        slotName: "taskBook",
      },
      {
        title: "学生论文中期过程",
        dataIndex: "address",
      },
      {
        title: "课题名称",
        dataIndex: "email",
      },
      {
        title: "论文题目",
        dataIndex: "email",
      },
      {
        title: "教工工号",
        dataIndex: "email",
      },
      {
        title: "教师姓名",
        dataIndex: "email",
      },
      {
        title: "操作",
        slotName: "optional",
      },
    ];
    const data = reactive([
      {
        key: "1",
        name: "Jane Doe",
        taskBook: 23000,
        address: "32 Park Road, London",
        email: "jane.doe@example.com",
      },
      {
        key: "2",
        name: "Alisa Ross",
        taskBook: 25000,
        address: "35 Park Road, London",
        email: "alisa.ross@example.com",
      },
      {
        key: "3",
        name: "Kevin Sandra",
        taskBook: 22000,
        address: "31 Park Road, London",
        email: "kevin.sandra@example.com",
      },
      {
        key: "4",
        name: "Ed Hellen",
        taskBook: 17000,
        address: "42 Park Road, London",
        email: "ed.hellen@example.com",
      },
      {
        key: "5",
        name: "William Smith",
        taskBook: 27000,
        address: "62 Park Road, London",
        email: "william.smith@example.com",
      },
    ]);

    const data1 = [
      {
        label: "Name",
        value: "Socrates",
      },
      {
        label: "Mobile",
        value: "123-1234-1234",
      },
      {
        label: "Residence",
        value: "Beijing",
      },
      {
        label: "Hometown",
        value: "Beijing",
      },
      {
        label: "Address",
        value: "Yingdu Building, Zhichun Road, Beijing",
      },
    ];

    return {
      columns,
      data,
      data1,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
</style>
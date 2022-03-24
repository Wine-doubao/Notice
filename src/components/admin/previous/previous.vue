<template>
  <div id="previous">
    <h2>往期通知</h2>
    <div class="pre_box">
      <div
        class="pre_mes"
        v-for="item in messageList.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="item"
      >
        <div class="pre_top">
          <h3>{{ item.title }}</h3>
          <p><i class="iconfont icon-time"></i> {{ item.time }}</p>
        </div>
        <p class="pre_content">{{ item.content }}</p>
        <div class="pre_range">
          <p>活动时间：{{ item.startTime }} ~ {{ item.endTime }}</p>
          <p>活动地点：{{ item.place }}</p>
          <p class="pre_do">
            <i class="iconfont icon-mes2"></i> 已办人数：{{ item.do }}
          </p>
        </div>
      </div>
      <el-pagination
        v-model:currentPage="currentPage"
        :page-size="4"
        layout="prev, pager, next, jumper"
        :total="messageList.length"
        @current-change="handleCurrentChange"
        hide-on-single-page="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      currentPage: 1, // 当前页，初始为1
      pagesize: 4, //每页的数据
      messageList: [],
    };
  },
  created() {
    this.getPrevious();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    getPrevious() {
      // 写数据请求
      axios({
        url: `${this.$api.URL}/Previous`,
        method: "get",
      })
      .then((res) => {
        // console.log(res);
        this.messageList = res.data.pre;
      })
      .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
#previous {
  width: 75%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding: 1.5rem 0 0 5rem;
}
.pre_box {
  width: 90%;
  margin: 2rem 0 3rem;
}
.pre_mes {
  background-color: #F9F8F9;
  padding: 1rem 2rem;
  /* box-sizing: border-box; */
  margin: 1.5rem 0;
}
.pre_top {
  display: grid;
  grid-template-columns: 5fr 1fr;
}
.pre_top h3{
  color: #540804;
}
.pre_mes > p {
  margin: 0.5rem;
}
.pre_content {
  text-indent: 2em;
  color: gray;
}
.pre_range {
  display: flex;
  justify-content: space-between;
}
.pre_do{
  color: #a4243b;
}
.el-pagination {
  margin: 2rem 1rem;
  --el-pagination-font-size: 16px;
}
.iconfont {
  font-size: 22px;
}
</style>

<style>
.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 1rem;
}
</style>

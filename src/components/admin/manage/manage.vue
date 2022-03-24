<template>
  <div id="manage">
    <div class="invite">
      <h2>添加成员</h2>
      <div class="invite_form name">
        <span>Name *</span>
        <input type="text" placeholder="您要添加成员的姓名" />
      </div>
      <div class="invite_form email">
        <span>Email *</span>
        <input type="text" placeholder="您要添加成员的邮箱" />
      </div>
      <div class="invite_form message">
        <span>Message *</span>
        <input type="text" placeholder="您要发送的内容" />
      </div>
      <el-button type="primary"
        ><i class="iconfont icon-mes"></i> 添加成员</el-button
      >
    </div>
    <div class="verify">
      <h2>验证消息</h2>
      <div
        class="verify_mem"
        v-for="item in verifyList.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="item"
      >
        <div class="verify_box">
          <img src="@/assets/images/avatar.png" alt="" />
          <div class="top_name">
            <h4>{{ item.name}} </h4>
            <span> {{item.apply}}</span>
            <p>邮箱号: {{ item.email }}</p>
            <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              title="Are you sure to agree?"
              @confirm="handleIsagree(true,item.uid)"
            >
              <template #reference>
                <el-button class="verify_agree iconbox"><i class="iconfont icon-agree"></i> 同意</el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              title="Are you sure to disagree?"
              @confirm="handleIsagree(false,item.uid)"
            >
              <template #reference>
                <el-button class="verify_disagree iconbox"><i class="iconfont icon-disagree"></i> 不同意</el-button>
              </template>
            </el-popconfirm>
          </div>
          <p><i class="iconfont icon-time"></i>31 July,2020</p>
        </div>
      </div>
      <el-pagination
        v-model:currentPage="currentPage"
        :page-size="4"
        layout="prev, pager, next"
        :total="verifyList.length"
        @current-change="handleCurrentChange"
        hide-on-single-page="true"
      >
      </el-pagination>
    </div>
    <div class="remove">
      <h2>所有成员</h2>
      <div class="remove_mem">
        <div class="mem_info" v-for="temp in members" :key="temp">
          <img src="@/assets/images/avatar.png" alt="" />
          <h4>{{ temp.name }}</h4>
          <p>{{ temp.intro }}</p>
          <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            title="Are you sure to delete?"
            @confirm="handleDelete(temp.uid)"
          >
            <template #reference>
              <el-button class="iconbox"><i class="iconfont icon-delete"></i> 移除</el-button>
            </template>
          </el-popconfirm>
          <!-- <div><i class="iconfont icon-delete"></i> 移除</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from 'qs'
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  data() {
    return {
      currentPage: 1, // 当前页，初始为1
      pagesize: 4, //每页的数据
      verifyList: [],
      members: [],
    };
  },
  inject: ['reload'],
  created() {
    this.getManage();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    getManage() {
      // 写数据请求
      axios({
        url: `${this.$api.URL}/Manage`,
        method: "get",
      })
      .then((res) => {
        // console.log(res);
        this.verifyList = res.data.verify;
        this.members = res.data.allmem;
      })
      .catch((err) => console.log(err));
    },
    handleIsagree(flag, uid) {
      console.log(uid);
      axios({
        url: `${this.$api.URL}/Isagree`,
        method: 'post',
        data:{
          flag: flag,
          uid: uid
        },
        transformRequest: [function (data) {
          data = qs.stringify(data);
          return data; 
        }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      })
      .then((res) => {
        console.log(res);
        if(res.data.flag){
          this.reload();//刷新页面
        }else{
          ElMessage({
            showClose: true,
            message: '操作失败！',
          })
        }
      })
      .catch((err) => console.log(err));
    },
    handleDelete(uid){
      // console.log(uid);
      axios({
        url: `${this.$api.URL}/Delete`,
        method: 'post',
        data:{
          uid: uid
        },
        transformRequest: [function (data) {
          data = qs.stringify(data);
          return data; 
        }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      })
      .then((res) => {
        // console.log(res);
        if(res.data.flag){
          this.reload();//刷新页面
        }else{
          ElMessage({
            showClose: true,
            message: '移除失败！',
          })
        }
      })
      .catch((err) => console.log(err));
    }
  },
};
</script>

<style scoped>
#manage {
  width: 75%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding: 1.5rem 0 0 5rem;
}
.invite_form {
  width: 40%;
  display: inline-block;
  margin: 1.5rem 2rem;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid gray;
}
.invite_form.message {
  width: 90%;
}
.invite_form input {
  width: 70%;
  padding-left: 1rem;
  margin-left: 1rem;
  border: none;
  outline: none;
  border-left: 1px solid gray;
  line-height: 2rem;
  font-size: 0.9rem;
}
.invite .el-button--primary {
  margin: 1rem 1.5rem;
}
/* 验证消息 */
.verify_mem {
  width: 90%;
  padding: 1rem;
  margin: 1rem auto;
  border-bottom: 1px solid lightgray;
}
.verify_mem:hover {
  box-shadow: 5px 5px 10px lightgray;
}
.verify_box {
  display: grid;
  grid-template-columns: 1fr 5fr 2fr;
}
.verify_box img {
  width: 80px;
  height: 80px;
  border: 5px solid #eaf4f4;
  border-radius: 50%;
}
.top_name h4 {
  margin: 0;
  display: inline-block;
  margin-right: 0.5rem;
}
.top_name span {
  color: gray;
}
.top_name p {
  margin-top: 0.5rem;
}
.verify_box > p {
  color: gray;
}
.iconbox {
  cursor: pointer;
  display: inline-block;
  margin: 3rem 2rem 1rem 1rem;
  font-size: 0.9rem;
}
.iconbox:hover,
.mem_info > div:hover {
  color: #409eff;
}
.verify .iconfont,
.remove .iconfont {
  font-size: 25px;
}
.el-pagination {
  margin: 2rem 1rem;
  --el-pagination-font-size: 16px;
}
.remove_mem {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 2rem 0 3rem;
}
.mem_info {
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  text-align: center;
  border: 1px solid lightgray;
}
.mem_info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #eaf4f4;
}
.mem_info p {
  color: gray;
}
.mem_info > div {
  cursor: pointer;
}
</style>

<style>
/* 分页组件全局样式 */
.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 1rem;
}
</style>
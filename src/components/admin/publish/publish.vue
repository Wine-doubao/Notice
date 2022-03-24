<template>
  <div id="publish">
    <div class="add_content">
      <h2>添加通知内容</h2>
      <div class="add_top">
        <div class="pub_date">
          <i class="iconfont icon-time"></i>
          <span>{{nowTime}}</span>
        </div>
        <div class="pub_author">
          <i class="iconfont icon-user"></i>
          Posted by<input type="text" class="author" :value="aname" disabled />
        </div>
        <div class="pub_title">
          <i class="iconfont icon-title"></i>
          Title<input type="text" v-model="title"/>
        </div>
        <div class="pub_start">
          <i class="iconfont icon-start"></i>
          Start time<input type="date" v-model="stime"/>
        </div>
        <div class="pub_end">
          <i class="iconfont icon-end"></i>
          End time<input type="date" v-model="etime"/>
        </div>
        <div class="pub_place">
          <i class="iconfont icon-place"></i>
          Place<input type="text" v-model="place"/>
        </div>
      </div>
      <div class="add_text">
        <textarea
          name="text"
          style="resize: none"
          placeholder="快来发布通知吧~"
          v-model="content"
        ></textarea>
      </div>
    </div>
    <div class="add_member">
      <h2>通知对象</h2>
      <div class="member_box">
        <el-checkbox-group
          v-model="checkedMem"
          @change="handleCheckedMemChange"
        >
          <el-checkbox v-for="item in members" :key="item.u_id" :label="item">
            {{item.u_name}}
          </el-checkbox>
        </el-checkbox-group>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </div>
      <div class="mem_btn">
        <el-button type="primary" @click="publish()">确认发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from 'qs'
import storage from '@/utils/storage.js'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      members: [],    
      checkAll: false,
      isIndeterminate: true,
      aname: "",
      nowTime: "",
      title: '',
      stime: '',
      etime: '',
      place: '',
      content: '',
      checkedMem: [],
    };
  },
  created() {
    //获取通知对象
    this.getNoticeObj();
    this.getNowTime();
    this.getAdminName();
  },
  methods: {
    getNoticeObj() {
      axios({
        url: `${this.$api.URL}/Nobj`,
        method: "get",
      })
      .then((res) => {
        // console.log(res);
        for(let i of res.data.nobj){
          this.members.push(i);
        }
      })
      .catch((err) => console.log(err));
    },
    publish() {
      //提取出选中成员的学号
      let mem = [];
      for(let item of this.checkedMem){
        mem.push(item.u_id);
      }
      mem = mem.join(',');
      // console.log(mem);
      axios({
        url: `${this.$api.URL}/Publish`,
        method: "post",
        data: {
          ntime: this.nowTime,
          title: this.title,
          stime: this.stime,
          etime: this.etime,
          place: this.place,
          content: this.content,
          mem: mem,
        },
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        //dataType: "json",
      })
      .then((res) => {
        // console.log(res);
        if(res.data.flag){
          ElMessage({
            showClose: true,
            message: '提交成功！',
            type: 'success',
          })
          this.title = '';
          this.stime = '';
          this.etime = '';
          this.place = '';
          this.content = '';
          this.checkedMem = [];
        }else{
          ElMessage({
            showClose: true,
            message: '提交失败！',
            type: 'error',
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getNowTime() {
      let date = new Date();
      let Y = date.getFullYear() + "-";
      let M =(date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.nowTime = Y+M+D;
    },
    getAdminName(){
      let info = storage.getExpire('ainfo');
      this.aname = info.a_name;
    },
    handleCheckedMemChange(value) {
      console.log(value);
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.members.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.members.length;
    },
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedMem = val ? this.members : [];
      this.isIndeterminate = false;
    },
  },
};
</script>

<style scoped>
#publish {
  width: 75%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding: 1.5rem 0 0 5rem;
}
.add_top > div {
  display: inline-block;
  margin-bottom: 1rem;
  margin-right: 1.5rem;
  color: gray;
}
.add_top .author {
  width: 70px;
}
.add_top input {
  width: 8rem;
  padding-left: 0.5rem;
  border: none;
  outline: none;
  border-bottom: 2px solid black;
  line-height: 1.5rem;
  font-size: 1rem;
  background-color: transparent;
}
.iconfont {
  font-size: 25px;
}
.add_text textarea {
  width: 90%;
  height: 250px;
  padding: 1.5rem;
  line-height: 1rem 1.5rem;
  font-size: 1rem;
  border: none;
  outline: none;
  color: white;
  background-color: #ced5c0;
}
.member_box {
  width: 90%;
  margin: 0;
}
.mem_btn {
  text-align: center;
}
</style>

<style>
#publish .el-checkbox-group {
  display: grid;
  grid-template-columns: repeat(5, 20%);
}
#publish .el-checkbox__label {
  font-size: 1rem;
}
#publish .el-checkbox {
  margin-right: 3rem;
}
#publish .el-button--primary {
  margin: 1rem 0 3rem;
}
</style>

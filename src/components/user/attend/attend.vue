<template>
  <div id="attend">
    <h2>申请加入</h2>
    <div class="attend_form">
      姓名：<el-input v-model="name" :value="name" disabled/>
      邮箱：<el-input v-model="email" :value="email" disabled/><br>
      选择组织：<el-cascader v-model="org" :options="options" clearable /> <br>
      申请理由：<el-input :rows="4" type="textarea" resize="none" v-model="reason" placeholder="Please write down your reasons for application" />
      <div class="attend_btn">
        <el-button type="danger" @click="subAttend()">提交申请</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      name: '',
      email: '',
      org: '',
      reason: '',
      options: [],
      total: 0,
    }
  },
  created() {
    this.getOrgName();
  },
  methods: {
    //不能超过四个组织，可选组织为自己没有加入过的
    getOrgName(){
      let info = storage.getExpire('info');//信息回显
      this.name = info.u_name;
      this.email = info.u_email;
      axios({
        url: `${this.$api.URL}/OrgName`,
        method: 'get'
      })
      .then(res => {
        // console.log(res);
        let len = res.data.label.length;
        this.total = res.data.total - len;
        // if( this.total>= 4){//已经参加了四个组织
        //   ElMessage({
        //     message: '已经加入四个组织，无法再加入其他组织',
        //     type: 'warning',
        //   })
        // }
        for(let i=0;i<len;i++){
          this.options.push({
            value: i,
            label: res.data.label[i].label
          });
        }
      })
      .catch(err => console.log(err))
    },
    // 提交申请
    subAttend(){
      let org = this.options[this.org[0]].label;
      // console.log(org);
      axios({
        url: `${this.$api.URL}/Attend`,
        method: 'post',
        data: {
          uorg: org,
          ureason: this.reason
        },
        transformRequest: [function (data) {
          data = qs.stringify(data);
          return data; 
        }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        dataType: "json"
      })
      .then(res => {
        // console.log(res);
        if(res.data.flag){
          ElMessage({
            showClose: true,
            message: res.data.mes,
            type: 'success',
          })
          this.org = '';
          this.reason = '';
        }else{
          ElMessage({
            showClose: true,
            message: '申请失败！',
            type: 'error',
          })
        }
      })
      .catch(err => console.log(err))
    }
  },
}
</script>

<style scoped>
#attend{
  padding: 3rem 5rem 0;
}
.attend_form{
  background-color: #F9F8F9;
  padding: 2rem;
  border-radius: 10px;
}
.el-input:nth-of-type(1),
.el-input:nth-of-type(2){
  width: 35%;
  margin: 1rem;
}
.attend_btn{
  text-align: center;
  margin: 2rem 0;
}
.el-button--danger{
  width: 20%;
}
</style>

<style>
.el-cascader,
.el-textarea{
  width: 80%;
  margin: 1rem;
}
.el-textarea{
  vertical-align: middle;
}
.el-tag.el-tag--info{
  color: black;
  font-size: 1rem;
}
</style>

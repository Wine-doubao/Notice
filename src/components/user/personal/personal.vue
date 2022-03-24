<template>
  <div id="personal">
    <p>::: <span>个人中心</span> :::</p>
    <div class="personal_form personal_id">
      <i class="iconfont icon-realname"></i><span>学号</span>
      <input type="text" name="id" :value="info.u_id" disabled />
    </div>
    <div class="personal_form personal_name">
      <i class="iconfont icon-name"></i><span>姓名</span>
      <input type="text" name="name" :value="info.u_name" disabled />
    </div>
    <div class="personal_form personal_org">
      <i class="iconfont icon-org"></i><span class="demonstration">组织</span>
      <input type="text" name="org" :value="orgs_name" disabled />
    </div>
    <div class="personal_form personal_email">
      <i class="iconfont icon-email"></i><span>邮箱</span>
      <input type="text" name="email" :value="info.u_email" />
    </div>
    <div class="personal_form personal_intro">
      <i class="iconfont icon-intro"></i><span>个人简介</span>
      <textarea name="intro" :value="info.u_introduction" style="resize: none"></textarea>
    </div>
    <div class="personal_btns">
      <el-button type="danger" plain>更换头像</el-button>
      <el-button type="danger" plain @click="goChangePsw()">修改密码</el-button>
      <el-button type="danger" plain>保存更改</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
// import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      info:{},
      orgs_name:"",
    };
  },
  created(){ 
    this.getUinfo();
  },
  methods: {
    getUinfo(){
      axios({
        url: `${this.$api.URL}/Uinfo`,
        method: 'get',
      })
      .then(res => {
        this.info = res.data.info;
        let org = [];
        for(let item of res.data.orgname){
          org.push(item.org_name);
        }
        this.orgs_name = org.join("，");
      })
      .catch(err => console.log(err))
    },
    goChangePsw(){
      this.$router.push('/user/personal/changepsw');
    }
  },
};
</script>

<style scoped>
#personal {
  padding: 3rem 5rem 0;
}
#personal > p {
  color: #ea511f;
  margin-bottom: 3rem;
}
#personal > p span {
  color: black;
  /* font-size: 0.85rem; */
}
.iconfont {
  margin-right: 0.5rem;
  color: #ea511f;
  vertical-align: middle;
  font-size: 28px;
}
.icon-name,
.icon-intro,
.icon-email {
  font-size: 32px;
}
#personal > .personal_form {
  width: 70%;
  margin: 1.75rem 5rem;
  line-height: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 13fr;
}
#personal > div input,
#personal > div select {
  font-size: 1rem;
  line-height: 2.5rem;
  border: none;
  border-left: 2px solid #ea511f;
  outline: none;
  background-color: #f5f5f5;
  padding-left: 1rem;
}
#personal > div input:disabled {
  color: gray;
}
#personal > div select {
  padding: 0.75rem 0 0.75rem 1rem;
}
#personal > div textarea {
  height: 100px;
  margin-bottom: 1rem;
  padding: 0 1rem;
  line-height: 1.5rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #f5f5f5;
  border-left: 2px solid #ea511f;
  font-family: "微软雅黑";
}
</style>


<template>
  <div id="admin">
    <div class="admin_left">
      <div class="left_avatar">
        <img src="@/assets/images/avatar.png" alt="" @click="goAdminPer()">
        <p>{{aname}}</p>
        <p>{{aemail}}</p>
      </div>
      <div class="left_category">
        <h3>Choose Category</h3>
        <div class="left_cate" @click="goPublish()">
          <p>发布通知</p>
        </div>
        <div class="left_cate" @click="goEnroll()">
          <p>招新活动</p>
        </div>
        <div class="left_cate" @click="goManage()">
          <p>管理成员</p>
        </div>
        <div class="left_cate" @click="goPrevious()">
          <p>往期通知</p>
        </div>
      </div>
      <div class="left_search">
        Search <el-input v-model="search" placeholder="input something" />
      </div>
      <div class="left_exit">
        <button @click="exit()"><i class="iconfont icon-exit"></i>退出</button>
      </div>
    </div>
    <div class="admin_right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      search: '',
      aname: '',
      aemail: ''
    }
  },
  created() {
    this.getAdminInfo();
  },
  methods: {
    getAdminInfo(){
      axios({
        url: `${this.$api.URL}/Ainfo`,
        method: 'get'
      })
      .then(res => {
        // console.log(res);
        this.aname = res.data.info.a_name;
        this.aemail = res.data.info.a_email;
        // 设置localStorage
        storage.setExpire('ainfo',res.data.info);
      })
      .catch(err => console.log(err))
    },
    exit(){
      axios({
        url: `${this.$api.URL}/Aexit`,
        method: 'get'
      })
      .then(res => {

      })
      .catch(err => console.log(err))
      //退出时清空
      storage.clear();
      this.$router.push("/login");
    },
    goAdminPer(){
      this.$router.push('/admin/personal');
    },
    goPublish(){
      this.$router.push('/admin/publish');
    },
    goEnroll(){
      this.$router.push('/admin/enroll');
    },
    goManage(){
      this.$router.push('/admin/manage');
    },
    goPrevious(){
      this.$router.push('/admin/previous');
    }
  },
}
</script>

<style scoped>
#admin{
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.admin_left{
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  background-image: url(~@/assets/images/slide.jpg);
  background-size: cover;
  color: white;
}
.left_avatar{
  margin: 3rem 1rem;
  cursor: pointer;
}
.left_avatar img{
  width: 70px;
  border-radius: 50%;
}
.left_avatar p{
  margin: 0.25rem;
}
.left_category h3{
  margin: 4rem 1rem 1rem;
}
.left_category div{
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 0.4rem 1rem;
  background-color: rgba(0,0,0,0.4);
  cursor: pointer;
}
.left_category div p{
  margin: 0;
}
.left_category div:hover{
  background-color: rgba(244,144,83,0.6);
}
.left_search{
  position: absolute;
  left: 1rem;
  bottom: 8rem;
}
.left_exit{
  position: absolute;
  left: 1rem;
  bottom: 3rem;
}
.left_exit button{
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 1rem;
}
.icon-exit{
  font-size: 1.25rem;
  font-weight: bolder;
  vertical-align: text-top;
  margin-right: 0.25rem;
}
</style>
<style>
.left_search .el-input{
  width: 70%;
}
.left_search .el-input__inner{
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}
</style>
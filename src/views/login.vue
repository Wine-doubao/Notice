<template>
  <div id="login">
    <div class="login_boxes">
      <div class="login_left">
        <p class="login_title">登录</p>
        <p class="login_txt">为您制作最简单的消息表单，和复杂说拜拜<br>WELCOME</p>
        <form action="" method="">
          <div class="login_user">
            <i class="iconfont icon-blackuser"></i>
            <input type="text" name="username" v-model="name" placeholder="账号/学号">
          </div>
          <div class="login_psw">
            <i class="iconfont icon-blackpsw"></i>
            <input type="password" name="password" v-model="psw" placeholder="密码">
          </div>
          <div class="login_isAdmin">
            <input type="checkbox" name="isAdmin" @click="check()">
            管理员
          </div>
           <el-button :plain="true" @click="login()">登录</el-button>
        </form>
      </div>
      <div class="login_right">
        <h2>欢迎登录</h2>
        <p>输入您的个人信息，开始您的旅程！</p>
        <!-- <button @click="toReg()">注册</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
import { ElMessage } from 'element-plus'
import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      name: '',
      psw:'',
      checked:false,
    }
  },
  methods: {
    // toReg(){
    //   this.$router.push('/register');
    // },
    check(item){
      this.checked = !this.checked;
      console.log(this.checked);
    },
    login(){
      document.cookie = "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if(this.name.trim()=="" || this.psw.trim()==""){
        ElMessage({
          message: '请将信息填写完整！',
          type: 'warning',
        })
      }else{
        axios({
          url:`${this.$api.URL}/Login`,
          method: 'post',
          data: {
            name:this.name,
            pass:this.psw,
            checked:this.checked,
          },
          transformRequest: [function (data) {
            data = qs.stringify(data);
            return data; 
          }],
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          dataType: "json"
        })
        .then(res=>{
          console.log(res);
          if(res.data.flag){
            storage.setExpire('login',true);
            if(res.data.isAdmin) this.$router.push("/admin/personal");
            else this.$router.push("/user/personal");
          }else{
            ElMessage({
              showClose: true,
              message: '用户名或密码错误。',
              type: 'error',
            })
          }
        })
        .catch(err => {
            console.log(err);                
        })
      }
    }
  },
}
</script>

<style scoped>
#login{
  height: 100vh;
  box-sizing: border-box;
  padding: 2rem 0;
  background-color: #FDF6ED;
}
.login_boxes{
  display: flex;
  width: 80%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow:  10px 10px 20px #cacaca;
}
.login_left{
  width: 50%;
  box-sizing: border-box;
  padding: 5rem 0;
}
.login_title{
  text-align: center;
  font-size: 1.25rem;
}
.login_txt{
  text-align: center;
  font-size: 0.7rem;
  color: gray;
}
form{
  text-align: center;
  margin: 3rem;
}
form .iconfont{
  margin-right: 0.5rem;
  color: gray;
  vertical-align: middle;
}
form input[type="text"],
form input[type="password"]{
  width: 50%;
  margin-bottom: 1rem;
  line-height: 1.5rem;
  border: none;
  outline: none;
  border-bottom: 2px solid #CAC9C9;
  color: gray;
}
.login_isAdmin{
  width: 60%;
  margin: 1rem auto;
  text-align: end;
}
#login .el-button{
  /* line-height: 2rem; */
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #FF0000;
  color: white;
  width: 60%;
  border-radius: 50px;
  cursor: pointer;
}
.login_right{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #FF464C;
  color: white;
  border-radius: 0 10px 10px 0;
}
.login_right h2{
  margin: 1rem;
}
.login_right p{
  margin: 0;
}
.login_right button{
  margin: 2rem;
  line-height: 2rem;
  font-size: 18px;
  border: none;
  outline: none;
  border: 1px solid white;
  color: white;
  width: 50%;
  background-color: transparent;
  border-radius: 50px;
  cursor: pointer;
}
</style>
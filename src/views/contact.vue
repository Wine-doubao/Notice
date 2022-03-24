<template>
  <div id="contact">
    <div class="nav">
      <img src="@/assets/images/logo.png" alt="" />
      <el-menu
        mode="horizontal"
        default-active="2"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link to="/">介绍</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/contact">联系我们</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/login">登录注册</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="contact_main">
      <div class="contact_black"></div>
      <div class="contact_us">
        <p>联系我们</p>
        <p>欢迎留下您宝贵的建议，我们会认真采纳并及时反馈</p>
      </div>
      <div class="contact_mes">
        <p>留下您的信息</p>
        <input type="text" placeholder="名字" v-model="name"/>
        <input type="email" placeholder="邮箱" v-model="email"/>
        <textarea
          name="mes"
          id="mes"
          placeholder="写下留言..."
          v-model="mes"
          style="resize: none"
        ></textarea>
        <el-button :plain="true" @click="subContact()">提交信息</el-button>
      </div>
    </div>
    <footer class="footer_author">
      <h3>作者</h3>
      <p>江西师大计信学院19级计科3班</p>
      <p>姜玲芳 罗斌</p>
    </footer>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      name:'',
      email:'',
      mes:''
    }
  },
  methods: {
    subContact(){
      if(this.name.trim()=="" || this.email.trim()=="" || this.mes.trim()==""){
        ElMessage({
          message: '请将信息完整填写。',
          type: 'warning',
        })
      }else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)){
        ElMessage({
          message: '邮箱格式有误。',
          type: 'warning',
        })
      }else{
        ElMessage({
          showClose: true,
          message: '提交成功！',
          type: 'success',
        })
      }
    }
  },
};
</script>

<style scoped>
#contact {
  background-color: #e4e3e1;
}
.nav {
  min-height: 30vh;
  background-image: url(~@/assets/images/wood.jpg);
  background-size: cover;
}
.nav > img {
  position: absolute;
  left: 0;
  top: 0;
}

/* 导航栏 */
.el-menu {
  width: 100%;
  padding: 20px 100px;
  border-bottom: none;
  background-color: transparent;
}
.el-menu .el-menu-item {
  font-size: 20px;
}
.el-menu .el-menu-item a {
  text-decoration: none;
}
.el-menu--horizontal {
  justify-content: flex-end;
}

.main_sec1,
.main_sec3,
.main_sec2 > h3,
.main_sec2 > p {
  width: 60%;
  margin: 0 auto;
}

/* 提交信息 */
.contact_main {
  width: 60%;
  margin: 0 auto;
  position: relative;
  top: -100px;
  background-color: white;
}
.contact_black {
  width: 100%;
  height: 120px;
  background-color: black;
}
.contact_us {
  padding: 2rem;
  border-bottom: 1px solid #b9bab5;
}
.contact_us p {
  margin: 0.25rem;
}
.contact_us p:nth-child(2) {
  font-size: 0.8rem;
  color: #b9bab5;
}
.contact_mes {
  padding: 2rem;
}
.contact_mes input {
  width: 40%;
  margin: 0 1rem 1rem 0;
  padding-left: 0.5em;
  line-height: 2rem;
  font-size: 0.8rem;
  border: none;
  outline: none;
  background-color: #efefef;
  /* color: #B9BAB5; */
  border-radius: 5px;
  box-shadow: inset 20px 20px 60px #efefef, inset -20px -20px 60px #efefef;
}
.contact_mes textarea {
  width: 90%;
  height: 200px;
  margin-bottom: 1rem;
  padding-left: 0.5em;
  line-height: 1.5rem;
  font-size: 0.8rem;
  border: none;
  outline: none;
  background-color: #efefef;
  font-family:"微软雅黑";
  /* color: #B9BAB5; */
  border-radius: 5px;
  box-shadow: inset 20px 20px 60px #efefef, inset -20px -20px 60px #efefef;
}
#contact .el-button {
  background-color: #776453;
  color: white;
  border: none;
  outline: none;
  padding: 0.5rem;
  cursor: pointer;
}
.footer_author {
  /* width: 100%; */
  height: 150px;
  background-image: url(~@/assets/images/wood.jpg);
  color: white;
  padding: 1rem 0 1rem 5rem;
}
.footer_author p{
  margin: 0;
  /* font-size: 0.75rem; */
}
</style>
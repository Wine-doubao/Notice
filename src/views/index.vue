<template>
  <div id="index">
    <img src="@/assets/images/logo.png" alt="" />
    <h2>集讯-消息管理系统</h2>
    <el-menu
      mode="horizontal"
      default-active="1"
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
  <div id="main">
    <section class="main_sec1">
      <h3>STYLE 01</h3>
      <p>组织介绍</p>
      <el-carousel indicator-position="outside" arrow="never" trigger="click">
        <el-carousel-item v-for="(item, index) in leader_intro" :key="index">
          <img src="@/assets/images/avatar.png" alt="" />
          <p>“{{ item.a_introduction }}”</p>
          <h3>{{ item.org_name }} {{ item.a_name }}</h3>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="main_sec2">
      <h3>STYLE 02</h3>
      <p>宣传海报</p>
      <el-carousel height="360px" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="(item, index) in org_intro" :key="index">
          <img :src="require(`@/assets/images/${item}`)" alt="" />
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="main_sec3">
      <h3>STYLE 03</h3>
      <p>往期通知</p>
      <div class="sec3_past">
        <div
          class="past_item"
          v-for="(item, index) in past_notice"
          :key="index"
        >
          <img src="@/assets/images/avatar.png" alt="" />
          <div class="past_text">
            <p>{{ item.content }}</p>
            <h3>{{ item.org_name }}</h3>
            <span>{{ item.a_name }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div id="footer">
    <div id="school">
      <h3>学校简介</h3>
      <p>
        江西师范大学是教育部、江西省人民政府共建高校和中西部高校基础能力建设工程高校。学校融文学、历史学、哲学、经济学、管理学、
        法学、理学、工学、教育学、艺术学等十大学科门类于一体，位于具有深厚历史文化底蕴，素有“物华天宝、人杰地灵"美誉的江西省省会南昌，对江西的政治、经济、文化和社会发展有较大影响，被江西省人民政府确定为优先发展的省属重点(师范)大学。
      </p>
    </div>
    <div id="subject">
      <h3>学科</h3>
      <hr />
      <div class="subs">
        <p>文学</p>
        <p>历史学</p>
        <p>哲学</p>
        <p>经济学</p>
        <p>管理学</p>
        <p>法学</p>
        <p>理学</p>
        <p>工学</p>
        <p>教育学</p>
        <p>艺术学</p>
      </div>
    </div>
    <div id="twitter">
      <h3>联系方式</h3>
      <hr />
      <div class="twall">
        <div>
          <img src="@/assets/images/home.png" alt="" />
          <p>官方网址：HTTP://ZS.JXNU.EDU.CNHTTP://WWW.JXNU.EDU.CN/</p>
        </div>
        <div>
          <img src="@/assets/images/phone.png" alt="" />
          <p>官方电话：0791-88120152，0791-88120151</p>
        </div>
        <div>
          <img src="@/assets/images/email.png" alt="" />
          <p>电子邮箱：JXSDZB@126.COM</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      leader_intro: [],
      org_intro: [ "banner2.jpg", "slide.png", "banner1.jpg"],
      past_notice: [],
    };
  },
  created() {
    axios({
      url: `${this.$api.URL}/Intro`,
      method: 'get',
    })
    .then((res) => {
      console.log(res);
      this.leader_intro = res.data.intro;
      console.log(new Date());
      this.past_notice = res.data.notice;
    })
    .catch((err) => {
      console.log(err);
    });
  }, 
};
</script>

<style scoped>
#index {
  min-height: 100vh;
  background-image: url(~@/assets/images/banner.jpg);
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 2fr 4fr;
  /* align-content: center; */
}
#index>h2{
  color: white;
  margin-top: 35px;
}

/* 导航栏 */
.el-menu {
  /* width: 100%; */
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
#main section {
  margin-top: 50px;
}
section > h3 {
  margin: 0;
  letter-spacing: 0.15em;
}
section > p {
  margin: 5px 0 50px;
}

/* 领导人介绍 */
.main_sec1 .el-carousel--horizontal {
  text-align: center;
}
.main_sec1 .el-carousel__item img {
  width: 100px;
  height: 100px;
  border: 5px solid #efb014;
  border-radius: 50%;
}
.main_sec1 .el-carousel__item p {
  width: 80%;
  margin: 35px auto;
}

/* 组织宣传*/
.main_sec2 > p {
  margin-bottom: 30px;
}
.main_sec2 .el-carousel__container img {
  width: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 往期通知 */
.sec3_past {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 350px 350px;
}
.past_item {
  margin: 30px;
  position: relative;
  border: 1px solid #dcdfe6;
}
.past_item img {
  position: absolute;
  left: -50px;
  top: 70px;
  width: 100px;
  height: 100px;
  background-color: #dbdbdb;
  border-radius: 50%;
  /* border: 2px solid #efb014; */
}
.past_text {
  margin: 30px 40px 30px 80px;
}
.past_text h3 {
  margin: 7px 0 0;
}

/*底部样式*/
#footer {
  background-color: rgb(43, 43, 43);
  height: 250px;
  color: #858585;
  font-size: 12px;
  margin-top: 40px;
  padding: 4rem 8rem;
}
#footer > div {
  display: inline-block;
}
#footer p {
  font-size: 0.85rem;
}
#footer h3 {
  color: white;
  cursor: pointer;
}
#footer hr {
  width: 30px;
  height: 2.5px;
  border: none;
  background-color: red;
  margin: 1rem 0;
}
#footer h3:hover {
  color: red;
}
#school {
  width: 40%;
  vertical-align: top;
}
#school > p {
  padding: 1.5rem 0 0;
  margin-right: 3rem;
}
#subject {
  width: 10%;
  vertical-align: top;
  padding: 0 1.5rem;
  border-right: 1px solid #585252;
  border-left: 1px solid #585252;
  height: 250px;
  position: relative;
  overflow: hidden;
}
.subs {
  position: absolute;
  left: 1.5rem;
  top: 3rem;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  /*向右移动了17个像素，刚好等于滚动条的宽度*/
}
.subs p {
  line-height: 1.5rem;
  cursor: pointer;
}
.subs p:hover {
  color: red;
}
#twitter {
  width: 40%;
  vertical-align: top;
  margin-left: 1.5rem;
  height: 250px;
}
.twall img {
  width: 20px;
  height: 20px;
  /* display: inline-block; */
  vertical-align: middle;
}
.twall p {
  display: inline-block;
  width: 80%;
}
</style>

<style>
.main_sec1 .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.main_sec1 .el-carousel__indicators--outside button {
  background-color: #dcdcdc;
  opacity: 1;
}
.main_sec1 .el-carousel__indicator.is-active button {
  background-color: #eeaf12;
}
</style>


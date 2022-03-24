<template>
  <div id="register">
    <div class="register_boxes">
      <div class="register_left">
        <h2>Welcome back!</h2>
        <p>
          To keep connected with us please register with <br />your personal
          info
        </p>
        <button @click="toLog()">重新登录</button>
      </div>
      <div class="register_right">
        <p class="register_title">注册</p>
        <p class="register_txt">
          为您制作最简单的消息表单，和复杂说拜拜<br />WELCOME
        </p>
        <form action="" method="">
          <div class="register_id">
            <i class="iconfont icon-blackuser"></i>
            <input type="text" name="id" id="" placeholder="学号" />
          </div>
          <div class="register_name">
            <i class="iconfont icon-blackname"></i>
            <input type="text" name="name" id="" placeholder="真实姓名" />
          </div>
          <div class="register_college">
            <i class="iconfont icon-blackcollege"></i>
            <!-- <input type="text" name="college" id="" placeholder="学院"> -->
            <select name="college">
              <option value="jy">计算机信息工程学院</option>
              <option value="my">马克思主义学院</option>
              <option value="hy">化学化工学院</option>
              <option value="sy">商学院</option>
              <option value="cy">财政金融学院</option>
              <option value="yy">音乐学院</option>
            </select>
          </div>
          <div class="register_psw">
            <i class="iconfont icon-blackpsw"></i>
            <input type="password" name="psw" id="" placeholder="密码" />
          </div>
          <div class="register_confirmpsw">
            <i class="iconfont icon-blackpsw"></i>
            <input
              type="password"
              name="confirmpsw"
              id=""
              placeholder="确认密码"
            />
          </div>
          <div class="register_email">
            <i class="iconfont icon-blackemail"></i>
            <input type="email" name="email" id="" placeholder="邮箱" />
          </div>
          <input type="submit" value="Create My Account" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLog() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#register {
  height: 100vh;
  box-sizing: border-box;
  padding: 2rem 0;
  background-color: #fdf6ed;
}
.register_boxes {
  display: flex;
  width: 80%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 20px #cacaca;
}
.register_left {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #ff464c;
  color: white;
  border-radius: 10px 0 0 10px;
}
.register_left h2 {
  margin: 1rem;
}
.register_left p {
  margin: 0;
  text-align: center;
}
.register_left button {
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
.register_right {
  width: 50%;
  box-sizing: border-box;
  padding: 3.5rem 0;
}
.register_title {
  text-align: center;
  font-size: 1.25rem;
}
.register_txt {
  text-align: center;
  font-size: 0.7rem;
  color: gray;
}
form {
  text-align: center;
  margin: 1rem 3rem;
}
form .iconfont {
  margin-right: 0.5rem;
  color: gray;
  vertical-align: middle;
}
form input, 
form select {
  width: 50%;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
  border: none;
  outline: none;
  border-bottom: 2px solid #cac9c9;
  color: gray;
}
form select {
  padding: 0.25rem 0;
}
input[type="submit"] {
  line-height: 2rem;
  margin-top: 1rem;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #ff0000;
  color: white;
  width: 60%;
  border-radius: 50px;
  cursor: pointer;
}
</style>
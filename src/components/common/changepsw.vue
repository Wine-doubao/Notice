<template>
  <div id="changepsw">
    <div class="changepsw_box">
      <div class="box_top">
        <h3>修改密码</h3>
        <p @click="goPersonal()">×</p>
      </div>
      <div class="box_middle">
        新密码：<el-input
          v-model="psw"
          placeholder="Please input new password"
          show-password
        />
        确认密码：<el-input
          v-model="surepsw"
          placeholder="Please make sure password"
          show-password
        />
      </div>
      <div class="box_bottom">
        <el-button type="danger">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      psw: "",
      surepsw: "",
    };
  },
  methods: {
    goPersonal(){
      
    }
  },
};
</script>

<style scoped>
#changepsw {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
.changepsw_box {
  width: 500px;
  height: 300px;
  padding: 1rem 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
}
.box_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
p {
  margin: 0;
  font-size: 1.5rem;
  cursor: pointer;
}
p:hover {
  color: #f78383;
}
h3 {
  margin: 0;
}
.box_middle{
  width: 80%;
  margin: 1.5rem auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1.5rem;
}
.box_bottom{
  text-align: center;
}
.box_bottom .el-button--danger{
  width: 7rem;
}
</style>

<template>
  <div id="allmes">
    <div class="allmes_btns">
      <router-link to="/user/allmes/message/2"><el-button >已办</el-button></router-link>
      <router-link to="/user/allmes/message/1"><el-button autofocus="true">未办</el-button></router-link>
      <router-link to="/user/allmes/statistics"><el-button>统计</el-button></router-link>
    </div>
    <p>Please check all your information. <br> Have a good time. </p>
  </div>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped>
#allmes{
  text-align: center;
  padding: 3rem 5rem 0;
}
#allmes p{
  color: gray;
  font-size: 0.75rem;
}
.allmes_btns button{
  margin: 0 0.5rem;
}
</style>
<template>
  <div id="user">
    <div class="user_left">
      <div class="left_avatar">
        <img src="@/assets/images/avatar.png" alt="" @click="goPersonal()" />
        <p>{{info.u_name}}</p>
        <p>{{info.u_email}}</p>
      </div>
      <div class="left_category">
        <h3>Choose Category</h3>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              active-text-color="#ffd04b"
              background-color="rgba(0, 0, 0, 0.2)"
              class="el-menu-vertical-demo"
              text-color="#fff"
            >
              <el-menu-item index="1" class="left_org" @click="goAllMes()">
                <p>所有通知</p>
                <p>{{total}}</p>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <span>通知分类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="'1-'+index" v-for="(item,index) in this.orgs" :key="item">
                    <router-link class="org_name" :to="'/user/notice/'+item.org_name">
                      <span>{{item.org_name}}</span>
                      <span>{{item.count}}</span>
                    </router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="3"  class="left_org" @click="goAttend()">
                <p>加入组织</p>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="left_search">
        Search <el-input v-model="search" placeholder="input something" />
      </div> -->
      <div class="left_exit">
        <button @click="exit()"><i class="iconfont icon-exit"></i>退出</button>
      </div>
    </div>
    <div class="user_right">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import storage from '@/utils/storage.js'
export default {
  data() {
    return {
      search: "",
      info: {},
      orgs: [],
      total: 0,
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    goNotice() {
      this.$router.push("/user/notice");
    },
    goPersonal() {
      this.$router.push("/user/personal");
    },
    // 获取所有通知
    goAllMes() {
      this.$router.push("/user/allmes/message/1");
    },
    goAttend() {
      this.$router.push("/user/attend");
    },
    getUserinfo(){
      axios({
        url: `${this.$api.URL}/Uinfo`,
        method: 'get',
      })
      .then(res => {
        console.log(res);
        this.info = res.data.info;
        // let name = res.data.orgname;
        // let count = res.data.orgcount;
        for(let [i,v] of res.data.orgname.entries()){
          let obj = {
            org_name: v.org_name,
            count: res.data.orgcount[i].count
          };
          this.orgs.push(obj);
          this.total += res.data.orgcount[i].count;
        }
        // 设置localStorage
        storage.setExpire('info',this.info);
        // storage.setExpire('orgs',this.orgs);
      })
      .catch(err => console.log(err))
    },
    exit(){
      axios({
        url: `${this.$api.URL}/Uexit`,
        method: 'get'
      })
      .then(res => {

      })
      .catch(err => console.log(err))
      //退出时清空
      storage.clear();
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
#user {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.user_left {
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  background-image: url(~@/assets/images/slide.jpg);
  background-size: cover;
  color: white;
}
.left_avatar {
  margin: 3rem 1rem;
  cursor: pointer;
}
.left_avatar img {
  width: 70px;
  border-radius: 50%;
}
.left_avatar p {
  margin: 0.25rem;
}
.left_category h3 {
  margin: 2rem 1rem 1rem;
}

/* 侧边导航栏 */
.left_org {
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-content: center;
  cursor: pointer;
  font-size: 0.9rem;
}
.org_name{
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: white;
}

/* 搜索框 */
.left_search {
  position: absolute;
  left: 1rem;
  bottom: 7rem;
}
.left_exit {
  position: absolute;
  left: 1rem;
  bottom: 2rem;
}
.left_exit button {
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
.icon-exit {
  font-size: 1.25rem;
  font-weight: bolder;
  vertical-align: text-top;
  margin-right: 0.25rem;
}
</style>
<style>
.left_category .el-col-12{
  max-width: 100%;
  flex: 0 0 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.left_category .el-menu-item:hover{
  background-color: rgba(244, 144, 83, 0.6);
}
.left_category .el-sub-menu__title,
.left_category .el-menu-item{
  font-size: 0.9rem;
}
.left_category .el-menu-item-group .el-menu-item{
  display: inline-block;
  width: 100%;
  text-align: center;
}
.left_search .el-input {
  width: 70%;
}
.left_search .el-input__inner {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}
</style>
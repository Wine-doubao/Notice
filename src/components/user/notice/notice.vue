<template>
  <div id="user_notice">
    <div class="notice_main">
      <div class="notice_box" v-for="(item,index) in noticeList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item">
        <img src="@/assets/images/left.png" alt="">
        <div class="notice_item">
          <div class="notice_top">
            <div class="item_reldate">
              <p>{{this.date[index].slice(0,3)}}</p>
              <p>{{this.date[index].slice(3)}}</p>
            </div>
            <div class="item_title">
              <p>{{item.title}}</p>
              <p>发布者：{{path}} {{item.author}}</p>
            </div>
          </div>
          <p>{{item.content}}</p>
          <div class="item_range">
            <p>活动时间：{{item.startDate}} ~ {{item.endDate}}</p>
            <p>活动地点：{{ item.place }}</p>
            <!-- <p><el-button type="text" :checked="item.see=='2'?true:false">已办</el-button></p> -->
            <!-- <p><input type="checkbox" ref="done" :checked="item.see=='2'?true:false" @click="done()">已办</p> -->
            <p>
              <input type="checkbox" v-if="item.see=='2'?false:true" ref="done" @click="done(item.n_id)">
              <span v-else class="check">√</span>
              已办
            </p>
          </div>
          <hr>
        </div>
      </div>
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="noticeList.length"
      @current-change="handleCurrentChange"
      hide-on-single-page=true
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  data() {
    return {
      currentPage: 1,// 当前页，初始为1
      pagesize: 3,//每页的数据
      month: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
      date: [],
      path: this.$route.params.org,
      noticeList: []
    }
  },
  inject: ['reload'],
  created() {
    this.handleUserNotice();
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.org) {
        this.path = this.$route.params.org;
        console.log(this.path);
        this.handleUserNotice();
      }
    }
  },
  methods: {
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    handleReleaseDate(date){//处理发布日期
      for(let i of date){
        let m = i.relDate.split("-");
        let str = "";
        str += this.month[parseInt(m[1])-1];
        if(m[2].slice(-1) == '1'){
          str += m[2] + "st";
        }else if(m[2].slice(-1) == '2'){
          str += m[2] + "nd";
        }else if(m[2].slice(-1) == '3'){
          str += m[2] + "rd";
        }else{
          str += m[2] + "th";
        }
        this.date.push(str);
      }
    },
    handleUserNotice(){
      // 写数据请求
      axios({
        url: `${this.$api.URL}/Notices?org=${this.path}`,
        method: 'get',
      })
      .then((res) => {
        console.log(res);
        this.noticeList = res.data.notice;
        // console.log(this.noticeList);
        this.handleReleaseDate(this.noticeList);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    done(id){
      // console.log(id);
      // console.log(this.$refs.done.checked);
      ElMessageBox.confirm(
        '确定置为已办？',
        'Warning',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
      .then(() => {
          console.log("i am confirm")
          axios({
            url: `${this.$api.URL}/SetDone`,
            method: 'post',
            data:{ 
              id: id
            },
            transformRequest: [function (data) {
              data = qs.stringify(data);
              return data; 
            }],
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          })
          .then(res =>{
            console.log(res);
            console.log(typeof res.data.flag);
            if(res.data.flag){
              this.reload();//刷新页面
            }else{
              ElMessage({
                showClose: true,
                message: '设置失败！',
              })
              this.$refs.done.checked = false;
            }
          })
          .catch(err => console.log(err))
      })
      .catch(() => {
        this.$refs.done.checked = false;
      })
    }
  },
}
</script>

<style scoped>
#user_notice{
  padding: 1rem 5rem 0;
}
.notice_main{
  padding: 1rem 2rem 0;
  background-color: #F9F8F9;
}
.notice_box{
  display: flex;
}
.notice_box>img{
  width: 170px;
  height: 170px;
}
.notice_item{
  margin: 0 3rem;
}
.notice_top{
  display: flex;
}
/* 发布日期样式 */
.item_reldate{
  width: 100px;
  height: 70px;
  border: 1px solid lightgray;
  border-top: 15px solid #C66A61;
  background-color: white;
  text-align: center;
}
.item_reldate p{
  margin: 0.25rem;
}
.item_reldate p:nth-of-type(2){
  color: gray;
}
/* 通知标题 */
.item_title{
  margin-left: 1rem;
}
.item_title p:nth-of-type(1){
  font-size: 1rem;
}
.item_title p:nth-of-type(2){
  font-size: 0.75rem;
  color: gray;
}
/* 通知内容 */
.notice_item>p,
.item_range{
  color: gray;
  font-size: 0.85rem;
}
.notice_item>p:nth-of-type(1){
  text-indent: 2em;
  margin: 0.25rem;
}
.notice_item hr{
  width: 100%;
  height: 1px;
  border: none;
  background-color: lightgray;
  margin: 0.75rem auto;
}
/* 通知时间地点 */
.item_range{
  display: flex;
  justify-content: space-between;
}
.item_range p{
  margin: 0.25rem;
}
.el-pagination{
  /* margin-top: 1rem; */
  --el-pagination-font-size: 16px;
}
.item_range .check{
  color: #C66A61;
}
</style>

<style>
.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 1rem;
}
</style>

<template>
  <div id="admin_personal">
    <p>::: <span>账号信息</span> :::</p>
    <div class="personal_form personal_id">
      <i class="iconfont icon-realname"></i><span>账号</span>
      <input type="text" name="id" :value="info.a_id" disabled />
    </div>
    <div class="personal_form personal_org">
      <i class="iconfont icon-org"></i><span class="demonstration">组织名称</span>
      <input type="text" name="id" :value="info.org_name" disabled />
    </div>
    <div class="personal_form personal_name">
      <i class="iconfont icon-name"></i><span>领导人姓名</span>
      <input type="text" name="name" v-model="aname"/>
    </div>
    <div class="personal_form personal_email">
      <i class="iconfont icon-email"></i><span>组织邮箱</span>
      <input type="text" name="email" v-model="aemail"/>
    </div>
    <div class="personal_form personal_intro">
      <i class="iconfont icon-intro"></i><span>领导人简介</span>
      <textarea name="intro" style="resize: none" v-model="aintro"></textarea>
    </div>
    <div class="personal_btns">
      <el-button  type="danger" plain>更换头像</el-button>
      <el-button  type="danger" plain>修改密码</el-button>
      <el-button  type="danger" plain>保存更改</el-button>
    </div> 
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      info: [],
      aname: '',
      aemail:'',
      aintro: ''
    };
  },
  created() {
    this.getAinfo();
  },
  methods: {
    getAinfo(){
      axios({
        url: `${this.$api.URL}/Ainfo`,
        method: 'get'
      })
      .then(res => {
        this.info = res.data.info;
        this.aname = res.data.info.a_name;
        this.aemail = res.data.info.a_email;
        this.aintro = res.data.info.a_introduction;
      })
      .catch(err => console.log(err))
    }
  },
};
</script>

<style scoped>
#admin_personal{
  padding: 3rem 5rem 0;
}
#admin_personal>p{
  color: #EA511F;
  margin-bottom: 3rem;
}
#admin_personal>p span{
  color: black;
  /* font-size: 0.85rem; */
}
.iconfont {
  margin-right: 0.5rem;
  color: #EA511F;
  vertical-align: middle;
  font-size: 28px;
}
.icon-name,
.icon-intro,
.icon-email{
  font-size: 32px;
}
#admin_personal>.personal_form{
  width: 70%;
  margin: 1.75rem 5rem;
  line-height: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 13fr;
}
#admin_personal>div input,
#admin_personal>div select{
  font-size: 1rem;
  line-height: 2.5rem;
  border: none;
  border-left: 2px solid #EA511F;
  outline: none;
  background-color: #F5F5F5;
  padding-left: 1rem;
}
#admin_personal>div input:disabled{
  color: gray;
}
#admin_personal>div select{
  padding: 0.75rem 0 0.75rem 1rem;
}
.el-cascader .el-input .el-input__inner{
  border: none;
  border-left: 2px solid #EA511F;
  background-color: #F5F5F5;
}
.el-cascader .el-input .el-input__inner:focus{
  border-left: 2px solid #EA511F;
}
#admin_personal>div textarea{
  height: 100px;
  margin-bottom: 1rem;
  padding: 0 1rem;
  line-height: 1.5rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #F5F5F5;
  border-left: 2px solid #EA511F;
  font-family: '微软雅黑';
}
</style>

<style>
.el-cascader .el-input .el-input__inner{
  border: none;
  border-left: 2px solid #EA511F;
  background-color: #F5F5F5;
  font-size: 1rem;
  color: black;
  line-height: 5rem;
}
.el-tag.el-tag--info{
  color: black;
  font-size: 1rem;
}
</style>

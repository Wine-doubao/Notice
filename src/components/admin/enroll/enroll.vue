<template>
  <div id="enroll">
    <div class="poster">
      <h2>招新海报</h2>
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
      >
        <!-- <img v-if="imageUrl" width="240px" height="170px" :src="imageUrl"/> -->
        <i class="iconfont icon-add"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div class="org_intro">
      <h2>组织简介</h2>
      <textarea
          name="text"
          style="resize: none"
          placeholder="做个组织介绍吧~"
      ></textarea>
    </div>
    <el-button plain>确认提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: '@/assets/images',
      dialogVisible: false,
      dialogImageUrl:'',
    }
  },
  methods: {
    //处理图片预览效果
    handlePreview(file){
      console.log(file);
      this.dialogImageUrl = file.response.data.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList){
      console.log(file,fileList);
    }
  },
};
</script>

<style scoped>
#enroll{
  width: 75%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding: 0 0 0 5rem;
}
textarea {
  width: 80%;
  height: 250px;
  padding: 1.5rem;
  line-height: 1rem 1.5rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #E1E2D8;
  margin-bottom: 1rem;
}
</style>

<style>
#enroll .el-upload--picture-card{
  width: 240px;
  height: 170px;
  line-height: 170px;
}
</style>

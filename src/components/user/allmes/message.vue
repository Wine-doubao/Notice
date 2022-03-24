<template>
  <div id="allMessage">
    <el-carousel
      :interval="4000"
      type="card"
      height="70vh"
      trigger="click"
      indicator-position="none"
      arrow="always"
    >
      <el-carousel-item v-for="item in items" :key="item">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <p class="item_name">{{ item.name }}</p>
        <hr />
        <p class="item_count">
          message: <span>{{ item.count }}</span>
        </p>
        <hr />
        <div class="item_messages">
          <div class="item_mes" v-for="(temp, index) in item.mes" :key="temp">
            <h4>{{ index < 10 ? "0"+(index+1): index }}</h4>
            <p>{{ temp.content }}</p>
            <hr />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      items: [],
      path:this.$route.params.id,
      ncount:[],
      content:[],
      ncount2:[],
      content2:[]
    };
  },
  created() {
    this.getData();
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id == '2') {
        this.doDeal(this.ncount2, this.content2);
        // console.log("已办");
      }else {
        this.doDeal(this.ncount, this.content);
        // console.log("待办");
      }
    }
  },
  methods: {
    getData(){
      axios({
        url: `${this.$api.URL}/Allmes`,
        method: 'get'
      })
      .then(res => {
        // console.log(res);
        this.content = res.data.content;
        this.content2 = res.data.content2;
        this.ncount = res.data.ncount;
        this.ncount2 = res.data.ncount2;
        if(this.path == '2') this.doDeal(this.ncount2, this.content2);
        else this.doDeal(this.ncount, this.content);
        
        // console.log(this.items);
      })
      .catch(err => console.log(err))
    },
    doDeal(ncount,content){
      //将数据进行合并
      this.items = [];
      let c = 0;
      for(let i of ncount) {
        let mes = content.slice(c,c + i.count);
        let obj = {
          name: i.org_name,
          count: i.count,
          mes: mes
        }
        c = c + i.count;
        this.items.push(obj);
      }
    }
  },
};
</script>

<style scoped>
#allMessage {
  width: 70%;
  margin: 1.5rem auto 0;
}
.el-carousel__item {
  left: 5%;
}
.el-carousel__item--card {
  width: 40%;
  text-align: center;
  background-color: white;
  border: 1px solid lightgray;
  box-sizing: border-box;
  overflow: hidden;
}
.el-carousel__item--card.is-active {
  border-top: 4px solid #2295d3;
  height: 98%;
  box-shadow: 3px 3px 10px lightgray, -3px -3px 10px lightgray;
  border-image: linear-gradient(to right, #4bd8fe, #c5b5fc) 10 0 0;
}
.item_name {
  font-size: 1rem;
  margin: 1.5rem 0 0.5rem;
}
.item_count {
  color: gray;
  font-size: 0.75rem;
}
.item_count span {
  color: #4385f5;
}
.el-carousel__item--card hr {
  height: 1px;
  border: none;
}
.el-carousel__item--card>hr:nth-of-type(1) {
  width: 20%;
  background-image: linear-gradient(to right, #4bd8fe, #c5b5fc);
}
.el-carousel__item--card>hr:nth-of-type(2) {
  background-color: lightgray;
}
/* 具体消息部分 */
.el-carousel__item--card .item_messages {
  position: absolute;
  left: 0;
  top: 7rem;
  right: -17px;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
}
.el-carousel__item--card .item_messages h4{
  font-size: 0.8rem;
  text-align: left;
  margin: 0 0 1rem 2rem;
}
.el-carousel__item--card .item_messages p{
  font-size: 0.75rem;
  color: gray;
}
.el-carousel__item--card .item_messages hr{
  width: 90%;
  height: 1px;
  margin: 1rem auto;
  background-color: lightgray;
}
</style>
<template>
  <div id="statistics" ref="statis"></div>
</template>

<script>
import axios from 'axios'
import { toRaw } from '@vue/reactivity'
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default {
  data() {
    return {
    };
  },
  created() {
    this.getData();
  },
  methods: {
    initChart(data) {
      let myPie = echarts.init(this.$refs.statis);
      let option = {
        title: {
          text: "通知数统计",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          //距离容器的距离
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "组织消息",
            type: "pie",
            radius: ["40%", "70%"], //内外半径
            avoidLabelOverlap: false, //防止标签重叠
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
        tooltip: {
          trigger: "item",
          formatter:function(a) {
            return (
              `组织消息<br/>${a[`name`]}：${a[`value`]}<br/>${a[`data`].do}：${a[`data`].doCount}<br/>${a[`data`].not}：${a[`data`].notCount}`
            )
          } 
        },
      };
      myPie.setOption(option);
    },
    getData(){
      axios({
        url: `${this.$api.URL}/Allmes`,
        method: 'get'
      })
      .then(res => {
        this.ncount = res.data.ncount;
        this.ncount2 = res.data.ncount2;
        let i = 0;
        let List = [];
        for(let item of this.ncount){
          let obj = {
            name: item.org_name,
            value: item.count + this.ncount2[i].count,
            do:'已办',
            doCount: this.ncount2[i].count,
            not: '未办',
            notCount: item.count
          }
          List.push(obj);
          i++;
        }
        this.initChart(List);
      })
      .catch(err => console.log(err))
    }
  },
};
</script>

<style scoped>
#statistics {
  width: 800px;
  height: 500px;
  margin: 3rem auto 0;
}
</style>

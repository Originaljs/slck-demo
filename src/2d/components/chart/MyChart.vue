<template>
  <div
    :style="`width:${width}px;height:${height}px;margin-top:${top}px`"
    class="container"
    :id="container"
    :ref="container"
  ></div>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  watch,
  onMounted,
  watchEffect,
  nextTick,
  markRaw,
} from "vue";
import * as charts from "echarts";
// export default defineComponent({
const props = defineProps({
  options: {
    type: Object,
    require: true,
  },
  width: {
    type: String,
    default: "860",
  },
  height: {
    type: String,
    default: "400",
  },
  top: {
    type: String,
    default: "0",
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
  container: {
    type: String,
    default: "container",
  },
  isClick: {
    type: Boolean,
    default: false,
  },
  clickOb: {
    type: Function,
    default: null,
  },
});
const Aecharts: any = reactive({ value: "" });
let eConsole = (params: any) => {
  console.log("鼠标移入");
  console.log(props.clickOb);
  props.clickOb && props.clickOb(true, params);
};
let zConsole = (params: any) => {
  console.log("鼠标移出");
  console.log(params);
  props.clickOb && props.clickOb(false, params);
};
watch(
  () => props.options,
  (newval) => {
    changeEcharts(props.options);
  },
  {
    deep: true,
  }
);
const changeEcharts = (options: any) => {
  Aecharts.value.setOption(options);
  if (props.isFirst) {
    let index = 0;
    Aecharts.value.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: 0,
    });
    Aecharts.value.on("mouseover", (e: any) => {
      if (e.dataIndex !== index) {
        Aecharts.value.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index,
        });
      }
    });
    Aecharts.value.on("mouseout", (e: any) => {
      index = e.dataIndex;
      Aecharts.value.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
    });
  }
  if (props.isClick) {
    Aecharts.value.on("click", eConsole); //鼠标移入
    Aecharts.value.on("dblclick", zConsole); //鼠标移出
  }
};
watch(
  () => props.container,
  (newval) => {
    nextTick(() => {
      let op = reactive({ value: document.getElementById(newval) });
      if (op.value) {
        Aecharts.value = markRaw(charts.init(op.value)); //初始化图表
      }
      changeEcharts(props.options);
    });
  },
  {
    // deep: true,
    immediate: true,
  }
);
</script>

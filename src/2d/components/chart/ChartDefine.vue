<template>
  <div class="chart">
    <div
      ref="echart"
      :style="{ height: height, width: width }"
      @mouseover="chartMouseover"
      @mouseout="chartMouseout"
    />
  </div>
</template>
<script setup lang="ts">
// 全局引入
import * as echarts from "echarts";
import { debounce } from "@/2d/unitls/util";
import {
  toRaw,
  markRaw,
  reactive,
  ref,
  watch,
  nextTick,
  useAttrs,
  onActivated,
  onMounted,
  onBeforeUnmount,
} from "vue";
// 按需引入
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
// import * as echarts from "echarts/core";
// // 引入柱状图图表，图表后缀都为 Chart
// import { BarChart } from "echarts/charts";
// // 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
// import { TitleComponent,LegendComponent, TooltipComponent, GridComponent } from "echarts/components";
// // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import { CanvasRenderer } from "echarts/renderers";
// // 注册必须的组件
// echarts.use([TitleComponent,LegendComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  gap: {
    type: Number,
    default: 1,
  },
  autoTooltip: {
    type: Boolean,
    default: false,
  },
  autoSelect: {
    type: Boolean,
    default: false,
  },
  chartOption: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: "canvas",
  },
});

const attrs = useAttrs();
const tooltip = reactive({
  value: {
    backgroundColor: "rgba(7, 32, 50, .9)",
    borderColor: "rgba(7, 32, 50, .9)",
  },
});
const echart =ref(null)
const dataLen = ref(0);
const chart: any = reactive({ value: "" });
const intervalTick: any = reactive({ value: "" });
const currentIndex = ref(-1);
const downIndex = ref(0);
const emit = defineEmits(["click"]);
const setTimer = () => {
  clearInterval(intervalTick.value);
  if (!props.autoTooltip && !props.autoSelect) return;
  currentIndex.value = -1; // 默认为-1
  downIndex.value = dataLen.value - props.gap;
  intervalTick.value = setInterval(() => {
    if (currentIndex.value < dataLen.value - props.gap) {
      currentIndex.value += props.gap;
    } else {
      currentIndex.value = 0;
    } // 高亮当前图形
    downIndex.value =
      currentIndex.value == 0
        ? dataLen.value - props.gap
        : currentIndex.value - props.gap;
    // 显示 tooltip
    if (props.autoTooltip)
      chart.value.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: currentIndex.value,
      });
    // 切换选中状态
    if (props.autoSelect) {
      chart.value.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex.value,
      });
      chart.value.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: downIndex.value,
      });
    }
  }, 3000);
};
const initChart = (option?: any) => {
  if (!option) option = toRaw(props.chartOption);
  if (!option) return;
  console.log("this.$refs.chart", echart.value);
  dataLen.value = option.series[0].data.length; //数据长度
  chart.value = markRaw(
    echarts.init(echart.value as any, "", {
      renderer: props.type as any,
    })
  );

  if (option?.hasOwnProperty && option.hasOwnProperty("tooltip")) {
    option.tooltip = Object.assign({}, option.tooltip, tooltip.value);
  }
  chart.value.setOption(option);
  chart.value.on("click", handleClick);
  // 执行自动播放
  if (dataLen.value > 0) setTimer();
};

const clearChart = () => {
  chart.value && chart.value.clear();
};

const resizeHandler = () => {
  if (chart.value) {
    chart.value.resize();
  }
};
const setOptions = (option: any) => {
  if (chart.value) {
    initChart();
    return;
  }
  clearChart();
  resizeHandler();
  if (chart.value) {
    dataLen.value = option.series[0].data.length; //数据长度
    if (option?.hasOwnProperty && option.hasOwnProperty("tooltip")) {
      option.tooltip = Object.assign({}, option.tooltip, tooltip.value);
    }
    chart.value.setOption(option);
    // 执行自动播放
    setTimer();
  }
};

const chartMouseover = () => {
  debounce(() => {
    if (intervalTick.value) {
      if (currentIndex.value > -1) {
        chart.value.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex.value,
        });
        chart.value.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: downIndex.value,
        });
      }
      clearInterval(intervalTick.value);
    }
  }, 100);
};
const chartMouseout = () => {
  debounce(function () {
    setTimer();
  });
};

const handleClick = (params: any) => {
  emit("click", params);
};
watch(
  () => props.chartOption,
  (newValue: any) => {
    if (newValue?.hasOwnProperty && newValue.hasOwnProperty("series")) {
      nextTick(() => {
        setOptions(toRaw(newValue));
      });
    }
  }
);

onActivated(() => {
  resizeHandler();
});

onMounted(() => {
  if (
    props.chartOption?.hasOwnProperty &&
    props.chartOption.hasOwnProperty("series")
  ) {
    initChart();
    if (props.autoResize) {
      window.addEventListener("resize", resizeHandler);
    }
  }
});

onBeforeUnmount(() => {
  clearInterval(intervalTick.value);
  if (!chart.value) {
    return;
  }
  if (props.autoResize) {
    window.removeEventListener("resize", resizeHandler);
  }
  chart.value.dispose();
  chart.value = null;
});
</script>
<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <section class="left">
    <card-chunk style="height: 3.45rem" title="测量头当天入库数量">
      <div class="aq_day">
        <div class="num">
          {{ 10 }}
        </div>
        <div class="text">
          <div class="day"><span>测量头</span></div>
          <div style="color: #b3b3b3">
            入库时间：<br />{{
              // status.dataSNStock.fdate
              // ? new Date(status.dataSNStock.fdate).format("yyyy年MM月dd日"):
              "未知"
            }}
          </div>
        </div>
      </div>
    </card-chunk>

    <card-chunk
      style="height: 4.1rem; margin-top: 0.75rem"
      title="PDS当天计划实时数据"
    >
      <div class="pds">
        <ul class="pds-list">
          <li class="item green">
            <div class="circle">{{ 11 }}</div>
            <div class="title">计划数量</div>
          </li>
          <li class="item sky">
            <div class="circle">{{ 12 }}</div>
            <div class="title">当天开工产品数量</div>
          </li>
        </ul>
      </div>
    </card-chunk>
  </section>

  <section class="right">
    <card-chunk title="PDS当天入库量" style="height: 3.45rem">
      <div class="total-order">
        <div class="order-left">
          <img class="img" src="@/2d/assets/img/home/订单.png" alt="" />
        </div>
        <div class="order-right">
          <p>PDS</p>
          <div>
            <span class="num">{{ 0 }}</span
            >单
          </div>
          <div class="order-footer">入库时间: {{ " 未知" }}</div>
        </div>
      </div>
    </card-chunk>

    <card-chunk
      title="PDS当天过程数据"
      style="height: 4.1rem; margin-top: 0.75rem"
    >
      <chart-define :chartOption="optionPlanprocess" :auto-tooltip="true"> </chart-define>
    </card-chunk>
  </section>
</template>

<script setup lang="ts">
import { shallowRef,computed } from "vue";
const echart = {
  PDSProceesRadar(data0: Array<any>) {
    let data = [
      {
        name: "产品1",
        value: 60,
      },
      {
        name: "产品2",
        value: 90,
      },
      {
        name: "产品3",
        value: 82,
      },
      {
        name: "产品4",
        value: 69,
      },
      {
        name: "产品5",
        value: 22,
      },
    ];
    if (data0) data = data0;
    const ahData = data.map((item) => item.name);
    data.push(data[0]);

    return {
      color: ["#FFC80A", "#20DCFF"],
      tooltip: {
        show: true,
        trigger: "axis",
        textStyle: {
          fontSize: 12,
        },
      },
      polar: {
        center: ["50%", "50%"],
        radius: "70%",
      },
      angleAxis: {
        type: "category",
        data: ahData,
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        axisLabel: {
          fontSize: 12,
          color: "#ffffff",
          align: "center",
          formatter: function (value: any) {
            return value;
          },
        },
      },
      radiusAxis: [
        {
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: "rgba(255,255,255,.2)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 10,
            color: "#ffffff",
            align: "right",
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          type: "line",
          data: data,
          symbol: "none",
          coordinateSystem: "polar",
          name: "实际生产",
          lineStyle: {
            color: "#FFC80A",
            width: 1,
          },
          areaStyle: {
            color: "rgba(255, 200, 10, .5)",
          },
        },
      ],
    };
  },
};

// PDS当天过程数据
const dataPlanprocess = shallowRef([
  {
    name: "货扎打印",
    value: 0,
  },
  {
    name: "总装",
    value: 0,
  },
  {
    name: "整机测试",
    value: 0,
  },
  {
    name: "合格证打印",
    value: 0,
  },
  {
    name: "入库包装",
    value: 0,
  },
]);
const optionPlanprocess = computed(() => {
  return echart.PDSProceesRadar(dataPlanprocess.value);
});

</script>

<style lang="less" scoped>
@import "@/2d/css/home.less";
</style>

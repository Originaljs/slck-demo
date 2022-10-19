<template>
    <section class="left">
        <card-chunk style="height: 2.725rem;" title="环境监测">
            <div class="hj-jc">
                <div class="item">
                    <img class="img" src="@/2d/assets/img/first/温度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/温度(1).png" alt="" />
                    <p class="title">温度(°C)</p>
                    <p class="num" style="color: #ffc22f ;">25</p>
                </div>
                <div class="item">
                    <img class="img" src="@/2d/assets/img/first/湿度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/湿度(1).png" alt="" />
                    <p class="title">湿度(RH)</p>
                    <p class="num" style="color: #4eb2ff;">29</p>
                </div>
            </div>

        </card-chunk>

        <card-chunk style="height: 5.225rem; margin-top: 0.25rem;" title="产品质量统计">
            <chart-define :auto-tooltip="true" :chartOption="echart.seriesBar3()"> </chart-define>
        </card-chunk>
        <card-chunk style="height: 4rem; margin-top: 0.25rem;" title="设备异常情况统计">
            <mar-quee class="ry_table">
                <template v-slot:thead>
                    <table class="table" cellspacing="0" style="margin-bottom: 0.1125rem">
                        <colgroup>
                            <col width="12%" />
                            <col width="25%" />
                            <col width="20%" />
                            <col width="23%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>
                            <tr class="th_tr">
                                <th class="th">序号</th>
                                <th class="th">设备名称</th>
                                <th class="th">类型</th>
                                <th class="th">时间</th>
                                <th class="th">状态</th>
                            </tr>
                        </thead>
                    </table>
                </template>
                <template v-slot:tbody>
                    <table class="table table_wrapper tbody" cellspacing="0" style="position: absolute;">
                        <colgroup>
                            <col width="12%" />
                            <col width="25%" />
                            <col width="20%" />
                            <col width="23%" />
                            <col width="20%" />
                        </colgroup>
                        <tbody>
                            <tr class="td_tr" v-for="(item, index) in dataList" :key="index">
                                <td class="td">{{ index }}</td>
                                <td class="td">{{ item.name }}</td>
                                <td class="td">{{ item.type }}</td>
                                <td class="td">{{ item.time }}</td>
                                <td class="td">
                                    <span class="status red" v-if="item.status == 0">未处理</span>
                                    <span class="status" v-else>已处理</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </mar-quee>
        </card-chunk>
    </section>
    <section class="right">
        <card-chunk style="height: 3.75rem;" title="生产数据" more-text="截至2022年4月21日">
            <chart-define :auto-select="true" :chartOption="echart.seriespie2()"> </chart-define>
        </card-chunk>

        <card-chunk style="height: 4.425rem; margin-top: 0.25rem;" title="生产统计">
            <div class="sctj">
                <chart-define :chartOption="echart.seriesline2()"> </chart-define>
                <div class="legend">
                    <div class="item yellow">实际生产</div>
                    <div class="item blue">目标生产</div>
                </div>
            </div>
        </card-chunk>
        <card-chunk style="height: 3.95rem; margin-top: 0.12rem;" title="设备护养统计" more-text="单位：起">
            <chart-define :chartOption="echart.seriesBar()"> </chart-define>
        </card-chunk>

    </section>

</template>

<script setup lang="ts">
import { echart } from '@/2d/unitls/creatOption'
import MarQuee from '@/2d/components/chart/MarQuee.vue'
import {shallowRef} from 'vue'
const dataListDate = (new Date()as any).format("yyyy/MM/dd")
const dataList = shallowRef([
  {
    name: "检测输送机",
    type: "温度异常",
    time: dataListDate,
    status: 1,
  },
  {
    name: "贴片机",
    type: "故障",
    time: dataListDate,
    status: 0,
  },
  {
    name: "回流焊机(氮气)",
    type: "缺料",
    time: dataListDate,
    status: 1,
  },
  {
    name: "检测输送机",
    type: "温度异常",
    time: dataListDate,
    status: 1,
  },
  {
    name: "贴片机",
    type: "故障",
    time: dataListDate,
    status: 0,
  },
  {
    name: "回流焊机(氮气)",
    type: "缺料",
    time: dataListDate,
    status: 1,
  },
  {
    name: "检测输送机",
    type: "温度异常",
    time: dataListDate,
    status: 1,
  },
  {
    name: "贴片机",
    type: "故障",
    time: dataListDate,
    status: 0,
  },
  {
    name: "回流焊机(氮气)",
    type: "缺料",
    time: dataListDate,
    status: 1,
  },
]);

</script>

<style scoped lang="less">
@import '@/2d/css/first.less';
</style>
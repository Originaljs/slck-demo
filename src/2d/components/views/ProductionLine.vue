<template>
    <section class="left">
        <card-chunk style="height: 3.325rem;" title="加工统计">
            <div class="sctj">
                <chart-define :auto-tooltip="true" :chartOption="echart.seriesline2()"></chart-define>
                <div class="title">
                    <div class="item sjsc">实际生产</div>
                    <div class="item mbsc">目标生产</div>
                </div>
            </div>
        </card-chunk>
        <card-chunk style="height: 3.85rem; margin-top: 0.25rem;" title="产品质量统计">
            <chart-define :auto-tooltip="true" :chartOption="echart.seriesBar3()"></chart-define>
        </card-chunk>
        <card-chunk style="height: 4.7375rem; margin-top: 0.25rem;" title="设备状态">
            <ul class="sb_zt">
                <li v-for="(item, index) in seList" :key="index" class="item">
                    <span class="text"> {{ item.name }}</span>
                    <div :class="['status',equitStatus[item.status]]"></div>
                </li>
            </ul>
        </card-chunk>

    </section>
    <section class="right">
        <card-chunk style="height: 3.9375rem;" title="设备功率和产能利用率">
            <chart-define :auto-tooltip="true" :chartOption="echart.seriesLine()"></chart-define>
        </card-chunk>
        <card-chunk style="height: 4.2875rem; margin-top: 0.25rem;" title="生产实绩">
            <chart-define :auto-tooltip="true" :chartOption="echart.seriesBar5()"></chart-define>
        </card-chunk>
        <card-chunk style="height: 3.7rem; margin-top: 0.25rem;" title="加工数量统计">
            <chart-define :auto-tooltip="true" :chartOption="echart.seriesBar4()"></chart-define>
        </card-chunk>
    </section>

</template>

<script lang="ts" setup>
import { echart } from '@/2d/unitls/creatOption'
const seList = [
    {
        name: "1#上扳机",
        status: 1,
    },
    {
        name: "2#上扳机",
        status: 1,
    },
    {
        name: "1#下扳机",
        status: 1,
    },
    {
        name: "2#下扳机",
        status: 1,
    },
    {
        name: "3#上扳机",
        status: 1,
    },
    {
        name: "3#下扳机",
        status: 1,
    },
    {
        name: "1#AOI光学检测仪",
        status: 1,
    },
    {
        name: "2#AOI光学检测仪",
        status: 1,
    },
    {
        name: "3#高速贴片机",
        status: 2,
    },
    {
        name: "4#AOI光学检测仪",
        status: 1,
    },
];
const equitStatus = ['red', 'green', 'yellow']


</script>

<style scoped lang="less">
@import '@/2d/css/ProductionLine.less';
</style>
<template>
    <section class="left">
        <card-chunk style="height: 3.48rem;" title="环境监测">
            <div class="hjjc">
                <div class="wd">
                    <img class="img" src="@/2d/assets/img/first/温度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/温度(1).png" alt="" />
                    <p class="title">温度(°C)</p>
                    <p class="num" style="color: #ffc22f">{{ 23 }}</p>
                </div>
                <div class="sd">
                    <img class="img" src="@/2d/assets/img/first/湿度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/湿度(1).png" alt="" />
                    <p class="title">湿度(RH)</p>
                    <p class="num" style="color: #4eb2ff">{{ 75 }}</p>
                </div>
            </div>
        </card-chunk>
        <card-chunk style="height: 4.49rem;margin-top: 0.2rem" title="产品质量统计">
            <chart-define :auto-tooltip="true" :chartOption="echart.seriesBar3()"></chart-define>
        </card-chunk>
        <card-chunk style="height: 4rem;margin-top: 0.2rem" title="设备状态">
            <chart-define :auto-select="true" :chartOption="echart.seriespie2()"></chart-define>
        </card-chunk>

    </section>
    <section class="right">
        <card-chunk style="height: 3.75rem;" title="生产统计">
            <div class="sctj">
                <div class="item" v-for="(item,index) in dataSctjLists" :key="index">
                    <div class="top">
                        <img src="@/2d/assets/img/third/sctj_list_icon1.png" alt="">
                        {{item.name}}
                    </div>
                    <div class="bottom">{{item.value}}</div>
                </div>
            </div>
        </card-chunk>
        <card-chunk style="height: 4.43rem;margin-top: 0.11rem" title="产量统计">
            <chart-define :chartOption="echart.seriesBar2()" :auto-tooltip="true"> </chart-define>
        </card-chunk>
        <card-chunk style="height: 4rem;margin-top: 0.11rem" title="生产报工">
            <ChartBaseBar :data="dataList"></ChartBaseBar>
        </card-chunk>

    </section>

</template>

<script setup lang="ts">
import { echart } from '@/2d/unitls/creatOption'
import ChartBaseBar from '@/2d/components/chart/ChartBaseBar.vue'
import { reactive, shallowRef } from 'vue'

const dataSctjLists = reactive([
    {
        name: "今日加工物料",
        value: 0,
    },
    {
        name: "累计加工物料",
        value: 0,
    },
    {
        name: "今日加工批次",
        value: Math.floor(Math.random() * 50),  // 0-25随机整数
    },
    {
        name: "累计加工批次",
        value: Math.floor(Math.random() * (70 - 350 + 1)) + 350,  // 70-350的随机整数
    },
]);
const dataList = shallowRef([
    { name: "贴片", value: 4, percent: 0.691 },
    { name: "压焊", value: 3, percent: 0.3 },
    { name: "贴片", value: 5, percent: 0.42 },
    { name: "印刷", value: 2, percent: 0.85 },
]);

</script>

<style scoped lang="less">
@import '@/2d/css/third.less';
</style>
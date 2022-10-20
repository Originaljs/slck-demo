<template>
    <section class="left">
        <card-chunk style="height: 3.48rem" title="环境监测">
            <div class="hjjc">
                <div class="wd">
                    <img class="img" src="@/2d/assets/img/first/温度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/温度(1).png" alt="" />
                    <p class="title">温度(°C)</p>
                    <p class="num" style="color: #ffc22f">28</p>
                </div>
                <div class="sd">
                    <img class="img" src="@/2d/assets/img/first/湿度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/湿度(1).png" alt="" />
                    <p class="title">湿度(RH)</p>
                    <p class="num" style="color: #4eb2ff">71</p>
                </div>
            </div>
        </card-chunk>
        <card-chunk style="height: 4rem; margin-top: 0.25rem" title="测量头当天入库量">
            <mar-quee class="ry_table">
                <template v-slot:thead>
                    <table class="table" cellspacing="0" style="margin-bottom: 0.1125rem">
                        <colgroup>
                            <col width="15%" />
                            <col width="30%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="25%" />
                        </colgroup>
                        <thead>
                            <tr class="th_tr">
                                <th class="th">序号</th>
                                <th class="th">时间</th>
                                <th class="th">型号</th>
                                <th class="th">序号</th>
                                <th class="th">类型</th>
                            </tr>
                        </thead>
                    </table>
                </template>
                <template v-slot:tbody>
                    <table class="table table_wrapper tbody" cellspacing="0">
                        <colgroup>
                            <col width="15%" />
                            <col width="30%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="25%" />
                        </colgroup>
                        <tbody>
                            <tr class="td_tr" v-for="(item, index) in status.dataSNStockList" :key="index">
                                <td class="td">{{ index + 1 }}</td>
                                <td class="td">{{ (item as any).fdate }}</td>
                                <td class="td">{{ (item as any).fstockNo }}</td>
                                <td class="td">{{ (item as any).fid }}</td>
                                <td class="td">{{ (item as any).fmodel }}</td>
                                <!-- <td class="td">
                  <span class="status red" v-if="item.status == 0">未处理</span>
                  <span class="status" v-else>已处理</span>
                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </template>
            </mar-quee>
        </card-chunk>
        <card-chunk style="height: 2.87rem; margin-top: 0.36rem" title="PDS当天入库量">
            <div class="dtrkl">
                <div class="icon">
                    <img class="img" src="@/2d/assets/img/second/rk_sl_bc2.png" alt="" />
                </div>
                <div class="right-box">
                    <p class="title">PDS</p>
                    <p class="text">1,234</p>
                    <p class="text1">入库时间：未知</p>
                </div>
            </div>
        </card-chunk>
    </section>

    <section class="right">
        <card-chunk style="height: 3.48rem" title="PDS当天计划实时数据">
            <div class="jhsssj">
                <div class="item">
                    <div class="img-box">
                        <img src="@/2d/assets/img/second/realtime-plan-box-img1.png" alt="" />
                    </div>
                    <div class="right-box">
                        <div class="text1">计划数量</div>
                        <div class="text2">{{ 0 }}</div>
                    </div>
                </div>
                <div class="item">
                    <div class="img-box">
                        <img src="@/2d/assets/img/second/realtime-plan-box-img2.png" alt="" />
                    </div>
                    <div class="right-box">
                        <div class="text1">计划数量</div>
                        <div class="text2">{{ 0 }}</div>
                    </div>
                </div>
            </div>
        </card-chunk>
        <card-chunk style="height: 6.09rem; margin-top: 0.38rem" title="PDS当天过程数据">
            <div class="process-data">
                <div class="item" v-for="(item,index) in dataPlanprocess " :key="index">
                    <div class="item-left">
                        <span class="text">{{item.name}}</span>
                    </div>
                    <div class="item-right"> {{item.value}}</div>
                </div>
            </div>
        </card-chunk>
    </section>
</template>

<script setup lang="ts">
import MarQuee from "@/2d/components/chart/MarQuee.vue";
import { reactive, shallowRef } from "vue";
const status = reactive({
    dataSNStockList: {},
    // 测量头当天入库数量
    dataSNStock: { fstockNo: 0, fdate: "" },
    // PDS当天入库数量
    dataPDSStock: { fstockDay: 0, fdate: "" },
    // PDS当天计划实时数据
    dataDT_PDSPlan: { fplanNo: 0, fplanProductNo: 0 },
});
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
</script>

<style scoped lang="less">
@import "@/2d/css/second.less";
</style>

<template>
    <section class="left">
        <card-chunk style="height: 3.48rem;" title="环境监测">
            <div class="hjjc">
                <div class="wd">
                    <img class="img" src="@/2d/assets/img/first/温度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/温度(1).png" alt="" />
                    <p class="title">温度(°C)</p>
                    <p class="num">23</p>
                </div>
                <div class="sd">
                    <img class="img" src="@/2d/assets/img/first/湿度.png" alt="" />
                    <img class="img1" src="@/2d/assets/img/first/湿度(1).png" alt="" />
                    <p class="title">湿度(RH)</p>
                    <p class="num">47</p>
                </div>
            </div>

        </card-chunk>
        <card-chunk style="height: 4rem; margin-top: 0.25rem;" title="测量头当天入库量">

        </card-chunk>
        <card-chunk style="height: 2.87rem; margin-top: 0.36rem;" title="PDS当天入库量">

        </card-chunk>
    </section>

    <section class="right">
        <card-chunk style="height: 3.48rem;" title="PDS当天计划实时数据">

        </card-chunk>
        <card-chunk style="height: 6.09rem;margin-top: 0.38rem;" title="PDS当天过程数据">

        </card-chunk>

    </section>

</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import '@/2d/css/second.less';
</style>
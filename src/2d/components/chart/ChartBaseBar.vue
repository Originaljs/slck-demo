<template>
    <div class="chartBar">
        <div class="bar-title">
            <div style="width: 0.9rem;">工序名称</div>
            <div style="width: 0.9rem;">加工数量</div>
        </div>
        <div class="bar-content">
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="name">{{item.name}}</div>
                <div class="value">{{item.value}}</div>
                <div class="box">
                    <div class="background">
                        <div class="process" :style="{ width: item.percent * 100 + '%' }"></div>
                    </div>
                </div>
                <div class="percent" style="width: 0.1rem"></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    data: {
        type: Array<any>,
        default: []
    }
})
</script>

<style scoped lang="less">
.chartBar {
    padding: 0rem 0.1rem;
    .bar-title {
        display: flex;
        padding: 0;
        &>div {
            text-align: center;
            font-size: 0.18rem;
            font-weight: bold;
            color: #ffffff;
        }
    }

    .bar-content {
        margin-top: 0.19rem;

        .item {
            display: flex;
            align-items: center;
            font-size: 0.18rem;
            padding: 0.16rem 0;
            color: #ffffff;
            margin-top: 0.18rem;
            background: url(../../assets/img/third/scbg_bc.png) no-repeat center center /100% 100%;

            .name,
            .value {
                color: #ffffff;
                width: 0.9rem;
                text-align: center;
            }

            .box {
                flex: 1;

                .background {
                    background: rgba(27, 38, 56, 1);
                    height: 0.08rem;
                    padding-top: 0.01rem;
                }
            }

            .process {
                //   display: inline-block;
                height: 0.06rem;
                background: linear-gradient(90deg, #0c7177 0%, #14b9c3 100%);
                position: relative;

                &::after {
                    content: "";
                    width: 0.03rem;
                    height: 0.08rem;
                    background: #fff;
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    top: -0.01rem;
                }
            }

        }
    }
}
</style>
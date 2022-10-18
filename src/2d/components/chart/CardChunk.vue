<template>
    <div class="chunk">
        <div class="chunk-header">
            <span class="title">{{title}}</span>
            <span class="more" :style="{color:moreColor}"> {{moreText}}</span>
        </div>
        <div class="chunk-body">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    moreText: String,
    moreColor: {
        type: String,
        default: "#999999",
    },
})
</script>

<style scoped lang="less">
.chunk {
    width: 4.375rem;
    display: flex;
    flex-direction: column;

    .chunk-header {
        width: 100%;
        height: 0.8rem;
        background: url(@/2d/assets/img/home/箭头.png) no-repeat left center / 0.2875rem 0.75rem;
        font-size: 0.25rem;
        color: #2ef4fb;
        position: relative;
        display: flex;
        line-height: 0.35rem;
        align-items: center;
        padding-left: 0.375rem;
        box-sizing: border-box;
        justify-content: space-between;
        border-top: 0.025rem solid rgba(0, 135, 245, 0.2);
        border-bottom: 0.025rem solid rgba(0, 135, 245, 0.2);

        .title {
            padding: 0 0.125rem;
        }

        &::before,
        &::after {
            content: "";
            display: block;
            width: 0.0875rem;
            position: absolute;
            border-bottom: 0.025rem solid #2ef4fb;
            left: 0;
        }

        &::before {
            top: -0.025rem;
        }

        &::after {
            bottom: -0.025rem;
        }

        .more {
            flex: 1;
            font-size: 0.15rem;
            height: 0.35rem;
            text-align: right;
            display: block;
            line-height: 0.35rem;
            background: rgba(9, 171, 164, 0.1);
            padding-right: 0.1125rem;

            &::before,
            &::after {
                content: "";
                display: block;
                width: 0.0875rem;
                position: absolute;
                border-top: 0.025rem solid #2ef4fb;
                right: 0;
            }

            &::before {
                top: -0.025rem;
            }

            &::after {
                bottom: -0.025rem;
            }
        }

    }

    .chunk-body {
        flex: 1;
        background: rgba(9, 171, 164, 0.1);
    }

}
</style>
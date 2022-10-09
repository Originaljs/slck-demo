<template>
  <div class="main">
    <div class="load" v-show="!isLoad">
      <a-spin :indicator="indicator" />
      <span class="text-tip"> 正在加载...</span>
    </div>
    <footer class="header">
      <img class="logo" src="@/2d/assets/img/home/logo.png" >
      <h1 class="title">四联测控数字孪生工厂</h1>
      <div class="time"></div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { defineComponent, h, ref } from "vue";

const isLoad = ref(false);
const indicator = h(LoadingOutlined, {
  style: { fontSize: "54px" },
  spin: true,
});
setTimeout(() => {
  isLoad.value = true;
}, 2000);
</script>

<style lang="less">
@import "@/2d/css/rootStyle.less";
</style>

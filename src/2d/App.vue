<template>
  <div class="main">
    <div class="load" v-show="!isLoad">
      <a-spin :indicator="indicator" />
      <span class="text-tip"> 正在加载...</span>
    </div>
    <header class="header">
      <img class="logo" src="@/2d/assets/img/home/logo.png" />
      <h1 class="title">四联测控数字孪生工厂</h1>
      <div class="time">{{ time }}</div>
    </header>
    <main class="content">
      <router-view :line="isLine"></router-view>
    </main>
    <section class="third-button" v-show="route.path == '/thirdly'">
      <div :class="['item', clickIndex == index + 1 && animate ? 'active' : '']" v-for="(item, index) in buttonList"
        :key="index" @click="animationRun(index + 1)">
        {{ item }}
      </div>
    </section>
    <footer class="footer">
      <router-link v-for="item in list" :key="item.path" :to="item.path"
        :class="['item', route.path == item.path ? 'active' : '']">
        {{ item.name }}
      </router-link>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { defineComponent, h, ref, shallowRef } from "vue";
import { formatterDate } from "@/2d/unitls/util";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let href = window.location.hash;
if (href.length > 2) {
  router.push("/");
}
let time = ref(formatterDate("Y年M月D日 星期W h:m"));
let timmer = setInterval(() => {
  time.value = formatterDate("Y年M月D日 星期W h:m");
}, 30 * 1000);
const isLoad = ref(false);
const isLine = ref(false)
// 进度条
const indicator = h(LoadingOutlined, {
  style: { fontSize: "54px" },
  spin: true,
});
setTimeout(() => {
  isLoad.value = true;
}, 2000);

const list = shallowRef([
  {
    path: "/",
    name: "首页",
  },
  {
    path: "/first",
    name: "一楼",
  },
  {
    path: "/second",
    name: "二楼",
  },
  {
    path: "/thirdly",
    name: "三楼",
  },
]);
const buttonList = shallowRef(["SMT-I", " SMT-II", "SMT-III", "THT生产线"]);
const clickIndex = ref(0);
const animate = ref(false)
const animationRun = (index: number) => {
  if (clickIndex.value == index) {
    animate.value = !animate.value;
  } else {
    clickIndex.value = index
    animate.value = true
  }
  if (index == 4) {
    isLine.value = animate.value ? true : false
  } else {

  }
}
</script>

<style lang="less">
@import "@/2d/css/rootStyle.less";
</style>

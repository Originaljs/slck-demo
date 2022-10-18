import { flexible } from "@/2d/unitls/flexible";
flexible(window, document); // 自适应屏幕
import "@/2d/unitls/base";
import "@/2d/unitls/util";

import "@/2d/css/global.less";
import "ant-design-vue/lib/message/style/index.less";
import "ant-design-vue/lib/notification/style/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/2d/router/index";
import * as charts from "echarts";
import CardChunk from "@/2d/components/chart/CardChunk.vue";
import ChartDefine from "@/2d/components/chart/ChartDefine.vue";

const app = createApp(App);
app.component("ChartDefine", ChartDefine);
app.component("CardChunk", CardChunk);
app.use(router);
app.mount("#app");
//

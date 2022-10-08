import { createApp } from 'vue'
import '../2d/css/global.less'
import 'ant-design-vue/lib/message/style/index.less';
import 'ant-design-vue/lib/notification/style/index.less';
import App from './App.vue'
import router from '@/2d/router/index'
import * as charts from "echarts";

const app = createApp(App)
app.use(router)
app.mount('#app')
//
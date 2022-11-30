import { createApp } from 'vue';
import App from './App.vue';
// 引入全局样式
import './assets/css/globalStyle.scss';
// 引入路由
import router from './router';
// 引入pinia
import store from './store';
// 引入axios
import axios from 'axios';
// 引入i18n
import i18n from './i18n';
// 引入vuetify组件
import { vuetify } from './plugins/vuetify';

// 创建app实例
const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);
app.use(vuetify);
// 全局挂在axios
app.config.globalProperties.$axios = axios;
// 全局指令
// Object.keys(directives).forEach((key) => {
//   app.directive(key, (directives as { [key: string]: Directive })[key]);
// });
// 挂载
app.mount('#app');

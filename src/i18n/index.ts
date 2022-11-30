import { createI18n } from 'vue-i18n';

// 自定义国际化文件
import zh_CN from './language/zh_CN/index';
import en_US from './language/en_US/index';

const i18n = createI18n({
  // Composition API 模式
  legacy: false,
  // 全局注册 $t方法
  globalInjection: true,
  // 默认语言
  locale: 'zh_CN',
  // 语言库
  messages: {
    zh_CN: zh_CN,
    en_US: en_US
  }
});

// 将i18n暴露出去，在main.js中引入挂载
export default i18n;

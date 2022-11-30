/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from 'vue';

// 全局加载组件
const handleMove = (e: TouchEvent) => {
  e.preventDefault();
};

// 默认加载样式
const normal = (
  el: HTMLElement,
  hasCustomText: string | null,
  hasCustomTextColor: string | null,
  hasCustomBgColor: string | null
) => {
  el.style.position = 'relative';
  const mask = document.createElement('div'); // 创建最外层div 高度占满（包含滚动）
  const loadingBox = document.createElement('div'); // 显示loading的div 高度是100vh
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // svg标签 用来实现旋转的圆
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // 旋转的那个圆
  const text = document.createElement('span'); // 加载的文字

  // 下面所添加的class样式都会在后面贴出
  mask.setAttribute('class', 'v-normal-loading');
  mask.style.background = !hasCustomBgColor ? 'rgb(255, 255, 255)' : hasCustomBgColor;
  mask.style.opacity = '0.8';
  loadingBox.setAttribute('class', 'v-normal-loading-box');
  svg.setAttribute('class', 'v-normal-loading-circular v-normal-rotate');
  svg.setAttribute('viewBox', '25 25 50 50');
  circle.setAttribute('cx', '50');
  circle.setAttribute('cy', '50');
  circle.setAttribute('r', '20');
  circle.setAttribute('fill', 'none');
  text.innerText = !hasCustomText ? '加载中...' : hasCustomText;
  text.style.color = !hasCustomTextColor ? '#000' : hasCustomTextColor;
  svg.setAttribute('color', !hasCustomTextColor ? '#000' : hasCustomTextColor);

  svg.appendChild(circle);
  loadingBox.appendChild(svg);
  loadingBox.appendChild(text);
  mask.appendChild(loadingBox);
  el.appendChild(mask);
};

// 波浪样式
const wave = (
  el: HTMLElement,
  hasCustomText: string | null,
  hasCustomTextColor: string | null,
  hasCustomBgColor: string | null
) => {
  el.style.position = 'relative';
  const mask = document.createElement('div'); // 创建最外层div 高度占满（包含滚动）
  const loadingBox = document.createElement('div'); // 显示loading的div 高度是100vh
  const text = document.createElement('span'); // 加载的文字
  // 下面所添加的class样式都会在后面贴出
  mask.setAttribute('class', 'v-wave-loading');
  mask.style.background = !hasCustomBgColor ? 'rgb(255, 255, 255)' : hasCustomBgColor;
  mask.style.opacity = '0.8';
  loadingBox.setAttribute('class', 'v-wave-loading-box');
  text.setAttribute('class', 'v-wave-text');
  text.innerText = !hasCustomText ? '加载中...' : hasCustomText;
  text.style.color = !hasCustomTextColor ? '#000' : hasCustomTextColor;

  for (let i = 0; i < 8; i++) {
    const item = document.createElement('div');
    item.setAttribute('class', 'v-wave-item');
    item.style.background = !hasCustomTextColor ? '#000' : hasCustomTextColor;
    loadingBox.appendChild(item);
  }
  mask.appendChild(loadingBox);
  mask.appendChild(text);
  el.appendChild(mask);
};

// 环点样式
const dot = (
  el: HTMLElement,
  hasCustomText: string | null,
  hasCustomTextColor: string | null,
  hasCustomBgColor: string | null
) => {
  el.style.position = 'relative';
  const mask = document.createElement('div'); // 创建最外层div 高度占满（包含滚动）
  const loadingBox = document.createElement('div'); // 显示loading的div 高度是100vh
  const text = document.createElement('span'); // 加载的文字
  // 下面所添加的class样式都会在后面贴出
  mask.setAttribute('class', 'v-dot-loading');
  mask.style.background = !hasCustomBgColor ? 'rgb(255, 255, 255)' : hasCustomBgColor;
  mask.style.opacity = '0.8';
  loadingBox.setAttribute('class', 'v-dot-loading-box');
  text.setAttribute('class', 'v-dot-text');
  text.innerText = !hasCustomText ? '加载中...' : hasCustomText;
  text.style.color = !hasCustomTextColor ? '#000' : hasCustomTextColor;

  for (let i = 0; i < 6; i++) {
    const item = document.createElement('span');
    item.setAttribute('class', 'v-dot-item');
    item.style.background = !hasCustomBgColor ? 'rgb(255, 255, 255)' : hasCustomBgColor;
    loadingBox.appendChild(item);
  }
  mask.appendChild(loadingBox);
  mask.appendChild(text);
  el.appendChild(mask);
};

export const loading: Directive = {
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // 新
  updated(el: HTMLElement, binding: DirectiveBinding) {
    // 判断loading的风格样式
    const hasCustomStyle = el.getAttribute('loading-style');

    // 风格样式
    let loadingStyle = '';
    if (hasCustomStyle) {
      loadingStyle = hasCustomStyle;
    } else {
      loadingStyle = 'default';
    }
    // 更新的时候用这个
    if (binding.value) {
      /**
       * binding.value就是v-loading='true'传过来的那个值
       * 如果传过来的值为true 你们就是要展示loading
       * el是当前指令绑定的对象 binding是传过来的值
       */

      // 在移动端页面禁用滚动
      document.body.addEventListener('touchmove', handleMove, { passive: false });

      // 判断当前页面是否存在没有消失的loading
      // hasLoading 值为false 时表明没有loading 可以添加loading
      const hasLoading = el.getElementsByClassName('v-loading').length !== 0;
      if (hasLoading) return;

      // 判断是否传入了自定义提示文字
      const hasCustomText = el.getAttribute('loading-text');
      // 判断是否传入自定义文字颜色
      const hasCustomTextColor = el.getAttribute('loading-text-color');
      // 判断是否传入了自定义背景色
      const hasCustomBgColor = el.getAttribute('loading-background');

      switch (loadingStyle) {
        case 'wave':
          wave(el, hasCustomText, hasCustomTextColor, hasCustomBgColor);
          break;
        // case 'dot':
        //   dot(el, hasCustomText, hasCustomTextColor, hasCustomBgColor);
        //   break;
        case 'default':
          normal(el, hasCustomText, hasCustomTextColor, hasCustomBgColor);
          break;
        default:
          normal(el, hasCustomText, hasCustomTextColor, hasCustomBgColor);
          break;
      }
    } else {
      /**
       * 传过来的值为false 不需要展示loading
       * 移除loading相关dom
       */
      let divStr = '';
      switch (loadingStyle) {
        case 'wave':
          divStr = 'wave';
          break;
        case 'default':
          divStr = 'normal';
          break;
        default:
          divStr = 'normal';
          break;
      }
      const divClassName = 'v-' + divStr + '-loading';
      for (let i = 0; i < el.childNodes.length; i++) {
        if ((el.childNodes[i] as any).className === divClassName) {
          const childNodes = el.getElementsByClassName(divClassName)[0];
          el.removeChild(childNodes);
          break;
        }
      }

      // 弹窗消失时移除'禁用滑动事件'
      document.body.removeEventListener('touchmove', handleMove);
    }
  },
  beforeUnmount() {}, // 新
  unmounted() {}
};

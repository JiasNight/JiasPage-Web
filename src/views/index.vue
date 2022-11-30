<template>
  <div ref="indexBox" class="index-container">
    <transition name="fade">
      <!-- <Header v-show="!headerShow" :headerColor="headerColor"></Header> -->
      <Header :header-color="headerColor"></Header>
    </transition>
    <div class="container-body">
      <!-- 子路由 -->
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { $ref } from 'vue/macros';
import { petal1, petal2, rain } from '@/assets/base64/index';
import Header from './layout/header.vue';
import Footer from '@/views/layout/footer.vue';

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true);
  window.addEventListener('resize', initBkgTime, true);
  nextTick(() => {
    initBkgTime();
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true);
});

/**
 * 根据一年不同的月份时间显示背景飘落花瓣，雨水，黄叶，雪花四种效果
 * 分别表示春夏秋冬四个季节的特效
 */
// 获取背景dom
const indexBox: HTMLDivElement = $ref<HTMLDivElement>();
const initBkgTime: any = (): void => {
  nextTick(() => {
    renderImg(indexBox);
  });
};

/**
 * 判断当前季节
 */
const currentSeason = (): number => {
  let month: number = new Date().getMonth() + 1;
  if (month >= 2 && month <= 4) return 1;
  else if (month >= 5 && month <= 7) return 2;
  else if (month >= 8 && month <= 10) return 3;
  else return 4;
};

const renderImg = (indexBox: HTMLDivElement): void => {
  // 判断当前时间点处于四季的什么时候，再执行相应时期的动画函数
  let currentNum: number = currentSeason();
  console.log(currentNum);
  switch (currentNum) {
    // 春天
    case 1:
      setInterval(() => {
        initSpring(indexBox);
      }, 5000);
      break;
    // 夏天
    case 2:
      setInterval(() => {
        initSummer(indexBox);
      }, 500);
      break;
    // 秋天
    case 3:
      // initAutumn(indexBox);
      setInterval(() => {
        initSummer(indexBox);
      }, 500);
      break;
    // 冬天
    case 4:
      // initWinter(indexBox);
      setInterval(() => {
        initSummer(indexBox);
      }, 500);
      break;
  }
};

/**
 * 春天背景动画
 */
const initSpring = (div: HTMLDivElement): void => {
  // 设置相对定位
  let width = div.offsetWidth;
  let height = div.offsetHeight;

  let imgArr = [petal1, petal2];
  let numImgs = 0;
  do {
    numImgs = Math.floor(Math.random() * 20 + 1);
  } while (numImgs > 10);
  const imgArray = [];
  for (let i = 0; i < numImgs; i++) {
    let img = document.createElement('img');
    imgArray.push(img);
    let index = Math.floor(Math.random() * 2);
    img.src = `${imgArr[index]}`;
    img.style.zIndex = '99999';
    if (index === 1) {
      img.style.width = '20px';
      img.style.height = '40px';
    } else {
      img.style.width = '30px';
      img.style.height = '50px';
    }
    img.style.position = 'absolute';
    let x = Math.random() * width + 1;
    let y = 0;
    do {
      y = (Math.random() * height) / 150;
    } while (y > 500);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.opacity = '0';
    div.appendChild(img);
  }
  for (let i = 0; i < imgArray.length; i++) {
    let index = Math.floor(Math.random() * imgArray.length);
    let time = Math.random() * imgArray.length * 5 + 2;
    imgArray[index].style.animation = `rotate1 ${time}s linear`;
  }
};

/**
 * 夏天下雨背景动画
 */
const initSummer = (div: HTMLDivElement): void => {
  let width = div.offsetWidth;
  let height = div.offsetHeight;
  let tempSvg: HTMLCollection = document.getElementsByTagName('svg');
  for (let i = 0; i < tempSvg.length; i++) {
    const element = tempSvg[i];
    element.remove();
  }
  // 命名空间
  const SVG_NS = 'http://www.w3.org/2000/svg';
  // 循环创建N个
  let rainNum = 20;
  // 创建的添加到数组存储
  let rainArray = [];
  for (let i = 0; i < rainNum; i++) {
    // 1、创建svg容器
    let svg = document.createElementNS(SVG_NS, 'svg');
    // 随机位置出现
    svg.style.position = 'absolute';
    svg.style.left = Math.random() * width + 'px';
    svg.style.top = (Math.random() * height) / 6 + 'px';
    svg.style.zIndex = '999';
    svg.setAttribute('class', 'rain-drop');
    svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
    svg.setAttribute('viewBox', '0 0 5 50');
    svg.setAttribute('width', '5');
    svg.setAttribute('height', '50');
    // 2、创建svg中的 tag, 如rect
    let tag = document.createElementNS(SVG_NS, 'path');
    tag.setAttribute('class', 'rain-path');
    // 3、设置tag的属性
    tag.setAttribute('d', rain);
    tag.setAttribute('fill', '#a1c6cc');
    tag.setAttribute('stroke', 'none');
    // 4、将tag塞进svg中
    svg.appendChild(tag);
    // 5、将svg塞进指定容器
    div.appendChild(svg);
    rainArray.push(svg);
  }

  // 对每个雨滴添加动画，但时间不一样
  for (let i = 0; i < rainArray.length; i++) {
    let time = Math.random() * 1 + 0.5;
    rainArray[i].style.animation = `rainDrop ${time}s 1s linear`;
  }
};

/**
 * 秋天落叶背景动画
 */
const initAutumn = (div: HTMLDivElement): void => {};

/**
 * 冬天下雪背景动画
 */
const initWinter = (div: HTMLDivElement): void => {};

// 头部导航背景色
const headerColor = $ref<string>('rgb(75, 73, 72, 0.4)');
// const headerColor = $ref('rgb(0, 0, 0)');

// 头部导航栏滑动隐藏
let headerShow = $ref<boolean>(true);

const handleScroll = () => {
  const top = document.documentElement.scrollTop;
  if (top > 30) {
    headerShow = false;
  } else {
    headerShow = true;
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .container-body {
    width: 100%;
    height: 800px;
    flex: 1;
    animation: ease;
  }

  // 使用深度选择器添加svg样式
  :deep(.rain-drop) {
    opacity: 0;
  }
}
</style>

<style>
/* 花瓣下落动画 */
@keyframes rotate1 {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50px, 400px) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translate(50px, calc(100vh - 10vh)) rotate(360deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(20px);
  }
}

/* 下雨动画 */
@keyframes rainDrop {
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.8;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(75vh);
    transform: translateY(75vh);
  }
}
</style>

<template>
  <div class="screen-container">
    <!-- 标题 -->
    <div class="screen-title"></div>
    <!-- 内容部分 -->
    <div class="screen-chart">
      <div class="content-left">
        <div class="left-box"></div>
        <div class="left-box"></div>
        <div class="left-box"></div>
      </div>
      <div class="content-right">
        <div class="right-box"></div>
        <div class="right-box"></div>
        <div class="right-box"></div>
      </div>
    </div>
    <div class="screen-content">
      <div id="screen-main" ref="threeDom" class="content-main"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import CreateDivThree from './utils/threeTool';

const isLoading = ref<boolean>(true);

onBeforeMount(() => {});

onMounted(() => {
  initCurrentThree();
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});

const initCurrentThree = () => {
  const cdt = new CreateDivThree('#screen-main');
  cdt.initThree();
  const modelPath = '/public/model/building.obj';
  cdt.objLoadModel(modelPath);
  // const modelPath = '/public/model/building.gltf';
  // cdt.gltfLoadModel(modelPath);
  // const skyPath = '/public/images/';
  // cdt.loadSky(skyPath);
  // cdt.loadHdr();
  cdt.renderThree();
  cdt.onWindowResize();

  // 首页进入相机的视角,这个视角可以在三维模型中建立一个摄像机获取摄像机的坐标
  const cameraPosition = {
    x: 0,
    y: 40,
    z: 55
  };
  const lookAtPosition = {
    x: 0,
    y: 0,
    z: 0
  };
  cdt.cameraReset(cameraPosition, lookAtPosition);
};
</script>

<style lang="scss" scoped>
.screen-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/bigScreen/big-background2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .screen-title {
    height: 60px;
    width: 50%;
    background-image: url('@/assets/images/bigScreen/title-bg.png');
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 auto;
    text-align: center;
    border: 1px solid red;
  }
  .screen-chart {
    position: absolute;
    width: 100%;
    top: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .content-left, .content-right {
      width: 400px;
      height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .left-box, .right-box {
        width: 100%;
        height: 250px;
        z-index: 100;
        background-color: rgba(18, 76, 184, 0.2);
        // border: 1px solid #1be792;
        border-radius: 2px;
      }
    }
    .content-left {

    }
  }
  .screen-content {
    position: absolute;
    top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    z-index: 99;
    .content-main {
      width: 100%;
      height: 100%;
    }

  }
}
</style>

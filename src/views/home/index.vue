<template>
  <div class="home-container">
    <!-- 首页主要内容 -->
    <div class="container-main">
      <h1>这是首页的主要内容</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  // console.log('轮播');
  // 获取后端设置的轮播图
});

</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  .container-main {
    width: 100%;
  }
}
</style>

<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <div class="container-loop">
      <v-carousel cycle hide-delimiter-background show-arrows="hover">
        <v-carousel-item v-for="(item, i) in imgLists" :key="i" :value="i" cover>
          <v-sheet class="carousel-sheet" height="100%" tile :style="{ backgroundImage: `url(${item.imgSrc})` }">
            <div class="d-flex fill-height justify-center align-center">
              <div class="img-text">
                {{ item.describe }}
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
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

// 轮播图列表
interface loopImgType {
  id: string;
  label: string;
  imgSrc: string;
  describe: string;
}
const imgLists: loopImgType[] = reactive([
  {
    id: '1',
    label: 'primary',
    imgSrc: 'src/assets/images/home/111.jpg',
    describe: '当你不能再拥有，你唯一可以做的，就是令自己不要忘记。'
  },
  {
    id: '2',
    label: 'info',
    imgSrc: 'src/assets/images/home/222.jpg',
    describe: '虽然你我天各一方，但我们的心却是在一起的。'
  },
  {
    id: '3',
    label: 'warning',
    imgSrc: 'src/assets/images/home/333.jpg',
    describe: '有时，需要一炷香，一个人，将生活关在门外，安静地看看自己。'
  },
  {
    id: '4',
    label: 'error',
    imgSrc: 'src/assets/images/home/444.jpg',
    describe: '千万记得天涯有人在等待。'
  },
  {
    id: '5',
    label: 'error',
    imgSrc: 'src/assets/images/home/555.jpg',
    describe: '曾以为念念不忘的东西，总有一天会变得面目全非。'
  }
]);
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  .container-loop {
    width: 100%;
    height: calc(100vh - 50%);
    .v-sheet {
      background-repeat: no-repeat;
      background-size: cover;
      .img-text {
        color: #fff;
        font-size: 30px;
        padding: 0 5%;
        cursor: pointer;
        &:hover {
          color: aqua;
        }
      }
    }
  }
  .container-main {
    width: 100%;
  }
}
</style>

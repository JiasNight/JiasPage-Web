<template>
  <div class="word-container">
    <!-- 头部 -->
    <div class="container-head"></div>
    <!-- 内容 -->
    <div class="container-body">
      <div class="body-content">
        <!-- 文档标题 -->
        <div class="content-title">
          <p>松松问答</p>
        </div>
        <!-- 文档主体 -->
        <div class="content-main">
          <h2>一、基本问题</h2>
          <div v-for="(item, index) in questionList" :key="index" class="main-base-question">
            <p>
              <span>{{ item.id }}.</span>
              {{ item.question }}
            </p>
            <span class="answer-span">答：</span>
            <n-input
              v-model:value="item.answer"
              class="answer-input"
              clearable
              show-count
              type="textarea"
              placeholder="请如实回答问题"
            />
            <n-divider />
          </div>
          <n-space justify="end">
            <n-button strong round>取 消</n-button>
            <n-button strong round type="primary">保 存</n-button>
          </n-space>
        </div>
      </div>
    </div>
    <!-- <div class="container-foot"></div> -->
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, isRef, toRefs, watch, computed, getCurrentInstance } from 'vue';

const textValue = ref<string>('');

const questionList = reactive([
  {
    id: 1,
    question: '今天你快乐吗？',
    answer: ''
  },
  {
    id: 2,
    question: '今天你吃饭吗？',
    answer: ''
  },
  {
    id: 3,
    question: '你知道快乐星球吗？',
    answer: ''
  },
  {
    id: 4,
    question: '中午吃点啥？',
    answer: ''
  }
]);
</script>

<style lang="scss" scoped>
.word-container {
  width: 100%;
  height: 100%;
  background: #147ace;
  .container-head {
    width: 100%;
    height: 100px;
    background: #e2e5e9;
    display: flex;
    top: 0px;
  }
  .container-body {
    width: 70%;
    height: calc(100vh - 100px);
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    overflow: auto;
    .body-content {
      width: 80%;
      min-height: 90%;
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid #ccc;
      background: linear-gradient(to left, rgb(4, 172, 247), rgb(4, 172, 247)) left top no-repeat,
        linear-gradient(to bottom, rgb(4, 172, 247), rgb(4, 172, 247)) left top no-repeat,
        linear-gradient(to left, rgb(4, 172, 247), rgb(4, 172, 247)) right top no-repeat,
        linear-gradient(to bottom, rgb(4, 172, 247), rgb(4, 172, 247)) right top no-repeat,
        linear-gradient(to left, rgb(4, 172, 247), rgb(4, 172, 247)) left bottom no-repeat,
        linear-gradient(to bottom, rgb(4, 172, 247), rgb(4, 172, 247)) left bottom no-repeat,
        linear-gradient(to left, rgb(4, 172, 247), rgb(4, 172, 247)) right bottom no-repeat,
        linear-gradient(to left, rgb(4, 172, 247), rgb(4, 172, 247)) right bottom no-repeat;
      /*设置大小*/
      background-size: 2px 80px, 80px 2px, 2px 80px, 80px 2px, 1px 200px, 80px 5px, 1px 200px, 80px 5px;
      .content-title {
        p {
          text-align: center;
          font-size: 30px;
          font-weight: bolder;
          margin-top: 20px;
        }
      }
      .content-main {
        width: 80%;
        margin: 20px auto;
        .main-base-question {
          p {
            margin: 10px 0;
          }
          .answer-span {
            font-size: 20px;
            font-weight: 900;
          }
          .answer-input {
            width: 90%;
            vertical-align: middle;
            :deep(.n-input__placeholder) {
              transform: translate(0, 25%);
            }
          }
        }
      }
    }
  }
  // .container-foot {
  //   width: 100%;
  //   height: 50px;
  //   background: green;
  // }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
}
// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
}
// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
}
// 大屏幕
@media (min-width: 1200px) {
}
// 超大屏幕
@media (min-width: 1600px) {
}
</style>

<template>
  <div class="markdown-container">
    <n-space class="container-top" justify="end">
      <router-link to="/">
        <span>首页</span>
      </router-link>
      <n-button strong round>取 消</n-button>
      <n-button strong round type="primary">保 存</n-button>
    </n-space>
    <n-divider>虚线</n-divider>
    <div class="container-body">
      <!-- 左边部分 -->
      <div class="body-left">
        <p>文章目录</p>
        <div class="left-catalog">
          <hr />
          <ul class="catalog-box">
            <li v-for="(item, index) in articleCatalogList" :key="index" class="box-li" @click="onClickArticle(item)">
              {{ item.label }}
            </li>
          </ul>
        </div>
        <!-- 热度排行 -->
        <p>热度排行</p>
        <div class="left-hotrank">
          <hr />
          <n-space>
            <n-tag v-for="(word, index) in hotWordsList" :key="index" :type="word.type" round>{{ word.label }}</n-tag>
          </n-space>
        </div>
      </div>
      <!-- 右边部分 -->
      <div class="body-right">
        <md-editor
          v-model="markdownText"
          class="right-mdeditor"
          show-code-row-number
          @onSave="saveMarkdownText"
        ></md-editor>
      </div>
    </div>
    <!-- <n-button @click="getMarkdownById">获 取</n-button> -->
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, isRef, toRefs, watch, computed, getCurrentInstance } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { markdownSave, markdownById } from '@/api/markdown/index';

const toolbars: Array<string> = ['italic', 'underline', '-', 'bold', '=', 'github'];

const markdownText = ref('# markdown');

const saveMarkdownText = (text: string) => {
  console.log(text);
  const mdData: object = {
    mdText: text
  };
  markdownSave(mdData)
  .then(() => {
    console.log('请求');
  })
  .catch(() => {
    console.log('异常');
  });
};

const getMarkdownById = () => {
  let mdId = '60e5fb94-92ff-4329-831e-3f364127d819';
  markdownById(mdId)
  .then((res: any) => {
    console.log(res);
    markdownText.value = res.data.md.mdText;
  })
  .catch(() => {
    console.log('异常');
  });
};

const articleCatalogList = reactive([
  { id: '1', label: '文章1', author: 'sf', date: '2022-01-14 12:29:45' },
  { id: '2', label: '文章2', author: 'sf', date: '2022-01-14 12:29:45' },
  { id: '3', label: '文章3', author: 'sf', date: '2022-01-14 12:29:45' },
  { id: '4', label: '文章4', author: 'sf', date: '2022-01-14 12:29:45' },
  { id: '5', label: '文章5', author: 'sf', date: '2022-01-14 12:29:45' }
]);

const onClickArticle = (item: any) => {
  alert(item.label);
};

const hotWordsList = reactive([
  { id: '1', label: '爱在西元前', type: 'success', date: '2022-01-14 12:29:45' },
  { id: '2', label: '不该', type: 'warning', date: '2022-01-14 12:29:45' },
  { id: '3', label: '超人不会飞', type: 'error', date: '2022-01-14 12:29:45' },
  { id: '4', label: '手写的从前', type: 'info', date: '2022-01-14 12:29:45' },
  { id: '5', label: '哪里都是你', type: '', date: '2022-01-14 12:29:45' }
]);
</script>

<style lang="scss" scoped>
.markdown-container {
  width: 100%;
  height: 100%;
  background: rgba(222, 225, 230, 0.856);
  .container-top {
    width: 80%;
    margin: 0 auto;
  }
  .container-body {
    width: 80%;
    height: calc(100vh - 120px);
    margin: 0 auto;
    .body-left {
      width: 20%;
      height: 100%;
      float: left;
      p {
        text-align: center;
        font-size: 20px;
        font-weight: 900;
      }
      // 文章目录
      .left-catalog {
        width: 98%;
        height: 50%;
        .catalog-box {
          width: 100%;
          height: 95%;
          margin-top: 10px;
          overflow-y: auto;
          .box-li {
            width: 95%;
            height: 25px;
            margin: 2px auto;
            font-size: 16px;
            line-height: 25px;
            font-weight: bolder;
            background: #e2e5e9;
            border: 1px solid #adadb8;
            cursor: pointer;
          }
          .box-li:hover {
            background: #13dd60;
          }
        }
      }
      // 热度排行
      .left-hotrank {
        width: 98%;
      }
    }
    .body-right {
      width: 80%;
      height: 100%;
      float: right;
      .right-mdeditor {
        height: 100%;
      }
    }
  }
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

<template>
  <div class="header-container" :style="headerColor">
    <!-- 导航菜单 -->
    <div class="container-menu">
      <!-- grid布局 -->
      <div class="menu-left">
        <div class="box-item item-logo">
          <router-link to="/">
            <img src="/src/assets/images/logo.png" alt="logo" />
          </router-link>
        </div>
        <div class="box-item item-title">
          <router-link to="/">
            <span>PAGE</span>
          </router-link>
        </div>
        <div class="box-item item-search">
          <n-input type="text" round clearable placeholder="输入关键字搜索">
            <template #suffix>
              <n-icon>
                <Search12Regular />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="box-item item-menu">
          <router-link to="/home">
            <span>{{ $t('client.navMenu.menu1') }}</span>
          </router-link>
        </div>
        <div class="box-item item-menu">
          <router-link to="/word">
            <span>{{ $t('client.navMenu.menu2') }}</span>
          </router-link>
        </div>
        <div class="box-item item-menu">
          <router-link to="/three">
            <span>{{ $t('client.navMenu.menu3') }}</span>
          </router-link>
        </div>
        <div class="box-item item-menu">
          <router-link to="/markdown">
            <span>{{ $t('client.navMenu.menu4') }}</span>
          </router-link>
        </div>
        <div class="box-item item-user">
          <n-dropdown :options="dropdownUser" :show-arrow="true" @select="onClickDropdown">
            <span>
              <n-avatar
                round
                object-fit="fill"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
              ></n-avatar>
            </span>
          </n-dropdown>
        </div>
      </div>
      <div class="menu-right" @click="menuShowList">
        <span v-show="menuDrawer.isMenuShow">
          <n-icon color="green" size="50">
            <TextBulletListLtr24Filled />
          </n-icon>
        </span>
        <span v-show="!menuDrawer.isMenuShow">
          <n-icon color="green" size="50">
            <TextBulletListTree24Filled />
          </n-icon>
        </span>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div :class="setMaskStyle" @click="menuShowList"></div>
    <!-- 弹出抽屉 -->
    <div ref="menusList" class="container-drawer">
      <div class="drawer-search">
        <n-input type="text" size="large" round clearable placeholder="输入关键字搜索">
          <template #suffix>
            <n-icon>
              <Search12Regular />
            </n-icon>
          </template>
        </n-input>
      </div>
      <div class="drawer-item">
        <router-link to="/home">
          <span>{{ $t('client.navMenu.menu1') }}</span>
        </router-link>
      </div>
      <div class="drawer-item">
        <router-link to="/">
          <span>{{ $t('client.navMenu.menu2') }}</span>
        </router-link>
      </div>
      <div class="drawer-item">
        <router-link to="/">
          <span>{{ $t('client.navMenu.menu3') }}</span>
        </router-link>
      </div>
      <div class="drawer-item">
        <router-link to="/markdown">
          <span>{{ $t('client.navMenu.menu4') }}</span>
        </router-link>
      </div>
      <div class="drawer-user">
        <router-link to="/login">
          <n-avatar round :size="50">
            <!-- <n-icon color="green">
              <PersonCircle20Regular />
            </n-icon>-->
            AoA
          </n-avatar>
        </router-link>
        <div>josn</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon, useMessage } from 'naive-ui';
import router from '@/router/index';
import { useI18n } from 'vue-i18n';

import {
  Search12Regular,
  PersonCircle20Regular,
  PersonCircle20Filled as UserIcon,
  LocalLanguageZi24Filled as LocaleLanguage,
  DoorArrowLeft20Regular as Logout,
  TextBulletListTree24Filled,
  TextBulletListLtr24Filled
} from '@vicons/fluent';

// 组件属性
const props = defineProps({
  headerColor: String
});

// 组件方法
const emit = defineEmits(['change', 'delete']);

const headerColor = $ref<string>({
  backgroundColor: props.headerColor
});

// 国际化语言
const { locale, t } = useI18n();

// 消息提示
const message = useMessage();

// 渲染icon图标方法
const renderIcon = (icon: Component) => {
  return h(NIcon, null, { default: () => h(icon) });
};

// 抽屉菜单接口
interface IDropdownMenu {
  label: string;
  key: string;
  icon: any;
}

const getDropdownUserData = (): IDropdownMenu[] => {
  const dataList = [
    {
      label: t('client.navMenu.user.userInfo'),
      key: 'userInfo',
      icon: renderIcon(UserIcon)
    },
    {
      label: t('client.navMenu.user.defaultLanguage'),
      key: 'localeLanguage',
      icon: renderIcon(LocaleLanguage)
    },
    {
      label: t('client.navMenu.user.logout'),
      key: 'logout',
      icon: renderIcon(Logout)
    }
  ];
  return dataList;
};

// 用户图标下拉菜单
let dropdownUser = ref(getDropdownUserData());

// onMounted(() => {
//   dropdownUser = ref<IDropdownMenu[]>(getDropdownUserData());
//   console.log(dropdownUser);
// });

// 用户图标出现的下拉菜单点击方法
const onClickDropdown = (key: string): void => {
  if (key === 'logout') {
    message.success('退出登陆');
    router.push('/login');
  } else if (key === 'localeLanguage') {
    console.log(locale.value);
    const language = locale.value;
    if (language === 'zh_CN') {
      locale.value = 'en_US';
      console.log(t('client.navMenu.user.defaultLanguage'));
      console.log(dropdownUser);
    } else {
      locale.value = 'zh_CN';
      console.log(dropdownUser);
    }
  }
};

interface IMenuDrawer {
  isMenuShow: boolean;
  maskShow: boolean;
}
const menusList: any = ref(null);
const menuDrawer: IMenuDrawer = reactive({
  isMenuShow: true,
  maskShow: false
});
const setMaskStyle = computed(() => {
  return { 'container-mask': menuDrawer.maskShow };
});
const menuShowList = () => {
  menusList.value.style.transition = '0.5s';
  if (menuDrawer.isMenuShow) {
    menuDrawer.maskShow = true;
    menusList.value.style.top = '60px';
    menusList.value.style.zIndex = 0;
    menuDrawer.isMenuShow = false;
  } else {
    menuDrawer.maskShow = false;
    menusList.value.style.zIndex = -9;
    menusList.value.style.top = '-500px';
    menuDrawer.isMenuShow = true;
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  position: relative;
  // z-index: 9;
  .container-menu {
    width: 100%;
    height: 60px;
    .menu-left {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(10, 10%);
      align-items: center;
      .box-item {
        a {
          text-decoration: none;
        }
      }
      .item-logo {
        justify-self: end;
        overflow: hidden;
        img {
          height: 60px;
        }
      }
      .item-title {
        justify-self: start;
        align-self: center;
        span {
          font-size: 35px;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          color: #f1f3f5;
        }
      }
      .item-search {
        grid-column-start: 3;
        grid-column-end: 6;
        width: 90%;
        height: 60%;
        justify-self: center;
        align-self: center;
        :deep(.n-input__placeholder) {
          line-height: 35px;
        }
      }
      .item-menu {
        width: 100%;
        height: 80%;
        justify-self: center;
        align-self: center;
        display: table-cell;
        text-align: center;
        border-right: 2px solid rgb(133, 126, 126);
        span {
          font-size: 18px;
          font-weight: 600;
          font-family: '楷体';
          position: relative;
          color: #ecf0f1;
          top: 25%;
          transform: translate(0, -50%);
        }
        span:hover {
          color: #26de81;
        }
        span::after {
          width: 5px;
          height: 5px;
          display: none;
          content: '';
          background: #00abd9;
          border-radius: 50%;
          position: relative;
          left: 50%;
          transform: translate(-50%, 0);
        }
        span:hover::after {
          display: block;
        }
      }
      .item-user {
        width: 100%;
        height: 80%;
        justify-self: center;
        align-self: center;
        display: table-cell;
        text-align: center;
        span {
          font-size: 16px;
          position: relative;
          top: 25%;
          transform: translate(-100%, -50%);
        }
      }
    }
    .menu-right {
      width: 50px;
      height: 50px;
      float: right;
      margin-right: 10px;
      position: relative;
      bottom: 60px;
      display: none;
      span {
        cursor: pointer;
      }
    }
  }
  // 遮罩层
  .container-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 60px;
    background-color: rgba(0, 0, 0, 0.4);
    display: none;
  }
  // 抽屉
  .container-drawer {
    width: 100%;
    height: 500px;
    position: absolute;
    top: -500px;
    background: linear-gradient(0deg, rgba(32, 107, 145, 0.774), rgba(222, 225, 230, 0.911));
    display: none;
    .drawer-search {
      width: 90%;
      height: 40px;
      margin-top: 20px;
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
      :deep(.n-input__placeholder) {
        line-height: 40px;
      }
    }
    .drawer-item {
      width: 100%;
      height: 50px;
      background: rgba(190, 184, 184, 0.377);
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      a {
        text-decoration: none;
      }
      span {
        height: 100%;
        color: rgba(0, 0, 0, 0.705);
        font-size: 18px;
        font-weight: bolder;
        line-height: 50px;
      }
      span:hover {
        color: rgba(23, 182, 36, 0.863);
      }
    }
    .drawer-user {
      width: 100%;
      margin-top: 30px;
      text-align: center;
    }
  }
}

// 移动端优先原则
// 横向放置的手机及分辨率更小的设备
@media (max-width: 480px) {
  .header-container {
    .container-menu {
      .menu-left {
        grid-template-columns: repeat(3, 40%);
        .item-search {
          display: none;
        }
        .item-menu {
          display: none;
        }
        .item-user {
          display: none;
        }
      }
      .menu-right {
        display: block;
      }
    }
    // 抽屉
    .container-drawer {
      display: block;
    }
  }
}
// 横向放置的手机和竖向放置的平板之间的分辨率
@media (min-width: 481px) and (max-width: 767px) {
  .header-container {
    .container-menu {
      .menu-left {
        grid-template-columns: repeat(3, 49%);
        .item-search {
          display: none;
        }
        .item-menu {
          display: none;
        }
        .item-user {
          display: none;
        }
      }
      .menu-right {
        display: block;
      }
    }
    .container-mask {
      display: block;
    }
    .container-drawer {
      display: block;
    }
  }
}
// 平板电脑和小屏电脑之间的分辨率
@media (min-width: 768px) and (max-width: 979px) {
  .header-container {
    .container-menu {
      .menu-left {
        grid-template-columns: repeat(7, 14%);
        .item-search {
          display: none;
        }
      }
    }
  }
}
// 大屏幕
@media (min-width: 1200px) {
}
// 超大屏幕
@media (min-width: 1600px) {
}
</style>

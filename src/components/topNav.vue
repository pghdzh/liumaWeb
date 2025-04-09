<template>
  <nav class="nav-container">
    <!-- Logo 使用 router-link 加强语义 -->
    <router-link to="/" class="logo">
      霜落的流麻小站
    </router-link>

    <!-- 主导航菜单，添加 aria-label 提升可访问性 -->
    <ul aria-label="主导航菜单">
      <li @mouseenter="hoverIndex = 0" @mouseleave="hoverIndex = null">
        <router-link to="/" exact-active-class="active">流麻成品展示</router-link>
      </li>
      <li @mouseenter="hoverIndex = 1" @mouseleave="hoverIndex = null">
        <router-link to="/uploadview" exact-active-class="active">AI绘图展示</router-link>
      </li>
      <li @mouseenter="hoverIndex = 2" @mouseleave="hoverIndex = null">
        <router-link to="/luckydraw" exact-active-class="active">抽奖页面</router-link>
      </li>
      <!-- 可根据需要添加更多导航项 -->
      <!-- 导航下划线，根据路由激活状态及悬停状态进行动态计算 -->
      <div class="nav-box" :style="{
        transform: `translateX(${(hoverIndex !== null ? hoverIndex : activeIndex) * 100}%)`,
        backgroundColor:
          hoverIndex !== null
            ? (hoverIndex === 0 ? 'rgb(250,190,250)' : '#d3e0ff')
            : (activeIndex === 0 ? 'rgb(250,190,250)' : '#d3e0ff')
      }"></div>
    </ul>

    <!-- 消息入口，外链增加 noreferrer 属性保证安全 -->
    <el-tooltip class="box-item" effect="light" content="点这里给我发消息哦！" placement="left-start">
      <div class="topMessage">
        <a href="https://message.bilibili.com/?spm_id_from=333.1387.0.0#/whisper/mid372611876" target="_blank"
          rel="noopener noreferrer">
          <el-icon>
            <Message />
          </el-icon>
        </a>
      </div>
    </el-tooltip>

    <!-- 头像链接，添加有意义的 alt 描述 -->
    <el-tooltip class="box-item" effect="light" content="点这里跳转我的b站个人空间哦！" placement="left-start">
      <div class="avatar">
        <a href="https://space.bilibili.com/372611876?spm_id_from=333.1007.0.0" target="_blank"
          rel="noopener noreferrer">
          <img src="@/assets/avatar.jpeg" alt="B站账号头像" />
        </a>
      </div>
    </el-tooltip>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Message } from '@element-plus/icons-vue';

// 根据路由判断当前激活的导航项（目前仅支持两项，可根据实际情况扩展）
const route = useRoute();
const activeIndex = computed(() => {
  if (route.path === '/') return 0;
  if (route.path === '/uploadview') return 1;
  if (route.path === '/luckydraw') return 2;
  return 0;
});

// 悬停时使用 hoverIndex，离开时恢复 activeIndex
const hoverIndex = ref(null);
</script>

<style scoped lang="scss">
$nav-height: 70px;
$primary-color: rgb(70, 100, 180);

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-container {
  width: 100%;
  height: $nav-height;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .logo {
    width: 20%;
    text-align: center;
    height: $nav-height;
    line-height: $nav-height;
    font-size: clamp(24px, 3vw, 32px);
    font-style: italic;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  ul {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;

    li {
      flex: 1;
      text-align: center;

      a {
        color: $primary-color;
        font-weight: 100;
        font-size: 24px;
        text-decoration: none;
        display: block;
        line-height: $nav-height;
      }

      /* 路由激活状态样式 */
      a.active {
        font-weight: bold;
      }
    }

    .nav-box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: calc(100% / 3); // 两个导航项时的宽度
      height: 10px;
      border-radius: 2px;
      transition: transform 0.3s ease, background-color 0.3s ease;
    }
  }

  .topMessage,
  .avatar {

    height: $nav-height;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: #000;
      text-decoration: none;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 10px 0;

    .logo {
      width: 100%;
      font-size: clamp(24px, 5vw, 32px);
      line-height: normal;
      margin-bottom: 10px;
    }

    ul {
      flex-direction: column;
      width: 100%;

      li {
        width: 100%;
      }

      .nav-box {
        display: none; // 移动端可根据需求调整或隐藏下划线效果
      }
    }

    .topMessage,
    .avatar {
      width: auto;
      margin-top: 10px;
    }
  }
}
</style>

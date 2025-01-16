<template>
  <div class="nav">
    <div class="logo">
      霜落的流麻小站
    </div>
    <ul>
      <li @click="router.push('/')">成品展示</li>
      <li @click="router.push('/')">图片上传</li>
      <li @click="router.push('/')">讨论区</li>
      <div class="nav-box"></div>
    </ul>
    <el-tooltip class="box-item" effect="light" content="点我跳转我的b站个人空间哦！" placement="left-start">
      <div class="avatar">
        <a href="https://space.bilibili.com/372611876?spm_id_from=333.1007.0.0" target="_blank">
          <img src="@/assets/avatar.jpeg" alt="">
        </a>
      </div>
    </el-tooltip>

  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style scoped lang="scss">
* {
  list-style: none;
}

.nav {
  width: 100%;
  height: 70px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  display: flex;
  justify-content: space-around;

  .logo {
    width: 20%;
    text-align: center;
    height: 70px;
    line-height: 70px;
    font-size: 32px;
    font-style: italic;
    cursor: pointer;
  }

  ul {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    .nav-box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: calc((100% / 3) * 1);
      height: 10px;
      border-radius: 2px;
      transition: 0.5s;
    }

    li {
      width: 100%;
      text-align: center;
      color: rgb(70, 100, 180);
      font: 100 24px "";
      cursor: pointer;
    }

    li:nth-child(1):hover~.nav-box {
      left: calc((100% / 3) * 0);
      background-color: rgb(250, 190, 250);
    }

    li:nth-child(2):hover~.nav-box {
      left: calc((100% / 3) * 1);
      background-color: #d3e0ff;
    }

    li:nth-child(3):hover~.nav-box {
      left: calc((100% / 3) * 2);
      background-color: #d18df8;
    }

  }

  .avatar {
    width: 10%;
    height: 70px;
    margin-top: 15px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }


}
</style>

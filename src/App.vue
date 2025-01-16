<template>

  <v-scale-screen width="1920" height="1080" fullScreen>
    <topNav class="topNav" />
    <RouterView class="routerView" />
    <canvas ref="liveCanvas" class="live2d" />
  </v-scale-screen>

</template>

<script setup>
import VScaleScreen from 'v-scale-screen'
import topNav from "@/components/topNav.vue";
import { RouterView } from "vue-router";
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4";
import { onMounted, onBeforeUnmount, ref } from "vue";
window.PIXI = PIXI; // 为了pixi-live2d-display内部调用

let app; // 为了存储pixi实例
let model; // 为了存储live2d实例
const liveCanvas = ref();

const init = async () => {
  app = new PIXI.Application({
    view: liveCanvas.value,
    autoStart: true,
    resizeTo: window,
    backgroundAlpha: 0,
  });

  // const randNum = Math.floor(Math.random() * 10)
  // let live2dLoc = './live2d/gy1024/Ganyu1024.model3.json'
  // if (randNum < 5) {
  //   live2dLoc = './live2d/nxd1080/Nahida_1080.model3.json'
  // }

  // 打包后live2d资源会出现在dist/下，这里用相对路径就能引用到了

  // model = await Live2DModel.from("./live2d/gy1024/Ganyu1024.model3.json");
  model = await Live2DModel.from("./live2d/nxd1080/Nahida_1080.model3.json");
  model.trackedPointers = [
    { id: 1, type: "pointerdown", flags: true },
    { id: 2, type: "mousemove", flags: true },
  ];
  app.stage.addChild(model);
  model.scale.set(0.2); // 调整缩放比例，一般原始资源尺寸非常大，需要缩小
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  model?.destroy();
  app?.destroy();
});
</script>

<style scoped lang="scss">
.topNav {
  position: fixed;
  top: 0;
  left: 0;
}

.routerView {
  width: 100%;
  margin-top: 70px;
  height: 1010px;
  background-color: white;
}

.live2d {
  position: fixed;
  bottom: 0;
  right: -300px;
  width: 500px;
  height: 300px;
}
</style>

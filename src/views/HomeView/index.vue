<template>
    <div class="cards">
        <div class="card" v-for="(item, index) in cardItems" :key="index">
            <img :src="item.src" alt="Image" />
            <div class="card-info">
                <h3>卡片标题 {{ index + 1 }}</h3>
                <button>查看详情</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 图片数据
const cardItems = ref([
    { src: new URL('@/assets/images/07.png', import.meta.url).href },
    { src: new URL('@/assets/images/02.png', import.meta.url).href },
    { src: new URL('@/assets/images/03.png', import.meta.url).href },
    { src: new URL('@/assets/images/04.png', import.meta.url).href },
    { src: new URL('@/assets/images/05.png', import.meta.url).href },
    { src: new URL('@/assets/images/06.png', import.meta.url).href },
    { src: new URL('@/assets/images/07.png', import.meta.url).href },
    { src: new URL('@/assets/images/02.png', import.meta.url).href },
    { src: new URL('@/assets/images/03.png', import.meta.url).href },
    { src: new URL('@/assets/images/04.png', import.meta.url).href },
    { src: new URL('@/assets/images/05.png', import.meta.url).href },
    { src: new URL('@/assets/images/06.png', import.meta.url).href },
    { src: new URL('@/assets/images/07.png', import.meta.url).href },
    { src: new URL('@/assets/images/02.png', import.meta.url).href },
    { src: new URL('@/assets/images/03.png', import.meta.url).href },
    { src: new URL('@/assets/images/04.png', import.meta.url).href },
    { src: new URL('@/assets/images/05.png', import.meta.url).href },
    { src: new URL('@/assets/images/06.png', import.meta.url).href },
]);
</script>

<style lang="scss" scoped>
.cards {
    min-height: 1010px;
    width: 100%;
    background: linear-gradient(to bottom right, #91defe, #99c0f9, #bdb6ec, #d7b3e3, #efb3d5, #f9bccc);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;


    .card {
        margin-top: 40px;
        height: 270px;
        width: 480px;
        box-sizing: border-box;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        transform: scale(1);
        position: relative;
        overflow: hidden;
        background: white;
        cursor: pointer;
        will-change: transform, box-shadow;

        &:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        img {
            border-radius: 15px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            will-change: transform;

            &:hover {
                transform: scale(1.1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
        }

        .card-info {
            position: absolute;
            bottom: 15px;
            left: 15px;
            color: white;
            font-family: 'Arial', sans-serif;
            font-size: 18px;
            text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

            h3 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }

            button {
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: background-color 0.3s ease, transform 0.3s ease;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.8);
                    transform: scale(1.1);
                }

                &:active {
                    background-color: rgba(0, 0, 0, 1);
                }
            }
        }
    }
}

/* 通用滚动条样式 */
::-webkit-scrollbar {
    width: 8px;
    /* 默认宽度 */
    background-color: rgba(255, 255, 255, 0.2);
    /* 背景色透明 */
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #99c0f9, #efb3d5);
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    /* 内部阴影 */
    transition: all 0.3s ease-in-out;
    /* 平滑过渡 */
}

/* 鼠标悬停时滚动条加宽，滑块颜色加深 */
::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #99c0f9, #efb3d5);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    width: 12px;
}

::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
    /* 滚动条背景更浅 */
    border-radius: 10px;
}

/* Firefox 定制 */
::-moz-scrollbar {
    width: 8px;
}

::-moz-scrollbar-thumb {
    background: linear-gradient(to bottom, #99c0f9, #efb3d5);
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
}

::-moz-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #99c0f9, #efb3d5);
}

</style>

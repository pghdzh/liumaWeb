<template>
    <div class="cards" v-infinite-scroll="loadMore">
        <div class="card" v-for="(item, index) in cardItems" :key="index" :style="getCardStyle(item.orientation)">
            <img :src="item.image_url" alt="Image" loading="lazy" />
            <div class="card-info">
                <h3>{{ item.title }}</h3>
                <a :href="item.video_url" target="_blank">
                    <button>查看详情</button>
                </a>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getLiumaMediaList } from '@/api/modules/liumaMedia'; // API 请求

const cardItems = ref<Array<{ image_url: string; orientation: number; title: string; video_url: string }>>([]);
const currentPage = ref(1);
const pageSize = 10;
const total = ref(0);
const loading = ref(false);

// 样式映射
const cardStyleMap = {
    1: { width: '240px', height: '420px' }, // 竖图
    0: { width: '480px', height: '270px' }  // 横图
};

// 动态获取卡片样式
const getCardStyle = (orientation?: number) => cardStyleMap[orientation ?? 0]; // 默认横图

const loadMore = async () => {
    if (cardItems.value.length >= total.value && total.value !== 0) return;
    try {
        const res = await getLiumaMediaList({ page: currentPage.value, limit: pageSize });
        if (res.media) {
            cardItems.value = [...cardItems.value, ...res.media];
            total.value = res.total;
            currentPage.value++;
        }
    } catch (error) {
        console.error('加载失败', error);
    }
};
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
        width: 480px;
        height: 270px;
        margin-right: 20px;
        margin-top: 40px;
        box-sizing: border-box;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        transform: scale(1);
        position: relative;
       
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
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #99c0f9, #efb3d5);
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
    width: 12px;
}

::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}
</style>

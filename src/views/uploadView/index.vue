<template>
  <div class="image-upload-container">
    <!-- 顶部区域 -->
    <div class="topArea">
      <div class="activeNav">
        <el-tag :class="{ active: sortBy === 'updated_at' }" type="primary" effect="dark"
          @click="changeSort('updated_at')">时间排序</el-tag>

        <el-tag :class="{ active: sortBy === 'likes' }" type="success" effect="dark"
          @click="changeSort('likes')">点赞量排序</el-tag>
      </div>
    </div>

    <!-- 图片列表（无限滚动） -->
    <div class="image-gallery" v-infinite-scroll="loadMore">
      <el-card v-for="(image, index) in aiImages" :key="image.id" class="image-card" shadow="hover">
        <img :src="image.image_path" class="image" :style="getCardStyle(image.orientation)" />
        <div class="info">
          <!-- <div class="infoText">{{ image.description }}</div> -->
          <p class="likes">点赞数：{{ image.likes }}</p>
        </div>
        <div class="infoBtn">
          <el-button v-if="!isLiked(image.id)" type="primary" @click="likeImageFun(image.id)" class="like-btn">
            点赞
          </el-button>
          <el-button type="primary" @click="downloadImage(image.image_path)" class="download-btn">下载</el-button>
        </div>
      </el-card>
    </div>

    <!-- 加载中提示 -->
    <div v-if="isLoading" class="loading-indicator">
      <el-icon>
        <Loading />
      </el-icon> 正在加载更多...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getaiImagesList, likeImage } from "@/api/modules/aiImages";
import { ElMessage } from "element-plus";
import { Loading } from "@element-plus/icons-vue";
// 数据列表与分页排序状态
const aiImages = ref<Array<{ id: number; image_path: string; description: string; likes: number; orientation: number }>>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const sortBy = ref("updated_at");
const hasMore = ref(true);
const isLoading = ref(false);

// 动态卡片样式，根据 orientation 返回对应样式
const getCardStyle = (orientation?: number) => {
  if (orientation === 1) {
    // 竖图：统一高度，宽度稍小
    return { width: "240px", height: "420px" };
  } else {
    // 横图：保持原尺寸
    return { width: "480px", height: "270px" };
  }
};

// 分页加载数据
const fetchAiImage = async (reset = false) => {
  if (isLoading.value || (!hasMore.value && !reset)) return;
  if (reset) {
    currentPage.value = 1;
    hasMore.value = true;
  }
  isLoading.value = true;
  try {
    const res = await getaiImagesList({
      page: currentPage.value,
      limit: pageSize.value,
      sortBy: sortBy.value,
    });
    if (res.code === 200) {
      if (reset) {
        aiImages.value = res.data;
      } else {
        aiImages.value.push(...res.data);
      }
      // 如果返回的数据少于 pageSize，则说明没有更多数据
      hasMore.value = res.data.length >= pageSize.value;
      if (hasMore.value) currentPage.value++;
    } else {
      ElMessage.error("加载数据失败");
    }
  } catch (error) {
    console.error("加载失败", error);
    ElMessage.error("图片加载失败");
  } finally {
    isLoading.value = false;
  }
};

// 切换排序方式，重置数据
const changeSort = (newSort: string) => {
  if (sortBy.value === newSort) return;
  sortBy.value = newSort;
  fetchAiImage(true);
};

// 加载更多数据（v-infinite-scroll 调用）
const loadMore = () => {
  fetchAiImage();
};

const isLiked = (imageId: number) => {
  const likedImages = JSON.parse(localStorage.getItem("likedImages") || "[]");
  return likedImages.includes(imageId);
};

const likeImageFun = async (imageId: number) => {
  let likedImages = JSON.parse(localStorage.getItem("likedImages") || "[]");

  if (likedImages.includes(imageId)) {
    ElMessage.warning("你已经点过赞了！");
    return;
  }

  try {
    await likeImage(imageId);
    ElMessage.success("点赞成功！");

    // 记录到本地存储
    likedImages.push(imageId);
    localStorage.setItem("likedImages", JSON.stringify(likedImages));

    // 更新前端列表
    aiImages.value = aiImages.value.map(img =>
      img.id === imageId ? { ...img, likes: img.likes + 1 } : img
    );
  } catch (err) {
    ElMessage.error("点赞失败！");
  }
};


const downloadImage = async (imageUrl: string) => {
  try {
    // 请求图片数据，确保服务器允许跨域请求（或者图片在同源下）
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error("网络响应异常");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    // 创建临时链接，设置下载属性
    const a = document.createElement("a");
    a.href = blobUrl;
    // 获取文件名：如果 imageUrl 中含有文件名，则使用该文件名，否则指定默认文件名
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1) || "download.jpg";
    a.download = fileName;

    // 触发下载
    document.body.appendChild(a);
    a.click();

    // 清理工作
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("下载失败", error);
    ElMessage.error("下载失败！");
  }
};


onMounted(() => {
  fetchAiImage();
});
</script>

<style scoped lang="scss">
:deep(.el-button) {
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 20px;
  transition: all 0.2s ease-in-out;
}

.image-upload-container {
  padding: 20px;
  background: linear-gradient(to bottom right, #91defe, #99c0f9, #bdb6ec, #d7b3e3, #efb3d5, #f9bccc);
}

.topArea {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .activeNav {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    .active {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    .el-tag {
      border-radius: 12px;
      padding: 0 1.5rem;
      height: 40px;
      line-height: 40px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      &--primary {
        background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
      }

      &--success {
        background: linear-gradient(45deg, #43e97b 0%, #38f9d7 100%);
      }
    }
  }
}

.image-gallery {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  overflow-y: auto;
  height: calc(105vh - 150px); // 固定高度，确保容器内可滚动
}

.image-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;


  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15), inset 0 2px 6px rgba(255, 255, 255, 0.3);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.4);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .image {
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: rotateY(5deg) scale(1.02);
    }
  }

  .info {
    padding: 10px;
    text-align: center;

    .likes {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .infoBtn {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding-bottom: 10px;

      .like-btn,
      .download-btn {

        &:active {
          transform: scale(0.95);
          box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}


</style>

<template>
  <div class="image-upload-container">
    <!-- 顶部区域 -->
    <div class="topArea">
      <div class="activeNav">
        <el-tag type="primary" effect="dark" @click="fetchUploadedImages('upload_time')">时间排序</el-tag>
        <el-tag type="success" effect="dark" @click="fetchUploadedImages('likes')">点赞量排序</el-tag>
      </div>
      <!-- 上传图片组件 -->
      <el-upload class="upload-demo" action="http://localhost:3000/api/images/upload" name="image"
        :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="checkFileSize" accept="image/*">
        <el-button type="primary">上传图片</el-button>
      </el-upload>
    </div>

    <!-- 图片列表展示 -->
    <div class="image-gallery">
      <el-card v-for="(image, index) in uploadedImages" :key="image.id" class="image-card" shadow="hover">
        <img :src="`http://localhost:3000/${image.file_path}`" class="image" @load="handleImageLoad(image, $event)"
          :style="getCardStyle(image.ratio)" />
        <div class="info">
          <div class="infoText">
            图片描述
          </div>
          <p class="likes">点赞数：{{ image.likes }}</p>

        </div>
        <div class="infoBtn">
          <el-button type="primary" @click="likeImageFun(image.id)">
            点赞
          </el-button>
          <el-button type="primary">
            编辑描述
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getImageList, likeImage } from "@/api/modules/images";
import { ElMessage } from "element-plus";

interface Image {
  id: number;
  file_path: string;
  upload_time: string;
  likes: number;
  status: string;
  ratio?: number; // 新增属性，存储图片宽高比
}

const uploadedImages = ref<Image[]>([]); // 上传后的图片列表

// 上传成功回调
const handleUploadSuccess = () => {
  ElMessage.success("图片上传成功！");
  fetchUploadedImages(); // 重新加载图片列表
};

// 上传失败回调
const handleUploadError = () => {
  ElMessage.error("图片上传失败！");
};

//上传之前检查大小
const checkFileSize = (file: File) => {
  const isLessThan10MB = file.size / 1024 / 1024 < 10; // 转换为 MB 判断大小
  if (!isLessThan10MB) {
    ElMessage.error("图片大小不能超过 10MB！");
  }
  return isLessThan10MB; // 返回 true 允许上传，返回 false 阻止上传
};
// 获取图片列表
const fetchUploadedImages = async (sortBy: any = 'upload_time') => {
  let params = {
    sortBy: sortBy
  }
  const res = await getImageList(params);
  uploadedImages.value = res.images;

  // 确保每张图片的 ratio 被计算
  uploadedImages.value.forEach((image) => {
    const img = new Image();
    img.src = `http://localhost:3000/${image.file_path}`;
    img.onload = () => {
      image.ratio = img.naturalWidth / img.naturalHeight;
    };
  });
};

// 点赞图片
const likeImageFun = async (imageId: number) => {
  try {
    console.log('imageId', imageId)
    await likeImage(imageId); // 注意：传递 imageId 参数
    ElMessage.success("点赞成功！");
    fetchUploadedImages(); // 点赞后重新加载图片列表
  } catch (err) {
    ElMessage.error("点赞失败！");
  }
};

// 图片加载时，计算图片宽高比
const handleImageLoad = (image: Image, event: Event) => {
  const target = event.target as HTMLImageElement;
  const ratio = target.naturalWidth / target.naturalHeight;
  image.ratio = ratio;
};

// 动态获取卡片样式
const getCardStyle = (ratio?: number) => {
  if (!ratio) {
    // 提供默认样式，防止图片撑满容器
    return {
      width: "480px",
      height: "270px",
    };
  }
  if (ratio < 1) {
    // 竖向图片
    return {
      width: "151px",
      height: "270px",
    };
  } else {
    // 横向图片
    return {
      width: "480px",
      height: "270px",
    };
  }
};

// 初始化加载图片列表
onMounted(() => {
  fetchUploadedImages();
});
</script>

<style scoped lang="scss">
.image-upload-container {
  padding: 20px;
  background: linear-gradient(to bottom right, #91defe, #99c0f9, #bdb6ec, #d7b3e3, #efb3d5, #f9bccc);

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .activeNav .el-tag {
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
      margin-right: 20px;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }
    }

    .upload-demo {
      margin-top: 10px;

      /* 让按钮相对于父容器居中 */
      .el-button {
        border-radius: 20px;
        font-size: 14px;

      }
    }
  }

  .image-gallery {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .image-card {

      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      text-align: center;

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .image {
        object-fit: cover;
      }

      .info {
        padding: 10px;
        text-align: center;

        .infoText {
          margin: 10px 0;
        }

        .likes {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .el-button {
          font-size: 12px;
        }
      }
    }
  }
}
</style>

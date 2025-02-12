import http from "../axios";

/**
 * @function 获取AI图片列表（支持排序、分页）
 * @param {object} params - 例如：{ sortBy: "likes", order: "DESC", page: 1, pageSize: 10 }
 */
export const getaiImagesList = (params: any): any => {
  return http.get("/api/aiImages", params);
};

export const likeImage = (imageId: any): any => {
  return http.post(`/api/aiImages/${imageId}/like`);
};

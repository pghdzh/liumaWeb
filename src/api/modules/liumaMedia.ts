import http from "../axios";

/**
 * @function 获取流麻图片列表（支持排序、分页）
 * @param {object} params - 例如：{ sortBy: "likes", order: "DESC", page: 1, pageSize: 10 }
 */
export const getLiumaMediaList = (params: any): any => {
  return http.get("/api/liuma-media", params);
};
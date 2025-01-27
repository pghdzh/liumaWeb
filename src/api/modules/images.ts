import http from "../axios";

export const getImageList = (params: any): any => {
  return http.get("/api/images", params);
};

export const likeImage = (imageId: any): any => {
  return http.post(`/api/images/${imageId}/like`);
};

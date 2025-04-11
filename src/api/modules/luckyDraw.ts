import http from "../axios";

export interface Participant {
  id: number;
  name: string;
  weight: number;
  created_at?: string;
}


/** 获取参与者列表 */
export const getluckyDraw = (params: {
  sortBy?: "id" | "weight" | "created_at";
  order?: "ASC" | "DESC";
  page?: number;
  pageSize?: number;
}) => {
  return http.get<{ luckyDraw: Participant[] }>("/api/luckyDraw", { params });
};

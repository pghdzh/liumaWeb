import http from "../axios";

// 定义上传学生 Excel 的函数
export const uploadStudents = (
  courseId: string,
  formData: FormData
): Promise<any> => {
  return http.post(
    `/api/courseStudent/courses/${courseId}/import-students`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getStudentBycourse = (courseId: any, params: any): any => {
  return http.get(`/api/courseStudent/courses/${courseId}/students`, params);
};

export const deleteAllStudnet = () => {
  return http.delete(`/api/courseStudent/allStudents`);
};

export const deletestudentInCourse = (courseId: any, studentId: any): any => {
  return http.delete(`/api/courseStudent/${courseId}/${studentId}`);
};
/**
 * @function 获取课程
 */
export const getstudent = (params: any): any => {
  return http.get("/api/student", params);
};

export const rePass = (studentId: any): any => {
  return http.put(`/api/student/rePass/${studentId}`);
};

export const reName = (studentId: any, updatedData: any): any => {
  return http.put(`/api/student/reName/${studentId}`, updatedData);
};

export const deleteStudent = (courseId: any): any => {
  return http.delete(`/api/student/${courseId}`);
};

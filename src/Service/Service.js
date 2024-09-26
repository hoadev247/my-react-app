import axios from "axios";

const API_URL = "https://chayduoc-2.onrender.com/trees"; // URL API của backend

// Lấy tất cả cây
export const getAllTrees = () => {
  return axios.get(API_URL);
};

// Tạo cây mới
export const createTree = (treeData) => {
  return axios.post(API_URL, treeData);
};

// Lấy chi tiết cây theo ID
export const getTreeById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Cập nhật cây
export const updateTree = (id, treeData) => {
  return axios.put(`${API_URL}/${id}`, treeData);
};

// Xóa cây
export const deleteTree = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

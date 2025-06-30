import axios from "axios";

const baseURL = "http://192.168.1.50:3000";

const API = axios.create({
  baseURL: baseURL,
});

export default {
  getNews() {
    return API.get(`/news`);
  },

  createNews(formData) {
    return API.post("/news", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateNews(id, formData) {
    return API.put(`/news/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteNews(id) {
    return API.delete(`/news/${id}`);
  },

  registerUser(userData) {
    return API.post("/users/register", userData);
  },

  loginUser(userData) {
    return API.post("/users/login", userData);
  },

  getUserProfile() {
    return API.get("/users/profile");
  },

  updateUserProfile(userData) {
    return API.put("/users/profile", userData);
  },
  getfullpathImage(img){
    return `${baseURL}${img}`
  },
  // getWilayah(){
  //   return API.get("api/wilayah")
  // }
};

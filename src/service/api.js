import axios from "axios";

const baseURL = "http://localhost:8081"; // Ganti sesuai IP server kamu

const API = axios.create({
  baseURL: baseURL,
});

export default {
  getfullpathImage(img) {
    return `${baseURL}${img}`;
  },

  getNews() {
    return API.get(`/news`);
  },

  getLocations() {
    return API.get("/api/locations");
  },
  createLocation(data) {
    return API.post("/api/locations", data);
  },

  // 🎓 Faculty
  getFaculties() {
    return API.get("/api/faculties");
  },
  createFaculty(data) {
    return API.post("/api/faculties", data);
  },

  // 👥 Group
  getGroups(params) {
    return API.get("/api/groups", { params });
  },
  getGroupById(id) {
    return API.get(`/api/groups/${id}`);
  },
  createGroup(data) {
    return API.post("/api/groups", data);
  },
  updateGroup(id, data) {
    return API.put(`/api/groups/${id}`, data);
  },
  deleteGroup(id) {
    return API.delete(`/api/groups/${id}`);
  },
  getGroupStats() {
    return API.get("/api/groups-stats");
  },

  getGroupProgress(groupId) {
    return API.get(`/api/progress/${groupId}`);
  },
  updateProgress(data) {
    return API.post("/api/progress", data);
  },
};

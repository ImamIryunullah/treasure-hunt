import axios from "axios";

const baseURL = "http://localhost:8081"; // Ganti sesuai IP server kamu

const API = axios.create({
  baseURL: baseURL,
});

export default {
  // 📌 General
  getfullpathImage(img) {
    return `${baseURL}${img}`;
  },

  // 📰 News (Contoh awal)
  getNews() {
    return API.get(`/news`);
  },

  // 🧭 Location
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

  // 🧩 Progress
  getGroupProgress(groupId) {
    return API.get(`/api/progress/${groupId}`);
  },
  updateProgress(data) {
    return API.post("/api/progress", data);
  },
    // 🧠 Questions
    getQuestions(params) {
      return API.get("/api/questions", { params });
    },
    getQuestion(id) {
      return API.get(`/api/questions/${id}`);
    },
    createQuestion(data) {
      return API.post("/api/questions", data);
    },
    updateQuestion(id, data) {
      return API.put(`/api/questions/${id}`, data);
    },
    deleteQuestion(id) {
      return API.delete(`/api/questions/${id}`);
    },
    answerQuestion(data) {
      return API.post("/api/questions/answer", data);
    },
    getQuestionStats() {
      return API.get("/api/questions/stats");
    },
    getQuestionsByLocation(locationId) {
      return API.get(`/api/questions/location/${locationId}`);
    },
    importQuestions(data) {
      return API.post("/api/questions/import", data);
    },
    bulkActionQuestions(data) {
      return API.post("/api/questions/bulk-action", data);
    },
    getLocationQuestionStats() {
      return API.get("/api/questions/location-stats");
    },
  
};

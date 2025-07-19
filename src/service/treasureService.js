import axios from "axios";
const baseURL = "http://localhost:8081";
// tunnel backend kamu
const API = axios.create({
  baseURL: baseURL,
  withCredentials:true
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // atau sesuaikan kalau pakai sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // ========== IMAGE HELPER ==========
  getfullpathImage(img) {
    return `${baseURL}${img}`;
  },

  // ========== TEAMS ==========
  getTeams() {
    return API.get("/teams");
  },
  createTeam(teamData) {
    return API.post("/teams", teamData);
  },
  updateTeam(teamId, teamData) {
    return API.put(`/teams/${teamId}`, teamData);
  },
  deleteTeam(teamId) {
    return API.delete(`/teams/${teamId}`);
  },
  addMember(teamId, memberData) {
    return API.post(`/teams/${teamId}/members`, memberData);
  },
  removeMember(teamId, memberId) {
    return API.delete(`/teams/${teamId}/members/${memberId}`);
  },

  // ========== QUIZ () ==========

    // Get all quiz questions
    getQuizQuestions() {
      return API.get("/quiz-questions");
    },
  
    // Create a new quiz question
    createQuizQuestion(data) {
      return API.post("/quiz-questions", data);
    },
  
    // Update quiz question
    updateQuizQuestion(id, data) {
      return API.put(`/quiz-questions/${id}`, data);
    },
  
    // Delete quiz question
    deleteQuizQuestion(id) {
      return API.delete(`/quiz-questions/${id}`);
    },
  
    // Get quiz settings
    getQuizSettings() {
      return API.get("/quiz-settings");
    },

    submitQuizAnswers(data) {
      const token = localStorage.getItem("token");
      return API.post("/quiz-questions/submit-answers", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    getSubmissions(){
      return API.get("/quiz-submissions")
    },
    
  
    // Save or update quiz settings
    saveQuizSettings(data) {
      return API.post("/quiz-settings", data);
    },

   // ========== Lokasi (Location) ==========
   CreateLokasi(data){
    return API.post('/lokasi',data)
   },
   UpdateLokasi(id,data){
    return API.put(`/lokasi/${id}`,data)
   },
   GetAllLokasi(){
    return API.get('/lokasi')
   },
   GetLokasiByid(id){
    return API.get(`/lokasi/${id}`)
   },
   DeleteLokasi(id){
    return API.delete(`/lokasi/${id}`)
   },
     // ========== AUTH ==========
   register(data) {
    return API.post("/register", data);
  },
  login(data) {
    return API.post("/login", data);
  },
  //======= Fakultas=====
  CreateFakultas(data){
    return API.post("/api/fakultas",data)
  },
  GetAllFakultas(){
    return API.get("/api/fakultas")
  },
  GetFakultasByID(id){
    return API.get(`/api/fakultas/${id}`)
  },
  DeleteFakultas(id){
    return API.delete(`/api/fakultas/${id}`)
  },

    //======= Prodi=====
    CreateProdi(data){
      return API.post("/api/prodi",data)
    },
    GetAllProdi(){
      return API.get("/api/prodi")
    },
    GetProdiByID(id){
      return API.get(`/api/prodi/${id}`)
    },
    GetProdiByFakutlasID(id){
      return API.get(`/api/prodi/fakultas/${id}`)
    },
    DeleteProdi(id){
      return API.delete(`/api/prodi/${id}`)
    },
};

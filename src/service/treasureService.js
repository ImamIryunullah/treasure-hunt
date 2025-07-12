import axios from "axios";

const baseURL = "http://localhost:8081";

const API = axios.create({
  baseURL: baseURL,
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

  // ========== QUESTIONS (SOAL) ==========
  getQuestions() {
    return API.get("/soal");
  },
  createQuestion(questionData) {
    return API.post("/soal", questionData);
  },
  updateQuestion(id, questionData) {
    return API.put(`/soal/${id}`, questionData);
  },
  deleteQuestion(id) {
    return API.delete(`/soal/${id}`);
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
   }
};

import axios from "axios";

const baseURL = "http://localhost:8081"; 

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
  
};

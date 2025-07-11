<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin />
    <div class="flex-1 p-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          Kelola Kelompok Treasure Hunt
        </h1>
        <p class="text-gray-600">Buat kelompok baru dan kelola data anggota kelompok</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Kelompok</p>
              <p class="text-2xl font-bold text-gray-800">{{ totalTeams }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-lg">
              <i class="fas fa-users text-blue-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Peserta</p>
              <p class="text-2xl font-bold text-gray-800">{{ totalParticipants }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <i class="fas fa-user-friends text-green-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Kelompok Penuh</p>
              <p class="text-2xl font-bold text-gray-800">{{ fullTeams }}</p>
            </div>
            <div class="bg-red-100 p-3 rounded-lg">
              <i class="fas fa-exclamation-triangle text-red-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Slot Tersedia</p>
              <p class="text-2xl font-bold text-gray-800">{{ availableSlots }}</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-lg">
              <i class="fas fa-clock text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div class="xl:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-blue-100 p-2 rounded-lg">
                <i class="fas fa-plus text-blue-600"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Buat Kelompok Baru</h2>
            </div>

            <form @submit.prevent="createTeam">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kelompok
                </label>
                <input
                  v-model="newTeam.name"
                  type="text"
                  placeholder="Masukkan nama kelompok"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  v-model="newTeam.description"
                  placeholder="Deskripsi kelompok"
                  rows="3"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Maksimal Anggota
                </label>
                <select
                  v-model="newTeam.maxMembers"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Pilih limit anggota</option>
                  <option value="4">4 Anggota</option>
                  <option value="6">6 Anggota</option>
                  <option value="8">8 Anggota</option>
                  <option value="10">10 Anggota</option>
                </select>
              </div>

              <button
                type="submit"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <i class="fas fa-plus-circle mr-2"></i>
                Buat Kelompok
              </button>
            </form>
          </div>
        </div>

        <div class="xl:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-2 rounded-lg">
                  <i class="fas fa-list text-green-600"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Daftar Kelompok</h2>
              </div>

              <div class="flex items-center gap-3">
                <div class="relative">
                  <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Cari kelompok..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i
                    class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  ></i>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="team in filteredTeams"
                :key="team.id"
                class="border rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <h3 class="font-semibold text-gray-800">{{ team.name }}</h3>
                    <span
                      class="text-xs px-2 py-1 rounded-full"
                      :class="getTeamStatusClass(team)"
                    >
                      {{ getTeamStatus(team) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">
                      {{ team.members.length }}/{{ team.maxMembers }}
                    </span>
                    <button
                      @click="toggleTeamDetails(team.id)"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      <i
                        class="fas fa-chevron-down transition-transform"
                        :class="{ 'rotate-180': expandedTeams.includes(team.id) }"
                      ></i>
                    </button>
                  </div>
                </div>

                <p class="text-sm text-gray-600 mb-3">{{ team.description }}</p>

                <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :class="getProgressBarClass(team)"
                    :style="{ width: getProgressPercentage(team) + '%' }"
                  ></div>
                </div>

                <div v-if="expandedTeams.includes(team.id)" class="mt-4 border-t pt-4">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="font-medium text-gray-700">Anggota Kelompok</h4>
                    <button
                      @click="exportTeamData(team)"
                      class="text-sm text-blue-600 hover:text-blue-800"
                    >
                      <i class="fas fa-download mr-1"></i>
                      Export Data
                    </button>
                  </div>

                  <div v-if="team.members.length > 0" class="space-y-2">
                    <div
                      v-for="member in team.members"
                      :key="member.id"
                      class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div class="flex-1">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                          >
                            <i class="fas fa-user text-blue-600 text-xs"></i>
                          </div>
                          <div>
                            <p class="font-medium text-gray-800">{{ member.name }}</p>
                            <p class="text-sm text-gray-600">{{ member.nim }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-medium text-gray-700">
                          {{ member.whatsapp }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ formatDate(member.joinDate) }}
                        </p>
                      </div>
                      <button
                        @click="removeMember(team.id, member.id)"
                        class="ml-3 text-red-600 hover:text-red-800"
                      >
                        <i class="fas fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>

                  <div v-else class="text-center py-8 text-gray-500">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <p>Belum ada anggota yang terdaftar</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-4">
                  <button
                    @click="editTeam(team)"
                    class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <i class="fas fa-edit mr-1"></i>
                    Edit
                  </button>
                  <button
                    @click="deleteTeam(team.id)"
                    class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <i class="fas fa-trash mr-1"></i>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeEditModal"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-96 max-w-lg mx-4" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Edit Kelompok</h2>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="updateTeam">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Kelompok
            </label>
            <input
              v-model="editingTeam.name"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              v-model="editingTeam.description"
              rows="3"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Maksimal Anggota
            </label>
            <select
              v-model="editingTeam.maxMembers"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="4">4 Anggota</option>
              <option value="6">6 Anggota</option>
              <option value="8">8 Anggota</option>
              <option value="10">10 Anggota</option>
            </select>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              @click="closeEditModal"
              class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { ref, reactive, computed } from "vue";
import { onMounted } from "vue";
import treasureService from "@/service/treasureService";

export default {
  components: {
    SidebarAdmin,
  },
  setup() {
    const searchTerm = ref("");
    const expandedTeams = ref([]);
    const showEditModal = ref(false);

    const newTeam = reactive({
      name: "",
      description: "",
      maxMembers: "",
    });

    const editingTeam = reactive({
      id: null,
      name: "",
      description: "",
      maxMembers: "",
    });

    const teams = ref([]);
    const fetchTeams = async () => {
      try {
        const response = await treasureService.getTeams();
        teams.value = response.data;
      } catch (err) {
        alert("Gagal memuat data tim.");
        console.error(err);
      }
    };

    onMounted(fetchTeams);

    const filteredTeams = computed(() => {
      if (!searchTerm.value) return teams.value;
      return teams.value.filter(
        (team) =>
          team.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          team.description.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const totalTeams = computed(() => teams.value.length);
    const totalParticipants = computed(() =>
      teams.value.reduce((sum, team) => sum + team.members.length, 0)
    );
    const fullTeams = computed(
      () => teams.value.filter((team) => team.members.length >= team.maxMembers).length
    );
    const availableSlots = computed(() =>
      teams.value.reduce((sum, team) => sum + (team.maxMembers - team.members.length), 0)
    );

    const createTeam = async () => {
      try {
        await treasureService.createTeam({
          Name: newTeam.name,
          Description: newTeam.description,
          MaxMembers: parseInt(newTeam.maxMembers),
        });
        await fetchTeams(); // reload
        newTeam.name = "";
        newTeam.description = "";
        newTeam.maxMembers = "";
      } catch (err) {
        alert("Gagal menambahkan tim.");
        console.error(err);
      }
    };

    const editTeam = (team) => {
      editingTeam.id = team.id;
      editingTeam.name = team.name;
      editingTeam.description = team.description;
      editingTeam.maxMembers = team.maxMembers;
      showEditModal.value = true;
    };
    const updateTeam = async () => {
      try {
        await treasureService.updateTeam(editingTeam.id, {
          Name: editingTeam.name,
          Description: editingTeam.description,
          MaxMembers: parseInt(editingTeam.maxMembers),
        });

        await fetchTeams();
        closeEditModal();
      } catch (err) {
        alert("Gagal memperbarui tim.");
        console.error(err);
      }
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      editingTeam.id = null;
      editingTeam.name = "";
      editingTeam.description = "";
      editingTeam.maxMembers = "";
    };

    const deleteTeam = async (teamId) => {
      console.log("Team ID to delete:", teamId); // Tambahkan ini
      if (!teamId || isNaN(teamId)) {
        alert("ID tim tidak valid!");
        return;
      }
      try {
        await treasureService.deleteTeam(teamId);
        alert("Tim berhasil dihapus!");
        // update list
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus tim.");
      }
    };

    const removeMember = async (teamId, memberId) => {
      if (confirm("Apakah Anda yakin ingin mengeluarkan anggota ini?")) {
        try {
          await treasureService.removeMember(teamId, memberId);
          await fetchTeams();
        } catch (err) {
          alert("Gagal menghapus anggota.");
          console.error(err);
        }
      }
    };

    const toggleTeamDetails = (teamId) => {
      const index = expandedTeams.value.indexOf(teamId);
      if (index > -1) {
        expandedTeams.value.splice(index, 1);
      } else {
        expandedTeams.value.push(teamId);
      }
    };

    const getTeamStatus = (team) => {
      if (team.members.length >= team.maxMembers) return "Penuh";
      if (team.members.length === 0) return "Kosong";
      return "Tersedia";
    };

    const getTeamStatusClass = (team) => {
      if (team.members.length >= team.maxMembers) return "bg-red-100 text-red-800";
      if (team.members.length === 0) return "bg-gray-100 text-gray-800";
      return "bg-green-100 text-green-800";
    };

    const getProgressPercentage = (team) => {
      return (team.members.length / team.maxMembers) * 100;
    };

    const getProgressBarClass = (team) => {
      const percentage = getProgressPercentage(team);
      if (percentage >= 100) return "bg-red-500";
      if (percentage >= 75) return "bg-yellow-500";
      return "bg-blue-500";
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const exportTeamData = (team) => {
      const data = team.members.map((member) => ({
        Nama: member.name,
        NIM: member.nim,
        WhatsApp: member.whatsapp,
        "Tanggal Bergabung": formatDate(member.joinDate),
      }));

      const csv = [
        Object.keys(data[0]).join(","),
        ...data.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${team.name}_anggota.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return {
      searchTerm,
      expandedTeams,
      showEditModal,
      newTeam,
      editingTeam,
      teams,
      filteredTeams,
      totalTeams,
      totalParticipants,
      fullTeams,
      availableSlots,
      createTeam,
      editTeam,
      updateTeam,
      closeEditModal,
      deleteTeam,
      removeMember,
      toggleTeamDetails,
      getTeamStatus,
      getTeamStatusClass,
      getProgressPercentage,
      getProgressBarClass,
      formatDate,
      exportTeamData,
    };
  },
};
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

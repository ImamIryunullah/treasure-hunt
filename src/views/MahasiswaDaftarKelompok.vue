<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa />
    <div class="flex-1 p-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          Daftar Kelompok Treasure Hunt
        </h1>
        <p class="text-gray-600">
          Pilih kelompok dan lengkapi data diri untuk mengikuti petualangan
        </p>
      </div>

      <div class="flex gap-8">
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-blue-100 p-2 rounded-lg">
                <i class="fas fa-users text-blue-600"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Pilih Kelompok</h2>
            </div>

            <p class="text-gray-600 mb-6">
              Pilih salah satu kelompok yang tersedia (maksimal 8 anggota per kelompok)
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="team in teams"
                :key="team.id"
                class="border rounded-lg p-4 transition-colors"
                :class="[
                  selectedTeam === team.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-blue-400 cursor-pointer',
                  team.members.length >= team.maxMembers
                    ? 'opacity-60 cursor-not-allowed'
                    : 'cursor-pointer',
                ]"
                @click="team.members.length < team.maxMembers && selectTeam(team.name)"
              >
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-800">{{ team.name }}</h3>
                  <span
                    class="text-sm"
                    :class="{
                      'text-gray-500': team.members.length < team.maxMembers,
                      'text-white bg-red-400 px-2 py-1 rounded':
                        team.members.length >= team.maxMembers,
                    }"
                  >
                    {{
                      team.members.length >= team.maxMembers
                        ? "Penuh"
                        : `${team.members.length}/${team.maxMembers}`
                    }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ team.description }}</p>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="h-2 rounded-full bg-blue-500"
                    :style="{
                      width: (team.members.length / team.maxMembers) * 100 + '%',
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-96">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-green-100 p-2 rounded-lg">
                <i class="fas fa-clipboard-list text-green-600"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Data Anggota</h2>
            </div>

            <p class="text-gray-600 mb-6">
              Lengkapi data diri untuk pendaftaran kelompok
            </p>

            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Kelompok Dipilih
                </label>
                <input
                  type="text"    
                  :value="getTeamName(formData.selectedTeam)"
                  readonly
                  class="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  v-model="formData.fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2"> NIM </label>
                <input
                  v-model="formData.nim"
                  type="text"
                  placeholder="Masukkan NIM"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  No. WhatsApp
                </label>
                <input
                  v-model="formData.whatsapp"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div class="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div class="flex items-center gap-2 text-yellow-700">
                    <i class="fas fa-exclamation-triangle text-sm"></i>
                    <span class="text-sm">
                      Pastikan nomor WhatsApp aktif. Link grup kelompok akan dikirim ke
                      nomor ini.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-500 transition-colors"
                :disabled="!isFormValid"
                :class="{ 'bg-blue-600 hover:bg-blue-700': isFormValid }"
              >
                <i class="fas fa-check-circle mr-2"></i>
                Konfirmasi Pendaftaran
              </button>
            </form>

            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 class="font-semibold text-gray-800 mb-3">Informasi Penting</h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start gap-2">
                  <i class="fas fa-circle text-blue-500 text-xs mt-1.5"></i>
                  <span>Setiap kelompok maksimal 8 anggota</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-circle text-blue-500 text-xs mt-1.5"></i>
                  <span>Pendaftaran tidak dapat diubah setelah dikonfirmasi</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-circle text-blue-500 text-xs mt-1.5"></i>
                  <span>Treasure hunt dimulai setelah semua anggota terdaftar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-96 max-w-lg mx-4" @click.stop>
        <div class="text-center">
          <div class="mb-4">
            <i class="fas fa-check-circle text-green-500 text-6xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h2>
          <p class="text-gray-600 mb-6">
            Selamat! Anda telah berhasil bergabung dengan
            {{ getTeamName(formData.selectedTeam) }}
          </p>

          <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 class="font-semibold text-gray-800 mb-3">Detail Pendaftaran:</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Kelompok:</span>
                <span class="font-medium">{{ getTeamName(formData.selectedTeam) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Nama:</span>
                <span class="font-medium">{{ formData.fullName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">NIM:</span>
                <span class="font-medium">{{ formData.nim }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">WhatsApp:</span>
                <span class="font-medium">{{ formData.whatsapp }}</span>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 class="font-semibold text-blue-800 mb-2">Langkah Selanjutnya:</h3>
            <ul class="text-sm text-blue-700 space-y-1 text-left">
              <li>• Link grup WhatsApp akan dikirim dalam 24 jam</li>
              <li>• Tunggu instruksi dari koordinator kelompok</li>
              <li>• Persiapkan diri untuk petualangan treasure hunt</li>
            </ul>
          </div>

          <div class="flex gap-3">
            <button
              @click="closeModal"
              class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Tutup
            </button>
            <button
              @click="goToDashboard"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
import { ref, reactive, computed, watch, onMounted } from "vue";
import treasureService from "@/service/treasureService";

export default {
  components: {
    SidebarMahasiswa,
  },
  setup() {
    const selectedTeam = ref("");
    const showModal = ref(false);
    const teams = ref([]); // fetched teams from backend
    const errorMessage = ref("");

    const formData = reactive({
      selectedTeam: "",
      fullName: "",
      nim: "",
      whatsapp: "",
    });

    const isFormValid = computed(() => {
      return (
        formData.selectedTeam &&
        formData.fullName.trim() &&
        formData.nim.trim() &&
        formData.whatsapp.trim()
      );
    });

    const fetchTeams = async () => {
      try {
        const response = await treasureService.getTeams();
        teams.value = response.data;
      } catch (err) {
        console.error("Failed to fetch teams:", err);
      }
    };
    const selectTeam = (teamName) => {
      const team = teams.value.find((t) => t.name === teamName);
      if (!team || team.members.length >= team.maxMembers) return;
      selectedTeam.value = teamName;
      formData.selectedTeam = teamName;
    };

    const getTeamName = (teamCode) => {
      const team = teams.value.find((t) => t.name.toLowerCase() === teamCode);
      return team ? team.name || team.name : teamCode;
    };

    const submitForm = async () => {
      if (!isFormValid.value) return;

      const selected = teams.value.find(
        (t) => t.name.toLowerCase() === formData.selectedTeam
      );

      if (!selected) {
        errorMessage.value = "Kelompok tidak ditemukan.";
        return;
      }

      if (selected.members.length >= selected.maxMembers) {
        errorMessage.value = "Kelompok sudah penuh.";
        return;
      }

      try {
        const payload = {
          name: formData.fullName,
          nim: formData.nim,
          whatsapp: formData.whatsapp,
        };

        await treasureService.addMember(selected.id, payload);
        errorMessage.value = "";
        showModal.value = true;
      } catch (err) {
        if (err.response?.data?.error?.includes("duplicate")) {
          errorMessage.value = "NIM ini sudah terdaftar di kelompok.";
        } else {
          errorMessage.value = "Gagal mendaftar. Coba lagi nanti.";
        }
        console.error("Submit error:", err);
      }
    };

    const closeModal = () => {
      showModal.value = false;
      formData.selectedTeam = "";
      formData.fullName = "";
      formData.nim = "";
      formData.whatsapp = "";
      selectedTeam.value = "";
    };

    const goToDashboard = () => {
      showModal.value = false;
      // this.$router.push("/mahasiswa-dashboard"); // aktifkan jika routing tersedia
    };

    watch(selectedTeam, (newVal) => {
      formData.selectedTeam = newVal;
    });

    onMounted(fetchTeams);

    return {
      selectedTeam,
      showModal,
      formData,
      isFormValid,
      selectTeam,
      getTeamName,
      submitForm,
      closeModal,
      goToDashboard,
      teams,
      errorMessage,
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

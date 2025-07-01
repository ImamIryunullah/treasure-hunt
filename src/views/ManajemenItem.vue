<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="mb-4 md:mb-0">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Item</h1>
          <p class="text-gray-600">
            Peringkat hasil seleksi berdasarkan fakultas dan program studi
          </p>
        </div>
        <div class="flex">
          <button
            @click="showAddModal = true"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Tambah Item</span>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-lg p-6 border border-black shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ stat.title }}</h3>
          <p class="text-3xl font-bold text-gray-900 mb-2">{{ stat.value }}</p>
          <p class="text-sm text-gray-500">{{ stat.subtitle }}</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-black shadow-sm">
        <div class="p-6 border-b border-black">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Peringkat Lengkap</h2>
          <p class="text-gray-600 mb-4">Daftar lengkap peringkat semua peserta seleksi</p>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari nama Peserta"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fakultas
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Prodi
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total penyelesaian
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Waktu
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="participant in filteredParticipants"
                :key="participant.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ participant.rank }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ participant.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {{ participant.faculty }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ participant.prodi }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ participant.totalCompletion }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ participant.time }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      participant.status === 'Lolos'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ participant.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  (currentPage - 1) * itemsPerPage + 1
                }}</span>
                to
                <span class="font-medium">{{
                  Math.min(currentPage * itemsPerPage, totalItems)
                }}</span>
                of
                <span class="font-medium">{{ totalItems }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Tambah Soal Baru</h2>
            <p class="text-gray-600 mb-6">Buat pertanyaan untuk seleksi</p>
            <form @submit.prevent="saveQuestion">
              
              <div class="mb-6">
                <label class="block text-lg font-medium text-gray-700 mb-2"
                  >Pertanyaan</label
                >
                <textarea
                  v-model="newQuestion.text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows="3"
                  placeholder="Tulis pertanyaan di sini..."
                  required
                ></textarea>
              </div>

              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Pilihan jawaban</label
                >
                <div class="space-y-3">
                  <div
                    v-for="(option, index) in newQuestion.options"
                    :key="index"
                    class="flex items-center space-x-3"
                  >
                    <span class="font-medium text-gray-700 w-6">{{ option.label }}.</span>
                    <input
                      v-model="option.text"
                      type="text"
                      class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      :placeholder="`Jawaban ${option.label}`"
                      required
                    />
                  </div>
                </div>
              </div>

              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Jawaban benar</label
                >
                <select
                  v-model="newQuestion.correctAnswer"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Pilih jawaban benar</option>
                  <option
                    v-for="option in newQuestion.options"
                    :key="option.label"
                    :value="option.label"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tingkat kesulitan</label
                >
                <select
                  v-model="newQuestion.difficulty"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Pilih tingkat kesulitan</option>
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
              </div>

              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Jenis Pertanyaan</label
                >
                <select
                  v-model="newQuestion.type"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Pilih Jenis pertanyaan</option>
                  <option value="multiple-choice">Pilihan Ganda</option>
                  <option value="essay">Essay</option>
                  <option value="true-false">Benar/Salah</option>
                </select>
              </div>

              
              <div class="flex space-x-3">
                <button
                  type="submit"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Simpan soal
                </button>
                <button
                  type="button"
                  @click="cancelAdd"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { ref, reactive, computed } from "vue";

export default {
  components: {
    SidebarAdmin,
  },
  name: "LeaderboardAdmin",
  setup() {
    const isCollapsed = ref(false);
    const activeTab = ref("general");
    const searchQuery = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const showAddModal = ref(false);

    const menuItems = reactive([
      { name: "Dashboard", icon: "navbar-1.png", route: "/", active: false },
      { name: "Bank Soal", icon: "navbar-2.png", route: "/bank-soal", active: false },
      {
        name: "Monitoring Progress",
        icon: "navbar-3.png",
        route: "/monitoring-progress",
        active: false,
      },
      { name: "Leaderboard", icon: "navbar-4.png", route: "/leaderboard", active: false },
      { name: "Treasure Hint", icon: "navbar-5.png", route: "/treasure", active: true },
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: false },
      {
        name: "Manajemen Kelompok",
        icon: "navbar-7.png",
        route: "/kelompok",
        active: false,
      },
      { name: "Manajemen Event", icon: "navbar.png", route: "/event", active: false },
    ]);

    const stats = reactive([
      {
        title: "Total Item",
        value: "123",
        subtitle: "Mahasiswa yang mengikuti seleksi",
      },
      {
        title: "Item Ditemukan",
        value: "20",
        subtitle: "Peserta yang berhasil lolos",
      },
      {
        title: "Total Lokasi Item",
        value: "3",
        subtitle: "waktu tercepat menyelesaikan pertanyaan",
      },
      {
        title: "Rata-rata waktu penyelesaian",
        value: "10 menit",
        subtitle: "rata-rata waktu penyelesaian pertanyaan",
      },
    ]);

    // Sample participant data
    const participants = reactive([
      {
        id: 1,
        rank: 1,
        name: "Ahmad Fauzi",
        faculty: "Fakultas Teknik",
        prodi: "Teknik Informatika",
        totalCompletion: "100%",
        time: "3 menit",
        status: "Lolos",
      },
      {
        id: 2,
        rank: 2,
        name: "Siti Nurhaliza",
        faculty: "Fakultas Teknik",
        prodi: "Sistem Informasi",
        totalCompletion: "95%",
        time: "4 menit",
        status: "Lolos",
      },
      {
        id: 3,
        rank: 3,
        name: "Budi Santoso",
        faculty: "Fakultas Ekonomi",
        prodi: "Manajemen",
        totalCompletion: "90%",
        time: "5 menit",
        status: "Lolos",
      },
      {
        id: 4,
        rank: 4,
        name: "Maya Sari",
        faculty: "Fakultas Hukum",
        prodi: "Hukum",
        totalCompletion: "88%",
        time: "6 menit",
        status: "Lolos",
      },
      {
        id: 5,
        rank: 5,
        name: "Andi Wijaya",
        faculty: "Fakultas Teknik",
        prodi: "Teknik Elektro",
        totalCompletion: "85%",
        time: "7 menit",
        status: "Lolos",
      },
      {
        id: 6,
        rank: 6,
        name: "Rina Kartika",
        faculty: "Fakultas Ekonomi",
        prodi: "Akuntansi",
        totalCompletion: "80%",
        time: "8 menit",
        status: "Tidak Lolos",
      },
      {
        id: 7,
        rank: 7,
        name: "Dedi Kurniawan",
        faculty: "Fakultas Kedokteran",
        prodi: "Kedokteran",
        totalCompletion: "75%",
        time: "9 menit",
        status: "Tidak Lolos",
      },
      {
        id: 8,
        rank: 8,
        name: "Lisa Permata",
        faculty: "Fakultas Sastra",
        prodi: "Sastra Inggris",
        totalCompletion: "70%",
        time: "10 menit",
        status: "Tidak Lolos",
      },
      {
        id: 9,
        rank: 9,
        name: "Ravi Pratama",
        faculty: "Fakultas Teknik",
        prodi: "Teknik Informatika",
        totalCompletion: "65%",
        time: "11 menit",
        status: "Tidak Lolos",
      },
      {
        id: 10,
        rank: 10,
        name: "Indah Sari",
        faculty: "Fakultas Ekonomi",
        prodi: "Manajemen",
        totalCompletion: "60%",
        time: "12 menit",
        status: "Tidak Lolos",
      },
    ]);

    const filteredParticipants = computed(() => {
      let filtered = participants;

      if (searchQuery.value) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return filtered;
    });
    const questions = reactive([
      {
        id: 1,
        text: "Siapa pendiri Universitas 17 Agustus 1945 Surabaya?",
        options: [
          { label: "A", text: "Dr Soetomo", isCorrect: false },
          { label: "B", text: "Bung Tomo", isCorrect: false },
          { label: "C", text: "Prof. Dr. Moestopo", isCorrect: true },
          { label: "D", text: "K.H. Mas Mansur", isCorrect: false },
        ],
        difficulty: "mudah",
        type: "multiple-choice",
      },
      {
        id: 2,
        text: "Siapa pendiri Universitas 17 Agustus 1945 Surabaya?",
        options: [
          { label: "A", text: "Dr Soetomo", isCorrect: false },
          { label: "B", text: "Bung Tomo", isCorrect: false },
          { label: "C", text: "Prof. Dr. Moestopo", isCorrect: true },
          { label: "D", text: "K.H. Mas Mansur", isCorrect: false },
        ],
        difficulty: "sedang",
        type: "multiple-choice",
      },
    ]);
    const newQuestion = reactive({
      text: "",
      options: [
        { label: "A", text: "" },
        { label: "B", text: "" },
        { label: "C", text: "" },
        { label: "D", text: "" },
      ],
      correctAnswer: "",
      difficulty: "",
      type: "",
    });
    const totalItems = computed(() => filteredParticipants.value.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

    const visiblePages = computed(() => {
      const pages = [];
      const start = Math.max(1, currentPage.value - 2);
      const end = Math.min(totalPages.value, start + 4);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (name) => {
      menuItems.forEach((item) => {
        item.active = item.name === name;
      });
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const goToPage = (page) => {
      currentPage.value = page;
    };

    const saveQuestion = () => {
      // Create new question object
      const question = {
        id: Date.now(),
        text: newQuestion.text,
        options: newQuestion.options.map((option) => ({
          ...option,
          isCorrect: option.label === newQuestion.correctAnswer,
        })),
        difficulty: newQuestion.difficulty,
        type: newQuestion.type,
      };

      questions.push(question);

      resetForm();
      showAddModal.value = false;
    };

    const cancelAdd = () => {
      resetForm();
      showAddModal.value = false;
    };

    const resetForm = () => {
      newQuestion.text = "";
      newQuestion.options.forEach((option) => (option.text = ""));
      newQuestion.correctAnswer = "";
      newQuestion.difficulty = "";
      newQuestion.type = "";
    };


    return {
      isCollapsed,
      activeTab,
      searchQuery,
      currentPage,
      itemsPerPage,
      toggleSidebar,
      menuItems,
      setActiveMenu,
      stats,
      participants,
      filteredParticipants,
      totalItems,
      totalPages,
      visiblePages,
      previousPage,
      nextPage,
      goToPage,
      saveQuestion,
      newQuestion,
      cancelAdd,


    };
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa />
    <div class="flex-1 p-4 sm:p-6 lg:p-8">
      
      <!-- Header Section -->
      <div class="text-center mb-6 lg:mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboard Seleksi</h1>
        <p class="text-gray-600 text-lg">Lihat peringkat dan pencapaian peserta seleksi</p>
      </div>

      <!-- Top 3 Winners Podium -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
        
        <!-- 1st Place -->
        <div class="bg-yellow-300 rounded-xl p-6 text-center shadow-xl transform hover:scale-90 transition-transform border border-yellow-600">
          <div class="text-5xl mb-4">👑</div>
          <div class="rounded-lg p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ winners.first.name }}</h3>
            <p class="text-gray-700 font-medium">{{ winners.first.prodi }}</p>
            <p class="text-sm text-gray-600">{{ winners.first.faculty }}</p>
            <div class="mt-3">
              <span class="text-white px-3 py-1 rounded-full text-sm font-bold">
                🥇 JUARA 1
              </span>
            </div>
          </div>
        </div>

        <!-- 2nd Place -->
        <div class="bg-gray-300 rounded-xl p-6 text-center shadow-xl transform hover:scale-90 transition-transform border border-gray-600">
          <div class="text-5xl mb-4">🥈</div>
          <div class=" rounded-lg p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ winners.second.name }}</h3>
            <p class="text-gray-700 font-medium">{{ winners.second.prodi }}</p>
            <p class="text-sm text-gray-600">{{ winners.second.faculty }}</p>
            <div class="mt-3">
              <span class="text-white px-3 py-1 rounded-full text-sm font-bold">
                🥈 JUARA 2
              </span>
            </div>
          </div>
        </div>

        <!-- 3rd Place -->
        <div class="bg-orange-300 rounded-xl p-6 text-center shadow-xl transform hover:scale-90 transition-transform border border-orange-600">
          <div class="text-5xl mb-4">🥉</div>
          <div class=" rounded-lg p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ winners.third.name }}</h3>
            <p class="text-gray-700 font-medium">{{ winners.third.prodi }}</p>
            <p class="text-sm text-gray-600">{{ winners.third.faculty }}</p>
            <div class="mt-3">
              <span class="text-white px-3 py-1 rounded-full text-sm font-bold">
                🥉 JUARA 3
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-blue-500 p-6 text-white">
          <h2 class="text-2xl font-bold mb-2">📊 Peringkat Lengkap</h2>
          <p class="text-blue-100">Daftar peringkat semua peserta seleksi</p>
        </div>
        
        <!-- Search and Filter -->
        <div class="p-6 bg-gray-50 border-b">
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="🔍 Cari nama peserta..."
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <select
                v-model="selectedFaculty"
                class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Fakultas</option>
                <option v-for="faculty in faculties" :key="faculty" :value="faculty">
                  {{ faculty }}
                </option>
              </select>
              <select
                v-model="selectedProdi"
                class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value=""> Semua Program Studi</option>
                <option v-for="prodi in prodis" :key="prodi" :value="prodi">
                  {{ prodi }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Peringkat
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                  Fakultas
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Program Studi
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Skor
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                  Waktu
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(participant) in paginatedParticipants" :key="participant.id" 
                  :class="[
                    'hover:bg-blue-50 transition-colors',
                    participant.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : '',
                    participant.status === 'Lolos' ? 'border-l-4 border-green-400' : 'border-l-4 border-gray-200'
                  ]">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-lg font-bold text-gray-900">{{ participant.rank }}</span>
                    <span v-if="participant.rank <= 3" class="ml-2 text-xl">
                      {{ participant.rank === 1 ? '🥇' : participant.rank === 2 ? '🥈' : '🥉' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">{{ participant.name }}</div>
                  <div class="text-xs text-gray-500 sm:hidden">{{ participant.faculty }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ participant.faculty }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {{ participant.prodi }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div class="text-sm font-bold text-gray-900">{{ participant.totalCompletion }}</div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div class="bg-blue-600 h-2 rounded-full" :style="{ width: participant.totalCompletion }"></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                  {{ participant.time }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-bold',
                      participant.status === 'Lolos'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ participant.status === 'Lolos' ? '✅ Lolos' : '❌ Tidak Lolos' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              ← Sebelumnya
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Selanjutnya →
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Menampilkan
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                sampai
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
                dari
                <span class="font-medium">{{ totalItems }}</span>
                peserta
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  ← Sebelumnya
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Selanjutnya →
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
import { ref, reactive, computed } from "vue";

export default {
  components: {
    SidebarMahasiswa,
  },
  name: "StudentLeaderboard",
  setup() {
    const searchQuery = ref('');
    const selectedFaculty = ref('');
    const selectedProdi = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const winners = reactive({
      first: {
        name: "Ahmad Fauzi",
        prodi: "Teknik Informatika",
        faculty: "Fakultas Teknik"
      },
      second: {
        name: "Siti Nurhaliza",
        prodi: "Sistem Informasi",
        faculty: "Fakultas Teknik"
      },
      third: {
        name: "Budi Santoso",
        prodi: "Manajemen",
        faculty: "Fakultas Ekonomi"
      }
    });

    const faculties = [
      'Fakultas Teknik',
      'Fakultas Ekonomi',
      'Fakultas Hukum',
      'Fakultas Kedokteran',
      'Fakultas Sastra'
    ];

    const prodis = [
      'Teknik Informatika',
      'Sistem Informasi',
      'Teknik Elektro',
      'Manajemen',
      'Akuntansi',
      'Hukum',
      'Kedokteran',
      'Sastra Inggris'
    ];

    // Sample participant data
    const participants = reactive([
      { id: 1, rank: 1, name: "Ahmad Fauzi", faculty: "Fakultas Teknik", prodi: "Teknik Informatika", totalCompletion: "100%", time: "3 menit", status: "Lolos" },
      { id: 2, rank: 2, name: "Siti Nurhaliza", faculty: "Fakultas Teknik", prodi: "Sistem Informasi", totalCompletion: "95%", time: "4 menit", status: "Lolos" },
      { id: 3, rank: 3, name: "Budi Santoso", faculty: "Fakultas Ekonomi", prodi: "Manajemen", totalCompletion: "90%", time: "5 menit", status: "Lolos" },
      { id: 4, rank: 4, name: "Maya Sari", faculty: "Fakultas Hukum", prodi: "Hukum", totalCompletion: "88%", time: "6 menit", status: "Lolos" },
      { id: 5, rank: 5, name: "Andi Wijaya", faculty: "Fakultas Teknik", prodi: "Teknik Elektro", totalCompletion: "85%", time: "7 menit", status: "Lolos" },
      { id: 6, rank: 6, name: "Rina Kartika", faculty: "Fakultas Ekonomi", prodi: "Akuntansi", totalCompletion: "80%", time: "8 menit", status: "Tidak Lolos" },
      { id: 7, rank: 7, name: "Dedi Kurniawan", faculty: "Fakultas Kedokteran", prodi: "Kedokteran", totalCompletion: "75%", time: "9 menit", status: "Tidak Lolos" },
      { id: 8, rank: 8, name: "Lisa Permata", faculty: "Fakultas Sastra", prodi: "Sastra Inggris", totalCompletion: "70%", time: "10 menit", status: "Tidak Lolos" },
      { id: 9, rank: 9, name: "Ravi Pratama", faculty: "Fakultas Teknik", prodi: "Teknik Informatika", totalCompletion: "65%", time: "11 menit", status: "Tidak Lolos" },
      { id: 10, rank: 10, name: "Indah Sari", faculty: "Fakultas Ekonomi", prodi: "Manajemen", totalCompletion: "60%", time: "12 menit", status: "Tidak Lolos" },
      { id: 11, rank: 11, name: "Rahmat Hidayat", faculty: "Fakultas Hukum", prodi: "Hukum", totalCompletion: "55%", time: "13 menit", status: "Tidak Lolos" },
      { id: 12, rank: 12, name: "Sari Dewi", faculty: "Fakultas Sastra", prodi: "Sastra Inggris", totalCompletion: "50%", time: "14 menit", status: "Tidak Lolos" },
    ]);

    const filteredParticipants = computed(() => {
      let filtered = participants;

      if (searchQuery.value) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      if (selectedFaculty.value) {
        filtered = filtered.filter(p => p.faculty === selectedFaculty.value);
      }

      if (selectedProdi.value) {
        filtered = filtered.filter(p => p.prodi === selectedProdi.value);
      }

      return filtered;
    });

    const totalItems = computed(() => filteredParticipants.value.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
    
    const paginatedParticipants = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredParticipants.value.slice(start, end);
    });
    
    const visiblePages = computed(() => {
      const pages = [];
      const start = Math.max(1, currentPage.value - 2);
      const end = Math.min(totalPages.value, start + 4);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

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

    return {
      searchQuery,
      selectedFaculty,
      selectedProdi,
      currentPage,
      itemsPerPage,
      winners,
      faculties,
      prodis,
      participants,
      filteredParticipants,
      paginatedParticipants,
      totalItems,
      totalPages,
      visiblePages,
      previousPage,
      nextPage,
      goToPage,
    };
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
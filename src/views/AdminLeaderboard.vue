<template>
    <div class="flex min-h-screen bg-gray-50">
      <SidebarAdmin
      />
      <div class="flex-1 p-4 sm:p-6 lg:p-8">
        
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 lg:mb-8">
          <div class="mb-4 md:mb-0">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Leaderboard Seleksi</h1>
            <p class="text-gray-600">Kelola item untuk diburu</p>
          </div>
          <div class="flex">
            <button
              @click="exportToCSV"
              class="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Export leaderboard
            </button>
          </div>
        </div>
  
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
          
          <div class="bg-[#FAEE6C] rounded-xl p-4 sm:p-6 text-center border border-yellow-400 shadow-lg">
            <div class="text-3xl sm:text-4xl mb-4">👑</div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">{{ winners.first.name }}</h3>
            <p class="text-gray-700 mb-1 text-sm sm:text-base">{{ winners.first.prodi }}</p>
            <p class="text-xs sm:text-sm text-gray-600 mb-2">{{ winners.first.faculty }}</p>
            <p class="text-xs sm:text-sm text-gray-600 mb-2">{{ winners.first.time }}</p>
            <span class="bg-yellow-400 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              Lolos
            </span>
          </div>
  
          
          <div class="bg-[#C0C0C0] rounded-xl p-4 sm:p-6 text-center border border-gray-400 shadow-lg">
            <div class="text-3xl sm:text-4xl mb-4">🥈</div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">{{ winners.second.name }}</h3>
            <p class="text-gray-700 mb-1 text-sm sm:text-base">{{ winners.second.prodi }}</p>
            <p class="text-xs sm:text-sm text-gray-600 mb-2">{{ winners.second.faculty }}</p>
            <p class="text-xs sm:text-sm text-gray-600 mb-2">{{ winners.second.time }}</p>
            <span class="bg-gray-400 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              Lolos
            </span>
          </div>
  
          
          <div class="bg-[#CD7F32] to-orange-300 rounded-xl p-4 sm:p-6 text-center border border-orange-400 shadow-lg">
            <div class="text-3xl sm:text-4xl mb-4">🥉</div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">{{ winners.third.name }}</h3>
            <p class="text-gray-700 mb-1 text-sm sm:text-base">{{ winners.third.prodi }}</p>
            <p class="text-xs sm:text-sm text-gray-600 mb-2">{{ winners.third.faculty }}</p>
            <p class="text-xs sm:text-sm text-gray-600 mb-2">{{ winners.third.time }}</p>
            <span class="bg-orange-400 text-orange-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              Lolos
            </span>
          </div>
        </div>
  
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="bg-white rounded-lg p-4 sm:p-6 border border-black shadow-sm"
          >
            <h3 class="text-sm sm:text-lg font-semibold text-gray-900 mb-1">{{ stat.title }}</h3>
            <p class="text-xl sm:text-3xl font-bold text-gray-900 mb-2">{{ stat.value }}</p>
            <p class="text-xs sm:text-sm text-gray-500">{{ stat.subtitle }}</p>
          </div>
        </div>
  
        
        <div class="mb-6">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>
  
        
        <div class="bg-white rounded-lg border border-black shadow-sm">
          <div class="p-4 sm:p-6 border-b border-black">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">Peringkat Lengkap</h2>
            <p class="text-gray-600 mb-4 text-sm sm:text-base">Daftar lengkap peringkat semua peserta seleksi</p>
            
            
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
                    placeholder="Cari nama Peserta"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <select
                  v-model="selectedFaculty"
                  class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">Semua fakultas</option>
                  <option v-for="faculty in faculties" :key="faculty" :value="faculty">
                    {{ faculty }}
                  </option>
                </select>
                <select
                  v-model="selectedProdi"
                  class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">Semua prodi</option>
                  <option v-for="prodi in prodis" :key="prodi" :value="prodi">
                    {{ prodi }}
                  </option>
                </select>
              </div>
            </div>
          </div>
  
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Fakultas
                  </th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prodi
                  </th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Total penyelesaian
                  </th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Waktu
                  </th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(participant) in filteredParticipants" :key="participant.id" class="hover:bg-gray-50">
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {{ participant.rank }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ participant.name }}</div>
                    <div class="text-xs text-gray-500 sm:hidden">{{ participant.faculty }}</div>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span class="bg-gray-400 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {{ participant.faculty }}
                    </span>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {{ participant.prodi }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                    {{ participant.totalCompletion }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">
                    {{ participant.time }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium',
                        participant.status === 'Lolos'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ participant.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                  <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
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
                    Next
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
  import SidebarAdmin from "@/components/SidebarAdmin.vue";
  import { ref, reactive, computed } from "vue";
  
  export default {
    components: {
      SidebarAdmin,
    },
    name: "LeaderboardAdmin",
    setup() {
      const searchQuery = ref('');
      const selectedFaculty = ref('');
      const selectedProdi = ref('');
      const currentPage = ref(1);
      const itemsPerPage = 10;
  
  
      const stats = reactive([
        {
          title: "Total peserta",
          value: "123",
          subtitle: "Mahasiswa yang mengikuti seleksi",
        },
        { 
          title: "Peserta lolos", 
          value: "20", 
          subtitle: "Peserta yang berhasil lolos" 
        },
        {
          title: "Waktu tercepat",
          value: "3 menit",
          subtitle: "waktu tercepat menyelesaikan pertanyaan",
        },
        {
          title: "Rata-rata waktu penyelesaian",
          value: "10 menit",
          subtitle: "rata-rata waktu penyelesaian pertanyaan",
        },
      ]);
  
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
  
      const tabs = [
        { id: 'general', name: 'Peringkat umum' },
        { id: 'faculty', name: 'Per fakultas' },
        { id: 'prodi', name: 'Per prodi' }
      ];
  
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
      
      const visiblePages = computed(() => {
        const pages = [];
        const start = Math.max(1, currentPage.value - 2);
        const end = Math.min(totalPages.value, start + 4);
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        return pages;
      });
  
      const exportToCSV = () => {
        // Implementation for CSV export
        console.log('Exporting to CSV...');
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
  
      return {
        searchQuery,
        selectedFaculty,
        selectedProdi,
        currentPage,
        itemsPerPage,
        stats,
        winners,
        tabs,
        faculties,
        prodis,
        participants,
        filteredParticipants,
        totalItems,
        totalPages,
        visiblePages,
        exportToCSV,
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
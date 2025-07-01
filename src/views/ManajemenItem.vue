<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-4 md:p-6 lg:p-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
        <div class="mb-4 lg:mb-0">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Manajemen Item</h1>
          <p class="text-sm md:text-base text-gray-600">
            Peringkat hasil seleksi berdasarkan fakultas dan program studi
          </p>
        </div>
        <div class="flex">
          <button
            @click="showAddModal = true"
            class="bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
          >
            <span>+</span>
            <span>Tambah Item</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-lg p-4 md:p-6 border border-black shadow-sm"
        >
          <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">{{ stat.title }}</h3>
          <p class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{{ stat.value }}</p>
          <p class="text-xs md:text-sm text-gray-500">{{ stat.subtitle }}</p>
        </div>
      </div>
      <div class="bg-white rounded-lg border border-black shadow-sm">
        <div class="p-6 border-b border-black">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Daftar Lengkap</h2>
          <p class="text-gray-600 mb-4">Daftar lengkap Item di semua lokasi</p>
          
          <div class="flex flex-col md:flex-row gap-4">
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
                  placeholder="Cari nama Item"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div class="flex gap-4">
              <select
                v-model="selectedLocation"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Tempat</option>
                <option v-for="location in faculties" :key="location" :value="location">
                  {{ location }}
                </option>
              </select>
              <select
                v-model="selectedStatus"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Status</option>
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
                <th class="px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Kode
                </th>
                <th class="px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Nama
                </th>
                <th class="hidden sm:table-cell px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Lokasi
                </th>
                <th class="hidden lg:table-cell px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Hint 1
                </th>
                <th class="px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Hint 2
                </th>
                <th class="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Hint 3
                </th>
                <th class="px-3 md:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Status
                </th>
              </tr> 
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in filteredItems"
                :key="item.id"
                class="hover:bg-gray-50"
              >
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.kode }}
                </td>
                <td class="px-3 md:px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </div>
                  <div class="sm:hidden text-xs text-gray-500 mt-1">
                    {{ item.location }}
                  </div>
                </td>
                <td class="hidden sm:table-cell px-3 md:px-6 py-4 whitespace-nowrap">
                  <span class="bg-gray-200 text-gray-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    {{ item.location }}
                  </span>
                </td>
                <td class="hidden lg:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.hint1 }}
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                  {{ item.hint2 }}
                </td>
                <td class="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.hint3 }}
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium border border-black',
                      item.status === 'Ditemukan'
                        ? 'bg-green-100 text-black'
                        : 'bg-red-100 text-black',
                    ]"
                  >
                    {{ item.status }}
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
      </div>

      <!-- Add Item Modal -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="cancelAdd"
      >
        <div class="bg-white rounded-xl w-full max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-4 md:p-6">
            <!-- Modal Header -->
            <div class="mb-6">
              <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-1">Tambah item baru</h2>
              <p class="text-sm md:text-base text-gray-600">Tambah item baru</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="saveItem" class="space-y-4 md:space-y-6">
              <!-- Kode Item -->
              <div>
                <label class="block text-sm md:text-base font-bold text-black mb-2">
                  Kode Item
                </label>
                <input
                  v-model="newItem.code"
                  type="text"
                  placeholder="#ItemCode"
                  class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                  required
                />
              </div>

              <!-- Nama Item -->
              <div>
                <label class="block text-sm md:text-base font-bold text-black mb-2">
                  Nama Item
                </label>
                <input
                  v-model="newItem.name"
                  type="text"
                  placeholder="Nama Item"
                  class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                  required
                />
              </div>

              <!-- Lokasi -->
              <div>
                <label class="block text-sm md:text-base font-bold text-black mb-2">
                  Lokasi
                </label>
                <div class="relative">
                  <select
                    v-model="newItem.location"
                    class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-sm md:text-base"
                    required
                  >
                    <option value="">Lokasi...</option>
                    <option value="gedung-a">Gedung A</option>
                    <option value="gedung-b">Gedung B</option>
                    <option value="gedung-c">Gedung C</option>
                    <option value="perpustakaan">Perpustakaan</option>
                    <option value="kantin">Kantin</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Pin Lokasi -->
              <div>
                <label class="block text-sm md:text-base font-bold text-black mb-2">
                  Pin lokasi
                </label>
                <input
                  v-model="newItem.pinLocation"
                  type="text"
                  placeholder="Pin Lokasi"
                  class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm md:text-base bg-gray-200"
                  required
                />
              </div>

              <!-- Hint -->
              <div>
                <label class="block text-sm md:text-base font-bold text-black mb-2">
                  Hint
                </label>
                <div class="space-y-3">
                  <input
                    v-model="newItem.hints[0]"
                    type="text"
                    placeholder="Hint 1"
                    class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                    required
                  />
                  <input
                    v-model="newItem.hints[1]"
                    type="text"
                    placeholder="Hint 2"
                    class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                  />
                  <input
                    v-model="newItem.hints[2]"
                    type="text"
                    placeholder="Hint 3"
                    class="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                  />
                </div>
              </div>

              <!-- Hint Foto -->
              <div>
                <label class="block text-sm md:text-base font-bold text-black mb-2">
                  Hint foto
                </label>
                <div 
                  class="w-full h-32 md:h-40 border-2 border-dashed border-black bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  @click="triggerFileInput"
                  @dragover.prevent
                  @drop.prevent="handleFileDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <svg class="w-8 h-8 md:w-12 md:h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="text-sm md:text-base text-black text-center">
                    {{ newItem.photo ? newItem.photo.name : 'Upload Foto' }}
                  </p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg font-medium transition-colors text-sm md:text-base border border-black"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  @click="cancelAdd"
                  class="bg-red-800 flex-1 sm:flex-none px-6 py-3 border border-black text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
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
    const searchQuery = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const selectedLocation = ref('');
    const selectedStatus = ref('');
    const showAddModal = ref(false);
    const fileInput = ref(null);

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
        route: "/manajemen-kelompok",
        active: false,
      },
      { name: "Manajemen Event", icon: "navbar.png", route: "/manajemen-event", active: false },
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

    // Sample item data dengan struktur yang konsisten
    const items = reactive([
      {
        id: 1,
        kode: "ITEM001",
        name: "Item Pertama",
        location: "Gedung A",
        hint1: "Tempat Sejuk",
        hint2: "Dekat tangga",
        hint3: "Lantai 2",
        status: "Ditemukan",
      },
      {
        id: 2,
        kode: "ITEM002",
        name: "Item Kedua",
        location: "Gedung B",
        hint1: "Tempat Ramai",
        hint2: "Dekat kantin",
        hint3: "Lantai 1",
        status: "Ditemukan",
      },
      {
        id: 3,
        kode: "ITEM003",
        name: "Item Ketiga",
        location: "Perpustakaan",
        hint1: "Tempat Sunyi",
        hint2: "Rak buku",
        hint3: "Bagian referensi",
        status: "Ditemukan",
      },
      {
        id: 4,
        kode: "ITEM004",
        name: "Item Keempat",
        location: "Kantin",
        hint1: "Tempat Makan",
        hint2: "Meja nomor 5",
        hint3: "Dekat jendela",
        status: "Ditemukan",
      },
      {
        id: 5,
        kode: "ITEM005",
        name: "Item Kelima",
        location: "Gedung C",
        hint1: "Tempat Olahraga",
        hint2: "Dekat lapangan",
        hint3: "Ruang ganti",
        status: "Ditemukan",
      },
      {
        id: 6,
        kode: "ITEM006",
        name: "Item Keenam",
        location: "Gedung A",
        hint1: "Tempat Administrasi",
        hint2: "Ruang rapat",
        hint3: "Lantai 3",
        status: "Tidak Ditemukan",
      },
    ]);

    // Data untuk dropdown filter
    const faculties = computed(() => {
      const locations = [...new Set(items.map(item => item.location))];
      return locations;
    });

    const prodis = computed(() => {
      const statuses = [...new Set(items.map(item => item.status))];
      return statuses;
    });

    const newItem = reactive({
      code: "",
      name: "",
      location: "",
      pinLocation: "",
      hints: ["", "", ""],
      photo: null,
    });

    // Computed untuk filtering items
    const filteredItems = computed(() => {
      let filtered = items;

      // Filter berdasarkan search query
      if (searchQuery.value.trim()) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.kode.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      // Filter berdasarkan lokasi
      if (selectedLocation.value) {
        filtered = filtered.filter(item => item.location === selectedLocation.value);
      }

      // Filter berdasarkan status
      if (selectedStatus.value) {
        filtered = filtered.filter(item => item.status === selectedStatus.value);
      }

      // Pagination
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filtered.slice(start, end);
    });
    
    const totalItems = computed(() => {
      let filtered = items;

      if (searchQuery.value.trim()) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.kode.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      if (selectedLocation.value) {
        filtered = filtered.filter(item => item.location === selectedLocation.value);
      }

      if (selectedStatus.value) {
        filtered = filtered.filter(item => item.status === selectedStatus.value);
      }

      return filtered.length;
    });

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

    // Methods
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

    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        newItem.photo = file;
      }
    };

    const handleFileDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        newItem.photo = file;
      }
    };

    const saveItem = () => {
      // Validasi basic
      if (!newItem.code || !newItem.name || !newItem.location) {
        alert('Harap isi semua field yang wajib');
        return;
      }

      // Create new item object
      const item = {
        id: Date.now(),
        kode: newItem.code,
        name: newItem.name,
        location: newItem.location,
        hint1: newItem.hints[0] || '',
        hint2: newItem.hints[1] || '',
        hint3: newItem.hints[2] || '',
        status: "Tidak Ditemukan", // Default status
      };

      // Add to items array
      items.push(item);

      console.log("Item berhasil disimpan:", item);

      // Update stats
      stats[0].value = items.length.toString();
      const foundItems = items.filter(item => item.status === "Ditemukan").length;
      stats[1].value = foundItems.toString();

      resetForm();
      showAddModal.value = false;
    };

    const cancelAdd = () => {
      resetForm();
      showAddModal.value = false;
    };

    const resetForm = () => {
      newItem.code = "";
      newItem.name = "";
      newItem.location = "";
      newItem.pinLocation = "";
      newItem.hints = ["", "", ""];
      newItem.photo = null;
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };

    // Watch untuk reset pagination saat filter berubah
    const resetPagination = () => {
      currentPage.value = 1;
    };

    // Return semua yang diperlukan template
    return {
      // Reactive refs
      isCollapsed,
      searchQuery,
      currentPage,
      itemsPerPage,
      selectedLocation,
      selectedStatus,
      showAddModal,
      fileInput,
      
      // Reactive data
      menuItems,
      stats,
      items,
      newItem,
      
      // Computed
      faculties,
      prodis,
      filteredItems,
      totalItems,
      totalPages,
      visiblePages,
      
      // Methods
      toggleSidebar,
      setActiveMenu,
      previousPage,
      nextPage,
      goToPage,
      triggerFileInput,
      handleFileSelect,
      handleFileDrop,
      saveItem,
      cancelAdd,
      resetForm,
      resetPagination,
    };
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .table-responsive {
    font-size: 0.875rem;
  }
}
</style>
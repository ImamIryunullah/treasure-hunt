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
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Kelompok</h1>
          <p class="text-gray-600">Peringkat hasil seleksi berdasarkan fakultas dan program studi</p>
        </div>
        <div class="flex">
          <button
            @click="showAddModal = true"
            class="bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
          >
            <span>+</span>
            <span>Tambah kelompok</span>
          </button>
        </div>
      </div> 
      
      <!-- Stats Cards -->
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

      <!-- Group List Section -->
      <div class="bg-white rounded-lg border border-black shadow-sm">
        <div class="p-6 border-b border-black">
          <h2 class="text-xl font-semibold text-gray-900 mb-1">Daftar kelompok</h2>
          <p class="text-gray-600">Daftar lengkap kelompok pada event</p>
        </div>

        <!-- Search and Filter -->
        <div class="p-6 border-b border-black">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Cari nama kelompok"
                  v-model="searchQuery"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex gap-4">
              <select v-model="selectedFaculty" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option value="">Semua fakultas</option>
                <option value="teknik">Fakultas Teknik</option>
                <option value="ekonomi">Fakultas Ekonomi</option>
                <option value="hukum">Fakultas Hukum</option>
              </select>
              <select v-model="selectedProdi" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option value="">Semua prodi</option>
                <option value="informatika">Teknik Informatika</option>
                <option value="sipil">Teknik Sipil</option>
                <option value="elektro">Teknik Elektro</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Group Cards -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div
              v-for="group in filteredGroups"
              :key="group.id"
              class="bg-white border border-black rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <!-- Group Header -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ group.name }}</h3>
                  </div>
                </div>
              </div>

              <!-- Group Info -->
              <div class="space-y-2 mb-4">
                <p class="text-sm text-gray-600">{{ group.faculty }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ group.location }}
                </div>
                <p class="text-sm text-gray-500">{{ group.rewards }} Hadiah terkumpul</p>
              </div>

              <!-- Members -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Anggota</h4>
                <div class="space-y-1">
                  <div v-for="member in group.members" :key="member.id" class="flex justify-between text-xs">
                    <span class="text-gray-600">{{ member.nim }}</span>
                    <span class="text-gray-900">{{ member.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="editGroup(group)"
                  class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
                <button
                  @click="deleteGroup(group.id)"
                  class="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Group Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Tambah kelompok baru</h2>
        <p class="text-gray-600 mb-6">Daftarkan kelompok baru untuk EVENT</p>

        <form @submit.prevent="addGroup">
          <!-- Group Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama kelompok</label>
            <select v-model="newGroup.name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="">Nama kelompok</option>
              <option value="Tim Alpha">Tim Alpha</option>
              <option value="Tim Beta">Tim Beta</option>
              <option value="Tim Gamma">Tim Gamma</option>
            </select>
          </div>

          <!-- Faculty -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Fakultas</label>
            <select v-model="newGroup.faculty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="">fakultas</option>
              <option value="Fakultas Teknik">Fakultas Teknik</option>
              <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
              <option value="Fakultas Hukum">Fakultas Hukum</option>
            </select>
          </div>

          <!-- Members -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Anggota kelompok</label>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="(member, index) in newGroup.members" :key="index" class="contents">
                <input
                  type="text"
                  placeholder="NIM"
                  v-model="member.nim"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <input
                  type="text"
                  placeholder="Nama"
                  v-model="member.name"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              type="submit"
              class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Simpan
            </button>
            <button
              type="button"
              @click="showAddModal = false"
              class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Batal
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

export default {
  components: {
    SidebarAdmin
  },

  setup() {
    const isCollapsed = ref(false);
    const showAddModal = ref(false);
    const searchQuery = ref('');
    const selectedFaculty = ref('');
    const selectedProdi = ref('');

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (name) => {
      menuItems.forEach((item) => {
        item.active = item.name === name;
      });
    };

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
      { name: "Treasure Hint", icon: "navbar-5.png", route: "/treasure", active: false },
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: false },
      {
        name: "Manajemen Kelompok",
        icon: "navbar-7.png",
        route: "/manajemen-kelompok",
        active: true,
      },
      { name: "Manajemen Event", icon: "navbar.png", route: "/manajemen-event", active: false },
    ]);

    const stats = reactive([
      {
        title: "Total Kelompok",
        value: "123",
        subtitle: "Kelompok yang sudah dibuat",
      },
      {
        title: "Kelompok aktif",
        value: "20",
        subtitle: "Kelompok yang aktif dalam event",
      },
      {
        title: "Kelompok selesai",
        value: "3",
        subtitle: "Kelompok yang telah menyelesaikan tantangan",
      },
      {
        title: "Total hadiah",
        value: "10",
        subtitle: "Total hadiah event",
      },
    ]);

    // Sample groups data
    const groups = reactive([
      {
        id: 1,
        name: "Nama Kelompok",
        faculty: "Asal fakultas",
        location: "Lapangan",
        rewards: "3 Hadiah terkumpul",
        members: [
          { id: 1, nim: "nim - nama", name: "" },
          { id: 2, nim: "nim - nama", name: "" },
          { id: 3, nim: "nim - nama", name: "" },
          { id: 4, nim: "nim - nama", name: "" },
          { id: 5, nim: "nim - nama", name: "" }
        ]
      },
      {
        id: 2,
        name: "Nama Kelompok",
        faculty: "Asal fakultas",
        location: "Lapangan",
        rewards: "3 Hadiah terkumpul",
        members: [
          { id: 1, nim: "nim - nama", name: "" },
          { id: 2, nim: "nim - nama", name: "" },
          { id: 3, nim: "nim - nama", name: "" },
          { id: 4, nim: "nim - nama", name: "" },
          { id: 5, nim: "nim - nama", name: "" }
        ]
      },
      {
        id: 3,
        name: "Nama Kelompok",
        faculty: "Asal fakultas",
        location: "Lapangan",
        rewards: "3 Hadiah terkumpul",
        members: [
          { id: 1, nim: "nim - nama", name: "" },
          { id: 2, nim: "nim - nama", name: "" },
          { id: 3, nim: "nim - nama", name: "" },
          { id: 4, nim: "nim - nama", name: "" },
          { id: 5, nim: "nim - nama", name: "" }
        ]
      },
      {
        id: 4,
        name: "Nama Kelompok",
        faculty: "Asal fakultas",
        location: "Lapangan",
        rewards: "3 Hadiah terkumpul",
        members: [
          { id: 1, nim: "nim - nama", name: "" },
          { id: 2, nim: "nim - nama", name: "" },
          { id: 3, nim: "nim - nama", name: "" },
          { id: 4, nim: "nim - nama", name: "" },
          { id: 5, nim: "nim - nama", name: "" }
        ]
      },
      {
        id: 5,
        name: "Nama Kelompok",
        faculty: "Asal fakultas",
        location: "Lapangan",
        rewards: "3 Hadiah terkumpul",
        members: [
          { id: 1, nim: "nim - nama", name: "" },
          { id: 2, nim: "nim - nama", name: "" },
          { id: 3, nim: "nim - nama", name: "" },
          { id: 4, nim: "nim - nama", name: "" },
          { id: 5, nim: "nim - nama", name: "" }
        ]
      }
    ]);

    // Form data for new group
    const newGroup = reactive({
      name: '',
      faculty: '',
      members: [
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' }
      ]
    });

    // Computed property for filtered groups
    const filteredGroups = computed(() => {
      return groups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesFaculty = selectedFaculty.value === '' || group.faculty === selectedFaculty.value;
        const matchesProdi = selectedProdi.value === '' || true; // Add logic for prodi filtering
        
        return matchesSearch && matchesFaculty && matchesProdi;
      });
    });

    // Methods
    const addGroup = () => {
      const newId = Math.max(...groups.map(g => g.id)) + 1;
      groups.push({
        id: newId,
        name: newGroup.name,
        faculty: newGroup.faculty,
        location: "Lapangan",
        rewards: "0 Hadiah terkumpul",
        members: [...newGroup.members]
      });
      
      // Reset form
      newGroup.name = '';
      newGroup.faculty = '';
      newGroup.members.forEach(member => {
        member.nim = '';
        member.name = '';
      });
      
      showAddModal.value = false;
    };

    const editGroup = (group) => {
      // Implement edit functionality
      console.log('Edit group:', group);
    };

    const deleteGroup = (groupId) => {
      const index = groups.findIndex(g => g.id === groupId);
      if (index > -1) {
        groups.splice(index, 1);
      }
    };

    return {
      isCollapsed,
      showAddModal,
      searchQuery,
      selectedFaculty,
      selectedProdi,
      menuItems,
      toggleSidebar,
      setActiveMenu,
      stats,
      groups,
      newGroup,
      filteredGroups,
      addGroup,
      editGroup,
      deleteGroup
    };
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
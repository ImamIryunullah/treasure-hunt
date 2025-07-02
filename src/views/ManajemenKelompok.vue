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
        <div class="flex gap-2">
          <button
            @click="exportData"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Export</span>
          </button>
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
                <option value="Fakultas Teknik">Fakultas Teknik</option>
                <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                <option value="Fakultas Hukum">Fakultas Hukum</option>
              </select>
              <select v-model="selectedProdi" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option value="">Semua prodi</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
                <option value="Manajemen">Manajemen</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Hukum Bisnis">Hukum Bisnis</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Group Cards -->
        <div class="p-6">
          <div v-if="filteredGroups.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada kelompok</h3>
            <p class="mt-1 text-sm text-gray-500">Tidak ada kelompok yang sesuai dengan filter yang dipilih.</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getStatusClass(group.status)"
                >
                  {{ group.status }}
                </span>
              </div>

              <!-- Group Info -->
              <div class="space-y-2 mb-4">
                <p class="text-sm text-gray-600">{{ group.faculty }}</p>
                <p class="text-sm text-gray-600">{{ group.prodi }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ group.location }}
                </div>
                <p class="text-sm text-gray-500">{{ group.rewards }}</p>
              </div>

              <!-- Members -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Anggota ({{ group.members.filter(m => m.nim && m.name).length }}/5)</h4>
                <div class="space-y-1">
                  <div v-for="member in group.members.filter(m => m.nim && m.name)" :key="member.id" class="flex justify-between text-xs">
                    <span class="text-gray-600">{{ member.nim }}</span>
                    <span class="text-gray-900 truncate ml-2">{{ member.name }}</span>
                  </div>
                </div>
                <div v-if="group.members.filter(m => m.nim && m.name).length === 0" class="text-xs text-gray-400 italic">
                  Belum ada anggota
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
                  @click="showDeleteConfirm(group)"
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
      <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Tambah kelompok baru</h2>
        <p class="text-gray-600 mb-6">Daftarkan kelompok baru untuk EVENT</p>

        <form @submit.prevent="addGroup">
          <!-- Group Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama kelompok *</label>
            <input
              type="text"
              v-model="newGroup.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Masukkan nama kelompok"
              required
            />
          </div>

          <!-- Faculty -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Fakultas *</label>
            <select v-model="newGroup.faculty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required>
              <option value="">Pilih fakultas</option>
              <option value="Fakultas Teknik">Fakultas Teknik</option>
              <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
              <option value="Fakultas Hukum">Fakultas Hukum</option>
            </select>
          </div>

          <!-- Program Studi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Program Studi *</label>
            <select v-model="newGroup.prodi" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required>
              <option value="">Pilih program studi</option>
              <template v-if="newGroup.faculty === 'Fakultas Teknik'">
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
              </template>
              <template v-if="newGroup.faculty === 'Fakultas Ekonomi'">
                <option value="Manajemen">Manajemen</option>
                <option value="Akuntansi">Akuntansi</option>
              </template>
              <template v-if="newGroup.faculty === 'Fakultas Hukum'">
                <option value="Hukum Bisnis">Hukum Bisnis</option>
              </template>
            </select>
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
            <select v-model="newGroup.location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="Lapangan">Lapangan</option>
              <option value="Aula">Aula</option>
              <option value="Gedung A">Gedung A</option>
              <option value="Gedung B">Gedung B</option>
              <option value="Lab Komputer">Lab Komputer</option>
            </select>
          </div>

          <!-- Members -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Anggota kelompok</label>
            <div class="space-y-2">
              <div v-for="(member, index) in newGroup.members" :key="index" class="grid grid-cols-2 gap-2">
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
            <p class="text-xs text-gray-500 mt-2">Minimal 1 anggota harus diisi</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              type="submit"
              :disabled="!isFormValid"
              class="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Simpan
            </button>
            <button
              type="button"
              @click="closeAddModal"
              class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Group Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Edit kelompok</h2>
        <p class="text-gray-600 mb-6">Ubah informasi kelompok</p>

        <form @submit.prevent="updateGroup">
          <!-- Group Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama kelompok *</label>
            <input
              type="text"
              v-model="editedGroup.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Masukkan nama kelompok"
              required
            />
          </div>

          <!-- Faculty -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Fakultas *</label>
            <select v-model="editedGroup.faculty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required>
              <option value="">Pilih fakultas</option>
              <option value="Fakultas Teknik">Fakultas Teknik</option>
              <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
              <option value="Fakultas Hukum">Fakultas Hukum</option>
            </select>
          </div>

          <!-- Program Studi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Program Studi *</label>
            <select v-model="editedGroup.prodi" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required>
              <option value="">Pilih program studi</option>
              <template v-if="editedGroup.faculty === 'Fakultas Teknik'">
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Teknik Elektro">Teknik Elektro</option>
              </template>
              <template v-if="editedGroup.faculty === 'Fakultas Ekonomi'">
                <option value="Manajemen">Manajemen</option>
                <option value="Akuntansi">Akuntansi</option>
              </template>
              <template v-if="editedGroup.faculty === 'Fakultas Hukum'">
                <option value="Hukum Bisnis">Hukum Bisnis</option>
              </template>
            </select>
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
            <select v-model="editedGroup.location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="Lapangan">Lapangan</option>
              <option value="Aula">Aula</option>
              <option value="Gedung A">Gedung A</option>
              <option value="Gedung B">Gedung B</option>
              <option value="Lab Komputer">Lab Komputer</option>
            </select>
          </div>

          <!-- Status -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="editedGroup.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="Aktif">Aktif</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Selesai">Selesai</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>

          <!-- Members -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Anggota kelompok</label>
            <div class="space-y-2">
              <div v-for="(member, index) in editedGroup.members" :key="index" class="grid grid-cols-2 gap-2">
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
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              @click="closeEditModal"
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.382 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Hapus Kelompok</h3>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">
            Apakah Anda yakin ingin menghapus kelompok "<strong>{{ groupToDelete?.name }}</strong>"? 
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { ref, reactive, computed, watch } from "vue";

export default {
  components: {
    SidebarAdmin
  },

  setup() {
    const isCollapsed = ref(false);
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const showToast = ref(false);
    const toastMessage = ref('');
    const searchQuery = ref('');
    const selectedFaculty = ref('');
    const selectedProdi = ref('');
    const groupToDelete = ref(null);

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

    // Enhanced sample groups data
    const groups = reactive([
      {
        id: 1,
        name: "Tim Alpha",
        faculty: "Fakultas Teknik",
        prodi: "Teknik Informatika",
        location: "Lab Komputer",
        rewards: "5 Hadiah terkumpul",
        status: "Aktif",
        members: [
          { id: 1, nim: "2021001", name: "Ahmad Fauzi" },
          { id: 2, nim: "2021002", name: "Budi Santoso" },
          { id: 3, nim: "2021003", name: "Citra Dewi" },
          { id: 4, nim: "2021004", name: "Dimas Pratama" },
          { id: 5, nim: "2021005", name: "Eka Sari" }
        ]
      },
      {
        id: 2,
        name: "Tim Beta",
        faculty: "Fakultas Ekonomi",
        prodi: "Manajemen",
        location: "Aula",
        rewards: "3 Hadiah terkumpul",
        status: "Menunggu",
        members: [
          { id: 1, nim: "2021010", name: "Farah Nabila" },
          { id: 2, nim: "2021011", name: "Gilang Ramadhan" },
          { id: 3, nim: "2021012", name: "Hana Putri" },
          { id: 4, nim: "", name: "" },
          { id: 5, nim: "", name: "" }
        ]
      },
      {
        id: 3,
        name: "Tim Gamma",
        faculty: "Fakultas Hukum",
        prodi: "Hukum Bisnis",
        location: "Gedung A",
        rewards: "8 Hadiah terkumpul",
        status: "Selesai",
        members: [
          { id: 1, nim: "2021020", name: "Ivan Kurniawan" },
          { id: 2, nim: "2021021", name: "Jihan Amalia" },
          { id: 3, nim: "2021022", name: "Krisna Bayu" },
          { id: 4, nim: "2021023", name: "Lina Maharani" },
          { id: 5, nim: "2021024", name: "Maman Suryaman" }
        ]
      },
      {
        id: 4,
        name: "Tim Delta",
        faculty: "Fakultas Teknik",
        prodi: "Teknik Sipil",
        location: "Lapangan",
        rewards: "2 Hadiah terkumpul",
        status: "Aktif",
        members: [
          { id: 1, nim: "2021030", name: "Nina Safitri" },
          { id: 2, nim: "2021031", name: "Oscar Pratama" },
          { id: 3, nim: "", name: "" },
          { id: 4, nim: "", name: "" },
          { id: 5, nim: "", name: "" }
        ]
      },
      {
        id: 5,
        name: "Tim Epsilon",
        faculty: "Fakultas Ekonomi",
        prodi: "Akuntansi",
        location: "Gedung B",
        rewards: "1 Hadiah terkumpul",
        status: "Tidak Aktif",
        members: [
          { id: 1, nim: "2021040", name: "Putri Andini" },
          { id: 2, nim: "", name: "" },
          { id: 3, nim: "", name: "" },
          { id: 4, nim: "", name: "" },
          { id: 5, nim: "", name: "" }
        ]
      }
    ]);

    // Form data for new group
    const newGroup = reactive({
      name: '',
      faculty: '',
      prodi: '',
      location: 'Lapangan',
      members: [
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' }
      ]
    });

    // Form data for editing group
    const editedGroup = reactive({
      id: null,
      name: '',
      faculty: '',
      prodi: '',
      location: '',
      status: '',
      members: [
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' },
        { nim: '', name: '' }
      ]
    });

    // Computed properties
    const filteredGroups = computed(() => {
      return groups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesFaculty = selectedFaculty.value === '' || group.faculty === selectedFaculty.value;
        const matchesProdi = selectedProdi.value === '' || group.prodi === selectedProdi.value;
        
        return matchesSearch && matchesFaculty && matchesProdi;
      });
    });

    const isFormValid = computed(() => {
      const hasName = newGroup.name.trim() !== '';
      const hasFaculty = newGroup.faculty !== '';
      const hasProdi = newGroup.prodi !== '';
      const hasAtLeastOneMember = newGroup.members.some(member => member.nim.trim() !== '' && member.name.trim() !== '');
      
      return hasName && hasFaculty && hasProdi && hasAtLeastOneMember;
    });

    // Watch for faculty changes to reset prodi
    watch(() => newGroup.faculty, (newFaculty) => {
      if (newFaculty !== editedGroup.faculty) {
        newGroup.prodi = '';
      }
    });

    watch(() => editedGroup.faculty, (newFaculty) => {
      if (newFaculty !== editedGroup.faculty) {
        editedGroup.prodi = '';
      }
    });

    // Methods
    const showToastMessage = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    const getStatusClass = (status) => {
      switch(status) {
        case 'Aktif':
          return 'bg-green-100 text-green-800';
        case 'Menunggu':
          return 'bg-yellow-100 text-yellow-800';
        case 'Selesai':
          return 'bg-blue-100 text-blue-800';
        case 'Tidak Aktif':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

  

    const addGroup = () => {
      if (!isFormValid.value) return;

      const newId = Math.max(...groups.map(g => g.id)) + 1;
    
      
      groups.push({
        id: newId,
        name: newGroup.name,
        faculty: newGroup.faculty,
        prodi: newGroup.prodi,
        location: newGroup.location,
        rewards: "0 Hadiah terkumpul",
        status: "Menunggu",
        members: [...newGroup.members]
      });
      
      // Update stats
      stats[0].value = groups.length.toString();
      
      closeAddModal();
      showToastMessage('Kelompok berhasil ditambahkan!');
    };

    const editGroup = (group) => {
      editedGroup.id = group.id;
      editedGroup.name = group.name;
      editedGroup.faculty = group.faculty;
      editedGroup.prodi = group.prodi;
      editedGroup.location = group.location;
      editedGroup.status = group.status;
      editedGroup.members = [...group.members];
      
      showEditModal.value = true;
    };

    const updateGroup = () => {
      const index = groups.findIndex(g => g.id === editedGroup.id);
      if (index > -1) {
        groups[index] = {
          ...groups[index],
          name: editedGroup.name,
          faculty: editedGroup.faculty,
          prodi: editedGroup.prodi,
          location: editedGroup.location,
          status: editedGroup.status,
          members: [...editedGroup.members]
        };
      }
      
      closeEditModal();
      showToastMessage('Kelompok berhasil diperbarui!');
    };

    const showDeleteConfirm = (group) => {
      groupToDelete.value = group;
      showDeleteModal.value = true;
    };

    const confirmDelete = () => {
      if (groupToDelete.value) {
        const index = groups.findIndex(g => g.id === groupToDelete.value.id);
        if (index > -1) {
          groups.splice(index, 1);
          // Update stats
          stats[0].value = groups.length.toString();
          showToastMessage('Kelompok berhasil dihapus!');
        }
      }
      closeDeleteModal();
    };
    
    const closeAddModal = () => {
      showAddModal.value = false;
      // Reset form
      newGroup.name = '';
      newGroup.faculty = '';
      newGroup.prodi = '';
      newGroup.location = 'Lapangan';
      newGroup.members.forEach(member => {
        member.nim = '';
        member.name = '';
      });
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      // Reset form
      editedGroup.id = null;
      editedGroup.name = '';
      editedGroup.faculty = '';
      editedGroup.prodi = '';
      editedGroup.location = '';
      editedGroup.status = '';
      editedGroup.members.forEach(member => {
        member.nim = '';
        member.name = '';
      });
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
      groupToDelete.value = null;
    };

    const exportData = () => {
      // Create CSV content
      let csvContent = "Nama Kelompok,Fakultas,Program Studi,Lokasi,Status,Hadiah,Anggota\n";
      
      groups.forEach(group => {
        const activeMembers = group.members.filter(m => m.nim && m.name);
        const membersList = activeMembers.map(m => `${m.nim}-${m.name}`).join(';');
        
        csvContent += `"${group.name}","${group.faculty}","${group.prodi}","${group.location}","${group.status}","${group.rewards}","${membersList}"\n`;
      });

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `data-kelompok-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToastMessage('Data berhasil diekspor!');
    };

    return {
      isCollapsed,
      showAddModal,
      showEditModal,
      showDeleteModal,
      showToast,
      toastMessage,
      searchQuery,
      selectedFaculty,
      selectedProdi,
      groupToDelete,
      menuItems,
      toggleSidebar,
      setActiveMenu,
      stats,
      groups,
      newGroup,
      editedGroup,
      filteredGroups,
      isFormValid,
      getStatusClass,
      addGroup,
      editGroup,
      updateGroup,
      showDeleteConfirm,
      confirmDelete,
      closeAddModal,
      closeEditModal,
      closeDeleteModal,
      exportData,
      showToastMessage,
    };
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
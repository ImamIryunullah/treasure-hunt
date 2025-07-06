<template>
  <div class="flex min-h-screen bg-green-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="mb-4 md:mb-0">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Kelompok</h1>
          <p class="text-gray-600">Kelola 26 kelompok mahasiswa treasure hunt</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="randomAssignment"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"></path>
            </svg>
            <span>Random Assignment</span>
          </button>
          <button
            @click="showAddModal = true"
            class="bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
          >
            <span>+</span>
            <span>Tambah Kelompok</span>
          </button>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div class="bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">Total Kelompok</h3>
          <p class="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{{ groups.length }}</p>
          <p class="text-xs md:text-sm text-gray-500">dari target 26 kelompok</p>
        </div>
        <div class="bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">Kelompok Aktif</h3>
          <p class="text-2xl md:text-3xl font-bold text-green-600 mb-2">{{ activeGroups }}</p>
          <p class="text-xs md:text-sm text-gray-500">sedang berburu hadiah</p>
        </div>
        <div class="bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">Kelompok Selesai</h3>
          <p class="text-2xl md:text-3xl font-bold text-purple-600 mb-2">{{ completedGroups }}</p>
          <p class="text-xs md:text-sm text-gray-500">telah menyelesaikan</p>
        </div>
        <div class="bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">Total Hadiah</h3>
          <p class="text-2xl md:text-3xl font-bold text-orange-600 mb-2">{{ totalRewards }}</p>
          <p class="text-xs md:text-sm text-gray-500">hadiah terkumpul</p>
        </div>
      </div>

      <!-- Groups Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div
          v-for="group in groups"
          :key="group.id"
          class="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Group Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ group.name }}</h3>
                <p class="text-sm text-gray-600">{{ group.faculty }}</p>
              </div>
            </div>
            <span 
              class="px-2 py-1 text-xs rounded-full font-medium"
              :class="getStatusClass(group.status)"
            >
              {{ group.status }}
            </span>
          </div>

          <!-- Group Info -->
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ group.location }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
              {{ group.rewards }}
            </div>
          </div>

          <!-- Members -->
          <div class="mb-4">
            <h4 class="text-sm font-semibold text-gray-900 mb-2">Anggota:</h4>
            <div class="space-y-1 text-sm">
              <div v-for="member in group.members.filter(m => m.nim && m.name)" :key="member.id" class="text-gray-600">
                {{ member.nim }} - {{ member.name }}
              </div>
              <div v-if="group.members.filter(m => m.nim && m.name).length === 0" class="text-gray-400 italic">
                Belum ada anggota
              </div>
            </div>
          </div>

          <!-- Actions -->
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
              @click="generateQRCode(group)"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
              </svg>
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

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg p-6 border shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            @click="exportData"
            class="flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export Data Kelompok
          </button>
          <button
            @click="generateAllQRCodes"
            class="flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
            </svg>
            Generate QR Codes
          </button>
          <button
            @click="printGroupSummary"
            class="flex items-center justify-center px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Cetak Rekap Kelompok
          </button>
          <button
            @click="validateGroupData"
            class="flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Validasi Data Kelompok
          </button>
        </div>
      </div>
    </div>

    <!-- Add Group Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Tambah Kelompok Baru</h2>
          <button @click="closeAddModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p class="text-gray-600 mb-6">Daftarkan kelompok baru untuk treasure hunt</p>

        <form @submit.prevent="addGroup">
          <!-- Group Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Kelompok (Pahlawan)</label>
            <input
              type="text"
              v-model="newGroup.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Contoh: Diponegoro"
              required
            />
          </div>

          <!-- Faculty -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Fakultas</label>
            <select v-model="newGroup.faculty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" required>
              <option value="">Pilih fakultas</option>
              <option value="Fakultas Teknik">Fakultas Teknik</option>
              <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
              <option value="Fakultas Hukum">Fakultas Hukum</option>
            </select>
          </div>

          <!-- Members -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Anggota Kelompok (5 mahasiswa)</label>
            <div class="space-y-2">
              <div v-for="(member, index) in newGroup.members" :key="index" class="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  :placeholder="`NIM Anggota ${index + 1}`"
                  v-model="member.nim"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="text"
                  :placeholder="`Nama Anggota ${index + 1}`"
                  v-model="member.name"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button
              type="submit"
              class="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Simpan Kelompok
            </button>
            <button
              type="button"
              @click="closeAddModal"
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
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
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama kelompok *</label>
            <input
              type="text"
              v-model="editedGroup.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Fakultas *</label>
            <select v-model="editedGroup.faculty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" required>
              <option value="">Pilih fakultas</option>
              <option value="Fakultas Teknik">Fakultas Teknik</option>
              <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
              <option value="Fakultas Hukum">Fakultas Hukum</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
            <select v-model="editedGroup.location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="Gedung Q Lantai 1">Gedung Q Lantai 1</option>
              <option value="Perpustakaan Pusat">Perpustakaan Pusat</option>
              <option value="Joglo Kampus">Joglo Kampus</option>
              <option value="Aula">Aula</option>
              <option value="Lab Komputer">Lab Komputer</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="editedGroup.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="Aktif">Aktif</option>
              <option value="Selesai">Selesai</option>
              <option value="Menunggu">Menunggu</option>
            </select>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Anggota kelompok</label>
            <div class="space-y-2">
              <div v-for="(member, index) in editedGroup.members" :key="index" class="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="NIM"
                  v-model="member.nim"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="text"
                  placeholder="Nama"
                  v-model="member.name"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

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

    <!-- Toast Notification -->
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
import { ref, reactive, computed } from "vue";

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
      { name: "Dashboard", icon: "fas fa-home", route: "/", active: false },
      { name: "Kelola Lokasi", icon: "fas fa-map-marker-alt", route: "/manajemen-lokasi", active: false },
      {
        name: "Kelola Kelompok",
        icon: "fas fa-users",
        route: "/manajemen-kelompok",
        active: true,
      },
      { name: "Kelola Soal", icon: "fas fa-question-circle", route: "/bank-soal", active: false },
      {
        name: "Monitoring Progress",
        icon: "fas fa-chart-line",
        route: "/monitoring-progress",
        active: false,
      },
      { name: "Leaderboard", icon: "fas fa-trophy", route: "/leaderboard", active: false },
      { name: "Treasure Hint", icon: "fas fa-map-marked-alt", route: "/treasure", active: false },
      { name: "Sponsorship", icon: "fas fa-handshake", route: "/sponsorship", active: false },
      {
        name: "Manajemen Event",
        icon: "fas fa-calendar-alt",
        route: "/manajemen-event",
        active: false,
      },
    ]);
    // Sample data for groups
    const groups = reactive([
      {
        id: 1,
        name: "Diponegoro",
        faculty: "Fakultas Teknik",
        location: "Gedung Q Lantai 1",
        status: "Aktif",
        rewards: "3 hadiah",
        members: [
          { id: 1, nim: "2021001", name: "Ahmad Fauzi" },
          { id: 2, nim: "2021002", name: "Siti Nurhaliza" },
          { id: 3, nim: "2021003", name: "Budi Santoso" },
          { id: 4, nim: "2021004", name: "Dewi Sartika" },
          { id: 5, nim: "2021005", name: "Eko Prasetyo" }
        ]
      },
      {
        id: 2,
        name: "Kartini",
        faculty: "Fakultas Ekonomi",
        location: "Perpustakaan Pusat",
        status: "Selesai",
        rewards: "5 hadiah",
        members: [
          { id: 6, nim: "2021006", name: "Fatimah Zahra" },
          { id: 7, nim: "2021007", name: "Galih Pratama" },
          { id: 8, nim: "2021008", name: "Hana Permata" },
          { id: 9, nim: "2021009", name: "Irfan Maulana" },
          { id: 10, nim: "2021010", name: "Jihan Aulia" }
        ]
      },
      {
        id: 3,
        name: "Sudirman",
        faculty: "Fakultas Hukum",
        location: "Joglo Kampus",
        status: "Menunggu",
        rewards: "1 hadiah",
        members: [
          { id: 11, nim: "2021011", name: "Khalid Rahman" },
          { id: 12, nim: "2021012", name: "Layla Safitri" },
          { id: 13, nim: "2021013", name: "Mira Handayani" },
          { id: 14, nim: "2021014", name: "Naufal Akbar" },
          { id: 15, nim: "2021015", name: "Olivia Putri" }
        ]
      }
    ]);

    // Form data for new group
    const newGroup = reactive({
      name: "",
      faculty: "",
      location: "Gedung Q Lantai 1",
      status: "Menunggu",
      rewards: "0 hadiah",
      members: [
        { id: null, nim: "", name: "" },
        { id: null, nim: "", name: "" },
        { id: null, nim: "", name: "" },
        { id: null, nim: "", name: "" },
        { id: null, nim: "", name: "" }
      ]
    });

    // Form data for editing group
    const editedGroup = reactive({
      id: null,
      name: "",
      faculty: "",
      location: "",
      status: "",
      rewards: "",
      members: []
    });

    // Computed properties
    const activeGroups = computed(() => {
      return groups.filter(group => group.status === "Aktif").length;
    });

    const completedGroups = computed(() => {
      return groups.filter(group => group.status === "Selesai").length;
    });

    const totalRewards = computed(() => {
      return groups.reduce((total, group) => {
        const rewardCount = parseInt(group.rewards.split(" ")[0]) || 0;
        return total + rewardCount;
      }, 0);
    });

    // Helper functions
    const getStatusClass = (status) => {
      switch (status) {
        case "Aktif":
          return "bg-green-100 text-green-800";
        case "Selesai":
          return "bg-blue-100 text-blue-800";
        case "Menunggu":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const showToastMessage = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    // Modal functions
    const closeAddModal = () => {
      showAddModal.value = false;
      // Reset form
      newGroup.name = "";
      newGroup.faculty = "";
      newGroup.location = "Gedung Q Lantai 1";
      newGroup.status = "Menunggu";
      newGroup.rewards = "0 hadiah";
      newGroup.members.forEach(member => {
        member.nim = "";
        member.name = "";
      });
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      editedGroup.id = null;
      editedGroup.name = "";
      editedGroup.faculty = "";
      editedGroup.location = "";
      editedGroup.status = "";
      editedGroup.rewards = "";
      editedGroup.members = [];
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
      groupToDelete.value = null;
    };

    // Group management functions
    const addGroup = () => {
      // Generate new ID
      const newId = Math.max(...groups.map(g => g.id), 0) + 1;
      
      // Create new group object
      const groupData = {
        id: newId,
        name: newGroup.name,
        faculty: newGroup.faculty,
        location: newGroup.location,
        status: newGroup.status,
        rewards: newGroup.rewards,
        members: newGroup.members.map((member, index) => ({
          id: newId * 10 + index + 1,
          nim: member.nim,
          name: member.name
        }))
      };

      // Add to groups array
      groups.push(groupData);
      
      // Close modal and show success message
      closeAddModal();
      showToastMessage("Kelompok berhasil ditambahkan!");
    };

    const editGroup = (group) => {
      editedGroup.id = group.id;
      editedGroup.name = group.name;
      editedGroup.faculty = group.faculty;
      editedGroup.location = group.location;
      editedGroup.status = group.status;
      editedGroup.rewards = group.rewards;
      editedGroup.members = JSON.parse(JSON.stringify(group.members));
      
      showEditModal.value = true;
    };

    const updateGroup = () => {
      const groupIndex = groups.findIndex(g => g.id === editedGroup.id);
      if (groupIndex !== -1) {
        groups[groupIndex] = { ...editedGroup };
        closeEditModal();
        showToastMessage("Kelompok berhasil diperbarui!");
      }
    };

    const showDeleteConfirm = (group) => {
      groupToDelete.value = group;
      showDeleteModal.value = true;
    };

    const confirmDelete = () => {
      const groupIndex = groups.findIndex(g => g.id === groupToDelete.value.id);
      if (groupIndex !== -1) {
        groups.splice(groupIndex, 1);
        closeDeleteModal();
        showToastMessage("Kelompok berhasil dihapus!");
      }
    };

    // Quick action functions
    const randomAssignment = () => {
      const locations = ["Gedung Q Lantai 1", "Perpustakaan Pusat", "Joglo Kampus", "Aula", "Lab Komputer"];
      
      groups.forEach(group => {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        group.location = randomLocation;
      });
      
      showToastMessage("Random assignment berhasil!");
    };

    const exportData = () => {
      const dataStr = JSON.stringify(groups, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'data_kelompok.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      showToastMessage("Data kelompok berhasil diekspor!");
    };

    const generateQRCode = (group) => {
      // Simulate QR code generation
      showToastMessage(`QR Code untuk kelompok ${group.name} berhasil dibuat!`);
    };

    const generateAllQRCodes = () => {
      showToastMessage("Semua QR Code berhasil dibuat!");
    };

    const printGroupSummary = () => {
      window.print();
      showToastMessage("Rekap kelompok siap dicetak!");
    };

    const validateGroupData = () => {
      let validationErrors = [];
      
      groups.forEach(group => {
        if (!group.name || group.name.trim() === '') {
          validationErrors.push(`Kelompok ID ${group.id}: Nama kelompok kosong`);
        }
        
        if (!group.faculty || group.faculty.trim() === '') {
          validationErrors.push(`Kelompok ${group.name}: Fakultas tidak dipilih`);
        }
        
        const validMembers = group.members.filter(member => member.nim && member.name);
        if (validMembers.length < 5) {
          validationErrors.push(`Kelompok ${group.name}: Anggota tidak lengkap (${validMembers.length}/5)`);
        }
      });
      
      if (validationErrors.length === 0) {
        showToastMessage("Validasi berhasil! Semua data kelompok sudah lengkap.");
      } else {
        alert("Validasi gagal!\n\nError yang ditemukan:\n" + validationErrors.join("\n"));
      }
    };

    return {
      isCollapsed,
      showAddModal,
      showEditModal,
      showDeleteModal,
      showToast,
      toastMessage,
      groupToDelete,
      menuItems,
      groups,
      newGroup,
      editedGroup,
      activeGroups,
      completedGroups,
      totalRewards,
      toggleSidebar,
      setActiveMenu,
      getStatusClass,
      closeAddModal,
      closeEditModal,
      closeDeleteModal,
      addGroup,
      editGroup,
      updateGroup,
      showDeleteConfirm,
      confirmDelete,
      randomAssignment,
      exportData,
      generateQRCode,
      generateAllQRCodes,
      printGroupSummary,
      validateGroupData
    };
  }
};
</script>
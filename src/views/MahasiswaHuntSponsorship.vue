<template>
  <div class="flex min-h-screen bg-yellow-50">
    <SidebarMahasiswa
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Hunt Sponsorship 🗺️</h1>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <span>🏆 Tim Explorer</span>
          <span>📍 {{ completedLocations }}/{{ totalLocations }} Area</span>
          <span>💰 {{ points }} Poin</span>
        </div>
      </div>
      <div class="mb-6">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{{ Math.round((completedLocations / totalLocations) * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${(completedLocations / totalLocations) * 100}%` }"
          ></div>
        </div>
      </div>

      
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">🎯 Cara Bermain</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">📍 Kunjungi Lokasi</h3>
            <p class="text-sm text-blue-700">
              Datang ke lokasi yang ditandai pada peta dan scan QR code yang tersedia
            </p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">❓ Jawab Pertanyaan</h3>
            <p class="text-sm text-green-700">
              Selesaikan quiz atau tantangan yang diberikan di setiap lokasi
            </p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-semibold text-purple-800 mb-2">🏆 Kumpulkan Poin</h3>
            <p class="text-sm text-purple-700">
              Dapatkan poin untuk setiap lokasi yang berhasil diselesaikan
            </p>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h3 class="font-semibold text-orange-800 mb-2">⏰ Waktu Terbatas</h3>
            <p class="text-sm text-orange-700">
              Selesaikan semua lokasi dalam waktu yang ditentukan
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
         <h2 class="text-lg font-semibold">📌 Peta Sponsor</h2>
         <div class="flex gap-2">
         <button></button>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
import { reactive } from "vue";
export default {
  components: {
    SidebarMahasiswa,
  },
  setup() {
    const menuItems = reactive([
      {
        name: "Dashboard",
        icon: "fas fa-home",
        route: "/mahasiswa-dashboard",
        active: false,
      },
      {
        name: "Seleksi Quiz",
        icon: "fas fa-book",
        route: "/mahasiswa-seleksi-quiz",
        active: false,
      },
      {
        name: "Pengumuman",
        icon: "fas fa-trophy",
        route: "/mahasiswa-pengumuman",
        active: false,
      },
      {
        name: "Daftar Kelompok",
        icon: "fas fa-users",
        route: "/mahasiswa-daftar-kelompok",
        active: false,
      },
      {
        name: "Treasure Hunt",
        icon: "fas fa-map",
        route: "/mahasiswa-treasure-hunt",
        active: false,
      },
      {
        name: "Hunt Sponsorship",
        icon: "fas fa-gift",
        route: "/mahasiswa-hunt-sponsorship",
        active: true,
      },
      {
        name: "Progres Kelompok",
        icon: "fas fa-chart-bar",
        route: "/mahasiswa-progress-kelompok",
        active: false,
      },
      {
        name: "Profil",
        icon: "fas fa-user",
        route: "/mahasiswa-profil",
        active: false,
      },
    ]);

    return {
      menuItems,
      reactive,
    };
  },
};
</script>

<style></style>

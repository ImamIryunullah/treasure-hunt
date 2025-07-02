<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8 relative">
    <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>

    <div class="relative">
      <div class="flex items-center space-x-3 cursor-pointer" @click="toggleDropdown">
        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div class="text-left">
          <p class="text-sm font-medium text-gray-800">Admin Untag</p>
          <p class="text-xs text-gray-500">0288201</p>
        </div>
        <svg
          class="w-4 h-4 text-gray-500 transform transition-transform duration-200"
          :class="{ 'rotate-180': dropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Dropdown Menu -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50"
      >
        <ul>
          <li>
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-xl p-6 shadow-sm border border-black"
        >
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ stat.title }}</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ stat.subtitle }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="group in groups"
          :key="group.title"
          class="bg-white rounded-xl p-6 shadow-sm border border-black"
        >
          <div class="flex items-center mb-4">
            <svg
              class="w-6 h-6 text-gray-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-800">{{ group.title }}</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">{{ group.description }}</p>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Buka Modul
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-50">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Aktivitas Terbaru</h3>
        <p class="text-sm text-gray-500 mb-6">Update real-time</p>

        <div class="space-y-3">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="bg-red-50 border border-red-100 rounded-lg p-4"
          >
            <p class="text-sm text-gray-800">{{ activity.message }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";

export default {
  name: "AdminPanel",
  components: {
    SidebarAdmin,
  },
  setup() {
    const isCollapsed = ref(false);
    const dropdownOpen = ref(false);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const logout = () => {
      console.log("Logout clicked");
      window.location.href = "/login"; // Atau gunakan router push jika pakai Vue Router
    };

    const stats = reactive([
      { title: "Total Kelompok", value: "90", subtitle: "Total Mahasiswa 300" },
      { title: "Lokasi Aktif", value: "90", subtitle: "Total Mahasiswa 300" },
      { title: "Kelompok Aktif", value: "90", subtitle: "Total Mahasiswa 300" },
      { title: "Total Kelompok", value: "90", subtitle: "Total Mahasiswa 300" },
    ]);

    const groups = reactive([
      { title: "Kelola Kelompok", description: "Manajemen 90 Kelompok mahasiswa" },
      { title: "Kelola Kelompok", description: "Manajemen 90 Kelompok mahasiswa" },
      { title: "Kelola Kelompok", description: "Manajemen 90 Kelompok mahasiswa" },
      { title: "Kelola Kelompok", description: "Manajemen 90 Kelompok mahasiswa" },
    ]);

    const menuItems = reactive([
      { name: "Dashboard", icon: "navbar-1.png", route: "/", active: false },
      { name: "Bank Soal", icon: "navbar-2.png", route: "/bank-soal", active: false },
      { name: "Monitoring Progress", icon: "navbar-3.png", route: "/monitoring-progress", active: false },
      { name: "Leaderboard", icon: "navbar-4.png", route: "/leaderboard", active: true },
      { name: "Treasure Hint", icon: "navbar-5.png", route: "/treasure", active: false },
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: false },
      { name: "Manajemen Kelompok", icon: "navbar-7.png", route: "/manajemen-kelompok", active: false },
      { name: "Manajemen Event", icon: "navbar.png", route: "/manajemen-event", active: false },
    ]);

    const activities = reactive([
      { id: 1, message: "Kelompok Raden rahmat menemukan '1piece'", time: "5 menit yang lalu" },
      { id: 2, message: "Kelompok Raden rahmat menemukan '1piece'", time: "5 menit yang lalu" },
      { id: 3, message: "Kelompok Raden rahmat menemukan '1piece'", time: "5 menit yang lalu" },
    ]);

    const setActiveMenu = (name) => {
      menuItems.forEach((item) => {
        item.active = item.name === name;
      });
    };

    return {
      isCollapsed,
      dropdownOpen,
      toggleDropdown,
      logout,
      stats,
      groups,
      menuItems,
      activities,
      toggleSidebar,
      setActiveMenu,
    };
  },
};
</script>


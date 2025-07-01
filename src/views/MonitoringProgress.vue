<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="mb-4 md:mb-0">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Monitor progres</h1>
            <p class="text-gray-600">Pantau semua progres kelompok</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="toggleAutoRefresh"
              class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {{ autoRefreshActive ? "Stop Auto Refresh" : "Auto Refresh" }}
            </button>
            <button
              @click="exportToCSV"
              class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Export data
            </button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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

      <div class="bg-white rounded-lg p-6 border border-black shadow-sm mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Filter</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <select
              class="w-full px-4 py-3 border border-black rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
            >
              <option>Semua Fakultas</option>
              <option>Fakultas Teknik</option>
              <option>Fakultas Ekonomi dan Bisnis</option>
              <option>Fakultas Ilmu Sosial dan Ilmu Politik</option>
              <option>Fakultas Ilmu Budaya</option>
              <option>Fakultas Hukum</option>
              <option>Fakultas Psikologi</option>
              <option>Fakultas Vokasi</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
              class="w-full px-4 py-3 border border-black rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
            >
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Selesai</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="group in groups"
          :key="group.id"
          class="bg-white rounded-lg p-6 border border-black shadow-sm"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ group.name }}</h3>
              <p class="text-gray-600 text-sm">{{ group.faculty }}</p>
            </div>
            <span
              class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ group.status }}
            </span>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex items-center text-gray-600">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span class="text-sm">Lokasi: {{ group.location }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="text-sm">Waktu: {{ group.time }}</span>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-700 mb-1">
              Item ditemukan: {{ group.itemsFound }}
            </p>
            <p class="text-sm text-gray-700 mb-2">Progres hunting:</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gray-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: group.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onBeforeUnmount } from "vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";

export default {
  name: "MonitorProgress",
  components: {
    SidebarAdmin,
  },
  setup() {
    const isCollapsed = ref(false);

    const stats = reactive([
      { title: "Kelompok aktif", value: "3", subtitle: "Sedang hunting" },
      { title: "Kelompok Selesai", value: "3", subtitle: "Telah menyelesaikan" },
      { title: "Total Ditemukan", value: "3", subtitle: "Total item ditemukan" },
      { title: "Total tersembunyi", value: "3", subtitle: "Sedang hunting" },
      { title: "Presentase", value: "75%", subtitle: "Presentase keberhasilan" },
    ]);
    const autoRefreshActive = ref(false);
    let refreshInterval = null;

    const refreshData = () => {
      console.log("Refreshing data...");
    };

    const toggleAutoRefresh = () => {
      autoRefreshActive.value = !autoRefreshActive.value;
      if (autoRefreshActive.value) {
        refreshInterval = setInterval(refreshData, 10000); // 10 detik
      } else {
        clearInterval(refreshInterval);
      }
    };

    onBeforeUnmount(() => {
      clearInterval(refreshInterval);
    });
    const exportToCSV = () => {
      const headers = [
        "ID",
        "Nama",
        "Fakultas",
        "Status",
        "Lokasi",
        "Waktu",
        "Item Ditemukan",
        "Progres",
      ];
      const rows = groups.map((group) => [
        group.id,
        group.name,
        group.faculty,
        group.status,
        group.location,
        group.time,
        group.itemsFound,
        group.progress + "%",
      ]);

      const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "monitoring_progress.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const groups = reactive([
      {
        id: 1,
        name: "Nama Kelompok",
        faculty: "Asal Fakultas",
        status: "Status",
        location: "Gedung A",
        time: "20 menit",
        itemsFound: 3,
        progress: 65,
      },
      {
        id: 2,
        name: "Nama Kelompok",
        faculty: "Asal Fakultas",
        status: "Status",
        location: "Gedung A",
        time: "20 menit",
        itemsFound: 3,
        progress: 45,
      },
      {
        id: 3,
        name: "Nama Kelompok",
        faculty: "Asal Fakultas",
        status: "Status",
        location: "Gedung A",
        time: "20 menit",
        itemsFound: 3,
        progress: 80,
      },
      {
        id: 4,
        name: "Nama Kelompok",
        faculty: "Asal Fakultas",
        status: "Status",
        location: "Gedung A",
        time: "20 menit",
        itemsFound: 3,
        progress: 30,
      },
    ]);

    const menuItems = reactive([
      { name: "Dashboard", icon: "navbar-1.png", route: "/", active: false },
      { name: "Bank Soal", icon: "navbar-2.png", route: "/bank-soal", active: false },
      {
        name: "Monitoring Progress",
        icon: "navbar-3.png",
        route: "/monitoring-progress",
        active: true,
      },
      { name: "Leaderboard", icon: "navbar-4.png", route: "/leaderboard", active: false },
      { name: "Treasure Hint", icon: "navbar-5.png", route: "/treasure", active: false },
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: false },
      {
        name: "Manajemen Kelompok",
        icon: "navbar-7.png",
        route: "/kelompok",
        active: false,
      },
      { name: "Manajemen Event", icon: "navbar.png", route: "/event", active: false },
    ]);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (menuName) => {
      menuItems.forEach((item) => {
        item.active = item.name === menuName;
      });
    };

    return {
      isCollapsed,
      stats,
      groups,
      menuItems,
      toggleSidebar,
      setActiveMenu,
      toggleAutoRefresh,
      exportToCSV,
      autoRefreshActive,
    };
  },
};
</script>

<style scoped>
select {
  background-image: none;
}
</style>

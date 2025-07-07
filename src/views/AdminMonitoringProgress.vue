<template>
  <div class="flex min-h-screen bg-pink-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="mb-4 md:mb-0">
            <h1 class="text-3xl font-bold text-gray-900 mb-1">Monitor Progress Real-time</h1>
            <p class="text-gray-600 text-sm">Pantau semua progress kelompok secara real-time</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="toggleAutoRefresh"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm',
                autoRefreshActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              ]"
            >
              {{ autoRefreshActive ? "Stop Auto Refresh" : "Auto Refresh" }}
            </button>
            <button
              @click="exportToCSV"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-lg p-4 shadow-sm border"
        >
          <h3 class="text-sm font-medium text-gray-600 mb-1">{{ stat.title }}</h3>
          <p class="text-2xl font-bold text-gray-900 mb-1">{{ stat.value }}</p>
          <p class="text-xs text-gray-500">{{ stat.subtitle }}</p>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-lg p-4 shadow-sm border mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Filter & Pencarian</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <select
              v-model="selectedFaculty"
              @change="filterGroups"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm"
            >
              <option value="">Semua Fakultas</option>
              <option v-for="faculty in faculties" :key="faculty" :value="faculty">
                {{ faculty }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
              v-model="selectedStatus"
              @change="filterGroups"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm"
            >
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Selesai">Selesai</option>
              <option value="Menunggu">Menunggu</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Groups Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div
          v-for="group in filteredGroups"
          :key="group.id"
          class="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ group.name }}</h3>
              <p class="text-gray-600 text-sm">{{ group.faculty }}</p>
            </div>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                group.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                group.status === 'Selesai' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{ group.status }}
            </span>
          </div>

          <div class="space-y-2 mb-3">
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-sm">{{ group.location }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm">{{ group.time }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm">{{ group.itemsFound }} item ditemukan</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm">{{ group.totalItems }} total tersembunyi</span>
            </div>
          </div>

          <div class="mb-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm text-gray-700">Progress Hunting</span>
              <span class="text-sm font-medium text-gray-900">{{ group.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: group.progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <button
              @click="viewDetails(group.id)"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Lihat Detail
            </button>
            <span class="text-xs text-gray-500">
              Update: {{ group.lastUpdate }}
            </span>
          </div>
        </div>
      </div>

      <!-- Real-time Activity Feed -->
      <div class="bg-white rounded-lg p-4 shadow-sm border">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Feed Aktivitas Real-time</h3>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-600">Live</span>
          </div>
        </div>
        
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold',
                activity.type === 'found' ? 'bg-green-500' :
                activity.type === 'progress' ? 'bg-blue-500' :
                activity.type === 'completed' ? 'bg-purple-500' :
                'bg-yellow-500'
              ]"
            >
              <svg v-if="activity.type === 'found'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else-if="activity.type === 'progress'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-900">{{ activity.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";

export default {
  name: "MonitorProgress",
  components: {
    SidebarAdmin,
  },
  setup() {
    const isCollapsed = ref(false);
    const autoRefreshActive = ref(false);
    const selectedFaculty = ref("");
    const selectedStatus = ref("");
    let refreshInterval = null;

    const stats = reactive([
      { title: "Kelompok Aktif", value: "3", subtitle: "Sedang hunting" },
      { title: "Kelompok Selesai", value: "1", subtitle: "Telah menyelesaikan" },
      { title: "Total Ditemukan", value: "12", subtitle: "Item ditemukan" },
      { title: "Total Tersembunyi", value: "20", subtitle: "Item tersembunyi" },
      { title: "Presentase", value: "78%", subtitle: "Keberhasilan hunting" },
    ]);

    const faculties = [
      "Fakultas Teknik",
      "Fakultas Ekonomi dan Bisnis", 
      "Fakultas Ilmu Sosial dan Ilmu Politik",
      "Fakultas Ilmu Budaya",
      "Fakultas Hukum",
      "Fakultas Psikologi",
      "Fakultas Vokasi"
    ];

    const groups = reactive([
      {
        id: 1,
        name: "Kelompok Soekarno",
        faculty: "Fakultas Teknik",
        status: "Aktif",
        location: "Gedung A - Lantai 2",
        time: "45 menit",
        itemsFound: 4,
        totalItems: 6,
        progress: 65,
        lastUpdate: "2 menit lalu"
      },
      {
        id: 2,
        name: "Kelompok Kartini",
        faculty: "Fakultas Ekonomi dan Bisnis",
        status: "Selesai",
        location: "Gedung B - Lantai 1",
        time: "78 menit",
        itemsFound: 5,
        totalItems: 5,
        progress: 100,
        lastUpdate: "15 menit lalu"
      },
      {
        id: 3,
        name: "Kelompok Hatta",
        faculty: "Fakultas Ilmu Sosial",
        status: "Aktif",
        location: "Gedung C - Lantai 3",
        time: "32 menit",
        itemsFound: 2,
        totalItems: 4,
        progress: 50,
        lastUpdate: "1 menit lalu"
      },
      {
        id: 4,
        name: "Kelompok Cut Nyak Dien",
        faculty: "Fakultas Hukum",
        status: "Aktif",
        location: "Gedung D - Lantai 1",
        time: "28 menit",
        itemsFound: 1,
        totalItems: 5,
        progress: 20,
        lastUpdate: "5 menit lalu"
      },
      {
        id: 5,
        name: "Kelompok Diponegoro",
        faculty: "Fakultas Psikologi",
        status: "Menunggu",
        location: "Gedung E - Lantai 2",
        time: "0 menit",
        itemsFound: 0,
        totalItems: 4,
        progress: 0,
        lastUpdate: "10 menit lalu"
      }
    ]);

    const activities = reactive([
      {
        id: 1,
        type: "found",
        message: "Kelompok Kartini berhasil menemukan harta karun ke-5 di Gedung B",
        timestamp: "2 menit lalu"
      },
      {
        id: 2,
        type: "progress",
        message: "Kelompok Soekarno mencapai progress 65% dengan total 4 item ditemukan",
        timestamp: "3 menit lalu"
      },
      {
        id: 3,
        type: "completed",
        message: "Kelompok Kartini telah menyelesaikan seluruh tantangan!",
        timestamp: "15 menit lalu"
      },
      {
        id: 4,
        type: "found",
        message: "Kelompok Hatta menemukan item tersembunyi di Gedung C lantai 3",
        timestamp: "18 menit lalu"
      },
      {
        id: 5,
        type: "start",
        message: "Kelompok Cut Nyak Dien memulai hunting di Gedung D",
        timestamp: "25 menit lalu"
      }
    ]);

    const filteredGroups = computed(() => {
      return groups.filter(group => {
        const facultyMatch = !selectedFaculty.value || group.faculty === selectedFaculty.value;
        const statusMatch = !selectedStatus.value || group.status === selectedStatus.value;
        return facultyMatch && statusMatch;
      });
    });

    const menuItems = reactive([
      { name: "Dashboard", icon: "fas fa-home", route: "/", active: false },
      { name: "Kelola Lokasi", icon: "fas fa-map-marker-alt", route: "/manajemen-lokasi", active: false },
      { name: "Kelola Kelompok", icon: "fas fa-users", route: "/manajemen-kelompok", active: false },
      { name: "Kelola Soal", icon: "fas fa-question-circle", route: "/bank-soal", active: false },
      { name: "Monitoring Progress", icon: "fas fa-chart-line", route: "/monitoring-progress", active: true },
      {
        name: "Laporan",
        icon: "fas fa-file-alt",
        route: "/laporan-dan-rekapan-akhir",
        active: false,
      },
    ]);

    const refreshData = () => {
      // Simulate real-time updates
      const randomGroup = groups[Math.floor(Math.random() * groups.length)];
      if (randomGroup.status === "Aktif" && randomGroup.progress < 100) {
        const oldProgress = randomGroup.progress;
        randomGroup.progress = Math.min(100, randomGroup.progress + Math.floor(Math.random() * 20));
        randomGroup.lastUpdate = "Baru saja";
        
        if (randomGroup.progress > oldProgress) {
          randomGroup.itemsFound = Math.floor((randomGroup.progress / 100) * randomGroup.totalItems);
          
          // Add new activity
          activities.unshift({
            id: activities.length + 1,
            type: randomGroup.progress === 100 ? "completed" : "progress",
            message: randomGroup.progress === 100 
              ? `${randomGroup.name} telah menyelesaikan seluruh tantangan!`
              : `${randomGroup.name} mencapai progress ${randomGroup.progress}%`,
            timestamp: "Baru saja"
          });
          
          if (randomGroup.progress === 100) {
            randomGroup.status = "Selesai";
          }
        }
      }
      
      // Update stats
      const activeGroups = groups.filter(g => g.status === "Aktif").length;
      const completedGroups = groups.filter(g => g.status === "Selesai").length;
      const totalFound = groups.reduce((sum, g) => sum + g.itemsFound, 0);
      const totalHidden = groups.reduce((sum, g) => sum + g.totalItems, 0);
      const percentage = Math.round((totalFound / totalHidden) * 100);
      
      stats[0].value = activeGroups.toString();
      stats[1].value = completedGroups.toString();
      stats[2].value = totalFound.toString();
      stats[3].value = totalHidden.toString();
      stats[4].value = percentage + "%";
      
      console.log("Data refreshed at", new Date().toLocaleTimeString());
    };

    const toggleAutoRefresh = () => {
      autoRefreshActive.value = !autoRefreshActive.value;
      if (autoRefreshActive.value) {
        refreshInterval = setInterval(refreshData, 5000); // 5 seconds
      } else {
        clearInterval(refreshInterval);
      }
    };

    const filterGroups = () => {
      // Filtering is handled by computed property
      console.log("Filtering groups...");
    };

    const viewDetails = (groupId) => {
      console.log("Viewing details for group:", groupId);
      // Implement navigation to detail view
    };

    const exportToCSV = () => {
      const headers = [
        "ID", "Nama Kelompok", "Fakultas", "Status", "Lokasi", 
        "Waktu", "Item Ditemukan", "Total Item", "Progress (%)", "Last Update"
      ];
      
      const rows = groups.map(group => [
        group.id,
        group.name,
        group.faculty,
        group.status,
        group.location,
        group.time,
        group.itemsFound,
        group.totalItems,
        group.progress,
        group.lastUpdate
      ]);

      const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `monitoring_progress_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (menuName) => {
      menuItems.forEach(item => {
        item.active = item.name === menuName;
      });
    };

    onMounted(() => {
      // Start auto-refresh by default
      toggleAutoRefresh();
    });

    onBeforeUnmount(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });

    return {
      isCollapsed,
      stats,
      groups,
      filteredGroups,
      faculties,
      activities,
      menuItems,
      autoRefreshActive,
      selectedFaculty,
      selectedStatus,
      toggleSidebar,
      setActiveMenu,
      toggleAutoRefresh,
      filterGroups,
      viewDetails,
      exportToCSV,
    };
  },
};
</script>

<style scoped>
select {
  background-image: none;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
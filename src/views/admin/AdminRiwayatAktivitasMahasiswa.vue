<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin />
    <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Riwayat Aktivitas Mahasiswa</h1>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-600">{{ onlineUsers }} mahasiswa online</span>
          </div>
          <button
            @click="refreshActivities"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Filter dan Pencarian -->
      <div class="bg-white rounded-lg p-6 shadow-sm border mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-64">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Cari Mahasiswa</label
            >
            <div class="relative">
              <svg
                class="absolute left-3 top-3 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari berdasarkan nama atau NIM..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Jenis Aktivitas</label
            >
            <select
              v-model="filterType"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Semua Aktivitas</option>
              <option value="login">Login</option>
              <option value="course_access">Akses Materi</option>
              <option value="assignment">Tugas</option>
              <option value="quiz">Quiz</option>
              <option value="discussion">Diskusi</option>
              <option value="download">Download</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Rentang Waktu</label
            >
            <select
              v-model="filterDate"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Semua Waktu</option>
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Feed Aktivitas Real-time -->
        <div class="xl:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-900">
                  Feed Aktivitas Real-time
                </h3>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-sm text-gray-600">Live</span>
                </div>
              </div>
            </div>

            <div class="max-h-96 overflow-y-auto">
              <div
                v-for="activity in filteredActivities"
                :key="activity.id"
                class="flex items-start gap-4 p-4 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold',
                      getActivityColor(activity.type),
                    ]"
                  >
                    <component :is="getActivityIcon(activity.type)" class="w-5 h-5" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <p class="text-sm font-medium text-gray-900">
                      {{ activity.studentName }}
                    </p>
                    <span class="text-xs text-gray-500">{{ activity.nim }}</span>
                  </div>
                  <p class="text-sm text-gray-700 mb-1">{{ activity.message }}</p>
                  <div class="flex items-center gap-4 text-xs text-gray-500">
                    <span>{{ formatTime(activity.timestamp) }}</span>
                    <span>{{ activity.course }}</span>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(activity.status),
                    ]"
                  >
                    {{ getStatusText(activity.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistik Aktivitas -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistik Hari Ini</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Aktivitas</span>
                <span class="text-lg font-bold text-gray-900">{{
                  todayStats.total
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Mahasiswa Aktif</span>
                <span class="text-lg font-bold text-blue-600">{{
                  todayStats.activeStudents
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Tugas Diserahkan</span>
                <span class="text-lg font-bold text-green-600">{{
                  todayStats.assignments
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Quiz Diselesaikan</span>
                <span class="text-lg font-bold text-purple-600">{{
                  todayStats.quizzes
                }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbanyak</h3>
            <div class="space-y-3">
              <div
                v-for="top in topActivities"
                :key="top.type"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-2">
                  <div
                    :class="['w-3 h-3 rounded-full', getActivityColor(top.type)]"
                  ></div>
                  <span class="text-sm text-gray-700">{{
                    getActivityLabel(top.type)
                  }}</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ top.count }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Mahasiswa Paling Aktif
            </h3>
            <div class="space-y-3">
              <div
                v-for="student in topStudents"
                :key="student.id"
                class="flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs font-medium text-gray-600">{{
                    student.initial
                  }}</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ student.name }}</p>
                  <p class="text-xs text-gray-500">{{ student.activities }} aktivitas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";

export default {
  components: {
    SidebarAdmin,
  },
  data() {
    return {
      searchQuery: "",
      filterType: "",
      filterDate: "",
      onlineUsers: 24,
      activities: [
        {
          id: 1,
          studentName: "Ahmad Fauzi",
          nim: "2021010001",
          type: "login",
          message: "Login ke sistem",
          timestamp: new Date(),
          course: "Algoritma Pemrograman",
          status: "success",
        },
        // ...tambahan aktivitas lainnya
      ],
      todayStats: {
        total: 156,
        activeStudents: 45,
        assignments: 23,
        quizzes: 18,
      },
      topActivities: [
        { type: "course_access", count: 45 },
        { type: "assignment", count: 23 },
        { type: "quiz", count: 18 },
        { type: "discussion", count: 12 },
      ],
      topStudents: [
        { id: 1, name: "Ahmad Fauzi", initial: "AF", activities: 15 },
        { id: 2, name: "Siti Nurhaliza", initial: "SN", activities: 12 },
        { id: 3, name: "Budi Santoso", initial: "BS", activities: 10 },
      ],
    };
  },
  computed: {
    filteredActivities() {
      return this.activities.filter((activity) => {
        const matchesSearch =
          !this.searchQuery ||
          activity.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          activity.nim.includes(this.searchQuery);

        const matchesType = !this.filterType || activity.type === this.filterType;
        const matchesDate = !this.filterDate || this.isWithinDateRange(activity.timestamp);

        return matchesSearch && matchesType && matchesDate;
      });
    },
  },
  methods: {
    getActivityColor(type) {
      const colors = {
        login: "bg-blue-500",
        course_access: "bg-green-500",
        assignment: "bg-purple-500",
        quiz: "bg-yellow-500",
        discussion: "bg-indigo-500",
        download: "bg-pink-500",
      };
      return colors[type] || "bg-gray-500";
    },
    getActivityIcon(type) {
      const icons = {
        login: "fa-right-to-bracket",
        course_access: "fa-book",
        assignment: "fa-file-lines",
        quiz: "fa-clipboard-question",
        discussion: "fa-comments",
        download: "fa-download",
      };
      return icons[type] || "fa-circle-info";
    },
    getActivityLabel(type) {
      const labels = {
        login: "Login",
        course_access: "Akses Materi",
        assignment: "Tugas",
        quiz: "Quiz",
        discussion: "Diskusi",
        download: "Download",
      };
      return labels[type] || type;
    },
    getStatusColor(status) {
      const colors = {
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    },
    getStatusText(status) {
      const texts = {
        success: "Berhasil",
        warning: "Peringatan",
        error: "Gagal",
      };
      return texts[status] || status;
    },
    formatTime(timestamp) {
      const now = new Date();
      const diff = now - timestamp;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} hari lalu`;
      if (hours > 0) return `${hours} jam lalu`;
      if (minutes > 0) return `${minutes} menit lalu`;
      return "Baru saja";
    },
    isWithinDateRange(timestamp) {
      const now = new Date();
      const date = new Date(timestamp);
      switch (this.filterDate) {
        case "today":
          return date.toDateString() === now.toDateString();
        case "week":
          return date >= new Date(now - 7 * 24 * 60 * 60 * 1000);
        case "month":
          return date >= new Date(now - 30 * 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    },
    refreshActivities() {
      this.onlineUsers = Math.floor(Math.random() * 50) + 10;
      this.activities.unshift({
        id: Date.now(),
        studentName: "Mahasiswa Baru",
        nim: "2021010" + Math.floor(Math.random() * 100),
        type: "login",
        message: "Login ke sistem",
        timestamp: new Date(),
        course: "Mata Kuliah",
        status: "success",
      });
    },
  },
  mounted() {
    setInterval(() => {
      this.refreshActivities();
    }, 30000);
  },
};
</script>


<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

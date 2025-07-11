<template>
  <div class="flex min-h-screen bg-gray-100">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p class="text-gray-600 mb-4">Treasure Hunt - 5 Basis Nilai UNTAG Surabaya</p>
        <p class="text-lg font-semibold text-gray-700">Persiapan Event</p>
      </div>
      <!-- <div class="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Kontrol Event</h3>
              <div class="flex items-center mt-2">
                <span class="text-3xl font-bold text-orange-600">{{ formatTime(eventTimer) }}</span>
                <span class="text-sm text-gray-500 ml-2">Waktu tersisa</span>
              </div>
            </div>
          </div>
          <div class="flex space-x-3">
            <button
              @click="startEvent"
              :disabled="eventStatus === 'running'"
              class="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              {{ eventStatus === 'running' ? 'Event Berjalan' : 'Mulai Event' }}
            </button>
            <button
              @click="pauseEvent"
              :disabled="eventStatus !== 'running'"
              class="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              Pause
            </button>
            <button
              @click="resetEvent"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div> -->

      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Kelompok</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalGroups }}</p>
              <p class="text-xs text-gray-500">{{ stats.totalStudents }} mahasiswa total</p>
            </div>
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Lokasi Aktif</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activeLocations }}</p>
              <p class="text-xs text-gray-500">Area kampus tersedia</p>
            </div>
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Kelompok Aktif</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activeGroups }}</p>
              <p class="text-xs text-gray-500">Sedang berburu hadiah</p>
            </div>
            <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Hadiah</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalPrizes }}</p>
              <p class="text-xs text-gray-500">Hadiah terklaim</p>
            </div>
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">Kelola Lokasi</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">Atur 10 lokasi treasure hunt di kampus</p>
          <button
            @click="openLocationModule"
            class="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Buka Modul
          </button>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">Kelola Kelompok</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">Manajemen 26 kelompok mahasiswa</p>
          <button
            @click="openGroupModule"
            class="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Buka Modul
          </button>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">Monitor Progres</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">Pantau aktivitas real-time kelompok</p>
          <button
            @click="openProgressModule"
            class="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Buka Modul
          </button>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">Laporan Akhir</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">Rekap hasil dan statistik event</p>
          <button
            @click="openReportModule"
            class="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Buka Modul
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Aktivitas Terbaru</h3>
        <p class="text-sm text-gray-500 mb-6">Update real-time dari treasure hunt</p>

        <div class="space-y-4">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="flex items-start p-4 rounded-lg border"
            :class="getActivityClass(activity.type)"
          >
            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="getActivityIconClass(activity.type)">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="activity.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                <path v-else-if="activity.type === 'info'" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                <path v-else fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800">{{ activity.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onUnmounted } from "vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";

export default {
  name: "AdminPanel",
  components: {
    SidebarAdmin,
  },
  setup() {
    const isCollapsed = ref(false);
    const dropdownOpen = ref(false);
    const eventTimer = ref(30 * 60); 
    const eventStatus = ref('stopped'); 
    const timerInterval = ref(null);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const startEvent = () => {
      if (eventStatus.value !== 'running') {
        eventStatus.value = 'running';
        timerInterval.value = setInterval(() => {
          if (eventTimer.value > 0) {
            eventTimer.value--;
          } else {
            eventStatus.value = 'stopped';
            clearInterval(timerInterval.value);
            // Add activity log
            activities.unshift({
              id: Date.now(),
              type: 'warning',
              message: 'Event telah berakhir - waktu habis',
              time: 'Baru saja'
            });
          }
        }, 1000);
        
        // Add activity log
        activities.unshift({
          id: Date.now(),
          type: 'info',
          message: 'Event treasure hunt dimulai',
          time: 'Baru saja'
        });
      }
    };

    const pauseEvent = () => {
      if (eventStatus.value === 'running') {
        eventStatus.value = 'paused';
        clearInterval(timerInterval.value);
        
        // Add activity log
        activities.unshift({
          id: Date.now(),
          type: 'warning',
          message: 'Event dijeda sementara',
          time: 'Baru saja'
        });
      }
    };

    const resetEvent = () => {
      eventStatus.value = 'stopped';
      eventTimer.value = 30 * 60; // Reset to 30 minutes
      clearInterval(timerInterval.value);
      
      // Add activity log
      activities.unshift({
        id: Date.now(),
        type: 'info',
        message: 'Event direset - timer kembali ke 30:00',
        time: 'Baru saja'
      });
    };

    const openLocationModule = () => {
      console.log('Opening Location Module');
      // Navigate to location management
      // router.push('/kelola-lokasi');
    };

    const openGroupModule = () => {
      console.log('Opening Group Module');
      // Navigate to group management
      // router.push('/manajemen-kelompok');
    };

    const openProgressModule = () => {
      console.log('Opening Progress Module');
      // Navigate to progress monitoring
      // router.push('/monitoring-progress');
    };

    const openReportModule = () => {
      console.log('Opening Report Module');
      // Navigate to final report
      // router.push('/laporan-akhir');
    };

    const getActivityClass = (type) => {
      switch (type) {
        case 'success':
          return 'bg-green-50 border-green-200';
        case 'info':
          return 'bg-blue-50 border-blue-200';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200';
        default:
          return 'bg-gray-50 border-gray-200';
      }
    };

    const getActivityIconClass = (type) => {
      switch (type) {
        case 'success':
          return 'bg-green-100 text-green-600';
        case 'info':
          return 'bg-blue-100 text-blue-600';
        case 'warning':
          return 'bg-yellow-100 text-yellow-600';
        default:
          return 'bg-gray-100 text-gray-600';
      }
    };

    const stats = reactive({
      totalGroups: 26,
      totalStudents: 130,
      activeLocations: 10,
      activeGroups: 18,
      totalPrizes: 67
    });

    const activities = reactive([
      {
        id: 1,
        type: 'success',
        message: "Kelompok Soekarno berhasil menjawab soal di Gedung Q",
        time: "2 menit yang lalu",
      },
      {
        id: 2,
        type: 'info',
        message: "Kelompok Kartini mengklaim hadiah ke-3",
        time: "5 menit yang lalu",
      },
      {
        id: 3,
        type: 'warning',
        message: "Kelompok Hatta salah menjawab soal di Perpustakaan",
        time: "8 menit yang lalu",
      },
    ]);


    onUnmounted(() => {
      if (timerInterval.value) {
        clearInterval(timerInterval.value);
      }
    });

    return {
      isCollapsed,
      dropdownOpen,
      eventTimer,
      eventStatus,
      toggleDropdown,
      toggleSidebar,
      formatTime,
      startEvent,
      pauseEvent,
      resetEvent,
      openLocationModule,
      openGroupModule,
      openProgressModule,
      openReportModule,
      getActivityClass,
      getActivityIconClass,
      stats,
      activities,
    };
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
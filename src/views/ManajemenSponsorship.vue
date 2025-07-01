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
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Sponsorship</h1>
          <p class="text-gray-600">
            Peringkat hasil seleksi berdasarkan fakultas dan program studi
          </p>
        </div>  
        <div class="flex">
          <button
            @click="showAddModal = true"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Tambah Baru</span>
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
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { reactive } from "vue";
export default {
  components: {
    SidebarAdmin
  },
  setup(){
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
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: true },
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
        title: "Event Aktif",
        value: "3",
        subtitle: "2 draft 1 Aktif",
      },
      {
        title: "Peserta Event",  
        value: "50",
        subtitle: "Peserta yang berhasil lolos",
      },
      {
        title: "Sponsor Aktif",
        value: "3",
        subtitle: "Bank CBA, PT. Pencari Cinta Sejati",
      },
      {
        title: "Total klik iklan",
        value: "192 x Diklik",  
        subtitle: "Engagment sponsor",  
      },
    ]);

    const tabs = [
      { id: 'sponsor', name: 'Sponsor' },
      { id: 'event', name: 'Event' },   
      { id: 'prodi', name: 'Per prodi' },
      { id: 'kuis sponsor', name: 'Kuis Sponsor' },
      { id: 'popup', name: 'Pop-up Iklan' },
      { id: 'laporan', name: 'laporan' },
    ];



    return {
        menuItems,
        reactive,
        stats,
        tabs
    }
  }
};
</script>

<style></style>

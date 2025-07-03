<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            Selamat Datang di Treasure Hunt!
          </h1>
          <p class="text-gray-600">
            Ikuti petualangan seru untuk mengenal kampus dan teman-teman baru
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          :class="[
            'rounded-lg p-6 border border-black shadow-sm',
            stat.bgColor,
            stat.borderColor,
          ]"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <span class="w-8 h-8">{{ stat.icon }}</span>
            <h3 class="text-sm font-bold" :class="stat.statusColor">{{ stat.status }}</h3>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ stat.title }}</h3>
          <p class="text-sm text-gray-500">{{ stat.subtitle }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        <div
          v-for="progresi in progresis"
          :key="progresi.title"
          class="bg-white rounded-lg p-6 border border-black shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ progresi.title }}</h3>
          <p class="text-sm text-gray-500">{{ progresi.subtitle }}</p>
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
  name: "MahasiswaDashboard",
  setup() {
    const menuItems = reactive([
      { name: "Dashboard", icon: "fas fa-home", route: "/", active: true },
      { name: "Seleksi Quiz", icon: "fas fa-book", route: "/bank-soal", active: false },
      {
        name: "Pengumuman",
        icon: "fas fa-trophy",
        route: "/monitoring-progress",
        active: false,
      },
      {
        name: "Daftar Kelompok",
        icon: "fas fa-users",
        route: "/leaderboard",
        active: false,
      },
      { name: "Treasure Hunt", icon: "fas fa-map", route: "/treasure", active: false },
      {
        name: "Hunt Sponsorship",
        icon: "fas fa-gift",
        route: "/sponsorship",
        active: false,
      },
      {
        name: "Progres Kelompok",
        icon: "fas fa-chart-bar",
        route: "/manajemen-kelompok",
        active: false,
      },
      { name: "Profil", icon: "fas fa-user", route: "/manajemen-event", active: false },
    ]);

    const stats = reactive([
      {
        title: "Seleksi QUiz",
        subtitle: "Skor: 85/100",
        bgColor: "bg-green-100",
        icon: "",
        status: "Selesai",
        statusColor: "text-green-600 bg-co",
      },
      {
        title: "Kelompok",
        subtitle: "Tim Explorer",
        bgColor: "bg-blue-100",
        icon: "👥",
        status: "Aktif",
        statusColor: "text-blue-600",
      },
      {
        title: "Treasure Hunt",
        subtitle: "6/10 Area",
        bgColor: "bg-purple-100",
        icon: "",
        status: "Berlangsung",
        statusColor: "text-purple-600",
      },
      {
        title: "Posisi",
        subtitle: "#3 dari 25 Tim",
        bgColor: "bg-yellow-100",
        icon: "",
        status: "Rangking",
        statusColor: "text-yellow-600",
      },
    ]);
    return {
      menuItems,
      reactive,
      stats,
    };
  },
};
</script>

<style></style>

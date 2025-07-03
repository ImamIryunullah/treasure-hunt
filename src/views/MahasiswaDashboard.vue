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
            'rounded-lg p-5 border shadow-sm relative overflow-hidden',
            stat.bgColor,
          ]"
        >
          <!-- Icon dan Status -->
          <div class="flex justify-between items-start mb-4">
            <font-awesome-icon
              :icon="['fas', stat.icon]"
              class="text-2xl"
              :class="stat.statusColor"
            />
            <span
              class="text-xs font-medium px-2 py-1 rounded-full bg-white/70"
              :class="stat.statusColor"
            >
              {{ stat.status }}
            </span>
          </div>

          <!-- Judul dan Subjudul -->
          <h3 class="text -base font-semibold text-gray-800">{{ stat.title }}</h3>
          <p class="text-sm text-gray-600">{{ stat.subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
import { ref, reactive } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheckCircle,
  faUsers,
  faMapMarkedAlt,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCheckCircle, faUsers, faMapMarkedAlt, faTrophy);
export default {
  components: {
    SidebarMahasiswa,
    FontAwesomeIcon,
  },
  name: "MahasiswaDashboard",
  setup() {
    const isCollapsed = ref(false);
    const menuItems = reactive([
      { name: "Dashboard", icon: "fas fa-home", route: "/mahasiswa-dashboard", active: true },
      { name: "Seleksi Quiz", icon: "fas fa-book", route: "/mahasiswa-seleksi-quiz", active: false },
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
        title: "Seleksi Quiz",
        subtitle: "Skor: 85/100",
        bgColor: "bg-green-50",
        icon: "check-circle",
        status: "Selesai",
        statusColor: "text-green-600",
      },
      {
        title: "Kelompok",
        subtitle: "Tim Explorer",
        bgColor: "bg-blue-50",
        icon: "users",
        status: "Aktif",
        statusColor: "text-blue-600",
      },
      {
        title: "Treasure Hunt",
        subtitle: "6/10 Area",
        bgColor: "bg-purple-50",
        icon: "map-marked-alt",
        status: "Berlangsung",
        statusColor: "text-purple-600",
      },
      {
        title: "Posisi",
        subtitle: "#3 dari 25 tim",
        bgColor: "bg-orange-50",
        icon: "trophy",
        status: "Ranking",
        statusColor: "text-orange-600",
      },
    ]);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      menuItems,
      reactive,
      stats,
      isCollapsed,
      toggleSidebar,
    };
  },
};
</script>

<style></style>

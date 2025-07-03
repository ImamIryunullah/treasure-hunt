<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
  </div>
</template>

<script>
import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
import { ref, reactive } from "vue";
export default {
  components: {
    SidebarMahasiswa,
  },
  setup() {
    const isCollapsed = ref(false);
    const menuItems = reactive([
      { name: "Dashboard", icon: "fas fa-home", route: "/", active: false },
      {
        name: "Seleksi Quiz",
        icon: "fas fa-book",
        route: "/mahasiswa-seleksi-quiz",
        active: false,
      },
      {
        name: "Pengumuman",
        icon: "fas fa-trophy",
        route: "/mahasiswa-pengemuman",
        active: true,
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
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };
    return {
      isCollapsed,
      menuItems,
      reactive,
      toggleSidebar
    };
  },
};
</script>

<style></style>

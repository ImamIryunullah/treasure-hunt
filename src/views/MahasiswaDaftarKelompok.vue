<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8">
        <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Daftar Kelompok Treasure Hunt</h1>
        <p class="text-gray-600">Pilih kelompok dan lengkapi data diri untuk mengikuti petualangan</p>
        </div>
    </div>

    



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
        active: true,
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
    return {
      isCollapsed,
      menuItems,
    };
  },
};
</script>

<style></style>

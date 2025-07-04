<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8">
        
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
  setup(){
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
          active: false,
        },
        {
          name: "Daftar Kelompok",
          icon: "fas fa-users",
          route: "/mahasiswa-daftar-kelompok",
          active: false,
        },
        { 
          name: "Treasure Hunt", 
          icon: "fas fa-map", 
          route: "/mahasiswa-treasure-hunt", 
          active: false 
        },
        {
          name: "Hunt Sponsorship",
          icon: "fas fa-gift",
          route: "/mahasiswa-hunt-sponsorship",
          active: true,
        },
        {
          name: "Progres Kelompok",
          icon: "fas fa-chart-bar",
          route: "/mahasiswa-progress-kelompok",
          active: false,
        },
        { 
          name: "Profil", 
          icon: "fas fa-user", 
          route: "/mahasiswa-profil", 
          active: false 
        },
      ]);
      return{
        menuItems,
        reactive
      }
  }
};
</script>

<style>


</style>

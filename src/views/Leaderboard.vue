<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8"></div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
export default {
  name: "LadeboardAdmin",
  components: {
    SidebarAdmin,
  },
  setup() {
    const isCollapsed = ref(false);
    const menuItems = reactive([
      { name: "Dashboard", icon: "navbar-1.png", route: "/", active: false },
      { name: "Bank Soal", icon: "navbar-2.png", route: "/bank-soal", active: false },
      {
        name: "Monitoring Progress",
        icon: "navbar-3.png",
        route: "/monitoring",
        active: false,
      },
      { name: "Leaderboard", icon: "navbar-4.png", route: "/leaderboard", active: true },
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
    return {
      isCollapsed,
      menuItems,
      toggleSidebar,
    };
  },
};
</script>

<style></style>

<template>
  <div
    :class="[ 'bg-slate-900 text-white transition-all duration-300 flex flex-col', isCollapsed ? 'w-16' : 'w-64' ]"
    class="min-h-screen"
  >
    <!-- Header -->
    <div class="p-4 border-b border-slate-700">
      <div class="flex items-center justify-between">
        <div v-if="!isCollapsed" class="flex items-center space-x-3">
          <img src="@/assets/logo_untag.png" alt="Logo" class="w-10 h-10 object-contain" />
          <div>
            <h1 class="text-lg font-semibold">Treasure Hunt UNTAG</h1>
            <p class="text-sm text-slate-400">Admin Panel</p>
          </div>
        </div>
        <button @click="toggleSidebar" class="p-1 rounded hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 p-4 space-y-2">
      <template v-for="item in menuItems" :key="item.name">
        <div v-if="item.children" class="space-y-1">
          <button
            @click="toggleDropdown(item.name)"
            class="flex items-center w-full transition-colors rounded-lg hover:bg-slate-700"
            :class="isCollapsed ? 'p-2 justify-center' : 'p-3'"
          >
            <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <i :class="item.icon" class="text-white text-lg"></i>
            </div>
            <span v-if="!isCollapsed" class="ml-3 flex-1 text-left">{{ item.name }}</span>
            <svg
              v-if="!isCollapsed"
              class="w-4 h-4 ml-auto transform transition-transform"
              :class="{ 'rotate-90': dropdownOpen[item.name] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div v-show="dropdownOpen[item.name] && !isCollapsed" class="pl-8 space-y-1">
            <router-link
              v-for="sub in item.children"
              :key="sub.route"
              :to="sub.route"
              class="block rounded-lg p-2 text-sm hover:bg-slate-700"
              :class="{ 'bg-slate-700': isRouteActive(sub.route) }"
            >
              {{ sub.name }}
            </router-link>
          </div>
        </div>

        <router-link
          v-else
          :to="item.route"
          class="flex items-center transition-colors rounded-lg"
          :class="[ isRouteActive(item.route) ? 'bg-slate-700' : '', isCollapsed ? 'p-2 justify-center hover:bg-slate-700' : 'p-3 hover:bg-slate-700' ]"
          :title="isCollapsed ? item.name : ''"
        >
          <div class="flex-shrink-0 flex items-center justify-center w-6 h-6">
            <i :class="item.icon" class="text-white text-lg"></i>
          </div>
          <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}</span>
        </router-link>
      </template>
    </nav>

    <!-- Logout -->
    <div class="p-4 mt-auto border-t border-slate-700">
      <button
        @click="handleLogout"
        class="flex items-center w-full text-left transition-colors rounded-lg hover:bg-red-600"
        :class="isCollapsed ? 'p-2 justify-center' : 'p-3'"
        :title="isCollapsed ? 'Logout' : ''"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
        </svg>
        <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "SidebarAdmin",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isCollapsed = ref(false);
    const dropdownOpen = reactive({});

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const toggleDropdown = (name) => {
      dropdownOpen[name] = !dropdownOpen[name];
    };

    const menuItems = [
      { name: "Dashboard", icon: "fas fa-home", route: "/dashboard-admin" },
      {
        name: "Kelola Game",
        icon: "fas fa-calendar-alt",
        children: [
          { name: "Manajemen Treasure Hunt", route: "/manajemen-treasure-hunt" },
          { name: "Manajemen Kelompok", route: "/manajemen-kelompok" },
          { name: "Manajemen Kuis", route: "/bank-soal" },
        ],
      },
      { name: "Progress Kelompok", icon: "fas fa-chart-line", route: "/monitoring-progress" },
      { name: "Laporan", icon: "fas fa-file-alt", route: "/laporan-dan-rekapan-akhir" },
      { name: "Leaderboard Kuis", icon: "fas fa-medal", route: "/leaderboard-game-kuis" },
    ];

    const isRouteActive = (menuRoute) => route.path === menuRoute;

    const handleLogout = () => {
      localStorage.clear();
      router.push("/login");
    };

    return {
      isCollapsed,
      toggleSidebar,
      handleLogout,
      toggleDropdown,
      isRouteActive,
      menuItems,
      dropdownOpen,
    };
  },
};
</script>

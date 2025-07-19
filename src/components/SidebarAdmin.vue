<template>
  <div
    :class="[
      'bg-black text-white transition-all duration-300 flex flex-col shadow-xl',
      isCollapsed ? 'w-16' : 'w-72',
    ]"
    class="min-h-screen relative"
  >
    <div class="p-4 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div class="flex items-center justify-between">
        <div v-if="!isCollapsed" class="flex items-center space-x-3">
          <div class="relative">
            <img
              src="@/assets/logo_untag.png"
              alt="Logo"
              class="w-10 h-10 object-contain rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1
              class="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
            >
              Treasure Hunt UNTAG
            </h1>
            <p class="text-sm text-slate-400 font-m um">Admin Panel</p>
          </div>
        </div>
        <button
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 hover:scale-110 group"
        >
          <svg
            class="w-5 h-5 group-hover:text-blue-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav
      class="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
    >
      <template v-for="item in menuItems" :key="item.name">
        <div v-if="item.children" class="space-y-1">
          <button
            @click="toggleDropdown(item.name)"
            class="flex items-center w-full transition-all duration-200 rounded-xl hover:bg-slate-700/50 group relative"
            :class="isCollapsed ? 'p-3 justify-center' : 'p-3'"
          >
            <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <i
                :class="item.icon"
                class="text-yellow-400 text-lg group-hover:scale-110 transition-transform"
              ></i>
            </div>
            <span v-if="!isCollapsed" class="ml-3 flex-1 text-left font-medium">{{
              item.name
            }}</span>
            <svg
              v-if="!isCollapsed"
              class="w-4 h-4 ml-auto transform transition-all duration-200 text-slate-400 group-hover:text-white"
              :class="{ 'rotate-90': dropdownOpen[item.name] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>

            <div
              v-if="isCollapsed"
              class="absolute left-16 bg-slate-800 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
            >
              {{ item.name }}
            </div>
          </button>

          <div
            v-show="dropdownOpen[item.name] && !isCollapsed"
            class="pl-6 space-y-1 border-l-2 border-slate-700/50 ml-3"
          >
            <router-link
              v-for="sub in item.children"
              :key="sub.route"
              :to="sub.route"
              class="flex items-center space-x-3 rounded-xl p-3 text-sm hover:bg-slate-700/50 transition-all duration-200 group relative"
              :class="{
                'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-blue-500': isRouteActive(
                  sub.route
                ),
                'hover:translate-x-1': !isRouteActive(sub.route),
              }"
            >
              <i
                :class="sub.icon"
                class="text-yellow-300 w-4 text-base group-hover:text-white transition-colors"
              ></i>
              <span class="font-medium group-hover:text-white transition-colors">{{
                sub.name
              }}</span>
              <div
                v-if="isRouteActive(sub.route)"
                class="absolute right-2 w-2 h-2 bg-yellow-500 rounded-full"
              ></div>
            </router-link>
          </div>
        </div>

        <router-link
          v-else
          :to="item.route"
          class="flex items-center transition-all duration-200 rounded-xl group relative"
          :class="[
            isRouteActive(item.route)
              ? 'bg-yellow-600 border-l-4 border-yellow-700'
              : 'hover:bg-slate-700/50',
            isCollapsed ? 'p-3 justify-center' : 'p-3 hover:translate-x-1',
          ]"
        >
          <div class="flex-shrink-0 flex items-center justify-center w-6 h-6">
            <i
              :class="item.icon"
              class="text-yellow-400 text-lg group-hover:scale-110 transition-transform"
            ></i>
          </div>
          <span
            v-if="!isCollapsed"
            class="ml-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium"
            >{{ item.name }}</span
          >
          <div
            v-if="isRouteActive(item.route) && !isCollapsed"
            class="absolute right-3 w-2 h-2 bg-blue-500 rounded-full"
          ></div>

          <div
            v-if="isCollapsed"
            class="absolute left-16 bg-slate-800 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
          >
            {{ item.name }}
          </div>
        </router-link>
      </template>
    </nav>

    <div v-if="!isCollapsed" class="p-4 border-t border-slate-700/50 bg-slate-900/30">
      <div
        class="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
      >
        <div
          class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <i class="fas fa-user text-white text-sm"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-white truncate">Admin User</p>
          <p class="text-xs text-slate-400 truncate">admin@untag.edu</p>
        </div>
        <div class="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
    </div>

    <div class="p-4 border-t border-slate-700/50 bg-slate-900/30">
      <button
        @click="handleLogout"
        class="flex items-center w-full text-left transition-all duration-200 rounded-xl hover:bg-red-600/20 border border-transparent hover:border-red-500/50 group relative"
        :class="isCollapsed ? 'p-3 justify-center' : 'p-3'"
      >
        <svg
          class="w-6 h-6 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        <span
          v-if="!isCollapsed"
          class="ml-3 whitespace-nowrap font-medium group-hover:text-white transition-colors"
        >
          Logout
        </span>

        <div
          v-if="isCollapsed"
          class="absolute left-16 bg-slate-800 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg"
        >
          Logout
        </div>
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
      {
        name: "Kelola Quiz & Treasure Hunt",
        icon: "fas fa-gamepad",
        children: [
          {
            name: "Manajemen Treasure Hunt",
            route: "/manajemen-treasure-hunt",
            icon: "fas fa-map-marked-alt",
          },
          {
            name: "Manajemen Kelompok",
            route: "/manajemen-kelompok",
            icon: "fas fa-users",
          },
          {
            name: "Manajemen Quiz",
            route: "/admin/quiz",
            icon: "fas fa-question-circle",
          },
        ],
      },
  
      {
        name: "Progress Kelompok",
        icon: "fas fa-chart-line",
        route: "/monitoring-progress",
      },
      {
        name: "Laporan",
        icon: "fas fa-file-alt",
        route: "/laporan-dan-rekapan-akhir",
      },
      {
        name: "Leaderboard Kuis",
        icon: "fas fa-trophy",
        route: "/leaderboard-game-kuis",
      },
      {
        name: "Riwayat Aktivitas",
        icon: "fas fa-history",
        route: "/riwayat-aktivitas-mahasiswa",
      },
      {
        name: "Dashboard",
        icon: "fas fa-home",
        route: "/admin-dashboard",
      },
    ];

    const isRouteActive = (menuRoute) => route.path === menuRoute;

    const handleLogout = () => {
      // Add confirmation dialog
      if (confirm("Apakah Anda yakin ingin logout?")) {
        localStorage.clear();
        router.push("/login");
      }
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

<style scoped>
/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #1e293b;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>

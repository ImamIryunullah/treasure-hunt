<template>
  <div>
    <!-- Mobile Menu Toggle -->
    <button
      v-if="isCollapsed"
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 p-3 rounded-xl bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 text-white shadow-2xl lg:hidden hover:bg-slate-800 transition-all duration-200 hover:scale-105"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Sidebar Container -->
    <div
      v-show="!isCollapsed || isDesktop"
      :class="[
        'bg-slate-900 text-white transition-all duration-300 flex flex-col z-40 relative',
        isCollapsed ? 'w-20' : 'w-72',
        'inset-y-0 left-0 lg:static border-r border-slate-700/50',
      ]"
      class="h-full shadow-2xl"
    >

      <!-- Header Section -->
      <div
        class="relative p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50"
      >
        <div class="flex items-center justify-between">
          <div v-if="!isCollapsed" class="flex items-center space-x-4">
            <div class="relative">
              <img
                src="@/assets/logo_untag.png"
                alt="Logo"
                class="w-12 h-12 object-contain rounded-xl bg-white/10 p-2 shadow-lg"
              />
              <div
                class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"
              ></div>
            </div>
            <div>
              <h1
                class="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              >
                Treasure Hunt
              </h1>
              <p class="text-sm text-slate-400 font-medium">Mahasiswa Dashboard</p>
            </div>
          </div>

          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 group "
          >
            <svg
              class="w-5 h-5 group-hover:scale-110 transition-transform"
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

      <!-- Navigation Menu -->
      <nav class="flex-1 p-4 space-y-2 relative overflow-y-auto custom-scrollbar">
        <template v-for="item in menuItems" :key="item.name">
          <!-- Dropdown Menu Items -->
          <div v-if="item.children" class="group">
            <button
              @click="toggleDropdown(item.name)"
              class="flex items-center w-full transition-all duration-200 rounded-xl focus:outline-none relative overflow-hidden"
              :class="[
                isCollapsed
                  ? 'p-3 justify-center hover:bg-slate-700/50 hover:scale-105'
                  : 'p-4 hover:bg-slate-700/50 hover:translate-x-1',
                expandedDropdown.includes(item.name) ? 'bg-slate-700/50 shadow-lg' : '',
              ]"
            >
              <!-- Hover Effect Background -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              ></div>

              <div class="relative z-10 flex items-center w-full">
                <div class="w-7 h-7 flex items-center justify-center relative">
                  <i
                    :class="item.icon"
                    class="text-slate-300 text-lg group-hover:text-white transition-colors"
                  ></i>
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                </div>
                <span
                  v-if="!isCollapsed"
                  class="ml-4 flex-1 text-left font-medium text-slate-200 group-hover:text-white transition-colors"
                >
                  {{ item.name }}
                </span>
                <svg
                  v-if="!isCollapsed"
                  class="w-4 h-4 ml-auto transform transition-all duration-300 text-slate-400 group-hover:text-white"
                  :class="{
                    'rotate-90 text-emerald-400': expandedDropdown.includes(item.name),
                  }"
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
              </div>
            </button>

            <!-- Dropdown Content -->
            <div
              v-show="expandedDropdown.includes(item.name) && !isCollapsed"
              class="ml-6 mt-2 space-y-1 border-l-2 border-slate-700/50 pl-4 animate-fadeIn"
            >
              <router-link
                v-for="child in item.children"
                :key="child.name"
                :to="child.route"
                class="flex items-center transition-all duration-200 rounded-lg p-3 group relative overflow-hidden"
                :class="{
                  'bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border-l-3 border-emerald-500 shadow-lg': isRouteActive(
                    child.route
                  ),
                  'hover:bg-slate-700/30 hover:translate-x-2': !isRouteActive(
                    child.route
                  ),
                }"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-slate-700/10 to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                ></div>
                <div class="relative z-10 flex items-center">
                  <i
                    :class="[
                      child.icon,
                      'text-slate-400 text-sm w-5 group-hover:text-emerald-400 transition-colors',
                      { 'text-emerald-400': isRouteActive(child.route) },
                    ]"
                  ></i>

                  <span
                    :class="[
                      'ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors',
                      { 'text-white font-semibold': isRouteActive(child.route) },
                    ]"
                  >
                    {{ child.name }}
                  </span>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Regular Menu Items -->
          <router-link
            v-else
            :to="item.route"
            class="flex items-center transition-all duration-200 rounded-xl group relative overflow-hidden"
            :class="[
              isRouteActive(item.route)
                ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border border-emerald-500/30 shadow-lg'
                : 'hover:bg-slate-700/50',
              isCollapsed
                ? 'p-3 justify-center hover:scale-105'
                : 'p-4 hover:translate-x-1',
            ]"
            :title="isCollapsed ? item.name : ''"
          >
            <!-- Hover Effect Background -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            ></div>

            <div class="relative z-10 flex items-center">
              <i
                :class="[
                  item.icon,
                  'text-lg transition-colors',
                  isRouteActive(item.route)
                    ? 'text-emerald-400'
                    : 'text-slate-300 group-hover:text-white',
                ]"
              ></i>

              <span
                v-if="!isCollapsed"
                class="ml-4 whitespace-nowrap overflow-hidden text-ellipsis font-medium transition-colors"
                :class="
                  isRouteActive(item.route)
                    ? 'text-white font-semibold'
                    : 'text-slate-200 group-hover:text-white'
                "
              >
                {{ item.name }}
              </span>
            </div>
          </router-link>
        </template>
      </nav>

      <!-- User Profile Section -->
      <div
        v-if="!isCollapsed"
        class="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-900/30"
      >
        <div
          class="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group"
        >
          <div
            class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <i class="fas fa-user text-white text-sm"></i>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-white">Mahasiswa</p>
            <p class="text-xs text-slate-400">Online</p>
          </div>
          <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="p-4 border-t border-slate-700/50 relative">
        <button
          @click="handleLogout"
          class="flex items-center w-full text-left transition-all duration-200 rounded-xl group relative overflow-hidden hover:bg-red-600/20 hover:border-red-500/50 border border-transparent"
          :class="isCollapsed ? 'p-3 justify-center' : 'p-4'"
          :title="isCollapsed ? 'Logout' : ''"
        >
          <!-- Hover Effect Background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          ></div>

          <div class="relative z-10 flex items-center">
            <div class="w-7 h-7 flex items-center justify-center">
              <svg
                class="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors"
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
            </div>
            <span
              v-if="!isCollapsed"
              class="ml-4 whitespace-nowrap font-medium text-slate-300 group-hover:text-red-400 transition-colors"
            >
              Logout
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "SidebarMahasiswa",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const expandedDropdown = ref([]);

    const isCollapsed = ref(true);
    const isDesktop = ref(false);

    const updateScreen = () => {
      isDesktop.value = window.innerWidth >= 1024;
    };

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const toggleDropdown = (menuName) => {
      const index = expandedDropdown.value.indexOf(menuName);
      if (index > -1) {
        expandedDropdown.value.splice(index, 1);
      } else {
        expandedDropdown.value.push(menuName);
      }
    };

    const handleLogout = () => {
      localStorage.clear();
      router.push("/login");
    };

    const menuItems = [
      { name: "Dashboard", icon: "fas fa-home", route: "/mahasiswa-dashboard" },
      {
        name: "Game",
        icon: "fas fa-gamepad",
        children: [
          { name: "Seleksi Quiz", icon: "fas fa-book", route: "/mahasiswa-seleksi-quiz" },
          {
            name: "Treasure Hunt",
            icon: "fas fa-map",
            route: "/mahasiswa-treasure-hunt",
          },
          {
            name: "Hunt Sponsorship",
            icon: "fas fa-gift",
            route: "/mahasiswa-hunt-sponsorship",
          },
        ],
      },
      {
        name: "Pengumuman Game",
        icon: "fas fa-trophy",
        children: [
          { name: "Pengumuman", icon: "fas fa-bullhorn", route: "/mahasiswa-pengumuman" },
          { name: "Leaderboard Kuis", icon: "fas fa-medal", route: "/leaderboard-kuis" },
          {
            name: "Progres Kelompok Treasure Hunt",
            icon: "fas fa-chart-bar",
            route: "/mahasiswa-progress-kelompok",
          },
        ],
      },

      {
        name: "Daftar Kelompok",
        icon: "fas fa-users",
        route: "/mahasiswa-daftar-kelompok",
      },

      { name: "Profil", icon: "fas fa-user", route: "/mahasiswa-profil" },
    ];

    watch(isCollapsed, (newVal) => {
      if (!newVal) {
        expandedDropdown.value = ["Game", "Pengumuman Game"];
      } else {
        expandedDropdown.value = [];
      }
    });

    const isRouteActive = (menuRoute) => route.path === menuRoute;

    onMounted(() => {
      updateScreen();
      window.addEventListener("resize", updateScreen);
    });

    return {
      isCollapsed,
      isDesktop,
      toggleSidebar,
      menuItems,
      isRouteActive,
      handleLogout,
      toggleDropdown,
      expandedDropdown,
    };
  },
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgb(51, 65, 85, 0.1);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(148, 163, 184, 0.3);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(148, 163, 184, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Tambahan untuk border-l-3 */
.border-l-3 {
  border-left-width: 3px;
}
</style>

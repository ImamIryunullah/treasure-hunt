<template>
  <div>
    <button
      v-if="isCollapsed"
      @click="toggleSidebar"
      class="fixed top-1 left-2 z-50 p-2 rounded text-white shadow-lg lg:hidden"
    >
      <div class="text-black">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </button>

    <div
      v-show="!isCollapsed || isDesktop"
      :class="[
        'bg-slate-900 text-white transition-all duration-300 flex flex-col z-40',
        isCollapsed ? 'w-16' : 'w-64',
        'inset-y-0 left-0 lg:static',
      ]"
      class="h-full"
    >
      <div class="p-4 border-b border-slate-700">
        <div class="flex items-center justify-between">
          <div v-if="!isCollapsed" class="flex items-center space-x-3">
            <img
              src="@/assets/logo_untag.png"
              alt="Logo"
              class="w-10 h-10 object-contain"
            />
            <div>
              <h1 class="text-lg font-semibold">Treasure Hunt</h1>
              <p class="text-sm text-slate-400">Mahasiswa Dashboard</p>
            </div>
          </div>

          <button
            @click="toggleSidebar"
            class="p-1 rounded hover:bg-slate-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <nav class="flex-1 p-4 space-y-2">
        <template v-for="item in menuItems" :key="item.name">
          <div v-if="item.children">
            <button
              @click="toggleDropdown(item.name)"
              class="flex items-center w-full transition-colors rounded-lg focus:outline-none"
              :class="
                isCollapsed
                  ? 'p-2 justify-center hover:bg-slate-700'
                  : 'p-3 hover:bg-slate-700'
              "
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <i :class="item.icon" class="text-white text-lg"></i>
              </div>
              <span v-if="!isCollapsed" class="ml-3 flex-1 text-left">
                {{ item.name }}
              </span>
              <svg
                v-if="!isCollapsed"
                class="w-4 h-4 ml-auto transform transition-transform"
                :class="{ 'rotate-90': expandedDropdown === item.name }"
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
            </button>

            <div
              v-show="expandedDropdown.includes(item.name)"
              class="pl-8 mt-1 space-y-1"
            >
              <router-link
                v-for="child in item.children"
                :key="child.name"
                :to="child.route"
                class="flex items-center transition-colors rounded-lg p-2 hover:bg-slate-700"
                :class="{ 'bg-slate-700': isRouteActive(child.route) }"
              >
                <i :class="child.icon" class="text-white text-sm w-5"></i>
                <span class="ml-3 text-sm">{{ child.name }}</span>
              </router-link>
            </div>
          </div>

          <router-link
            v-else
            :to="item.route"
            class="flex items-center transition-colors rounded-lg"
            :class="[
              isRouteActive(item.route) ? 'bg-slate-700' : '',
              isCollapsed
                ? 'p-2 justify-center hover:bg-slate-700'
                : 'p-3 hover:bg-slate-700',
            ]"
            :title="isCollapsed ? item.name : ''"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <i :class="item.icon" class="text-white text-lg"></i>
            </div>
            <span
              v-if="!isCollapsed"
              class="ml-3 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ item.name }}
            </span>
          </router-link>
        </template>
      </nav>

      <div class="p-4 mt-auto border-t border-slate-700">
        <button
          @click="handleLogout"
          class="flex items-center w-full text-left transition-colors rounded-lg hover:bg-red-600"
          :class="isCollapsed ? 'p-2 justify-center' : 'p-3'"
          :title="isCollapsed ? 'Logout' : ''"
        >
          <svg
            class="w-6 h-6 text-white"
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
          <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">Logout</span>
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
        expandedDropdown.value.splice(index, 1); // hapus jika sudah ada
      } else {
        expandedDropdown.value.push(menuName); // tambahkan jika belum ada
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

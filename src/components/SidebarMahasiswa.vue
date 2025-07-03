<template>
  <div
    :class="[
      'bg-slate-900 text-white transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
    class="min-h-screen"
  >
    <div class="p-4 border-b border-slate-700">
      <div class="flex items-center justify-between">
        <div v-if="!isCollapsed" class="flex items-center space-x-3">
          <!-- Gambar/Icon -->
          <img
            src="@/assets/logo_untag.png"
            alt="Logo"
            class="w-10 h-10 object-contain"
          />

          <!-- Teks Judul & Subjudul -->
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
      <router-link
        v-for="item in menuItems"
        :key="item.name"
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
        <div class="flex-shrink-0 flex items-center justify-center w-6 h-6">
          <i :class="item.icon" class="text-white text-lg"></i>
        </div>

        <span
          v-if="!isCollapsed"
          class="ml-3 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ item.name }}
        </span>
      </router-link>
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
</template>

<script>
import { useRoute, useRouter } from "vue-router";

export default {
  props: {
    isCollapsed: Boolean,
    menuItems: Array,
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();

    const toggleSidebar = () => emit("toggle");

    const getIconUrl = (filename) => {
      try {
        return require(`@/assets/sidebar/${filename}`);
      } catch (error) {
        console.error(`Icon not found: ${filename}`);
        return "";
      }
    };

    const isRouteActive = (menuRoute) => route.path === menuRoute;

    const handleLogout = () => {
      // Bersihkan token/login
      localStorage.clear();
      // Arahkan ke login
      router.push("/login");
    };

    return {
      toggleSidebar,
      getIconUrl,
      isRouteActive,
      handleLogout,
    };
  },
};
</script>

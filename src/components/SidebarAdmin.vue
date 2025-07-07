<template>
  <div
    :class="[
      'bg-slate-900 text-white transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
    class="min-h-screen"
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
          <h1 class="text-lg font-semibold">Admin Panel</h1>
          <p class="text-sm text-slate-400">Treasure hunt</p>
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
          isCollapsed ? 'p-2 justify-center hover:bg-slate-700' : 'p-3 hover:bg-slate-700'
        ]"
        :title="isCollapsed ? item.name : ''"
      >
        <div class="flex-shrink-0 flex items-center justify-center">
          <i 
            :class="[item.icon, 'text-xl', 'text-white']"
            :style="{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
          ></i>
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
        <i class="fas fa-sign-out-alt text-xl text-white" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;"></i>
        <span v-if="!isCollapsed" class="ml-3 whitespace-nowrap">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  props: {
    isCollapsed: Boolean,
    menuItems: Array
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();

    const toggleSidebar = () => emit('toggle');

    const isRouteActive = (menuRoute) => route.path === menuRoute;

    const handleLogout = () => {
      // Bersihkan token/login
      localStorage.clear();
      // Arahkan ke login
      router.push('/login');
    };

    return {
      toggleSidebar,
      isRouteActive,
      handleLogout
    };
  }
};
</script>
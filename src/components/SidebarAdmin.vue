<template>
  <div
    :class="[
      'bg-slate-800 text-white transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <div class="p-4 border-b border-slate-700">
      <div class="flex items-center justify-between">
        <div v-if="!isCollapsed">
          <h1 class="text-lg font-semibold">Admin Panel</h1>
          <p class="text-sm text-slate-400">Treasure hunt</p>
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

    <!-- Menu Items -->
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
        @click="$emit('set-active', item.name)"
      >
        <div class="flex-shrink-0 flex items-center justify-center">
          <img
            :src="getIconUrl(item.icon)"
            :class="['object-contain', isCollapsed ? 'w-6 h-6' : 'w-8 h-8']"
            :alt="item.name + ' icon'"
          />
        </div>
        <span
          v-if="!isCollapsed"
          class="ml-3 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ item.name }}
        </span>
      </router-link>
    </nav>
    <div v-if="!isCollapsed" class="p-4 border-t border-slate-700">
      <p class="text-xs text-slate-400">©Treasure Hunt Untag 2025</p>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  props: {
    isCollapsed: Boolean,
    menuItems: Array
  },
  emits: ['toggle', 'set-active'],
  setup(props, { emit }) {
    const route = useRoute();

    const toggleSidebar = () => emit('toggle');

    const getIconUrl = (filename) => {
      try {
        return require(`@/assets/sidebar/${filename}`);
      } catch (error) {
        console.error(`Icon not found: ${filename}`);
        return '';
      }
    };

    const isRouteActive = (menuRoute) => {
      return route.path === menuRoute;
    };

    return {
      toggleSidebar,
      getIconUrl,
      isRouteActive
    };
  }
};
</script>

<style scoped>
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover\:bg-slate-700:hover {
  background-color: rgb(51 65 85);
}

.bg-slate-700 {
  background-color: rgb(51 65 85);
}

[title]:hover::after {
  content: attr(title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(15 23 42);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  margin-left: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

[title]:hover::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: rgb(15 23 42);
  z-index: 1001;
  margin-left: 2px;
}

@media (max-width: 768px) {
  [title]:hover::after,
  [title]:hover::before {
    display: none;
  }
}
</style>

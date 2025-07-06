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
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Treasure Hunt 🗺️</h1>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span>🏆 Tim Explorer</span>
            <span>📍 {{ completedLocations }}/{{ totalLocations }} Area</span>
            <span>💰 {{ points }} Poin</span>
          </div>
        </div>
  
        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{{ Math.round((completedLocations / totalLocations) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(completedLocations / totalLocations) * 100}%` }"
            ></div>
          </div>
        </div>
  
        <!-- Game Info Panel -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4">🎯 Cara Bermain</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 mb-2">📍 Kunjungi Lokasi</h3>
              <p class="text-sm text-blue-700">Datang ke lokasi yang ditandai pada peta dan scan QR code yang tersedia</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold text-green-800 mb-2">❓ Jawab Pertanyaan</h3>
              <p class="text-sm text-green-700">Selesaikan quiz atau tantangan yang diberikan di setiap lokasi</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-semibold text-purple-800 mb-2">🏆 Kumpulkan Poin</h3>
              <p class="text-sm text-purple-700">Dapatkan poin untuk setiap lokasi yang berhasil diselesaikan</p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h3 class="font-semibold text-orange-800 mb-2">⏰ Waktu Terbatas</h3>
              <p class="text-sm text-orange-700">Selesaikan semua lokasi dalam waktu yang ditentukan</p>
            </div>
          </div>
        </div>
  
        <!-- Campus Map -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">🗺️ Peta Kampus</h2>
            <div class="flex gap-2">
              <button 
                @click="zoomIn" 
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              >
                🔍 Zoom In
              </button>
              <button 
                @click="zoomOut" 
                class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
              >
                🔍 Zoom Out
              </button>
              <button 
                @click="resetZoom" 
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
              >
                🎯 Reset
              </button>
            </div>
          </div>
  
          <!-- Map Container -->
          <div class="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden" style="height: 600px;">
            <div 
              class="absolute inset-0 transition-all duration-300"
              :style="{ transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)` }"
              @mousedown="startPanning"
              @mousemove="panMap"
              @mouseup="stopPanning"
              @mouseleave="stopPanning"
            >
              <!-- Map Locations -->
              <div 
                v-for="location in locations" 
                :key="location.id"
                class="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                :style="{ left: `${location.x}%`, top: `${location.y}%` }"
                @click="selectLocation(location)"
              >
                <!-- Location Icon -->
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  :class="getLocationClass(location)"
                >
                  {{ location.icon }}
                </div>
                <!-- Location Label -->
                <div class="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                  {{ location.name }}
                </div>
                <!-- Completion Badge -->
                <div 
                  v-if="location.completed"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                >
                  ✓
                </div>
              </div>
  
              <!-- Connecting Lines (optional) -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" stroke-width="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
  
          <!-- Legend -->
          <div class="flex justify-center mt-4 gap-6 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Selesai</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Aktif</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
              <span>Terkunci</span>
            </div>
          </div>
        </div>
        
        <!-- Selected Location Modal -->
        <div v-if="selectedLocation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">{{ selectedLocation.name }}</h3>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="mb-4">
              <p class="text-gray-600 mb-2">{{ selectedLocation.description }}</p>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>📍 {{ selectedLocation.type }}</span>
                <span>•</span>
                <span>🏆 {{ selectedLocation.points }} Poin</span>
              </div>
            </div>
  
            <div class="flex gap-3">
              <button 
                v-if="!selectedLocation.completed && selectedLocation.available"
                @click="startChallenge(selectedLocation)"
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
              >
                🎯 Mulai Tantangan
              </button>
              <button 
                v-if="selectedLocation.completed"
                class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md font-medium cursor-not-allowed"
                disabled
              >
                ✅ Selesai
              </button>
              <button 
                v-if="!selectedLocation.available"
                class="flex-1 bg-gray-400 text-white py-2 px-4 rounded-md font-medium cursor-not-allowed"
                disabled
              >
                🔒 Terkunci
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMahasiswa from '@/components/SidebarMahasiswa.vue';
  import { ref, reactive, computed } from "vue";
  
  export default {
    components: {
      SidebarMahasiswa
    },
    setup() {
      const isCollapsed = ref(false);
      const selectedLocation = ref(null);
      const zoomLevel = ref(1);
      const panX = ref(0);
      const panY = ref(0);
      const isPanning = ref(false);
      const lastMousePos = ref({ x: 0, y: 0 });
  
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
          active: true 
        },
        {
          name: "Hunt Sponsorship",
          icon: "fas fa-gift",
          route: "/mahasiswa-hunt-sponsorship",
          active: false,
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
  
      // Game locations based on your campus map
      const locations = reactive([
        {
          id: 1,
          name: "Perpustakaan",
          icon: "📚",
          x: 25,
          y: 35,
          type: "Academic",
          points: 100,
          completed: true,
          available: true,
          description: "Temukan buku langka di perpustakaan dan jawab pertanyaan tentang sejarah kampus."
        },
        {
          id: 2,
          name: "Rektorat",
          icon: "🏛️",
          x: 50,
          y: 25,
          type: "Administrative",
          points: 150,
          completed: true,
          available: true,
          description: "Kunjungi rektorat dan pelajari visi misi universitas."
        },
        {
          id: 3,
          name: "Masjid",
          icon: "🕌",
          x: 70,
          y: 35,
          type: "Religious",
          points: 100,
          completed: true,
          available: true,
          description: "Temukan keindahan arsitektur masjid kampus dan sejarahnya."
        },
        {
          id: 4,
          name: "Fakultas Teknik",
          icon: "⚙️",
          x: 80,
          y: 55,
          type: "Academic",
          points: 120,
          completed: true,
          available: true,
          description: "Jelajahi laboratorium teknik dan temukan inovasi terbaru."
        },
        {
          id: 5,
          name: "Taman",
          icon: "🌳",
          x: 45,
          y: 55,
          type: "Recreation",
          points: 80,
          completed: false,
          available: true,
          description: "Nikmati keindahan taman kampus dan temukan spot foto terbaik."
        },
        {
          id: 6,
          name: "Lab Bahasa",
          icon: "🗣️",
          x: 30,
          y: 65,
          type: "Academic",
          points: 90,
          completed: false,
          available: true,
          description: "Uji kemampuan bahasa asing Anda di lab bahasa."
        },
        {
          id: 7,
          name: "Kantin",
          icon: "🍽️",
          x: 55,
          y: 70,
          type: "Facility",
          points: 70,
          completed: true,
          available: true,
          description: "Cicipi kuliner khas kampus dan temukan menu favorit mahasiswa."
        },
        {
          id: 8,
          name: "Lapangan",
          icon: "⚽",
          x: 20,
          y: 80,
          type: "Sports",
          points: 110,
          completed: true,
          available: true,
          description: "Ikuti mini games olahraga di lapangan kampus."
        },
        {
          id: 9,
          name: "Serbaguna",
          icon: "🏢",
          x: 75,
          y: 75,
          type: "Facility",
          points: 100,
          completed: false,
          available: false,
          description: "Gedung serbaguna untuk acara besar kampus."
        },
        {
          id: 10,
          name: "Auditorium",
          icon: "🎭",
          x: 60,
          y: 85,
          type: "Facility",
          points: 130,
          completed: false,
          available: false,
          description: "Tempat pertunjukan dan acara besar kampus."
        }
      ]);
  
      const completedLocations = computed(() => {
        return locations.filter(loc => loc.completed).length;
      });
  
      const totalLocations = computed(() => {
        return locations.length;
      });
  
      const points = computed(() => {
        return locations.filter(loc => loc.completed).reduce((sum, loc) => sum + loc.points, 0);
      });
  
      const getLocationClass = (location) => {
        if (location.completed) return 'bg-green-500';
        if (location.available) return 'bg-blue-500';
        return 'bg-gray-400';
      };
  
      const selectLocation = (location) => {
        selectedLocation.value = location;
      };
  
      const closeModal = () => {
        selectedLocation.value = null;
      };
  
      const startChallenge = (location) => {
        // Simulate starting a challenge
        alert(`Memulai tantangan di ${location.name}!\n\nInstruksi:\n1. Datang ke lokasi fisik\n2. Scan QR code yang tersedia\n3. Selesaikan quiz atau tantangan\n4. Dapatkan poin!`);
        closeModal();
      };
  
      const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
      };
  
      // Zoom and Pan functions
      const zoomIn = () => {
        zoomLevel.value = Math.min(zoomLevel.value + 0.2, 2);
      };
  
      const zoomOut = () => {
        zoomLevel.value = Math.max(zoomLevel.value - 0.2, 0.5);
      };
  
      const resetZoom = () => {
        zoomLevel.value = 1;
        panX.value = 0;
        panY.value = 0;
      };
  
      const startPanning = (e) => {
        isPanning.value = true;
        lastMousePos.value = { x: e.clientX, y: e.clientY };
      };
  
      const panMap = (e) => {
        if (!isPanning.value) return;
        
        const deltaX = e.clientX - lastMousePos.value.x;
        const deltaY = e.clientY - lastMousePos.value.y;
        
        panX.value += deltaX;
        panY.value += deltaY;
        
        lastMousePos.value = { x: e.clientX, y: e.clientY };
      };
  
      const stopPanning = () => {
        isPanning.value = false;
      };
  
      return {
        menuItems,
        toggleSidebar,
        isCollapsed,
        locations,
        selectedLocation,
        completedLocations,
        totalLocations,
        points,
        getLocationClass,
        selectLocation,
        closeModal,
        startChallenge,
        zoomLevel,
        panX,
        panY,
        zoomIn,
        zoomOut,
        resetZoom,
        startPanning,
        panMap,
        stopPanning
      };
    }
  }
  </script>
  
  <style scoped>
  .cursor-grab {
    cursor: grab;
  }
  
  .cursor-grabbing {
    cursor: grabbing;
  }
  
  /* Smooth transitions for all interactive elements */
  .transition-all {
    transition: all 0.3s ease;
  }
  
  /* Custom scrollbar for better aesthetics */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>
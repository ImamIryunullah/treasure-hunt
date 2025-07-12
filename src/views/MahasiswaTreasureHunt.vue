<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarMahasiswa />
    <div class="flex-1 p-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Treasure Hunt 🗺️</h1>
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <span>🏆 Tim Explorer</span>
          <span>📍 {{ completedLocations }}/{{ totalLocations }} Area</span>
          <span>💰 {{ points }} Poin</span>
        </div>
      </div>
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

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">🎯 Cara Bermain</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">📍 Kunjungi Lokasi</h3>
            <p class="text-sm text-blue-700">Datang ke lokasi yang ditandai pada peta dan cari kode treasure yang tersedia</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">🔑 Masukkan Kode</h3>
            <p class="text-sm text-green-700">Input kode treasure yang Anda temukan di lokasi untuk validasi</p>
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

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          ⏰ Waktu Permainan
        </h3>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600 mb-2">{{ formatTime(remainingTime) }}</div>
          <div class="text-sm text-gray-600">Waktu tersisa untuk menyelesaikan semua lokasi</div>
          <div class="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div class="bg-red-500 h-2 rounded-full transition-all duration-1000"
                 :style="{ width: `${(remainingTime / totalTime) * 100}%` }"></div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-2 mb-6">
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
        <button 
          @click="showFullMap = true"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
        >
          🖥️ Lihat Full
        </button>
      </div>
    </div>

    <Maps />

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

    <!-- Full Map Modal -->
    <div
      v-if="showFullMap"
      class="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div class="relative bg-white rounded-lg shadow-lg w-full h-full">
        <button
          @click="showFullMap = false"
          class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          ❌ Tutup
        </button>
        <Maps />
      </div>
    </div>
  </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            🏆 Leaderboard Tim
          </h3>
          <div class="space-y-3">
            <div v-for="(team, index) in leaderboard" :key="team.id" class="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                   :class="getRankClass(index)">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <div class="font-medium text-sm">{{ team.name }}</div>
                <div class="text-xs text-gray-600">{{ team.points }} poin</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-500">{{ team.completed }}/{{ totalLocations }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            📋 Aktivitas Terbaru
          </h3>
          <div class="space-y-3">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-lg">
                {{ activity.icon }}
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium">{{ activity.title }}</div>
                <div class="text-xs text-gray-600">{{ activity.description }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            📊 Statistik Tim
          </h3>
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ points }}</div>
              <div class="text-sm text-blue-800">Total Poin</div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ completedLocations }}</div>
              <div class="text-sm text-green-800">Lokasi Selesai</div>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ averageTimePerLocation }}</div>
              <div class="text-sm text-purple-800">Rata-rata Waktu</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4">📍 Daftar Lokasi</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="location in locations" :key="location.id" 
               class="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
               @click="selectLocation(location)">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                     :class="getLocationClass(location)">
                  {{ location.icon }}
                </div>
                <div>
                  <div class="font-medium">{{ location.name }}</div>
                  <div class="text-sm text-gray-600">{{ location.type }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium">{{ location.points }} poin</div>
                <div class="text-xs" :class="location.completed ? 'text-green-600' : location.available ? 'text-blue-600' : 'text-gray-400'">
                  {{ location.completed ? 'Selesai' : location.available ? 'Tersedia' : 'Terkunci' }}
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-700">{{ location.description }}</div>
          </div>
        </div>
      </div>
      
      
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
              🔑 Masukkan Kode
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

      
      <div v-if="showCodeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">🔑 Masukkan Kode Treasure</h3>
            <button @click="closeCodeModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <p class="text-gray-600 mb-4">Masukkan kode treasure yang Anda temukan di <strong>{{ currentLocation?.name }}</strong></p>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kode Treasure</label>
                <input 
                  v-model="treasureCode"
                  type="text"
                  placeholder="Masukkan kode treasure..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :class="{ 'border-red-500': validationError }"
                />
                <div v-if="validationError" class="text-red-600 text-sm mt-1">
                  {{ validationError }}
                </div>
                <div v-if="validationSuccess" class="text-green-600 text-sm mt-1">
                  {{ validationSuccess }}
                </div>
              </div>

              <div class="bg-blue-50 p-3 rounded-lg">
                <p class="text-sm text-blue-800">
                  <strong>💡 Petunjuk:</strong> Kode treasure biasanya berupa kombinasi huruf dan angka yang dapat ditemukan di lokasi fisik.
                </p>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button 
              @click="closeCodeModal"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium"
            >
              Batal
            </button>
            <button 
              @click="validateTreasureCode"
              :disabled="!treasureCode || isValidating"
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isValidating">Memvalidasi...</span>
              <span v-else>🔍 Validasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMahasiswa from '@/components/SidebarMahasiswa.vue';
import Maps from '@/components/Maps.vue';

export default {
  components: {
    SidebarMahasiswa,
    Maps
  },
  data() {
    return {
      selectedLocation: null,
      showCodeModal: false,
      currentLocation: null,
      treasureCode: '',
      validationError: '',
      validationSuccess: '',
      isValidating: false,
      showFullMap: false,
      zoomLevel: 1,
      panX: 0,
      panY: 0,
      isPanning: false,
      lastMousePos: { x: 0, y: 0 },
      remainingTime: 7200,
      totalTime: 7200,
      timer: null,
      treasureCodes: {
        1: 'BOOK2024',
        2: 'RECTOR123',
        3: 'MASJID456',
        4: 'TEKNIK789',
        5: 'GARDEN321',
        6: 'BAHASA654',
        7: 'KANTIN987',
        8: 'SPORT012',
        9: 'SERBAGUNA345',
        10: 'AUDIO678'
      },
      locations: [
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
        description: "Temukan buku langka di perpustakaan dan cari kode treasure yang tersembunyi."
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
        description: "Kunjungi rektorat, pelajari visi misi universitas, dan temukan kode treasure."
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
        description: "Jelajahi arsitektur masjid kampus dan cari kode treasure di area sekitar."
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
        description: "Eksplorasi laboratorium teknik dan temukan kode treasure di area inovasi."
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
        description: "Nikmati keindahan taman kampus dan cari kode treasure di spot foto terbaik."
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
        description: "Uji kemampuan bahasa dan temukan kode treasure di lab bahasa."
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
        description: "Cicipi kuliner kampus dan cari kode treasure di area makan favorit."
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
        description: "Ikuti mini games olahraga dan temukan kode treasure di lapangan kampus."
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
        description: "Gedung serbaguna untuk acara besar, cari kode treasure di area utama."
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
        description: "Tempat pertunjukan kampus, temukan kode treasure di area panggung."
      }
      ], 
      leaderboard: [ { id: 1, name: "Tim Explorer", points: 630, completed: 6 },
      { id: 2, name: "Tech Hunters", points: 580, completed: 5 },
      { id: 3, name: "Campus Rangers", points: 520, completed: 5 },
      { id: 4, name: "Quest Masters", points: 470, completed: 4 },
      { id: 5, name: "Adventure Squad", points: 420, completed: 4 }],
      recentActivities: [
        { id: 1, icon: "🎉", title: "Kode Berhasil Divalidasi", description: "Tim Explorer berhasil menemukan kode treasure di Lapangan", time: "5 menit lalu" },
      { id: 2, icon: "🔑", title: "Kode Treasure Ditemukan", description: "Menemukan kode treasure di Perpustakaan", time: "15 menit lalu" },
      { id: 3, icon: "🏛️", title: "Eksplorasi Rektorat", description: "Berhasil validasi kode treasure di Rektorat", time: "30 menit lalu" },
      { id: 4, icon: "🕌", title: "Kunjungi Masjid", description: "Menemukan dan memvalidasi kode treasure di Masjid", time: "45 menit lalu" }
      ],
    };
  },
  computed: {
    completedLocations() {
      return this.locations.filter(loc => loc.completed).length;
    },
    totalLocations() {
      return this.locations.length;
    },
    points() {
      return this.locations.filter(loc => loc.completed).reduce((sum, loc) => sum + loc.points, 0);
    },
    averageTimePerLocation() {
      const completedCount = this.completedLocations;
      if (completedCount === 0) return "0 min";
      const totalElapsed = this.totalTime - this.remainingTime;
      const avgSeconds = Math.round(totalElapsed / completedCount);
      return Math.round(avgSeconds / 60) + " min";
    }
  },
  methods: {
    getLocationClass(location) {
      if (location.completed) return 'bg-green-500';
      if (location.available) return 'bg-blue-500';
      return 'bg-gray-400';
    },
    getRankClass(index) {
      if (index === 0) return 'bg-yellow-500 text-white';
      if (index === 1) return 'bg-gray-400 text-white';
      if (index === 2) return 'bg-orange-600 text-white';
      return 'bg-gray-200 text-gray-700';
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    selectLocation(location) {
      this.selectedLocation = location;
    },
    closeModal() {
      this.selectedLocation = null;
    },
    startChallenge(location) {
      this.currentLocation = location;
      this.showCodeModal = true;
      this.closeModal();
    },
    closeCodeModal() {
      this.showCodeModal = false;
      this.currentLocation = null;
      this.treasureCode = '';
      this.validationError = '';
      this.validationSuccess = '';
    },
    async validateTreasureCode() {
      if (!this.treasureCode.trim()) {
        this.validationError = 'Kode treasure tidak boleh kosong';
        return;
      }

      this.isValidating = true;
      this.validationError = '';
      this.validationSuccess = '';

      await new Promise(resolve => setTimeout(resolve, 1500));

      const expectedCode = this.treasureCodes[this.currentLocation.id];
      const inputCode = this.treasureCode.trim().toUpperCase();

      if (inputCode === expectedCode) {
        this.validationSuccess = `Kode benar! Selamat, Anda telah menyelesaikan tantangan di ${this.currentLocation.name}. +${this.currentLocation.points} poin!`;
        const locationIndex = this.locations.findIndex(loc => loc.id === this.currentLocation.id);
        if (locationIndex !== -1) this.locations[locationIndex].completed = true;

        const teamIndex = this.leaderboard.findIndex(team => team.name === "Tim Explorer");
        if (teamIndex !== -1) {
          this.leaderboard[teamIndex].points += this.currentLocation.points;
          this.leaderboard[teamIndex].completed += 1;
        }

        this.recentActivities.unshift({
          id: Date.now(),
          icon: "🎉",
          title: `Berhasil di ${this.currentLocation.name}`,
          description: `Kode treasure berhasil divalidasi, mendapat ${this.currentLocation.points} poin`,
          time: "Baru saja"
        });

        setTimeout(() => {
          this.closeCodeModal();
        }, 3000);
      } else {
        this.validationError = 'Kode treasure salah. Pastikan Anda memasukkan kode yang benar dari lokasi ini.';
      }

      this.isValidating = false;
    },
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel + 0.2, 2);
    },
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.5);
    },
    resetZoom() {
      this.zoomLevel = 1;
      this.panX = 0;
      this.panY = 0;
    },
    startPanning(e) {
      this.isPanning = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    },
    panMap(e) {
      if (!this.isPanning) return;
      const deltaX = e.clientX - this.lastMousePos.x;
      const deltaY = e.clientY - this.lastMousePos.y;
      this.panX += deltaX;
      this.panY += deltaY;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    },
    stopPanning() {
      this.isPanning = false;
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(this.timer);
          alert("Waktu habis! Permainan berakhir.");
        }
      }, 1000);
    }
  },
  mounted() {
    this.startTimer();
  },
  unmounted() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>


<style scoped>
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

.transition-all {
  transition: all 0.3s ease;
}

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